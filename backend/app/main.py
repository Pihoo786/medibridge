from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.twilio import router as twilio_router
from app.routes.health import router as health_router
from app.routes.reports import router as reports_router
from app.routes.user import router as user_router

app = FastAPI(
    title="MediBridge AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "MediBridge AI Backend Running"
    }

app.include_router(health_router)
app.include_router(reports_router)
app.include_router(user_router)
app.include_router(twilio_router)