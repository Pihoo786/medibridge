from fastapi import FastAPI

from app.routes.health import router as health_router
from app.routes.reports import router as reports_router

app = FastAPI(
    title="MediBridge AI",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "MediBridge AI Backend Running"
    }


app.include_router(health_router)
app.include_router(reports_router)