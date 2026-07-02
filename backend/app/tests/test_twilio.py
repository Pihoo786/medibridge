import asyncio

from app.services.twilio_service import TwilioService


async def main():
    service = TwilioService()

    response = await service.handle_symptom_message(
        "I have had a headache and mild fever for 2 days."
    )

    print(response)


asyncio.run(main())