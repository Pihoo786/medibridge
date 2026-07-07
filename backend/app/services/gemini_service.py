from pathlib import Path

from app.schemas.gemini_response import GeminiResponse
from app.schemas.symptom_response import SymptomResponse
from app.services.gemini_client import GeminiClient
from app.schemas.lab_report_response import LabReportResponse
from app.schemas.prescription_response import PrescriptionResponse
from app.schemas.document_classifier_response import DocumentClassifierResponse

class GeminiService:
    def __init__(self):
        self.client = GeminiClient()

    async def classify_document(
        self,
        file_bytes: bytes,
        mime_type: str
    ) -> DocumentClassifierResponse:

        prompt = self._load_prompt(
            "document_classifier_prompt.txt"
        )

        response = await self.client.generate_file(
            prompt,
            file_bytes,
            mime_type
        )
        return DocumentClassifierResponse(
            **response
        )
    async def process_lab_report(
        self,
        file_bytes: bytes,
        mime_type: str
    ) -> LabReportResponse:

        prompt = self._load_prompt(
            "lab_report_prompt.txt"
        )

        response = await self.client.generate_file(
            prompt,
            file_bytes,
            mime_type
        )

        return LabReportResponse(
            **response
        )

    async def process_prescription(
        self,
        file_bytes: bytes,
        mime_type: str
    ) -> PrescriptionResponse:

        prompt = self._load_prompt(
            "prescription_prompt.txt"
        )

        response = await self.client.generate_file(
            prompt,
            file_bytes,
            mime_type
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

            response = await self.client.generate_text(
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