from datetime import datetime


reports = [
    {
        "id": "report_001",
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

        if report["id"] == report_id:

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


def create_report(report_data: dict):

    new_report = {
        "id": (
            f"report_{len(reports)+1:03d}"
        ),

        "category": report_data[
            "category"
        ],

        "title": report_data[
            "title"
        ],

        "summary": report_data[
            "summary"
        ],

        "patient_explanation": (
            report_data[
                "patient_explanation"
            ]
        ),

        "key_findings": (
            report_data[
                "key_findings"
            ]
        ),

        "recommendations": (
            report_data[
                "recommendations"
            ]
        ),

        "created_at": (
            datetime.now()
        )
    }

    reports.append(
        new_report
    )

    return new_report