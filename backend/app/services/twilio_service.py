# backend/app/services/twilio_service.py
import httpx

from app.core.config import settings
from app.repositories.report_repository import ReportRepository
from app.services.gemini_service import GeminiService
from app.core.security import secure_phone_number
from app.repositories.user_repository import UserRepository
from app.repositories.extracted_data_repository import ExtractedDataRepository
from twilio.rest import Client
from app.core.config import settings

class TwilioService:

    def __init__(self):
        self.gemini = GeminiService()
        self.repository = ReportRepository()
        self.user_repository = UserRepository()
        self.extracted_repository = ExtractedDataRepository()


    async def _download_twilio_media(
        self,
        media_url: str
    ) -> bytes:

        async with httpx.AsyncClient(follow_redirects=True) as client:

            response = await client.get(
                media_url,
                auth=(
                    settings.TWILIO_ACCOUNT_SID,
                    settings.TWILIO_AUTH_TOKEN
                )
            )
            print("Downloaded", len(response.content), "bytes")
            response.raise_for_status()

            return response.content
    async def download_media(
        self,
        media_url: str
    ) -> bytes:
        return await self._download_twilio_media(media_url)
    
    async def send_whatsapp_message(
        self,
        phone_number: str,
        message: str,
    ):
        client = Client(
            settings.TWILIO_ACCOUNT_SID,
            settings.TWILIO_AUTH_TOKEN,
        )

        message_obj = client.messages.create(
            from_=f"whatsapp:{settings.TWILIO_WHATSAPP_NUMBER}",
            to=f"whatsapp:{phone_number}",
            body=message,
        )

        print("Twilio SID:", message_obj.sid)
        print("Twilio Status:", message_obj.status)

    async def process_lab_report_background(
        self,
        media_url: str,
        mime_type: str,
        phone_number: str,
        source_url: str = "",
    ):
        try:

            # Download media
            file_bytes = await self.download_media(
                media_url
            )

            # Existing processing
            response = await self.handle_lab_report(
                file_bytes=file_bytes,
                mime_type=mime_type,
                phone_number=phone_number,
                source_url=source_url,
            )

            normal = sum(
                1
                for item in response.key_findings
                if item.status.upper() == "NORMAL"
            )

            abnormal = len(response.key_findings) - normal

            overview_message = f"""
            🩺 *MediBridge AI*

            📊 *Report Overview*

            ✅ Normal Findings: {normal}

            🔴 Abnormal Findings: {abnormal}

            Your detailed analysis is coming next...
            """

            summary_message = f"""
            📋 *Summary*

            {response.summary}

            💙 *Explanation*

            {response.patient_explanation}
            """
            finding_messages = []

            current_message = "🔍 *Key Findings*\n\n"

            for item in response.key_findings:

                emoji = "🟢"

                if item.status.upper() != "NORMAL":
                    emoji = "🔴"

                finding_text = (
                    f"{emoji} {item.name}\n"
                    f"Value: {item.value}\n"
                    f"Status: {item.status}\n\n"
                )

                # Leave some safety margin below Twilio's 1600-char limit
                if len(current_message) + len(finding_text) > 1400:

                    finding_messages.append(
                        current_message.strip()
                    )

                    current_message = "🔍 *Key Findings (Continued)*\n\n"

                current_message += finding_text

            if current_message.strip():

                finding_messages.append(
                    current_message.strip()
                )

            recommendation_message = "🏡 *Recommendations*\n\n"

            for item in response.recommendations:

                recommendation_message += f"• {item}\n"

            recommendation_message += (
                "\n\n⚠️ This explanation is AI-generated."
                "\nPlease consult a qualified doctor."
            ) 

            await self.send_whatsapp_message(
                phone_number,
                overview_message.strip()
            )

            await self.send_whatsapp_message(
                phone_number,
                summary_message.strip()
            )

            for message in finding_messages:

                await self.send_whatsapp_message(
                    phone_number,
                    message
                )

            await self.send_whatsapp_message(
                phone_number,
                recommendation_message.strip()
            )

        except Exception as e:

            print("Background processing failed:", e)

            await self.send_whatsapp_message(
                phone_number=phone_number,
                message=(
                    "❌ Sorry, we couldn't process your medical document.\n\n"
                    "Please try sending a clearer image or PDF."
                ),
            )
    async def _assign_doctor(
        self
    ):
        doctors = await self.user_repository.get_doctors()

        selected_doctor_id = None
        lowest_workload = float("inf")

        for doctor in doctors.data:

            assigned_reports = await self.repository.get_by_assigned_doctor(
                doctor["id"]
            )

            workload = len(assigned_reports.data)

            if workload < lowest_workload:
                lowest_workload = workload
                selected_doctor_id = doctor["id"]

        return selected_doctor_id
    async def _get_or_create_user(
        self,
        phone_number: str
    ):
        phone = secure_phone_number(
            phone_number
        )
        phone["phone_last4"] = phone_number[-4:]
        existing_user = await self.user_repository.get_by_phone_hash(
            phone["phone_hash"]
        )

        if existing_user.data:

            user = existing_user.data[0]

            return (
                user["id"],
                user["assigned_doctor_id"]
            )

        assigned_doctor_id = await self._assign_doctor()

        phone["assigned_doctor_id"] = assigned_doctor_id

        created_user = await self.user_repository.create(
            phone
        )

        user = created_user.data[0]

        return (
            user["id"],
            assigned_doctor_id
        )
    async def _save_report(
        self,
        user_id: str,
        assigned_doctor_id: str,
        response,
        input_type: str,
        source_url: str = ""
    ):


        report = {
            "user_id": user_id,
            "category": response.category,
            "title": response.title,
            "summary": response.summary,
            "patient_explanation": response.patient_explanation,
            "doctor_notes": "",
            "input_type": input_type,
            "source_url": source_url,
            "status": "PROCESSED",
            "ai_model": "gemini-2.5-flash",
            "assigned_doctor_id": assigned_doctor_id,
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

        return created_report

    async def handle_symptom_message(
        self,
        text: str,
        phone_number: str
    ):

        response = await self.gemini.process_symptom_message(
            text
        )
        user_id, assigned_doctor_id = await self._get_or_create_user(
            phone_number
        )
        await self._save_report(
                    user_id=user_id,
                    assigned_doctor_id=assigned_doctor_id,
                    response=response,
                    input_type="TEXT"
                )

        return response

    async def handle_lab_report(
        self,
        file_bytes: bytes,
        mime_type: str,
        phone_number: str,
        source_url: str = ""
    ):

        classification = await self.gemini.classify_document(
            file_bytes,
            mime_type
        )

        category = (
            classification.category
            .strip()
            .upper()
            .replace(" ", "_")
        )

        if category == "LAB_REPORT":

            response = await self.gemini.process_lab_report(
                file_bytes,
                mime_type
            )

        elif category == "PRESCRIPTION":

            response = await self.gemini.process_prescription(
                file_bytes,
                mime_type
            )

        else:

            raise ValueError(
                f"Unsupported document category: {classification.category}"
            )
        user_id, assigned_doctor_id = await self._get_or_create_user(
            phone_number
        )

        await self._save_report(
            user_id=user_id,
            assigned_doctor_id=assigned_doctor_id,
            response=response,
            input_type="IMAGE",
            source_url=source_url,
        )

        return response