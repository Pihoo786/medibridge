from app.repositories.user_repository import UserRepository
from app.repositories.report_repository import ReportRepository

user_repository = UserRepository()
report_repository = ReportRepository()


async def get_doctor_patients(
    doctor_id: str
):

    users = await user_repository.get_by_assigned_doctor(
        doctor_id
    )

    patients = []

    for user in users.data:

        report_count = await report_repository.count_by_user(
            user["id"]
        )

        latest_report = await report_repository.get_latest_by_user(
            user["id"]
        )

        latest = (
            latest_report.data[0]
            if latest_report.data
            else None
        )

        patients.append(
            {
                "id": user["id"],
                "phone": f"+91******{user['phone_last4']}",
                "assigned_at": user["created_at"],
                "report_count": report_count.count,
                "last_report_at": (
                    latest["created_at"]
                    if latest
                    else None
                ),
                "latest_report_category": (
                    latest["category"]
                    if latest
                    else None
                ),
            }
        )

    return patients
async def get_patient(
    user_id: str
):
    user = await user_repository.get_by_id(
        user_id
    )

    reports = await report_repository.count_by_user(
        user_id
    )

    data = user.data

    data["total_reports"] = reports.count

    return data