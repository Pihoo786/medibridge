from app.db.supabase import supabase


class ReportRepository:

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