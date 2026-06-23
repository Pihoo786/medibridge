from pathlib import Path

from app.schemas.gemini_response import GeminiResponse
from app.schemas.symptom_response import SymptomResponse
from app.services.gemini_client import GeminiClient
from app.schemas.lab_report_response import LabReportResponse
from app.schemas.prescription_response import PrescriptionResponse

class GeminiService:
    def __init__(self):
        self.client = GeminiClient()

    async def process_lab_report(
        self,
        image_bytes: bytes
    ) -> LabReportResponse:

        prompt = self._load_prompt(
            "lab_report_prompt.txt"
        )

        response = await self.client.generate(
            prompt,
            image_bytes
        )

        return LabReportResponse(
            **response
        )

    async def process_prescription(
        self,
        image_bytes: bytes
    ) -> PrescriptionResponse:

        prompt = self._load_prompt(
            "prescription_prompt.txt"
        )

        response = await self.client.generate(
            prompt,
            image_bytes
        )

        return PrescriptionResponse(
            **response
        )

    async def process_symptom_message(
            self,
            text: str
        ) -> SymptomResponse:

            prompt = self._load_prompt(
                "symptom_prompt.txt"
            )

            response = await self.client.generate(
                prompt,
                text
            )

            return SymptomResponse(
                **response
            )

    def _load_prompt(
            self,
            filename: str
        ) -> str:

            prompt_path = (
                Path(__file__).parent.parent
                / "prompts"
                / filename
            )

            return prompt_path.read_text(
                encoding="utf-8"
            )