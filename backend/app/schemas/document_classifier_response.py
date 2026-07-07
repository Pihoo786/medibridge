from pydantic import BaseModel


class DocumentClassifierResponse(BaseModel):
    category: str