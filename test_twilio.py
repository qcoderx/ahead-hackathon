from twilio.rest import Client
import os

# Your Twilio credentials
account_sid = "ACd07b4a83c642f4189fa96b49f9550393"
auth_token = "03d86e4121314e88bb8db1b24a59f356"
twilio_number = "+15747666877"

# Initialize client
client = Client(account_sid, auth_token)

# Test sending SMS
try:
    message = client.messages.create(
        body="Test message from MamaSafe - SMS working!",
        from_=twilio_number,
        to="+18777804236"  # Replace with your phone number
    )
    print(f"Message sent successfully! SID: {message.sid}")
    print(f"Status: {message.status}")
except Exception as e:
    print(f"Error sending SMS: {e}")

# Check account info
try:
    account = client.api.accounts(account_sid).fetch()
    print(f"Account status: {account.status}")
    print(f"Account type: {account.type}")
except Exception as e:
    print(f"Error fetching account: {e}")

# List phone numbers
try:
    numbers = client.incoming_phone_numbers.list()
    for number in numbers:
        print(f"Number: {number.phone_number}, Status: {number.status}")
        print(f"SMS URL: {number.sms_url}")
        print(f"SMS Method: {number.sms_method}")
except Exception as e:
    print(f"Error listing numbers: {e}")