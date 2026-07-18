from app.repositories.report_repository import ReportRepository
from app.repositories.extracted_data_repository import ExtractedDataRepository

extracted_repository = ExtractedDataRepository()
repository = ReportRepository()


async def get_reports():
    response = await repository.get_all()

    reports = []

    for report in response.data:

        reports.append({
            "id": report["id"],

            "patient": {
                "id": report["user"]["id"] if report["user"] else None,
                "phone_last4": report["user"]["phone_last4"] if report["user"] else None,
            },

            "doctor": (
                {
                    "id": report["doctor"]["id"],
                    "name": report["doctor"]["full_name"] or "Unknown Doctor",
                }
                if report["doctor"]
                else None
            ),

            "category": report["category"],
            "category_display": report["category"].replace("_", " ").title(),

            "title": report["title"],

            "summary": report["summary"],

            "patient_explanation": report["patient_explanation"],

            "status": report["status"],
            "status_display": report["status"].replace("_", " ").title(),
            "triage_level": report.get("triage_level"),
            "triage_reason": report.get("triage_reason"),

            "input_type": report["input_type"],

            "ai_model": report["ai_model"],

            "created_at": report["created_at"]
        })

    return reports


async def get_report_by_id(report_id: str):
    response = await repository.get_by_id(report_id)
    return response.data

async def get_reports_by_user(
    user_id: str
):
    response = await repository.get_by_user(
        user_id
    )

    return response.data

async def get_report_details(
    report_id: str
):
    report = await repository.get_by_id(
        report_id
    )

    findings = await extracted_repository.get_by_report(
        report_id
    )

    return {
        "report": report.data,
        "findings": findings.data
    }