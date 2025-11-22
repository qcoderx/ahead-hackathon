import os
from typing import List

class Settings:
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "MamaSafe")
    API_V1_STR: str = os.getenv("API_V1_STR", "/api/v1")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "changethis")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60 * 24 * 8))
    BACKEND_CORS_ORIGINS: List[str] = []
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost/mamasafe")
    
    # Dorra EMR API Configuration
    DORRA_API_URL: str = os.getenv("DORRA_API_URL", "https://hackathon-api.aheadafrica.org")
    DORRA_API_KEY: str = os.getenv("DORRA_API_KEY", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    BASE_URL: str = os.getenv("BASE_URL", "http://localhost:8000")

    # Twilio SMS Configuration
    TWILIO_ACCOUNT_SID: str = os.getenv("TWILIO_ACCOUNT_SID", "")
    TWILIO_AUTH_TOKEN: str = os.getenv("TWILIO_AUTH_TOKEN", "")
    TWILIO_PHONE_NUMBER: str = os.getenv("TWILIO_PHONE_NUMBER", "")
    
    # Termii SMS Configuration
    TERMII_API_KEY: str = os.getenv("TERMII_API_KEY", "")
    TERMII_SENDER_ID: str = os.getenv("TERMII_SENDER_ID", "N-Alert")

settings = Settings()
