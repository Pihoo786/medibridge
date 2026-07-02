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