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
            .select("""
                id,
                category,
                title,
                summary,
                patient_explanation,
                status,
                input_type,
                ai_model,
                created_at,
                user:users!reports_user_id_fkey(
                    id,
                    phone_last4
                ),
                doctor:profiles!reports_assigned_doctor_id_fkey(
                    id,
                    full_name
                )
            """)
            .order("created_at", desc=True)
            .execute()
        )
    
    async def get_dashboard_reports(
        self
    ):
        return (
            supabase
            .table("reports")
            .select("""
                id,
                category,
                title,
                summary,
                patient_explanation,
                status,
                input_type,
                ai_model,
                created_at,
                user:users(
                    id,
                    phone_last4
                ),
                doctor:profiles(
                    id,
                    full_name
                )
            """)
            .order("created_at", desc=True)
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
    
    