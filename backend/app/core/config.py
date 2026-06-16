# backend/app/core/config.py

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    GEMINI_API_KEY: str

    SUPABASE_URL: str
    SUPABASE_KEY: str

    TWILIO_ACCOUNT_SID: str
    TWILIO_AUTH_TOKEN: str
    TWILIO_WHATSAPP_NUMBER: str

    class Config:
        env_file = ".env"


settings = Settings()