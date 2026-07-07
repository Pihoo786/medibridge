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

    async def get_all(
        self
    ):
        return (
            supabase
            .table("reports")
            .select("*")
            .execute()
        )
    async def get_by_assigned_doctor(
        self,
        doctor_id: str
    ):
        return (
            supabase
            .table("reports")
            .select("id")
            .eq("assigned_doctor_id", doctor_id)
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