"""
Create database tables
"""
import asyncio
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

from sqlalchemy.ext.asyncio import create_async_engine
from app.core.config import settings
from app.db.base import Base
# Import all models so they're registered with Base
from app.models.user import User
from app.models.audit import AuditLog

async def create_tables():
    print(f"Creating tables in database:  {settings.DATABASE_URL[:50]}...")
   
    engine = create_async_engine(str(settings.DATABASE_URL), future=True)
    
    async with engine.begin() as conn:
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)
    
    print("✅ Database tables created successfully!")
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(create_tables())
