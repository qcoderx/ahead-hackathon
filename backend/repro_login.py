import asyncio
import httpx
import traceback

async def test_login():
    url = "http://127.0.0.1:8001/api/v1/patient/login"
    payload = {"patient_id": "97"}
    
    async with httpx.AsyncClient() as client:
        try:
            print(f"Connecting to {url}...")
            response = await client.post(url, json=payload)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
        except Exception:
            traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_login())
