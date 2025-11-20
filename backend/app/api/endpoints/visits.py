from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from app.models.user import User
from app.schemas.medication import VisitLogRequest
from app.services.dorra_emr import dorra_emr

router = APIRouter()

@router.post("/log")
async def log_visit(
    visit_data: VisitLogRequest,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Log a consultation summary back to the Dorra EMR.
    """
    success = await dorra_emr.log_visit(visit_data.dict())
    if not success:
        raise HTTPException(status_code=500, detail="Failed to log visit to EMR")
    return {"status": "success", "message": "Visit logged successfully"}
