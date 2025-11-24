import asyncio
import os
import httpx
from dotenv import load_dotenv
import json

load_dotenv()

API_URL = os.getenv("DORRA_API_URL")
API_KEY = os.getenv("DORRA_API_KEY")

async def create_standard():
    headers = {
        "Authorization": f"Token {API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "first_name": "Manual",
        "last_name": "Test",
        "gender": "Male",
        "date_of_birth": "1990-01-01",
        "address": "123 Test St",
        "phone_number": "+1234567890",
        "email": "manual.test@example.com"
    }
    
    async with httpx.AsyncClient() as client:
        print("1. Creating Patient (Standard)...")
        response = await client.post(
            f"{API_URL}/v1/patients/create",
            headers=headers,
            json=payload
        )
        
        if response.status_code != 201:
            print(f"❌ Failed to create: {response.status_code}")
            print(response.text)
            return

        data = response.json()
        patient_id = data.get("id")
        print(f"✅ Patient Created! ID: {patient_id}")
        
        # 2. Retrieve
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
    asyncio.run(create_standard())
