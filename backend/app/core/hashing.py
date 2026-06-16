import hashlib


def hash_phone(phone_number: str) -> str:
    return hashlib.sha256(
        phone_number.encode()
    ).hexdigest()