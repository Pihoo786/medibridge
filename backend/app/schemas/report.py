from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class PatientInfo(BaseModel):
    id: str
    phone_last4: Optional[str] = None

class DoctorInfo(BaseModel):
    id: Optional[str] = None
    name: Optional[str] = None


class ReportResponse(BaseModel):

    id: str

    patient: PatientInfo

    doctor: Optional[DoctorInfo] = None

    category: str
    category_display: str

    title: str

    summary: str

    patient_explanation: str

    status: str
    status_display: str

    input_type: str

    ai_model: str

    created_at: datetime


class ReportListResponse(BaseModel):
    reports: List[ReportResponse]