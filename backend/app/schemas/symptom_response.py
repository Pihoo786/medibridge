from pydantic import BaseModel, Field
from app.schemas.symptom_response import SymptomResponse

class SymptomResponse(BaseModel):
    category: str = Field(..., min_length=1)
    title: str = Field(..., min_length=1)
    summary: str = Field(..., min_length=1)
    patient_explanation: str = Field(..., min_length=1)

    key_findings: list[str] = Field(default_factory=list)
    recommendations: list[str] = Field(default_factory=list)