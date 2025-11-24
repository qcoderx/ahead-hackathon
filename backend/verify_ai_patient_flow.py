import asyncio
import os
import httpx
from dotenv import load_dotenv
import json

load_dotenv()

API_URL = os.getenv("DORRA_API_URL")
API_KEY = os.getenv("DORRA_API_KEY")

async def verify_flow():
    headers = {
        "Authorization": f"Token {API_KEY}",
        "Content-Type": "application/json"
    }
    
    async with httpx.AsyncClient() as client:
        # 1. Create Patient via AI
        print("1. Creating Patient via AI...")
        prompt = "Create a patient named Test User. Gender: Male. DOB: 1990-01-01."
        
        response = await client.post(
            f"{API_URL}/v1/ai/patient",
            headers=headers,
            json={"prompt": prompt},
            timeout=30.0
        )
        
        if response.status_code != 201:
            print(f"❌ Failed to create patient: {response.status_code} - {response.text}")
            return

        data = response.json()
        patient_id = data.get("id")
        print(f"✅ Patient Created! ID: {patient_id}")
        print(f"Full Response: {data}")
        
        if not patient_id:
            print("❌ No ID returned!")
            return

        # 2. Retrieve Patient
        print(f"\n2. Retrieving Patient {patient_id}...")
        response = await client.get(
            f"{API_URL}/v1/patients/{patient_id}",
            headers=headers
        )
        
        if response.status_code == 200:
            print(f"✅ Successfully retrieved patient!")
            print(response.json())
        else:
            print(f"❌ Failed to retrieve patient: {response.status_code}")
            print(response.text)

if __name__ == "__main__":
    asyncio.run(verify_flow())
