from typing import Optional, List
from pydantic import BaseModel

class EncounterUpdateRequest(BaseModel):
    patient_id: int
    diagnosis: Optional[str] = None
    medications: Optional[List[str]] = []
    allergies: Optional[List[str]] = []
    chronic_conditions: Optional[List[str]] = []
    previous_complications: Optional[List[str]] = []
    notes: Optional[str] = None
    vital_signs: Optional[dict] = {}

class EncounterUpdateResponse(BaseModel):
    success: bool
    encounter_id: Optional[int] = None
    message: str