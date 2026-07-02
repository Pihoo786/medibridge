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

    async def generate(
        self,
        prompt: str,
        content
    ) -> dict:

        response = self.model.generate_content(
            [
                prompt,
                content
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