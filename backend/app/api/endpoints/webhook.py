from fastapi import APIRouter, Request, HTTPException
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Store webhook events for processing
webhook_events = []

@router.post("/pharmavigilance")
async def receive_pharmavigilance_webhook(request: Request):
    """Receive PharmaVigilance webhook events"""
    try:
        payload = await request.json()
        
        logger.info(f"Received PharmaVigilance webhook: {payload}")
        
        # Store event for processing
        webhook_events.append(payload)
        
        # Process the event
        event_type = payload.get("event")
        severity = payload.get("severity")
        details = payload.get("details")
        resource_id = payload.get("resource_id")
        
        if event_type == "DrugInteraction":
            logger.warning(f"Drug interaction detected - Severity: {severity}, Resource ID: {resource_id}")
            logger.info(f"Details: {details}")
        
        return {"status": "received", "message": "Webhook processed successfully"}
        
    except Exception as e:
        logger.error(f"Webhook processing error: {e}")
        raise HTTPException(status_code=500, detail="Webhook processing failed")

@router.get("/events")
async def get_webhook_events():
    """Get recent webhook events for debugging"""
    return {"events": webhook_events[-10:]}  # Return last 10 events