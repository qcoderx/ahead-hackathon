from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from app.models.user import User
from app.schemas.medication import MedicationCheckRequest, MedicationCheckResponse
from app.services.dorra_emr import dorra_emr
from app.services.pharmavigilance import pharma_service
from app.core.logic import calculate_gestational_week

router = APIRouter()

@router.post("/check", response_model=MedicationCheckResponse)
async def check_medication(
    request: MedicationCheckRequest,
    current_user: User = Depends(deps.get_current_active_user)
):
    from app.core.cache import cache
    
    # 1. Determine Gestational Week
    gestational_week = 0
    
    # Priority 1: Manual Override (LMP)
    if request.override_lmp:
        try:
            lmp_date = date.fromisoformat(request.override_lmp)
            gestational_week = calculate_gestational_week(lmp_date)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid override_lmp format. Use YYYY-MM-DD")
            
    # Priority 2: Manual Gestational Week
    elif request.manual_gestational_week is not None:
        gestational_week = request.manual_gestational_week
        
    # Priority 3: Patient Data (with Caching)
    elif request.patient_id:
        try:
            patient_id_int = int(request.patient_id) if isinstance(request.patient_id, str) else request.patient_id
            
            # Check Cache First
            cached_preg = cache.get_pregnancy_status(patient_id_int)
            if cached_preg:
                gestational_week = cached_preg.get("gestational_week", 0)
            else:
                # Fetch from API
                patient = await dorra_emr.get_patient(patient_id_int)
                
                if patient:
                    # Try to extract LMP/Pregnancy data
                    # Note: Using DOB as placeholder in mock, real app would use specific field
                    lmp_str = patient.get("last_menstrual_period") 
                    
                    if lmp_str:
                        lmp_date = date.fromisoformat(lmp_str)
                        gestational_week = calculate_gestational_week(lmp_date)
                        
                        # Cache the result
                        cache.set_pregnancy_status(patient_id_int, {"gestational_week": gestational_week})
        except (ValueError, TypeError):
            pass
    
    # 2. Detect language if not specified
    language = request.language or "en"
    if language == "auto":
        from app.services.language import language_service
        language = language_service.detect_language(request.drug_name)
    
    # 3. Fetch Drug Safety Analysis from Gemini (AI) with Enhanced Features
    patient_id_int = None
    if request.patient_id:
        try:
            patient_id_int = int(request.patient_id) if isinstance(request.patient_id, str) else request.patient_id
        except ValueError:
            pass
    
    ai_analysis = await pharma_service.check_medication(
        drug_name=request.drug_name, 
        gestational_week=gestational_week,
        symptoms=request.symptoms,
        patient_id=patient_id_int,
        language=language,
        additional_drugs=getattr(request, 'additional_drugs', None)
    )
    
    # 4. Log Visit as Encounter in Dorra EMR
    if request.patient_id:
        try:
            patient_id_int = int(request.patient_id) if isinstance(request.patient_id, str) else request.patient_id
            
            # Construct a prompt that clearly indicates an Encounter
            prompt = (
                f"Create an encounter for patient {patient_id_int}. "
                f"Diagnosis: Medication Safety Check - {ai_analysis.get('name')}. "
                f"Symptoms: {', '.join(request.symptoms) if request.symptoms else 'None'}. "
                f"Note: Risk Category {ai_analysis.get('risk_category')}. "
                f"Result: {ai_analysis.get('message')}. "
                f"Alternatives: {', '.join(ai_analysis.get('alternatives', [])) or 'None'}."
            )
            
            # Fire and forget (awaiting to ensure log)
            await dorra_emr.create_ai_emr(patient_id_int, prompt)
            
        except Exception as e:
            print(f"Failed to log encounter to Dorra EMR: {e}")

    return MedicationCheckResponse(
        drug_name=ai_analysis.get("name"),
        additional_drugs=ai_analysis.get("additional_drugs", []),
        risk_category=ai_analysis.get("risk_category"),
        message=ai_analysis.get("message"),
        alternative_drug=", ".join(ai_analysis.get("alternatives", [])), # Schema expects string, join list
        is_safe=ai_analysis.get("is_safe", False),
        gestational_week=gestational_week,
        patient_id=request.patient_id,
        personalized_notes=ai_analysis.get("personalized_notes"),
        risk_score=ai_analysis.get("risk_score"),
        analysis_type=ai_analysis.get("analysis_type", "single-drug")
    )
