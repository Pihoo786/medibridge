from pydantic import BaseModel, Field


class Medicine(BaseModel):
    name: str = Field(..., min_length=1)
    value: str = Field(..., min_length=1)
    status: str = Field(..., min_length=1)


class PrescriptionResponse(BaseModel):
    category: str = Field(..., min_length=1)
    title: str = Field(..., min_length=1)
    summary: str = Field(..., min_length=1)
    patient_explanation: str = Field(..., min_length=1)

    key_findings: list[Medicine] = Field(default_factory=list)
    recommendations: list[str] = Field(default_factory=list)

    triage_level: str | None = None
    triage_reason: str | None = None