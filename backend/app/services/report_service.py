from datetime import datetime


def get_reports():

    return [
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


def get_report_by_id(report_id: str):

    reports = get_reports()

    for report in reports:

        if report["report_id"] == report_id:

            return report

    return None