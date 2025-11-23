from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from app.core.config import settings
import re

# Ensure we use psycopg2 dialect explicitly
database_url = str(settings.DATABASE_URL)
# Remove any existing dialect specification
database_url = re.sub(r'postgresql\+\w+://', 'postgresql://', database_url)
# Force psycopg2 dialect
database_url = database_url.replace("postgresql://", "postgresql+psycopg2://")

engine = create_engine(database_url, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
