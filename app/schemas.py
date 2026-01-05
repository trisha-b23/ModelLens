from pydantic import BaseModel
from typing import Dict

class TrainRequest(BaseModel):
    model_type: str
    target_column: str

class PredictRequest(BaseModel):
    features: Dict[str, float]