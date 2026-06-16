from fastapi import FastAPI

app = FastAPI(
    title="MediBridge AI",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "MediBridge AI Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }