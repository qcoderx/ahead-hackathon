from fastapi import APIRouter
from pydantic import BaseModel
from typing import Any
from app.services.dorra_emr import dorra_emr

router = APIRouter()

class SimplePatientCreate(BaseModel):
    first_name: str
    last_name: str = ""
    gender: str  # "Male", "Female", "Other"
    phone_number: str = ""
    email: str = ""

@router.post("/create-patient")
async def test_create_patient(patient_data: SimplePatientCreate) -> Any:
    """
    TEST ENDPOINT: Create patient in Dorra EMR without authentication.
    This is for testing the Dorra API integration directly.
    """
    # Prepare data for Dorra API
    payload = {
        "first_name": patient_data.first_name,
        "gender": patient_data.gender,
    }
    
    if patient_data.last_name:
        payload["last_name"] = patient_data.last_name
    if patient_data.phone_number:
        payload["phone_number"] = patient_data.phone_number
    if patient_data.email:
        payload["email"] = patient_data.email
    
    # Call Dorra EMR API
    result = await dorra_emr.create_patient(payload)
    
    if not result:
        return {
            "status": False,
            "message": "Failed to create patient in Dorra EMR"
        }
    
    return {
        "status": True,
        "message": "Patient created successfully in Dorra EMR!",
        "patient_id": result.get("id"),
        "full_response": result
    }

@router.get("/get-patient/{patient_id}")
async def test_get_patient(patient_id: int) -> Any:
    """
    TEST ENDPOINT: Get patient from Dorra EMR without authentication.
    """
    result = await dorra_emr.get_patient(patient_id)
    
    if not result:
        return {
            "status": False,
            "message": f"Patient {patient_id} not found in Dorra EMR"
        }
    
    return {
        "status": True,
        "message": "Patient found!",
        "patient_data": result
    }
