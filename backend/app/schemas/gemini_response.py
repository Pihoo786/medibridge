from pydantic import BaseModel, Field


class KeyFinding(BaseModel):
    name: str = Field(..., min_length=1)
    value: str = Field(..., min_length=1)
    status: str = Field(..., min_length=1)


class GeminiResponse(BaseModel):
    category: str
    title: str
    summary: str
    patient_explanation: str

    key_findings: list[KeyFinding] = []
    recommendations: list[str] = []

    triage_level: str | None = None
    triage_reason: str | None = None