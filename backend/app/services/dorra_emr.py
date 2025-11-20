import httpx
import logging
from typing import Optional, Dict, Any
from app.core.config import settings

logger = logging.getLogger(__name__)

class DorraEMRService:
    def __init__(self):
        self.base_url = settings.DORRA_API_URL
        self.api_key = settings.DORRA_API_KEY
        self.headers = {
            "Authorization": f"Token {self.api_key}",
            "Content-Type": "application/json"
        }
    
    async def get_patient(self, patient_id: int) -> Optional[Dict[str, Any]]:
        """
        Retrieve patient data from Dorra EMR.
        GET /v1/patients/{id}
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/v1/patients/{patient_id}",
                    headers=self.headers,
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    logger.info(f"Successfully retrieved patient {patient_id}")
                    return response.json()
                elif response.status_code == 404:
                    logger.warning(f"Patient {patient_id} not found")
                    return None
                else:
                    logger.error(f"Error retrieving patient {patient_id}: {response.status_code} - {response.text}")
                    return None
                    
        except httpx.HTTPError as e:
            logger.error(f"HTTP error retrieving patient {patient_id}: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error retrieving patient {patient_id}: {str(e)}")
            return None
    
    async def create_patient(self, patient_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Create a new patient in Dorra EMR.
        POST /v1/patients/create
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/v1/patients/create",
                    headers=self.headers,
                    json=patient_data,
                    timeout=10.0
                )
                
                if response.status_code == 201:
                    result = response.json()
                    logger.info(f"Successfully created patient, ID: {result.get('id')}")
                    return result
                else:
                    logger.error(f"Error creating patient: {response.status_code} - {response.text}")
                    return None
                    
        except httpx.HTTPError as e:
            logger.error(f"HTTP error creating patient: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error creating patient: {str(e)}")
            return None
    
    async def create_patient_ai(self, prompt: str) -> Optional[Dict[str, Any]]:
        """
        Create a patient using AI prompt.
        POST /v1/ai/patient
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/v1/ai/patient",
                    headers=self.headers,
                    json={"prompt": prompt},
                    timeout=15.0
                )
                
                if response.status_code == 201:
                    result = response.json()
                    logger.info(f"Successfully created patient via AI, ID: {result.get('id')}")
                    return result
                else:
                    logger.error(f"Error creating patient via AI: {response.status_code} - {response.text}")
                    return None
                    
        except httpx.HTTPError as e:
            logger.error(f"HTTP error creating patient via AI: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error creating patient via AI: {str(e)}")
            return None
    
    async def create_ai_emr(self, patient_id: int, prompt: str) -> Optional[Dict[str, Any]]:
        """
        Create medical records (encounter/appointment) using AI.
        POST /v1/ai/emr
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/v1/ai/emr",
                    headers=self.headers,
                    json={"patient": patient_id, "prompt": prompt},
                    timeout=15.0
                )
                
                if response.status_code == 201:
                    result = response.json()
                    logger.info(f"Successfully created EMR record for patient {patient_id}: {result.get('resource')}")
                    return result
                else:
                    logger.error(f"Error creating AI EMR: {response.status_code} - {response.text}")
                    return None
                    
        except httpx.HTTPError as e:
            logger.error(f"HTTP error creating AI EMR: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error creating AI EMR: {str(e)}")
            return None
    
    async def update_patient(self, patient_id: int, patient_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Update patient data in Dorra EMR.
        PATCH /v1/patients/{id}
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.patch(
                    f"{self.base_url}/v1/patients/{patient_id}",
                    headers=self.headers,
                    json=patient_data,
                    timeout=10.0
                )
                
                if response.status_code == 201:
                    result = response.json()
                    logger.info(f"Successfully updated patient {patient_id}")
                    return result
                else:
                    logger.error(f"Error updating patient {patient_id}: {response.status_code} - {response.text}")
                    return None
                    
        except httpx.HTTPError as e:
            logger.error(f"HTTP error updating patient {patient_id}: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error updating patient {patient_id}: {str(e)}")
            return None

    async def get_patient_encounters(self, patient_id: int) -> Optional[list]:
        """
        Get patient encounters for risk assessment.
        GET /v1/encounters?patient_id={patient_id}
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/v1/encounters",
                    headers=self.headers,
                    params={"search": str(patient_id)},
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    result = response.json()
                    encounters = result.get("results", [])
                    logger.info(f"Retrieved {len(encounters)} encounters for patient {patient_id}")
                    return encounters
                else:
                    logger.error(f"Error retrieving encounters: {response.status_code} - {response.text}")
                    return []
                    
        except Exception as e:
            logger.error(f"Error retrieving encounters for patient {patient_id}: {str(e)}")
            return []

    async def log_visit(self, visit_data: Dict[str, Any]) -> bool:
        """
        Log a visit using AI EMR endpoint.
        Uses the AI EMR endpoint to create encounter or appointment records.
        """
        patient_id = visit_data.get("patient_id")
        prompt = visit_data.get("prompt") or f"Visit for medication check: {visit_data.get('medication', 'N/A')}"
        
        if not patient_id:
            logger.error("Patient ID required for logging visit")
            return False
        
        result = await self.create_ai_emr(patient_id, prompt)
        return result is not None

dorra_emr = DorraEMRService()

