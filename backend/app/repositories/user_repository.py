from app.db.supabase import supabase


class UserRepository:

    async def create(
        self,
        data: dict
    ):
        return (
            supabase
            .table("users")
            .insert(data)
            .execute()
        )

    async def get_by_phone_hash(
        self,
        phone_hash: str
    ):
        return (
            supabase
            .table("users")
            .select("*")
            .eq("phone_hash", phone_hash)
            .execute()
        )

    async def get_by_id(
        self,
        user_id: str
    ):
        return (
            supabase
            .table("users")
            .select("*")
            .eq("id", user_id)
            .single()
            .execute()
        )
    async def get_doctors(
        self
    ):
        return (
            supabase
            .table("profiles")
            .select("id, full_name")
            .eq("role", "DOCTOR")
            .execute()
        )
    async def get_by_assigned_doctor(
        self,
        doctor_id: str
    ):
        return (
            supabase
            .table("users")
            .select("id, phone_last4, created_at, assigned_doctor_id")
            .eq("assigned_doctor_id", doctor_id)
            .order("created_at", desc=True)
            .execute()
        )
    async def update(
        self,
        user_id: str,
        data: dict
    ):
        return (
            supabase
            .table("users")
            .update(data)
            .eq("id", user_id)
            .execute()
        )
    
    async def get_all(
        self
    ):
        return (
            supabase
            .table("users")
            .select("""
                id,
                phone_last4,
                created_at,
                assigned_doctor_id,
                reports(
                    id,
                    category,
                    created_at
                )
            """)
            .order("created_at", desc=True)
            .execute()
        )