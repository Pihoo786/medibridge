from app.repositories.report_repository import ReportRepository
from app.repositories.extracted_data_repository import ExtractedDataRepository

extracted_repository = ExtractedDataRepository()
repository = ReportRepository()


async def get_reports():
    response = await repository.get_all()
    return response.data


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