import asyncio
import logging
from sqlalchemy import select
from app.db.session import engine, SessionLocal
from app.db.base import Base
from app.models.user import User
from app.core.security import get_password_hash

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def init_db():
    async with engine.begin() as conn:
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)
    
    async with SessionLocal() as db:
        # Check if user exists
        result = await db.execute(select(User).where(User.email == "admin@example.com"))
        user = result.scalars().first()
        
        if not user:
            user = User(
                email="admin@example.com",
                full_name="Admin User",
                hashed_password=get_password_hash("password"),
                role="admin",
                is_active=True,
                is_superuser=True
            )
            db.add(user)
            await db.commit()
            logger.info("Default admin user created.")
        else:
            logger.info("Admin user already exists.")

if __name__ == "__main__":
    asyncio.run(init_db())
