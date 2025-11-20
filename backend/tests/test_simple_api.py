"""
Simple test for Dorra EMR API integration
"""
import asyncio
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.services.dorra_emr import dorra_emr

async def simple_test():
    print("Testing Dorra EMR API Integration")
    print("-" * 50)
    
    # Test API connection
    print("\nTest 1: Get patient ID 999999 (should not exist)...")
    result = await dorra_emr.get_patient(999999)
    print(f"Result: {result}")
    
    # Test with ID 1
    print("\nTest 2: Get patient ID 1...")
    result = await dorra_emr.get_patient(1)
    if result:
        print(f"Found patient: {result.get('first_name')} {result.get('last_name')}")
    else:
        print("Patient not found")
    
    print("\n" + "-" * 50)
    print("Tests complete")

if __name__ == "__main__":
    asyncio.run(simple_test())
