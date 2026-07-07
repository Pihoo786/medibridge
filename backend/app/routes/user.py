from fastapi import APIRouter

from app.services.user_service import (
    get_doctor_patients
)
from app.services.user_service import (
    get_doctor_patients,
    get_patient,
)

router = APIRouter()


@router.get(
    "/doctors/{doctor_id}/patients"
)
async def fetch_doctor_patients(
    doctor_id: str
):
    patients = await get_doctor_patients(
        doctor_id
    )

    return {
        "patients": patients
    }

@router.get(
    "/patients/{patient_id}"
)
async def fetch_patient(
    patient_id: str
):
    patient = await get_patient(
        patient_id
    )

    return patient