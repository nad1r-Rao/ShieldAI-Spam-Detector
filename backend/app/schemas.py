from pydantic import BaseModel, Field
from typing import Optional, Dict

class PredictionRequest(BaseModel):
    text: str = Field(..., description="The message content to analyze")
    type: str = Field("email", description="Type of message: 'email' or 'sms'")
    threshold: Optional[float] = Field(0.5, ge=0.0, le=1.0, description="Custom sensitivity threshold")

class AnalysisData(BaseModel):
    risk_level: str
    message: str
    highlighted_words: list[str] = []

class PredictionResponse(BaseModel):
    prediction: str
    probability: float
    threshold_used: float
    is_above_threshold: bool
    analysis: AnalysisData
    processing_time: str
