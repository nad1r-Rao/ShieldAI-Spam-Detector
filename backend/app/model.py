import joblib
import os
import time
from .schemas import PredictionRequest, PredictionResponse, AnalysisData

class ModelLoader:
    _instance = None
    _model = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
            cls._instance.load_model()
        return cls._instance

    def load_model(self):
        model_path = "models/spam_detector.joblib"
        if os.path.exists(model_path):
            self._model = joblib.load(model_path)
            print(f"Model loaded from {model_path}")
        else:
            raise FileNotFoundError(f"Model not found at {model_path}")

    def predict(self, request: PredictionRequest) -> PredictionResponse:
        start_time = time.time()
        
        if not self._model:
            raise RuntimeError("Model is not loaded")

        # Get probability of class 1 (Spam)
        # model.predict_proba returns [[prob_0, prob_1]]
        probabilities = self._model.predict_proba([request.text])[0]
        spam_prob = probabilities[1]
        
        # Apply threshold
        threshold = request.threshold
        is_spam = spam_prob >= threshold
        
        label = "SPAM" if is_spam else "SAFE"
        
        # Simple keyword highlighting (mocking LIME/SHAP for now)
        # In a real scenario, we'd use LIME here.
        risk_keywords = ["free", "winner", "urgent", "money", "click", "prize", "congratulations"]
        found_keywords = [word for word in risk_keywords if word in request.text.lower()]
        
        risk_level = "CRITICAL" if spam_prob > 0.8 else ("HIGH" if spam_prob > 0.5 else "LOW")
        analysis_msg = "Contains high-risk keywords." if found_keywords else "No immediate threats detected."

        end_time = time.time()
        duration = f"{end_time - start_time:.4f}s"

        return PredictionResponse(
            prediction=label,
            probability=round(spam_prob, 4),
            threshold_used=threshold,
            is_above_threshold=is_spam,
            analysis=AnalysisData(
                risk_level=risk_level,
                message=analysis_msg,
                highlighted_words=found_keywords
            ),
            processing_time=duration
        )

model_instance = ModelLoader()
