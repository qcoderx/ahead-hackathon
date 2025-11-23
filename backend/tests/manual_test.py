from fastapi.testclient import TestClient
from app.main import app
from app.api import deps
from app.models.user import User
import os

# Ensure environment variables are set for the test
os.environ["DATABASE_URL"] = "postgresql+asyncpg://postgres:password@localhost/mamasafe"

client = TestClient(app)

# Mock User
mock_user = User(id=1, email="test@example.com", is_active=True, is_superuser=False, role="provider")

async def override_get_current_active_user():
    return mock_user

app.dependency_overrides[deps.get_current_active_user] = override_get_current_active_user

def run_tests():
    print("Running manual tests...")
    
    # Test Root
    try:
        response = client.get("/")
        print(f"Root: {response.status_code} {response.json()}")
    except Exception as e:
        print(f"Root Failed: {e}")

    # Test Check Medication
    try:
        response = client.post(
            "/api/v1/medications/check",
            json={"drug_name": "Paracetamol", "manual_gestational_week": 10}
        )
        print(f"Check Med: {response.status_code} {response.json()}")
    except Exception as e:
        print(f"Check Med Failed: {e}")

    # Test Twilio SMS
    try:
        # Twilio sends data as Form Data
        response = client.post(
            "/api/v1/sms/webhook",
            data={"Body": "CHECK Ibuprofen 12345", "From": "+1234567890"}
        )
        print(f"SMS: {response.status_code}")
        print(f"SMS Content: {response.text}")
    except Exception as e:
        print(f"SMS Failed: {e}")

if __name__ == "__main__":
    run_tests()
