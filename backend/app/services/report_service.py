from datetime import datetime


reports = [
    {
        "report_id": "report_001",

        "category": "LAB_REPORT",

        "title": "Complete Blood Count",

        "summary": "Hemoglobin level is below normal.",

        "patient_explanation": (
            "Your hemoglobin level is lower than normal."
        ),

        "key_findings": [
            "Low hemoglobin"
        ],

        "recommendations": [
            "Consult a doctor"
        ],

        "created_at": datetime.now()
    }
]


def get_reports():

    return reports


def get_report_by_id(report_id: str):

    for report in reports:

        if report["report_id"] == report_id:

            return report

    return None


def update_report(
    report_id: str,
    updated_data: dict
):

    report = get_report_by_id(
        report_id
    )

    if report is None:

        return None

    report.update(updated_data)

    return report