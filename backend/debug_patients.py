import asyncio
import os
import httpx
from dotenv import load_dotenv
import json

load_dotenv()

API_URL = os.getenv("DORRA_API_URL")
API_KEY = os.getenv("DORRA_API_KEY")

async def debug_patients():
    print(f"Debug: Listing patients from {API_URL}")
    
    headers = {
        "Authorization": f"Token {API_KEY}",
        "Content-Type": "application/json"
    }
    
    async with httpx.AsyncClient() as client:
        # List patients
        response = await client.get(f"{API_URL}/v1/patients", headers=headers)
        
        if response.status_code != 200:
            print(f"Error listing patients: {response.status_code}")
            print(response.text)
            return

        data = response.json()
        results = data.get("results", [])
        print(f"Found {len(results)} patients.")
        
        found = False
        for p in results:
            print(f"ID: {p.get('id')} - Name: {p.get('first_name')} {p.get('last_name')}")
            if str(p.get('id')) == "95":
                found = True
        
        if found:
            print("\n✅ Patient 95 found in list!")
        else:
            print("\n❌ Patient 95 NOT found in list.")

if __name__ == "__main__":
    asyncio.run(debug_patients())
