from app.db.supabase import supabase


class ReportRepository:

<<<<<<< HEAD
    async def create(
        self,
        data: dict
    ):
        return (
            supabase
            .table("reports")
            .insert(data)
            .execute()
        )
=======
    return (
        supabase.table("reports")
        .insert(data)
        .execute()
    )
>>>>>>> 407d2ee (feat: implement repository layer and supabase integration)

    async def get_all(
        self
    ):
        return (
            supabase
            .table("reports")
            .select("*")
            .execute()
        )

    async def get_by_id(
        self,
        report_id: str
    ):
        return (
            supabase
            .table("reports")
            .select("*")
            .eq("id", report_id)
            .single()
            .execute()
        )

<<<<<<< HEAD
    async def update(
        self,
        report_id: str,
        data: dict
    ):
        return (
            supabase
            .table("reports")
            .update(data)
            .eq("id", report_id)
            .execute()
        )
=======
    return (
        supabase.table("reports")
        .select("*")
        .execute()
    )


def get_report_by_id(
    report_id: str
):

    return (
        supabase.table("reports")
        .select("*")
        .eq("id", report_id)
        .execute()
    )


def update_report(
    report_id: str,
    data: dict
):

    return (
        supabase.table("reports")
        .update(data)
        .eq("id", report_id)
        .execute()
    )
>>>>>>> 407d2ee (feat: implement repository layer and supabase integration)
