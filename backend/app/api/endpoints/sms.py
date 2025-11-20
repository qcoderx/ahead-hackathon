from fastapi import APIRouter, HTTPException, Request, Form, Response
from app.services.dorra_emr import dorra_emr
from app.services.pharmavigilance import pharma_service
from app.core.logic import calculate_gestational_week
from datetime import date
from twilio.twiml.messaging_response import MessagingResponse

router = APIRouter()

@router.post("/webhook")
async def sms_webhook(
    Body: str = Form(...),
    From: str = Form(...)
):
    """
    Parses incoming Twilio webhook (Form Data).
    Expected format: CHECK <DrugName> <PatientID>
    """
    text = Body.strip()
    parts = text.split()
    
    resp = MessagingResponse()
    
    if not parts or parts[0].upper() != "CHECK":
        resp.message("Invalid command. Use CHECK <DrugName> <PatientID>")
        return Response(content=str(resp), media_type="application/xml")
    
    if len(parts) < 3:
        resp.message("Missing arguments. Use CHECK <DrugName> <PatientID>")
        return Response(content=str(resp), media_type="application/xml")
    
    # Handle multi-word drug names (e.g., Folic Acid)
    # Assumes last part is PatientID, everything in between is DrugName
    patient_id = parts[-1]
    drug_name = " ".join(parts[1:-1])
    
    # Logic similar to medication check
    gestational_week = 0
    patient = await dorra_emr.get_patient(patient_id)
    if patient and patient.get("lmp"):
        lmp_date = date.fromisoformat(patient["lmp"])
        gestational_week = calculate_gestational_week(lmp_date)
    
    # Use Gemini Safety Service
    ai_analysis = await pharma_service.check_medication(drug_name, gestational_week)
    
    response_text = f"RISK: {ai_analysis.get('risk_category')}. {ai_analysis.get('message')}"
    alternatives = ai_analysis.get('alternatives', [])
    if alternatives:
        response_text += f" Alt: {', '.join(alternatives)}"
        
    resp.message(response_text)
    return Response(content=str(resp), media_type="application/xml")
