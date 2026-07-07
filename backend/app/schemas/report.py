from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class ReportResponse(BaseModel):

    id: str

    category: str

    title: str

    summary: str

    patient_explanation: str

    doctor_notes: str

    input_type: str

    source_url: str

    status: str

    ai_model: str

    assigned_doctor_id: Optional[str] = None

    created_at: datetime


class ReportListResponse(BaseModel):

    reports: List[ReportResponse]