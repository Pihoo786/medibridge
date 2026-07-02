from app.db.supabase import supabase


class ExtractedDataRepository:

    async def create_many(
        self,
        data: list[dict]
    ):

        return (
            supabase
            .table("extracted_data")
            .insert(data)
            .execute()
        )