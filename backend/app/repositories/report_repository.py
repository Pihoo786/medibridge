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
    async def get_by_user(
        self,
        user_id: str
    ):
        return (
            supabase
            .table("reports")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
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
    
    async def get_latest_by_user(
        self,
        user_id: str
    ):
        return (
            supabase
            .table("reports")
            .select("category, created_at")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .limit(1)
            .execute()
        )
    
    async def count_by_user(
        self,
        user_id: str
    ):
        return (
            supabase
            .table("reports")
            .select(
                "id",
                count="exact"
            )
            .eq("user_id", user_id)
            .execute()
        )