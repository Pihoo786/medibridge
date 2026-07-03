from pydantic import BaseModel


class ExtractedDataResponse(BaseModel):

    id: str

    report_id: str

    field_name: str

    field_value: str

    status: str