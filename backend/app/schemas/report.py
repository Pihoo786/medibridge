from datetime import datetime
from typing import List

from pydantic import BaseModel


class ReportResponse(BaseModel):

    id: str

    category: str

    title: str

    summary: str

    patient_explanation: str

    key_findings: List[str]

    recommendations: List[str]

    created_at: datetime


class ReportListResponse(BaseModel):

    reports: List[ReportResponse]