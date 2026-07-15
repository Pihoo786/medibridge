from pydantic import BaseModel, Field


class SymptomFinding(BaseModel):
    name: str
    value: str
    status: str


class SymptomResponse(BaseModel):
    category: str = Field(..., min_length=1)
    title: str = Field(..., min_length=1)
    summary: str = Field(..., min_length=1)
    patient_explanation: str = Field(..., min_length=1)

    key_findings: list[SymptomFinding] = Field(default_factory=list)
    recommendations: list[str] = Field(default_factory=list)

    triage_level: str
    triage_reason: str