from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import PredictionRequest, PredictionResponse
from .model import model_instance

app = FastAPI(
    title="ShieldAI Threat Detection API",
    description="Professional Spam Detection Microservice",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ShieldAI Model Service"}

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    try:
        result = model_instance.predict(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
