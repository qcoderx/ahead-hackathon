from fastapi import APIRouter, HTTPException, Request, Form, Response
from pydantic import BaseModel
from typing import Optional
from app.services.dorra_emr import dorra_emr
from app.services.pharmavigilance import pharma_service
from app.services.language import language_service
from app.core.logic import calculate_gestational_week
from app.core.config import settings
from datetime import date, datetime
import logging
import re
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client

class SMSTestRequest(BaseModel):
    Body: str
    From: str
    To: Optional[str] = None
    MessageSid: Optional[str] = None

router = APIRouter()
logger = logging.getLogger(__name__)

# Initialize Twilio client
twilio_client = None
if settings.TWILIO_ACCOUNT_SID and settings.TWILIO_AUTH_TOKEN:
    twilio_client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

def send_sms(to: str, message: str) -> bool:
    """Send SMS using Twilio"""
    if not twilio_client:
        logger.error("Twilio client not initialized")
        return False

    try:
        message = twilio_client.messages.create(
            body=message,
            from_=settings.TWILIO_PHONE_NUMBER,
            to=to
        )
        logger.info(f"SMS sent to {to}: {message.sid}")
        return True
    except Exception as e:
        logger.error(f"Failed to send SMS to {to}: {e}")
        return False

def parse_command(text: str) -> tuple:
    """Parse SMS command and return (command, args)"""
    parts = text.strip().upper().split()
    if not parts:
        return ("HELP", [])

    command = parts[0]
    args = parts[1:]
    return (command, args)

def format_risk_response(risk_data: dict, language: str = "en") -> str:
    """Format risk assessment response with emojis"""
    risk = risk_data.get("risk_category", "Unknown")
    message = risk_data.get("message", "")
    alternatives = risk_data.get("alternatives", [])

    # Translate if needed
    if language != "en":
        message = language_service.translate_from_english(message, language)
        alternatives = [language_service.translate_from_english(alt, language) for alt in alternatives]

    emoji_map = {
        "Safe": "✅ SAFE",
        "Caution": "⚠️ CAUTION",
        "High Risk": "🚨 HIGH RISK",
        "Contraindicated": "❌ CONTRAINDICATED"
    }

    response = f"{emoji_map.get(risk, '❓ UNKNOWN')}: {message}"
    if alternatives:
        response += f" Alt: {', '.join(alternatives)}"

    return response[:160]  # SMS limit

@router.get("/test")
async def test_sms():
    """Test endpoint to verify SMS service is running"""
    return {"status": "SMS service active", "twilio_configured": twilio_client is not None}

@router.post("/test-json")
async def test_sms_json(sms_data: SMSTestRequest):
    """Test SMS webhook with JSON body for easier Postman testing"""
    logger.info(f"JSON SMS test from {sms_data.From}: {sms_data.Body}")
    
    command, args = parse_command(sms_data.Body)
    
    if command == "HELP":
        response_text = "MamaSafe SMS Test - HELP command received successfully!"
    else:
        response_text = f"Test received: {sms_data.Body} from {sms_data.From}"
    
    return {
        "status": "success",
        "received_body": sms_data.Body,
        "received_from": sms_data.From,
        "command": command,
        "args": args,
        "response": response_text
    }

@router.post("/webhook")
async def sms_webhook(request: Request):
    """
    Comprehensive SMS webhook handling all MamaSafe commands
    """
    try:
        form_data = await request.form()
        logger.info(f"Webhook received - Form data: {dict(form_data)}")
        print(f"DEBUG: All form data: {dict(form_data)}")
        
        text = form_data.get("Body", "").strip()
        from_number = form_data.get("From", "").strip()
        
        if not text or not from_number:
            logger.error(f"Missing required fields - Body: {text}, From: {from_number}")
            resp = MessagingResponse()
            resp.message("Error: Missing message data")
            return Response(
                content=str(resp), 
                media_type="application/xml",
                headers={"Access-Control-Allow-Origin": "*"}
            )
        
        logger.info(f"SMS from {from_number}: {text}")
        print(f"DEBUG: SMS from {from_number}: {text}")
    except Exception as e:
        logger.error(f"Error parsing form data: {e}")
        resp = MessagingResponse()
        resp.message("Service error. Try again.")
        return Response(
            content=str(resp), 
            media_type="application/xml",
            headers={"Access-Control-Allow-Origin": "*"}
        )

    resp = MessagingResponse()

    # Detect language
    detected_lang = language_service.detect_language(text)

    # Parse command
    command, args = parse_command(text)

    try:
        if command == "REG":
            # Provider Registration: REG [Name] [Location] [License]
            if len(args) < 3:
                resp.message("Invalid format. Use: REG [Name] [Location] [License]")
            else:
                name = " ".join(args[:-2])
                location = args[-2]
                license_num = args[-1]

                # TODO: Store provider registration
                provider_id = f"P{hash(from_number) % 1000:03d}"  # Simple ID generation

                response = f"Welcome to MamaSafe! Registration successful! Your ID: {provider_id}. Text HELP for commands."
                resp.message(response)

        elif command == "PATIENT":
            # Patient Registration: PATIENT [Name] [Age] [Weeks] [Phone]
            if len(args) < 4:
                resp.message("Invalid format. Use: PATIENT [Name] [Age] [Weeks] [Phone]")
            else:
                full_name = " ".join(args[:-3])
                age = args[-3]
                weeks = args[-2]
                phone = args[-1]

                # Split name into first and last
                name_parts = full_name.split()
                first_name = name_parts[0] if name_parts else "Patient"
                last_name = " ".join(name_parts[1:]) if len(name_parts) > 1 else "Unknown"

                # Create patient via Dorra EMR
                patient_data = {
                    "first_name": first_name,
                    "last_name": last_name,
                    "age": int(age),
                    "phone": phone,
                    "gestational_weeks": int(weeks.replace("weeks", ""))
                }

                result = await dorra_emr.create_patient(patient_data)
                if result:
                    patient_id = result.get("id")
                    response = f"Patient registered! ID: {patient_id}. SMS sent to patient."
                    resp.message(response)

                    # Send welcome SMS to patient
                    welcome_msg = f"Welcome to MamaSafe! You're registered for pregnancy care. Your ID: {patient_id}. Reply HELP for options."
                    send_sms(phone, welcome_msg)
                else:
                    resp.message("Patient registration failed. Please try again.")

        elif command in ["CHECK", "MULTI"]:
            # Medication Check: CHECK [PatientID] [Drug] [Symptoms] or MULTI [PatientID] [Drug1+Drug2] [Symptoms]
            if len(args) < 2:
                resp.message("Invalid format. Use: CHECK [PatientID] [Drug] [Symptoms]")
            else:
                patient_id = args[0]
                drug_part = args[1]
                symptoms = " ".join(args[2:]) if len(args) > 2 else ""

                # Parse drugs (handle + for multi-drug)
                drugs = drug_part.split("+") if "+" in drug_part else [drug_part]
                additional_drugs = drugs[1:] if len(drugs) > 1 else None

                # Get patient gestational week
                gestational_week = 0
                patient = await dorra_emr.get_patient(int(patient_id))
                if patient and patient.get("lmp"):
                    lmp_date = date.fromisoformat(patient["lmp"])
                    gestational_week = calculate_gestational_week(lmp_date)

                # Check medication safety
                result = await pharma_service.check_medication(
                    drugs[0], gestational_week, [symptoms] if symptoms else None,
                    int(patient_id), detected_lang, additional_drugs
                )

                response = format_risk_response(result, detected_lang)
                resp.message(response)

        elif command == "DRUG":
            # Patient Self-Check: DRUG [Medication] [Symptoms]
            if len(args) < 1:
                resp.message("Invalid format. Use: DRUG [Medication] [Symptoms]")
            else:
                drug = args[0]
                symptoms = " ".join(args[1:]) if len(args) > 1 else ""

                # Assume current pregnancy week (would need to store patient context)
                gestational_week = 24  # Default, should be retrieved from patient data

                result = await pharma_service.check_medication(drug, gestational_week, [symptoms] if symptoms else None, language=detected_lang)

                response = format_risk_response(result, detected_lang)
                resp.message(response)

        elif command == "APPT":
            # Appointment: APPT [PatientID] [Date] [Time] [Type]
            if len(args) < 3:
                resp.message("Invalid format. Use: APPT [PatientID] [Date] [Time] [Type]")
            else:
                patient_id = args[0]
                appt_date = args[1]
                appt_time = args[2]
                appt_type = " ".join(args[3:]) if len(args) > 3 else "checkup"

                # Create appointment via AI EMR
                prompt = f"Schedule appointment for {appt_type} on {appt_date} at {appt_time}"
                result = await dorra_emr.create_ai_emr(int(patient_id), prompt)

                if result:
                    response = f"Appointment created for patient {patient_id} on {appt_date} at {appt_time}"
                    resp.message(response)

                    # Notify patient
                    patient = await dorra_emr.get_patient(int(patient_id))
                    if patient and patient.get("phone"):
                        patient_msg = f"Appointment: {appt_date} at {appt_time} for {appt_type}. Reply CONFIRM or RESCHEDULE"
                        send_sms(patient.get("phone"), patient_msg)
                else:
                    resp.message("Appointment creation failed.")

        elif command == "HISTORY":
            # Patient History: HISTORY [PatientID]
            if len(args) < 1:
                resp.message("Invalid format. Use: HISTORY [PatientID]")
            else:
                patient_id = args[0]
                encounters = await dorra_emr.get_patient_encounters(int(patient_id))

                if encounters:
                    history = "\n".join([f"{e.get('date')}: {e.get('notes', 'N/A')}" for e in encounters[:5]])
                    response = f"Recent history for patient {patient_id}:\n{history}"
                else:
                    response = f"No history found for patient {patient_id}"

                resp.message(response[:160])

        elif command == "ALERT":
            # Send Alert: ALERT [PatientID] [Message]
            if len(args) < 2:
                resp.message("Invalid format. Use: ALERT [PatientID] [Message]")
            else:
                patient_id = args[0]
                alert_msg = " ".join(args[1:])

                patient = await dorra_emr.get_patient(int(patient_id))
                if patient and patient.get("phone"):
                    send_sms(patient.get("phone"), f"ALERT: {alert_msg}")
                    resp.message(f"Alert sent to patient {patient_id}")
                else:
                    resp.message("Patient not found or no phone number")

        elif command == "EMERGENCY":
            # Emergency: EMERGENCY [Symptoms]
            symptoms = " ".join(args) if args else "unspecified"
            response = f"🚨 EMERGENCY ALERT sent. Help is on the way. Symptoms: {symptoms}. Call emergency line if needed."
            resp.message(response)

            # TODO: Escalate to emergency contacts/providers

        elif command == "HELP":
            help_text = """📱 MamaSafe SMS Commands:

🏥 PROVIDER:
REG Dr.John Lagos LIC123 - Register as healthcare provider

👶 PATIENT:
PATIENT Mary 25 30weeks +234xxx - Register pregnant patient

💊 MEDICATION SAFETY:
DRUG Paracetamol headache - Check if drug is safe during pregnancy
CHECK 123 Aspirin fever - Check drug for specific patient
MULTI 123 Aspirin+Paracetamol - Check multiple drugs

🚨 EMERGENCY:
EMERGENCY severe bleeding - Send emergency alert

📋 MANAGEMENT:
APPT 123 2024-01-15 10:00 - Schedule appointment
HISTORY 123 - View patient history
ALERT 123 Take medication - Send patient alert

Try: DRUG Paracetamol headache"""
            resp.message(help_text)

        else:
            # For testing - echo back the message
            resp.message(f"Received: {text}. Unknown command. Text HELP for available commands.")
            logger.info(f"Unknown command processed: {command}")
            print(f"DEBUG: Unknown command: {command}, args: {args}")

    except Exception as e:
        logger.error(f"SMS processing error: {e}")
        resp.message("Service temporarily unavailable. Try again later.")

    return Response(
        content=str(resp), 
        media_type="application/xml",
        headers={"Access-Control-Allow-Origin": "*"}
    )
