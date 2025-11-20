import google.generativeai as genai
from typing import Dict, Optional
from app.core.config import settings

class LanguageService:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
        else:
            self.model = None

    def detect_language(self, text: str) -> str:
        """Detect if text is in Yoruba, Igbo, Hausa, or English"""
        if not self.model:
            return "en"
        
        prompt = f"""Detect the language of this text: "{text}"
        
        Return only one of these codes:
        - "yo" for Yoruba
        - "ig" for Igbo  
        - "ha" for Hausa
        - "en" for English
        
        Return only the language code, nothing else."""
        
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip().lower()
        except:
            return "en"

    def translate_to_english(self, text: str, source_lang: str) -> str:
        """Translate from local language to English"""
        if source_lang == "en" or not self.model:
            return text
            
        lang_names = {"yo": "Yoruba", "ig": "Igbo", "ha": "Hausa"}
        lang_name = lang_names.get(source_lang, "the local language")
        
        prompt = f"""Translate this {lang_name} text to English: "{text}"
        
        Return only the English translation, nothing else."""
        
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except:
            return text

    def translate_from_english(self, text: str, target_lang: str) -> str:
        """Translate from English to local language"""
        if target_lang == "en" or not self.model:
            return text
            
        lang_names = {"yo": "Yoruba", "ig": "Igbo", "ha": "Hausa"}
        lang_name = lang_names.get(target_lang, "the local language")
        
        prompt = f"""Translate this English text to {lang_name}: "{text}"
        
        Return only the {lang_name} translation, nothing else."""
        
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except:
            return text

language_service = LanguageService()