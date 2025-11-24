from fastapi import APIRouter
from app.api.endpoints import auth, medications, visits, sms, admin, patient, audit, encounters, webhook

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(medications.router, prefix="/medications", tags=["medications"])
api_router.include_router(visits.router, prefix="/visits", tags=["visits"])
api_router.include_router(sms.router, prefix="/sms", tags=["sms"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(patient.router, prefix="/patient", tags=["patient"])
api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
api_router.include_router(encounters.router, prefix="/encounters", tags=["encounters"])
api_router.include_router(webhook.router, prefix="/webhook", tags=["webhook"])
