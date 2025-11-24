from typing import Optional, List
from pydantic import BaseModel

class MedicationCheckRequest(BaseModel):
    drug_name: str
    additional_drugs: Optional[List[str]] = []  # For drug-drug interactions
    patient_id: Optional[str] = None
    manual_gestational_week: Optional[int] = None
    override_lmp: Optional[str] = None  # ISO format YYYY-MM-DD
    symptoms: Optional[List[str]] = []
    language: Optional[str] = "en"  # "en", "yo", "ig", "ha"

class MedicationCheckResponse(BaseModel):
    drug_name: str
    additional_drugs: Optional[List[str]] = []
    risk_category: str
    message: str
    alternative_drug: Optional[str] = None
    is_safe: bool = False
    gestational_week: Optional[int] = None
    patient_id: Optional[str] = None
    personalized_notes: Optional[str] = None
    risk_score: Optional[int] = None
    analysis_type: Optional[str] = "single-drug"  # "single-drug" or "multi-drug"

class VisitLogRequest(BaseModel):
    patient_id: str
    provider_id: int
    drug_checked: str
    risk_result: str
    notes: Optional[str] = None
