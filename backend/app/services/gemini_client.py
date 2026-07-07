import json

import google.generativeai as genai

from app.core.config import settings


class GeminiClient:

    def __init__(self):
        genai.configure(
            api_key=settings.GEMINI_API_KEY
        )

        self.model = genai.GenerativeModel(
            "gemini-2.5-flash"
        )

    async def generate_text(
        self,
        prompt: str,
        text: str
    ) -> dict:

        response = self.model.generate_content(
            [
                prompt,
                text
            ]
        )

        cleaned_response = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(
            cleaned_response
        )

    async def generate_file(
        self,
        prompt: str,
        file_bytes: bytes,
        mime_type: str
    ) -> dict:

        response = self.model.generate_content(
            [
                prompt,
                {
                    "mime_type": mime_type,
                    "data": file_bytes
                }
            ]
        )

        cleaned_response = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(
            cleaned_response
        )