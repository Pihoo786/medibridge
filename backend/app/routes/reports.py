from fastapi import APIRouter, HTTPException

from app.schemas.report import (
    ReportListResponse,
    ReportResponse
)

from app.services.report_service import (
    get_reports,
    get_report_by_id
)

router = APIRouter()


@router.get(
    "/reports",
    response_model=ReportListResponse
)
def fetch_reports():

    return {
        "reports": get_reports()
    }


@router.get(
    "/reports/{report_id}",
    response_model=ReportResponse
)
def fetch_report(report_id: str):

    report = get_report_by_id(report_id)

    if report is None:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return report