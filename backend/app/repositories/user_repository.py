from app.db.supabase import supabase


class UserRepository:

<<<<<<< HEAD
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
=======
    return (
        supabase.table("users")
        .insert(data)
        .execute()
    )
>>>>>>> 407d2ee (feat: implement repository layer and supabase integration)

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

<<<<<<< HEAD
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
=======
    return (
        supabase.table("users")
        .select("*")
        .eq("phone_hash", phone_hash)
        .execute()
    )


def get_user_by_id(
    user_id: str
):

    return (
        supabase.table("users")
        .select("*")
        .eq("id", user_id)
        .execute()
    )


def update_user(
    user_id: str,
    data: dict
):

    return (
        supabase.table("users")
        .update(data)
        .eq("id", user_id)
        .execute()
    )
>>>>>>> 407d2ee (feat: implement repository layer and supabase integration)
