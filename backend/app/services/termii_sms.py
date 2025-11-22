import httpx
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class TermiiSMSService:
    def __init__(self):
        self.api_key = settings.TERMII_API_KEY
        self.sender_id = settings.TERMII_SENDER_ID
        self.base_url = "https://api.ng.termii.com/api"
    
    async def send_sms(self, to: str, message: str) -> bool:
        """Send SMS via Termii API"""
        if not self.api_key:
            logger.error("Termii API key not configured")
            return False
        
        url = f"{self.base_url}/sms/send"
        
        payload = {
            "to": to,
            "from": self.sender_id,
            "sms": message,
            "type": "plain",
            "api_key": self.api_key,
            "channel": "generic"
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(url, json=payload)
                result = response.json()
                
                if response.status_code == 200 and result.get("message") == "Successfully Sent":
                    logger.info(f"SMS sent successfully to {to}")
                    return True
                else:
                    logger.error(f"Failed to send SMS: {result}")
                    return False
                    
        except Exception as e:
            logger.error(f"Error sending SMS via Termii: {e}")
            return False

# Global instance
termii_service = TermiiSMSService()