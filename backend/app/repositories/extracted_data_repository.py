from app.db.supabase import supabase


class ExtractedDataRepository:

<<<<<<< HEAD
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
=======
    return (
        supabase.table("extracted_data")
        .insert(data)
        .execute()
    )
>>>>>>> 407d2ee (feat: implement repository layer and supabase integration)

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

<<<<<<< HEAD
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
=======
def get_extracted_data_by_report(
    report_id: str
):

    return (
        supabase.table("extracted_data")
        .select("*")
        .eq("report_id", report_id)
        .execute()
    )


def update_extracted_data(
    extracted_data_id: str,
    data: dict
):

    return (
        supabase.table("extracted_data")
        .update(data)
        .eq("id", extracted_data_id)
        .execute()
    )
>>>>>>> 407d2ee (feat: implement repository layer and supabase integration)
