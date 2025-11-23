from fastapi import APIRouter, Depends
from app.api import deps
from app.models.user import User

router = APIRouter()

@router.get("/analytics/overview")
async def get_analytics_overview(
    current_user: User = Depends(deps.get_current_active_superuser)
):
    return {
        "total_checks": 1250,
        "high_risk_alerts": 45,
        "active_providers": 12
    }

@router.get("/analytics/high-risk")
async def get_high_risk_cases(
    current_user: User = Depends(deps.get_current_active_superuser)
):
    return [
        {"drug": "Thalidomide", "count": 5, "risk": "Category X"},
        {"drug": "Warfarin", "count": 12, "risk": "Category X"},
    ]
