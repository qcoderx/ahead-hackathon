import asyncio
from dotenv import load_dotenv
import os

# Load env vars before importing service
load_dotenv()

from app.services.pharmavigilance import pharma_service

async def main():
    print("--- Verifying Gemini Integration ---")
    api_key = os.getenv("GEMINI_API_KEY")
    print(f"API Key present: {bool(api_key)}")
    
    if not api_key:
        print("ERROR: GEMINI_API_KEY not found in environment.")
        return

    print("\nChecking 'Ibuprofen' (Week 28)...")
    result = await pharma_service.check_medication("Ibuprofen", 28, ["Headache"])
    print(f"Result: {result}")
    
    if "is_safe" in result:
        print("\nSUCCESS: 'is_safe' key found in response.")
    else:
        print("\nFAILURE: 'is_safe' key MISSING.")

if __name__ == "__main__":
    asyncio.run(main())
