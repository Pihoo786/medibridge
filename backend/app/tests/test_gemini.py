import asyncio

from app.services.gemini_service import GeminiService


async def main():
    service = GeminiService()

    response = await service.process_symptom_message(
        """
        I have had a headache and mild fever
        for two days.
        """
    )

    print(response)


asyncio.run(main())