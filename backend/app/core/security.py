from app.core.encryption import encrypt_data
from app.core.hashing import hash_phone


def secure_phone_number(phone_number: str):
    return {
        "phone_hash": hash_phone(phone_number),
        "phone_encrypted": encrypt_data(phone_number)
    }