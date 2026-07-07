from app.repositories.report_repository import ReportRepository

repository = ReportRepository()


async def get_reports():
    response = await repository.get_all()
    return response.data


async def get_report_by_id(report_id: str):
    response = await repository.get_by_id(report_id)
    return response.data