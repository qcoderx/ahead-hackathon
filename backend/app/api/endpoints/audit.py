from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.api import deps
from app.db.session import get_db
from app.models.audit import AuditLog
from app.models.user import User
from pydantic import BaseModel

router = APIRouter()

class AuditLogCreate(BaseModel):
    patient_id: str
    drug_name: str
    risk_level: str
    override_reason: str
    action: str = "OVERRIDE"

@router.post("/log")
async def log_override(
    log_data: AuditLogCreate,
    current_user: User = Depends(deps.get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Log a safety override or critical action.
    """
    audit_entry = AuditLog(
        provider_id=current_user.id,
        patient_id=log_data.patient_id,
        drug_name=log_data.drug_name,
        risk_level=log_data.risk_level,
        override_reason=log_data.override_reason,
        action=log_data.action
    )
    
    db.add(audit_entry)
    await db.commit()
    
    return {"status": "success", "message": "Audit log recorded"}
