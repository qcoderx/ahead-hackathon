from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api import deps
from app.core import security
from app.core.config import settings
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import Token
from app.services.dorra_emr import dorra_emr

router = APIRouter()

class PatientLogin(BaseModel):
    patient_id: str

class PatientCreate(BaseModel):
    first_name: str
    last_name: str = None
    date_of_birth: str = None  # ISO format: YYYY-MM-DD
    gender: str  # "Male", "Female", "Other"
    address: str = ""
    phone_number: str = ""
    email: str = ""
    allergies: list = []

class PatientCreateResponse(BaseModel):
    status: bool
    status_code: int
    message: str
    patient_id: int


@router.post("/login", response_model=Token)
async def patient_login(
    login_data: PatientLogin,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Patient login using Patient ID (verified against Dorra EMR).
    """
    # Convert patient_id to integer for Dorra API
    try:
        patient_id_int = int(login_data.patient_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Patient ID must be a number")
    
    # 1. Verify patient exists in Dorra EMR
    patient_data = await dorra_emr.get_patient(patient_id_int)
    if not patient_data:
        raise HTTPException(status_code=404, detail="Patient not found in EMR")
    
    # 2. Find or Create User in local DB
    # We use the patient_id as the email/username for simplicity in this MVP
    result = await db.execute(select(User).where(User.email == login_data.patient_id))
    user = result.scalars().first()
    
    if not user:
        # Extract name from Dorra API response
        full_name = patient_data.get("full_name") or f"{patient_data.get('first_name', '')} {patient_data.get('last_name', '')}".strip()
        user = User(
            email=login_data.patient_id,
            full_name=full_name or "Unknown",
            hashed_password=security.get_password_hash("patient"), # Default password
            role="patient",
            is_active=True
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
        
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.get("/me")
async def read_users_me(
    current_user: User = Depends(deps.get_current_active_user),
):
    """
    Get current patient profile.
    """
    if current_user.role != "patient":
         raise HTTPException(status_code=403, detail="Not a patient user")
         
    # Fetch full details from EMR
    # The email field stores the patient ID
    try:
        patient_id = int(current_user.email)
        patient_data = await dorra_emr.get_patient(patient_id)
        if not patient_data:
            raise HTTPException(status_code=404, detail="Patient data not found in EMR")
        return patient_data
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid patient ID format")

@router.post("/create", response_model=PatientCreateResponse)
async def create_patient(
    patient_data: PatientCreate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Create a new patient in Dorra EMR.
    Provider or admin can create patients.
    """
    # Only providers and admins can create patients
    if current_user.role not in ["provider", "admin"]:
        raise HTTPException(
            status_code=403, 
            detail="Only providers and admins can create patients"
        )
    
    # Prepare data for Dorra API
    patient_payload = {
        "first_name": patient_data.first_name,
        "gender": patient_data.gender,
    }
    
    # Add optional fields if provided
    if patient_data.last_name:
        patient_payload["last_name"] = patient_data.last_name
    if patient_data.date_of_birth:
        patient_payload["date_of_birth"] = patient_data.date_of_birth
    if patient_data.address:
        patient_payload["address"] = patient_data.address
    if patient_data.phone_number:
        patient_payload["phone_number"] = patient_data.phone_number
    if patient_data.email:
        patient_payload["email"] = patient_data.email
    if patient_data.allergies:
        patient_payload["allergies"] = patient_data.allergies
    
    # Call Dorra EMR API to create patient
    result = await dorra_emr.create_patient(patient_payload)
    
    if not result:
        raise HTTPException(
            status_code=500, 
            detail="Failed to create patient in Dorra EMR"
        )
    
    return PatientCreateResponse(
        status=result.get("status", True),
        status_code=result.get("status_code", 201),
        message=result.get("message", "Patient created successfully"),
        patient_id=result.get("id")
    )

class PatientInviteRequest(BaseModel):
    patient_id: str
    phone_number: str

@router.post("/invite")
async def invite_patient(
    invite_data: PatientInviteRequest,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Send an SMS invite to a patient with a login link.
    """
    from app.services.sms import sms_service
    
    # In a real app, this would be a dynamic link with a token
    # For MVP, we send the patient_id which is their login credential
    login_link = "https://mamasafe.app/login" 
    message = f"Welcome to MamaSafe! Your care provider has invited you. Login with your ID: {invite_data.patient_id} at {login_link}"
    
    try:
        # Send SMS
        sms_service.send_sms(invite_data.phone_number, message)
        return {"status": "success", "message": "Invite sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

