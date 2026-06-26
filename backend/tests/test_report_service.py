from app.services.report_service import (
    get_reports,
    get_report_by_id,
    update_report
)


def test_get_reports():

    reports = get_reports()

    assert len(reports) > 0


def test_get_report_by_id():

    report = get_report_by_id(
        "report_001"
    )

    assert report is not None

    assert report["id"] == (
        "report_001"
    )


def test_update_report():

    updated_report = update_report(
        "report_001",
        {
            "title": (
                "Updated Blood Report"
            )
        }
    )

    assert updated_report is not None

    assert (
        updated_report["title"]
        ==
        "Updated Blood Report"
    )