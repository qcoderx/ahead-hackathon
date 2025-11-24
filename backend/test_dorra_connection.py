import asyncio
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

API_URL = os.getenv("DORRA_API_URL")
API_KEY = os.getenv("DORRA_API_KEY")

async def test_connection():
    print(f"Testing connection to {API_URL}")
    print(f"API Key (first 5 chars): {API_KEY[:5] if API_KEY else 'None'}")
    
    headers = {
        "Authorization": f"Token {API_KEY}",
        "Content-Type": "application/json"
    }
    
    async with httpx.AsyncClient() as client:
        # Try to get a non-existent patient to check auth
        response = await client.get(f"{API_URL}/v1/patients/999999", headers=headers)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 401:
            print("❌ Authentication Failed!")
        elif response.status_code == 404:
            print("✅ Authentication Successful (Patient not found, but auth worked)")
        elif response.status_code == 200:
            print("✅ Authentication Successful")
        else:
            print(f"⚠️ Unexpected status: {response.status_code}")

if __name__ == "__main__":
    asyncio.run(test_connection())
