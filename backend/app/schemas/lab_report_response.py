from pydantic import BaseModel, Field


class LabFinding(BaseModel):
    name: str = Field(..., min_length=1)
    value: str = Field(..., min_length=1)
    status: str = Field(..., min_length=1)

class LabReportResponse(BaseModel):
    category: str
    title: str
    summary: str
    patient_explanation: str

    key_findings: list[LabFinding]
    recommendations: list[str]

    triage_level: str
    triage_reason: str