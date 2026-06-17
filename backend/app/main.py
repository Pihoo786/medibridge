from fastapi import FastAPI

from app.routes.health import router as health_router

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