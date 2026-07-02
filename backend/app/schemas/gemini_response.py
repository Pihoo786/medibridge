from pydantic import BaseModel, Field


class KeyFinding(BaseModel):
    name: str = Field(..., min_length=1)
    value: str = Field(..., min_length=1)
    status: str = Field(..., min_length=1)


class GeminiResponse(BaseModel):
    category: str = Field(..., min_length=1)
    title: str = Field(..., min_length=1)
    summary: str = Field(..., min_length=1)
    patient_explanation: str = Field(..., min_length=1)

    key_findings: list[KeyFinding] = []
    recommendations: list[str] = []