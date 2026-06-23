from pydantic import BaseModel, Field


class LabFinding(BaseModel):
    name: str = Field(..., min_length=1)
    value: str = Field(..., min_length=1)
    status: str = Field(..., min_length=1)


class LabReportResponse(BaseModel):
    category: str = Field(..., min_length=1)
    title: str = Field(..., min_length=1)
    summary: str = Field(..., min_length=1)
    patient_explanation: str = Field(..., min_length=1)

    key_findings: list[LabFinding] = Field(default_factory=list)
    recommendations: list[str] = Field(default_factory=list)