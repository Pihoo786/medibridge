from fastapi import APIRouter, HTTPException

from app.schemas.report import (
    ReportListResponse,
    ReportResponse
)

from app.services.report_service import (
    get_reports,
    get_report_by_id,
    get_reports_by_user,
    get_report_details,
)

router = APIRouter()


@router.get(
    "/reports",
    response_model=ReportListResponse
)
async def fetch_reports():

    return {
        "reports": await get_reports()
    }

@router.get(
    "/reports/{report_id}",
    response_model=ReportResponse
)
async def fetch_report(report_id: str):

    report = await get_report_by_id(report_id)

    if report is None:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return report

@router.get(
    "/patients/{user_id}/history"
)
async def fetch_patient_history(
    user_id: str
):

    reports = await get_reports_by_user(
        user_id
    )

    return {
        "history": reports
    }


@router.get("/reports/{report_id}/details")
async def fetch_report_details(
    report_id: str
):
    details = await get_report_details(
        report_id
    )

    return details