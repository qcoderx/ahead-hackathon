#!/usr/bin/env python3
"""
Test script to verify the patient list endpoint works correctly.
"""
import asyncio
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

async def test_patient_list():
    """Test the patient list endpoint"""
    
    # First login to get token
    login_url = "https://ahead-hackathon.onrender.com/api/v1/auth/login"
    list_url = "https://ahead-hackathon.onrender.com/api/v1/patient/list"
    
    # Use test credentials
    username = os.getenv("TEST_USERNAME", "test@example.com")
    password = os.getenv("TEST_PASSWORD", "testpass123")
    
    async with httpx.AsyncClient() as client:
        # Login
        login_data = {
            "username": username,
            "password": password,
            "grant_type": "password"
        }
        
        print("Logging in...")
        login_response = await client.post(
            login_url,
            data=login_data,
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        
        if login_response.status_code != 200:
            print(f"Login failed: {login_response.status_code} - {login_response.text}")
            return
        
        token_data = login_response.json()
        token = token_data.get("access_token")
        
        if not token:
            print("No access token received")
            return
        
        print("Login successful, testing patient list...")
        
        # Test patient list
        headers = {"Authorization": f"Bearer {token}"}
        list_response = await client.get(list_url, headers=headers)
        
        print(f"Patient list response: {list_response.status_code}")
        if list_response.status_code == 200:
            patients = list_response.json()
            print(f"Found {len(patients)} patients")
            for patient in patients[:3]:  # Show first 3
                print(f"- {patient.get('full_name', 'N/A')} (ID: {patient.get('id')})")
        else:
            print(f"Error: {list_response.text}")

if __name__ == "__main__":
    asyncio.run(test_patient_list())