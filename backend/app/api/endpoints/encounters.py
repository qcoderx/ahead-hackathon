from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from app.models.user import User
from app.schemas.encounter import EncounterUpdateRequest, EncounterUpdateResponse
from app.services.dorra_emr import dorra_emr

router = APIRouter()

@router.post("/update", response_model=EncounterUpdateResponse)
async def update_encounter(
    request: EncounterUpdateRequest,
    current_user: User = Depends(deps.get_current_active_user)
):
    """Update encounter with detailed medical information for AI risk scoring"""
    
    # Build comprehensive prompt for Dorra EMR
    prompt_parts = [f"Update medical record for patient {request.patient_id}."]
    
    if request.diagnosis:
        prompt_parts.append(f"Diagnosis: {request.diagnosis}.")
    
    if request.medications:
        prompt_parts.append(f"Current medications: {', '.join(request.medications)}.")
    
    if request.allergies:
        prompt_parts.append(f"Known allergies: {', '.join(request.allergies)}.")
    
    if request.chronic_conditions:
        prompt_parts.append(f"Chronic conditions: {', '.join(request.chronic_conditions)}.")
    
    if request.previous_complications:
        prompt_parts.append(f"Previous complications: {', '.join(request.previous_complications)}.")
    
    if request.vital_signs:
        vital_str = ", ".join([f"{k}: {v}" for k, v in request.vital_signs.items()])
        prompt_parts.append(f"Vital signs: {vital_str}.")
    
    if request.notes:
        prompt_parts.append(f"Additional notes: {request.notes}")
    
    prompt = " ".join(prompt_parts)
    
    try:
        result = await dorra_emr.create_ai_emr(request.patient_id, prompt)
        
        if result:
            return EncounterUpdateResponse(
                success=True,
                encounter_id=result.get("id"),
                message="Encounter updated successfully for AI risk scoring"
            )
        else:
            return EncounterUpdateResponse(
                success=False,
                message="Failed to update encounter"
            )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating encounter: {str(e)}")

@router.post("/create-test-data/{patient_id}")
async def create_test_encounter_data(
    patient_id: int,
    current_user: User = Depends(deps.get_current_active_user)
):
    """Create sample encounter data for testing AI risk scoring"""
    
    test_encounters = [
        {
            "prompt": f"Patient {patient_id} encounter: Diagnosis: Gestational hypertension. "
                     f"Medications: Methyldopa 250mg twice daily. "
                     f"Previous complications: Preeclampsia in previous pregnancy. "
                     f"Chronic conditions: Essential hypertension. "
                     f"Allergies: Penicillin. "
                     f"Vital signs: BP 150/95, HR 88. "
                     f"Notes: High-risk pregnancy, requires close monitoring."
        },
        {
            "prompt": f"Patient {patient_id} follow-up: Diagnosis: Gestational diabetes mellitus. "
                     f"Medications: Insulin aspart, Metformin. "
                     f"Previous complications: Macrosomia in previous pregnancy. "
                     f"Chronic conditions: Type 2 diabetes mellitus. "
                     f"Vital signs: Glucose 180mg/dl, BP 140/90. "
                     f"Notes: Poor glycemic control, dietary counseling provided."
        },
        {
            "prompt": f"Patient {patient_id} visit: Diagnosis: Iron deficiency anemia. "
                     f"Medications: Ferrous sulfate 325mg daily, Folic acid. "
                     f"Previous complications: Postpartum hemorrhage. "
                     f"Allergies: Sulfa drugs. "
                     f"Vital signs: Hgb 8.5g/dl, BP 110/70. "
                     f"Notes: Severe anemia, requires iron supplementation."
        }
    ]
    
    created_encounters = []
    
    for encounter_data in test_encounters:
        try:
            result = await dorra_emr.create_ai_emr(patient_id, encounter_data["prompt"])
            if result:
                created_encounters.append(result.get("id"))
        except Exception as e:
            continue
    
    return {
        "success": True,
        "message": f"Created {len(created_encounters)} test encounters",
        "encounter_ids": created_encounters
    }