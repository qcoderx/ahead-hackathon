import google.generativeai as genai
from typing import Dict, List, Optional, Any
from app.core.config import settings
from app.services.dorra_emr import dorra_emr

class RiskScoringService:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
        else:
            self.model = None

    async def get_patient_risk_profile(self, patient_id: int) -> Dict[str, Any]:
        """Get patient's historical encounters for risk assessment"""
        try:
            # Get patient encounters from Dorra EMR
            encounters = await dorra_emr.get_patient_encounters(patient_id)
            
            if not encounters or not self.model:
                return {"risk_factors": [], "risk_score": 0}

            # Analyze encounters for risk patterns
            encounter_text = "\n".join([
                f"Date: {enc.get('date', 'Unknown')}, "
                f"Diagnosis: {enc.get('diagnosis', 'N/A')}, "
                f"Medications: {enc.get('medications', 'N/A')}, "
                f"Notes: {enc.get('notes', 'N/A')}"
                for enc in encounters[-10:]  # Last 10 encounters
            ])

            prompt = f"""Analyze this patient's medical history for pregnancy risk factors:

{encounter_text}

Return a JSON object with:
- "risk_factors": Array of identified risk factors (strings)
- "risk_score": Integer 0-100 (0=low risk, 100=extreme risk)
- "recommendations": Array of preventive recommendations (strings)

Focus on: previous complications, chronic conditions, medication allergies, high-risk pregnancies."""

            response = self.model.generate_content(prompt)
            result = response.text.replace('```json', '').replace('```', '').strip()
            
            import json
            return json.loads(result)
            
        except Exception as e:
            return {"risk_factors": [], "risk_score": 0, "recommendations": []}

    def calculate_medication_risk(self, base_risk: Dict, patient_profile: Dict, gestational_week: int) -> Dict[str, Any]:
        """Enhanced risk calculation using patient history"""
        if not self.model:
            return base_risk

        risk_factors = patient_profile.get("risk_factors", [])
        patient_risk_score = patient_profile.get("risk_score", 0)
        
        # Adjust risk based on patient profile
        enhanced_risk = base_risk.copy()
        
        # Increase risk category if patient has high-risk profile
        if patient_risk_score > 70:
            risk_categories = ["Safe", "Caution", "High Risk", "Contraindicated"]
            current_idx = risk_categories.index(enhanced_risk.get("risk_category", "Safe"))
            if current_idx < len(risk_categories) - 1:
                enhanced_risk["risk_category"] = risk_categories[current_idx + 1]
                enhanced_risk["message"] += f" Patient has high-risk profile (score: {patient_risk_score})."
        
        # Add personalized recommendations
        if risk_factors:
            enhanced_risk["personalized_notes"] = f"Consider patient's history: {', '.join(risk_factors[:3])}"
        
        return enhanced_risk

risk_scoring_service = RiskScoringService()