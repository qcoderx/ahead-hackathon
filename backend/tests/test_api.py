from fastapi.testclient import TestClient
from app.main import app
from app.api import deps
from app.models.user import User

client = TestClient(app)

# Mock User
mock_user = User(id=1, email="test@example.com", is_active=True, is_superuser=False, role="provider")
mock_superuser = User(id=2, email="admin@example.com", is_active=True, is_superuser=True, role="admin")

async def override_get_current_active_user():
    return mock_user

async def override_get_current_active_superuser():
    return mock_superuser

app.dependency_overrides[deps.get_current_active_user] = override_get_current_active_user
app.dependency_overrides[deps.get_current_active_superuser] = override_get_current_active_superuser

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to MamaSafe API"}

def test_check_medication_safe():
    response = client.post(
        "/api/v1/medications/check",
        json={"drug_name": "Paracetamol", "manual_gestational_week": 10}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["drug_name"] == "Paracetamol"
    assert data["risk_category"] == "SAFE"

def test_check_medication_danger():
    response = client.post(
        "/api/v1/medications/check",
        json={"drug_name": "Thalidomide", "manual_gestational_week": 10}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["risk_category"] == "DANGER"
    assert "contraindicated" in data["message"] or "teratogen" in data["message"]

def test_sms_webhook():
    # Test valid check
    response = client.post(
        "/api/v1/sms/webhook",
        json={"text": "CHECK Ibuprofen 12345", "from": "+1234567890"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "RISK:" in data["message"]

def test_admin_analytics():
    response = client.get("/api/v1/admin/analytics/overview")
    assert response.status_code == 200
    data = response.json()
    assert "total_checks" in data
