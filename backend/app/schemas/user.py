from datetime import datetime

from pydantic import BaseModel


class UserResponse(BaseModel):

    id: str

    phone_hash: str

    phone_encrypted: str

    created_at: datetime