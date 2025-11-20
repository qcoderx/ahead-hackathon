"""
Test script for Dorra EMR API integration
"""
import asyncio
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.services.dorra_emr import dorra_emr

async def test_api_connection():
    """Test basic API connectivity"""
    print("=" * 60)
    print("Testing Dorra EMR API Integration")
    print("=" * 60)
    
    # Test 1: Get non-existent patient (should return None)
    print("\n[Test 1] Testing API connection with non-existent patient...")
    result = await dorra_emr.get_patient(999999)
    if result is None:
        print("✓ API connection working - correctly returned None for non-existent patient")
    else:
        print(f"✗ Unexpected result: {result}")
    
    # Test 2: Try to get patient ID 1 (if exists)
    print("\n[Test 2] Testing patient retrieval with ID 1...")
    result = await dorra_emr.get_patient(1)
    if result:
        print(f"✓ Patient found: {result.get('first_name', 'N/A')} {result.get('last_name', 'N/A')}")
        print(f"  Patient ID: {result.get('id')}")
        print(f"  Email: {result.get('email')}")
        print(f"  Phone: {result.get('phone_number')}")
    else:
        print("✗ Patient ID 1 not found")
    
    # Test 3: Create a patient via AI
    print("\n[Test 3] Testing AI patient creation...")
    result = await dorra_emr.create_patient_ai(
        "Create a patient named Jane Doe, 28 years old, female, phone +234801234567"
    )
    if result:
        print(f"✓ Patient created successfully!")
        print(f"  Patient ID: {result.get('id')}")
        print(f"  Status: {result.get('status')}")
        newly_created_id = result.get('id')
        
        # Test 4: Retrieve the newly created patient
        if newly_created_id:
            print(f"\n[Test 4] Retrieving newly created patient {newly_created_id}...")
            patient = await dorra_emr.get_patient(newly_created_id)
            if patient:
                print(f"✓ Successfully retrieved: {patient.get('first_name')} {patient.get('last_name')}")
            else:
                print("✗ Could not retrieve newly created patient")
    else:
        print("✗ Patient creation failed")
    
    print("\n" + "=" * 60)
    print("Tests completed!")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(test_api_connection())
