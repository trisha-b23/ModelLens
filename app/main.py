from fastapi import FastAPI
from fastapi import UploadFile, File
import pandas as pd
from app.schemas import TrainRequest
from app.ml.train import get_model
from fastapi import HTTPException
from app.ml.evaluate import compute_mse
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import PredictRequest
from sklearn.base import RegressorMixin, ClassifierMixin

app = FastAPI(title="ModelLens")

uploaded_df = None
trained_model = None
trained_model_type = None
model_mse = None

origins = [
    "http://localhost:5173", "https://model-lens-one.vercel.app" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ModelLens backend running"}

@app.post("/upload")
def upload_csv(file: UploadFile = File(...)):
    global uploaded_df
    uploaded_df = pd.read_csv(file.file)

    return {
        "columns": uploaded_df.columns.tolist(),
        "rows": len(uploaded_df)
    }

@app.get("/dataset-info")
def dataset_info():
    if uploaded_df is None:
        return {"message": "No dataset uploaded yet"}

    return {
        "columns": uploaded_df.columns.tolist(),
        "rows": len(uploaded_df)
    }

@app.post("/train")
def train_model(request: TrainRequest):
    global trained_model, trained_model_type

    if uploaded_df is None:
        raise HTTPException(status_code=400, detail="No dataset uploaded")

    if request.target_column not in uploaded_df.columns:
        raise HTTPException(status_code=400, detail="Invalid target column")

    X = uploaded_df.drop(columns=[request.target_column])
    y = uploaded_df[request.target_column]

    model = get_model(request.model_type, y)  # Pass target
    model.fit(X, y)

    mse = compute_mse(model, X, y)
    global model_mse
    model_mse = mse

    trained_model = model
    trained_model_type = request.model_type

    return {
        "message": "Model trained successfully",
        "mse": mse
    }

@app.get("/metrics")
def get_metrics():
    if model_mse is None:
        return {"message": "No model trained yet"}
    return {"mse": model_mse}

from sklearn.base import RegressorMixin, ClassifierMixin

@app.post("/predict")
def predict(request: PredictRequest):
    if trained_model is None:
        return {"error": "Model not trained yet"}

    feature_names = trained_model.feature_names_in_
    X = [[request.features[name] for name in feature_names]]
    prediction = trained_model.predict(X)[0]

    if isinstance(trained_model, ClassifierMixin):
        return {
            "predicted_column": uploaded_df.columns[-1],  # or target_column
            "prediction": int(prediction),
            "type": "classification"
        }
    elif isinstance(trained_model, RegressorMixin):
        return {
            "predicted_column": uploaded_df.columns[-1],
            "prediction": float(prediction),
            "type": "regression"
        }