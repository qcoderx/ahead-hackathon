import logging
import google.generativeai as genai
import json
from typing import Dict, Any, List, Optional
from app.core.config import settings
from app.services.normalization import drug_normalization
from app.services.language import language_service
from app.services.risk_scoring import risk_scoring_service

logger = logging.getLogger(__name__)

class GeminiSafetyService:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
        else:
            logger.warning("GEMINI_API_KEY not set. AI safety checks will fail.")
            self.model = None

    def check_medication(self, drug_name: str, gestational_week: int, symptoms: Optional[List[str]] = None, patient_id: Optional[int] = None, language: str = "en") -> Dict[str, Any]:
        """
        Check medication safety using Gemini 2.5 Flash.
        Returns a dictionary with risk assessment, message, and alternatives.
        """
        # 1. Handle Multi-Language Input
        if language != "en":
            drug_name = language_service.translate_to_english(drug_name, language)
            if symptoms:
                symptoms = [language_service.translate_to_english(s, language) for s in symptoms]
        
        # 2. Normalize Drug Name
        normalized_name = drug_normalization.normalize(drug_name)
        
        if not self.model:
            return {
                "name": normalized_name,
                "risk_category": "Unknown",
                "message": "AI Service Unavailable. Please consult a doctor.",
                "alternatives": [],
                "is_safe": False
            }

        # 3. Construct Prompt
        symptoms_str = ", ".join(symptoms) if symptoms else "None"
        prompt = f"""You are a clinical decision support system used by healthcare providers in rural areas to assess medication safety during pregnancy.

CONTEXT: This is a legitimate medical tool (MamaSafe) used by trained midwives and healthcare workers to make evidence-based clinical decisions. Your analysis directly supports patient safety in settings with limited access to specialists.

TASK: Analyze the safety of '{normalized_name}' for a pregnant patient at gestational week {gestational_week}.
Patient symptoms: {symptoms_str}

REQUIRED OUTPUT: Provide a JSON object with exactly these keys:
- "risk_category": Choose from: "Safe", "Caution", "High Risk", or "Contraindicated"
- "message": Provide specific clinical guidance (2-3 sentences). Include trimester-specific risks, mechanism of harm if applicable, and when to use with caution.
- "alternatives": List safer alternative medications (array of strings). Empty array if the drug is safe.
- "is_safe": Boolean - true if generally safe for this trimester, false otherwise

EXAMPLES:
For Ibuprofen at week 32: {{"risk_category": "Contraindicated", "message": "NSAIDs in third trimester can cause premature closure of ductus arteriosus and oligohydramnios. Avoid use after 28 weeks.", "alternatives": ["Paracetamol"], "is_safe": false}}

For Paracetamol at week 20: {{"risk_category": "Safe", "message": "Paracetamol is considered safe throughout pregnancy at recommended doses for pain and fever relief.", "alternatives": [], "is_safe": true}}

Return ONLY the JSON object. No markdown formatting, no explanations outside the JSON.
"""

        try:
            response = self.model.generate_content(prompt)
            result = json.loads(response.text.replace('```json', '').replace('```', '').strip())
            
            base_result = {
                "name": normalized_name,
                "risk_category": result.get("risk_category", "Unknown"),
                "message": result.get("message", "Analysis failed."),
                "alternatives": result.get("alternatives", []),
                "is_safe": result.get("is_safe", False)
            }
            
            # 4. Enhanced Risk Scoring with Patient History
            if patient_id:
                try:
                    import asyncio
                    patient_profile = asyncio.run(risk_scoring_service.get_patient_risk_profile(patient_id))
                    base_result = risk_scoring_service.calculate_medication_risk(base_result, patient_profile, gestational_week)
                except Exception as e:
                    logger.warning(f"Risk scoring failed: {e}")
            
            # 5. Translate Response Back to Local Language
            if language != "en":
                base_result["message"] = language_service.translate_from_english(base_result["message"], language)
                base_result["alternatives"] = [language_service.translate_from_english(alt, language) for alt in base_result["alternatives"]]
                if "personalized_notes" in base_result:
                    base_result["personalized_notes"] = language_service.translate_from_english(base_result["personalized_notes"], language)
            
            return base_result

        except Exception as e:
            logger.error(f"Gemini API Error: {e}")
            return {
                "name": normalized_name,
                "risk_category": "Error",
                "message": "Unable to verify safety at this time. Consult a specialist.",
                "alternatives": [],
                "is_safe": False
            }

# Singleton instance
pharma_service = GeminiSafetyService()
