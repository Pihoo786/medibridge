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

    async def get_by_report(
        self,
        report_id: str
    ):
        return (
            supabase
            .table("extracted_data")
            .select("*")
            .eq("report_id", report_id)
            .execute()
        )

    async def update(
        self,
        extracted_data_id: str,
        data: dict
    ):
        return (
            supabase
            .table("extracted_data")
            .update(data)
            .eq("id", extracted_data_id)
            .execute()
        )