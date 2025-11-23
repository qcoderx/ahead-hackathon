import logging
import httpx
import json
import google.generativeai as genai
from typing import Dict, Any, List, Optional
from app.core.config import settings
from app.services.normalization import drug_normalization
from app.services.language import language_service
from app.services.risk_scoring import risk_scoring_service
from app.services.dorra_emr import dorra_emr

logger = logging.getLogger(__name__)

class HybridSafetyService:
    def __init__(self):
        self.dorra_api_url = settings.DORRA_API_URL
        self.dorra_api_key = settings.DORRA_API_KEY
        self.headers = {
            "Authorization": f"Token {self.dorra_api_key}",
            "Content-Type": "application/json"
        }
        
        # Initialize Gemini AI
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.gemini_model = genai.GenerativeModel('gemini-2.5-flash')
        else:
            self.gemini_model = None

    async def check_medication(self, drug_name: str, gestational_week: int, symptoms: Optional[List[str]] = None, patient_id: Optional[int] = None, language: str = "en", additional_drugs: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        HYBRID MEDICATION SAFETY CHECK:
        1. PharmaVigilance API for real drug interaction data
        2. Gemini 2.5 Flash for AI-powered clinical analysis
        3. Combined intelligence for ultimate safety assessment
        """
        # 1. Handle Multi-Language Input
        if language != "en":
            drug_name = language_service.translate_to_english(drug_name, language)
            if symptoms:
                symptoms = [language_service.translate_to_english(s, language) for s in symptoms]
        
        # 2. Normalize Drug Name
        normalized_name = drug_normalization.normalize(drug_name)
        
        if not self.dorra_api_key:
            return {
                "name": normalized_name,
                "risk_category": "Unknown",
                "message": "PharmaVigilance Service Unavailable. Please consult a doctor.",
                "alternatives": [],
                "is_safe": False
            }

        try:
            # Check if multiple drugs - use PharmaVigilance for drug interactions
            if additional_drugs and len(additional_drugs) > 0:
                # Multiple drugs - create encounter and use PharmaVigilance + AI
                encounter_result = await self._create_medication_encounter(
                    patient_id, normalized_name, gestational_week, symptoms, additional_drugs
                )
                
                if encounter_result and encounter_result.get("id"):
                    # STEP 1: Get PharmaVigilance drug-drug interactions
                    pharma_data = await self._get_drug_interactions(patient_id, encounter_result.get("id"), normalized_name)
                    
                    # STEP 2: Get Gemini AI analysis with multi-drug context
                    ai_analysis = await self._get_gemini_analysis(normalized_name, gestational_week, symptoms, pharma_data, additional_drugs)
                    
                    # STEP 3: Combine both sources
                    result = self._combine_analyses(pharma_data, ai_analysis, normalized_name)
                else:
                    # Fallback to AI-only analysis for multiple drugs
                    logger.warning("Encounter creation failed, using AI-only for multiple drugs")
                    pharma_data = self._default_safety_analysis(normalized_name)
                    ai_analysis = await self._get_gemini_analysis(normalized_name, gestational_week, symptoms, pharma_data, additional_drugs)
                    result = self._combine_analyses(pharma_data, ai_analysis, normalized_name)
            else:
                # Single drug - use AI analysis only (no need for PharmaVigilance)
                logger.info(f"Single drug analysis for {normalized_name} - using AI only")
                pharma_data = self._default_safety_analysis(normalized_name)
                ai_analysis = await self._get_gemini_analysis(normalized_name, gestational_week, symptoms, pharma_data)
                result = self._combine_analyses(pharma_data, ai_analysis, normalized_name)
            
            base_result = {
                "name": normalized_name,
                "risk_category": result.get("risk_category", "Unknown"),
                "message": result.get("message", "Analysis failed."),
                "alternatives": result.get("alternatives", []),
                "is_safe": result.get("is_safe", False),
                "additional_drugs": additional_drugs or [],
                "analysis_type": "multi-drug" if additional_drugs else "single-drug"
            }
            
            # 4. Enhanced Risk Scoring with Patient History
            if patient_id:
                try:
                    patient_profile = await risk_scoring_service.get_patient_risk_profile(patient_id)
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
            logger.error(f"PharmaVigilance API Error: {e}")
            return {
                "name": normalized_name,
                "risk_category": "Error",
                "message": "Unable to verify safety at this time. Consult a specialist.",
                "alternatives": [],
                "is_safe": False
            }
    
    async def _get_drug_interactions(self, patient_id: int, encounter_id: int, drug_name: str = "") -> Dict[str, Any]:
        """Get drug interactions directly from PharmaVigilance API"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.dorra_api_url}/v1/pharmavigilance/interactions",
                    headers=self.headers,
                    params={"search": str(patient_id)},
                    timeout=10.0
                )
                
                if response.status_code != 200:
                    logger.warning(f"PharmaVigilance API returned {response.status_code}")
                    return self._default_safety_analysis(drug_name)
                
                interactions_data = response.json()
                interactions = interactions_data.get("results", [])
                
                if not interactions:
                    return self._default_safety_analysis(drug_name)
                
                # Process the most recent interaction
                latest_interaction = interactions[0]
                return self._process_interaction_data(latest_interaction)
                
        except Exception as e:
            logger.error(f"PharmaVigilance API error: {e}")
            return self._default_safety_analysis(drug_name)
    
    async def _create_medication_encounter(self, patient_id: int, drug_name: str, gestational_week: int, symptoms: List[str], additional_drugs: Optional[List[str]] = None):
        """Create encounter with medication to trigger PharmaVigilance analysis"""
        if not patient_id:
            logger.warning("No patient_id provided for encounter creation")
            return None
            
        symptoms_str = ", ".join(symptoms) if symptoms else "None"
        drugs_str = f"{drug_name}"
        if additional_drugs:
            drugs_str += f" + {', '.join(additional_drugs)}"
            
        # Keep prompt under 1000 characters
        prompt = f"Drug safety: {drugs_str[:50]} at {gestational_week}w. Symptoms: {symptoms_str[:30]}"
        
        try:
            logger.info(f"Creating encounter for patient {patient_id}")
            result = await dorra_emr.create_ai_emr(patient_id, prompt)
            
            if result and (result.get("status") == True or result.get("status_code") == 201):
                encounter_id = result.get("id")
                logger.info(f"Successfully created encounter {encounter_id} for patient {patient_id}")
                return result
            else:
                logger.warning(f"Encounter creation failed for patient {patient_id}: {result}")
                return None
                
        except Exception as e:
            logger.error(f"Exception during encounter creation for patient {patient_id}: {str(e)}")
            return None
    
    def _default_safety_analysis(self, drug_name: str = "") -> Dict[str, Any]:
        """Default safety analysis when no interactions found"""
        drug_lower = drug_name.lower()
        
        if "paracetamol" in drug_lower or "acetaminophen" in drug_lower:
            return {
                "risk_category": "Safe",
                "message": "Paracetamol is considered safe throughout pregnancy at recommended doses for pain and fever relief.",
                "alternatives": [],
                "is_safe": True
            }
        elif "ibuprofen" in drug_lower:
            return {
                "risk_category": "Contraindicated",
                "message": "NSAIDs like Ibuprofen should be avoided in pregnancy, especially after 28 weeks, due to risk of ductus arteriosus closure.",
                "alternatives": ["Paracetamol"],
                "is_safe": False
            }
        elif "aspirin" in drug_lower:
            return {
                "risk_category": "Caution",
                "message": "Low-dose aspirin may be used under medical supervision. High doses should be avoided due to bleeding risks.",
                "alternatives": ["Paracetamol"],
                "is_safe": False
            }
        else:
            return {
                "risk_category": "Caution",
                "message": "No specific interaction data available. Consult healthcare provider before use during pregnancy.",
                "alternatives": [],
                "is_safe": False
            }

    def _process_interaction_data(self, interaction: Dict) -> Dict[str, Any]:
        """Process drug interaction data from PharmaVigilance API"""
        severity = interaction.get("severity", "Unknown")
        drug_a = interaction.get("drug_a", "Unknown")
        drug_b = interaction.get("drug_b", "")
        reason = interaction.get("reason", "")
        
        # Map severity to risk categories
        severity_mapping = {
            "Major": "Contraindicated",
            "Moderate": "High Risk", 
            "Minor": "Caution",
            "Unknown": "Caution"
        }
        
        risk_category = severity_mapping.get(severity, "Caution")
        is_safe = severity in ["Minor", "Unknown"]
        
        # Generate message based on severity for drug-drug interactions
        if severity == "Major":
            message = f"MAJOR DRUG INTERACTION: {drug_a} + {drug_b} poses serious risks during pregnancy. {reason} Immediate consultation required."
            alternatives = ["Consult specialist immediately", "Consider safer alternatives", "Use single drug therapy"]
        elif severity == "Moderate":
            message = f"MODERATE DRUG INTERACTION: {drug_a} + {drug_b} may require dosage adjustment or monitoring. {reason}"
            alternatives = ["Monitor closely", "Consider dose adjustment", "Stagger administration times"]
        else:
            message = f"MINOR INTERACTION: {drug_a} + {drug_b} has minor interactions. {reason} Continue with standard monitoring."
            alternatives = ["Standard monitoring"]
        
        return {
            "risk_category": risk_category,
            "message": message,
            "alternatives": alternatives,
            "is_safe": is_safe
        }

    async def _get_gemini_analysis(self, drug_name: str, gestational_week: int, symptoms: List[str], pharma_data: Dict, additional_drugs: Optional[List[str]] = None) -> Dict[str, Any]:
        """Get AI analysis from Gemini 2.5 Flash with PharmaVigilance context"""
        if not self.gemini_model:
            return {"ai_available": False}
        
        symptoms_str = ", ".join(symptoms) if symptoms else "None"
        
        if additional_drugs and len(additional_drugs) > 0:
            drugs_context = f"Primary drug: {drug_name}, Additional drugs: {', '.join(additional_drugs)}"
            prompt = f"""Analyze drug interaction safety for pregnant patient at {gestational_week} weeks.

{drugs_context}
Symptoms: {symptoms_str}

Focus on drug-drug interactions during pregnancy. Return JSON with: risk_category, message, alternatives, is_safe."""
        else:
            prompt = f"""Analyze {drug_name} safety at {gestational_week} weeks pregnancy. Symptoms: {symptoms_str}

Return JSON with: risk_category (Safe/Caution/High Risk/Contraindicated), message (2-3 sentences), alternatives (array), is_safe (boolean)."""
        
        try:
            response = self.gemini_model.generate_content(prompt)
            ai_result = json.loads(response.text.replace('```json', '').replace('```', '').strip())
            ai_result["ai_available"] = True
            return ai_result
        except Exception as e:
            logger.error(f"Gemini AI analysis failed: {e}")
            return {"ai_available": False}
    
    def _combine_analyses(self, pharma_data: Dict, ai_analysis: Dict, drug_name: str) -> Dict[str, Any]:
        """Combine PharmaVigilance and Gemini AI for ultimate safety assessment"""
        
        # Start with PharmaVigilance data as base
        base_risk = pharma_data.get("risk_category", "Unknown")
        base_safe = pharma_data.get("is_safe", False)
        base_message = pharma_data.get("message", "")
        base_alternatives = pharma_data.get("alternatives", [])
        
        # If AI analysis is available, enhance the assessment
        if ai_analysis.get("ai_available"):
            ai_risk = ai_analysis.get("risk_category", "Unknown")
            
            # Use the MORE RESTRICTIVE risk category for safety
            risk_hierarchy = {"Safe": 0, "Caution": 1, "High Risk": 2, "Contraindicated": 3}
            
            final_risk = base_risk
            if ai_risk in risk_hierarchy and base_risk in risk_hierarchy:
                if risk_hierarchy[ai_risk] > risk_hierarchy[base_risk]:
                    final_risk = ai_risk
            
            # Combine messages for comprehensive guidance
            combined_message = base_message
            if ai_analysis.get("message"):
                combined_message += f" AI ANALYSIS: {ai_analysis['message']}"
            
            # Enhanced alternatives from AI
            enhanced_alternatives = list(set(base_alternatives + ai_analysis.get("alternatives", [])))
            
            return {
                "risk_category": final_risk,
                "message": combined_message,
                "alternatives": enhanced_alternatives,
                "is_safe": final_risk == "Safe",
                "data_sources": "PharmaVigilance API + Gemini 2.5 Flash AI"
            }
        else:
            # Fallback to PharmaVigilance data only
            return {
                "risk_category": base_risk,
                "message": base_message,
                "alternatives": base_alternatives,
                "is_safe": base_safe,
                "data_sources": "PharmaVigilance API only"
            }

pharmavigilance_service = HybridSafetyService()
pharma_service = pharmavigilance_service  # Alias for backward compatibility