from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.base import Base

class AuditLog(Base):
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    provider_id = Column(Integer, index=True)
    patient_id = Column(String, index=True)
    drug_name = Column(String, index=True)
    risk_level = Column(String)
    override_reason = Column(String)
    action = Column(String) # "OVERRIDE", "STOP", "CONSULT"
