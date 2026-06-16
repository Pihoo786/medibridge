from cryptography.fernet import Fernet

from app.core.config import settings

_cipher = Fernet(settings.ENCRYPTION_KEY.encode())


def encrypt_data(value: str) -> str:
    if not value:
        return value

    return _cipher.encrypt(
        value.encode()
    ).decode()


def decrypt_data(value: str) -> str:
    if not value:
        return value

    return _cipher.decrypt(
        value.encode()
    ).decode()