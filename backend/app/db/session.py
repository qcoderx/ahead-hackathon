from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.core.config import settings

# Use asyncpg driver for PostgreSQL with proper connection pooling
database_url = str(settings.DATABASE_URL)
if database_url.startswith("postgresql://"):
    database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)

# Create engine with connection pool settings to prevent connection errors
engine = create_async_engine(
    database_url,
    echo=False,
    future=True,
    pool_pre_ping=True,  # Verify connections before using them
    pool_size=5,  # Number of connections to maintain in the pool
    max_overflow=10,  # Maximum extra connections to create
    pool_recycle=3600,  # Recycle connections after 1 hour
    pool_timeout=30,  # Wait 30 seconds for a connection
    connect_args={
        "server_settings": {
            "application_name": "mamasafe_backend"
        },
        "timeout": 60,  # Connection timeout in seconds
        "command_timeout": 60,  # Command timeout in seconds
    }
)

SessionLocal = async_sessionmaker(
    engine, 
    class_=AsyncSession, 
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

async def get_db():
    async with SessionLocal() as session:
        yield session
