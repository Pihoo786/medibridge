from fastapi import APIRouter, Form, BackgroundTasks
from twilio.twiml.messaging_response import MessagingResponse
from app.services.twilio_service import TwilioService
from fastapi import Response

router = APIRouter()

service = TwilioService()


@router.post("/twilio/webhook")
async def twilio_webhook(
    background_tasks: BackgroundTasks,
    Body: str = Form(""),
    From: str = Form(""),
    NumMedia: int = Form(0),
    MediaUrl0: str = Form(""),
    MediaContentType0: str = Form("")
):
    phone_number = From.replace("whatsapp:", "")
    if NumMedia > 0:

        background_tasks.add_task(
            service.process_lab_report_background,
            media_url=MediaUrl0,
            mime_type=MediaContentType0,
            phone_number=phone_number,
            source_url=MediaUrl0,
        )

        twiml = MessagingResponse()

        twiml.message(
            "📄 We've received your medical document.\n\n"
            "🩺 Our AI is analyzing it now.\n"
            "You'll receive the results in a few moments."
        )

        return Response(
            content=str(twiml),
            media_type="application/xml"
        )

    else:

        response = await service.handle_symptom_message(
            Body,
            phone_number,
        )

    twiml = MessagingResponse()

    findings = "\n".join(
        [
            f"• {item.name}: {item.value} ({item.status})"
            for item in response.key_findings
        ]
    )

    recommendations = "\n".join(
        [
            f"• {item}"
            for item in response.recommendations
        ]
    )

    message = f"""
    🩺 *MediBridge AI*

    📋 *Summary*
    {response.summary}

    💙 *Explanation*
    {response.patient_explanation}

    🔍 *Key Findings*
    {findings}

    🏡 *Recommendations*
    {recommendations}

    ⚠️ This is an AI-generated explanation and is not a substitute for professional medical advice.
    """
    print("Creating TwiML response")
    print(message)

    twiml.message(message.strip())

    return Response(
        content=str(twiml),
        media_type="application/xml"
    )