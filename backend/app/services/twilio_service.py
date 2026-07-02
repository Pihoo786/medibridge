# backend/app/services/twilio_service.py

from app.repositories.report_repository import ReportRepository
from app.services.gemini_service import GeminiService
from app.core.security import secure_phone_number
from app.repositories.user_repository import UserRepository
from app.repositories.extracted_data_repository import ExtractedDataRepository

class TwilioService:

    def __init__(self):
        self.gemini = GeminiService()
        self.repository = ReportRepository()
        self.user_repository = UserRepository()
        self.extracted_repository = ExtractedDataRepository()

    async def handle_symptom_message(
        self,
        text: str
    ):

        response = await self.gemini.process_symptom_message(
            text
        )
        phone_number = "+911234567890"

        phone = secure_phone_number(
            phone_number
        )

        existing_user = await self.user_repository.get_by_phone_hash(
            phone["phone_hash"]
        )

        if existing_user.data:
            user_id = existing_user.data[0]["id"]
        else:
            created_user = await self.user_repository.create(phone)
            user_id = created_user.data[0]["id"]

        report = {
            "user_id": user_id,
            "category": response.category,
            "title": response.title,
            "summary": response.summary,
            "patient_explanation": response.patient_explanation,
            "doctor_notes": "",
            "input_type": "TEXT",
            "source_url": "",
            "status": "PROCESSED",
            "ai_model": "gemini-2.5-flash",
        }

        created_report = await self.repository.create(
            report
        )
        report_id = created_report.data[0]["id"]
        findings = []

        for finding in response.key_findings:
            findings.append(
                {
                    "report_id": report_id,
                    "field_name": finding.name,
                    "field_value": finding.value,
                    "status": finding.status,
                }
            )
        if findings:
            await self.extracted_repository.create_many(
                findings
            )

        return response

        