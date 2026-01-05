import { useState } from "react";
import axios from "axios";
import "./PredictForm.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function PredictForm({ columns, targetColumn, isTrained }) {
  const featureColumns = columns.filter(col => col !== targetColumn);

  const [features, setFeatures] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (col, value) => {
    setFeatures({ ...features, [col]: Number(value) });
  };

  const handlePredict = async () => {
    setError("");
    setPrediction(null);

    if (!isTrained) {
      setError("Please train the model first!");
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/predict`, { features });
      setPrediction(res.data);
    } catch (err) {
      setError("Prediction failed.");
    }
  };

  return (
    <div className="predict-card">
      <h2>Predict</h2>
        <label >Enter in values:</label>
      {featureColumns.map(col => (
        <input
          key={col}
          type="number"
          placeholder={col}
          onChange={e => handleChange(col, e.target.value)}
        />
      ))}

      <button onClick={handlePredict}>Predict</button>

      {prediction && (
        <div className="prediction-message">
          <strong>{targetColumn}:</strong> {prediction.prediction}
        </div>
      )}

      {error && <p className="prediction-error">{error}</p>}
      {!isTrained && !error && <p className="prediction-notice">Train the model to get predictions.</p>}
    </div>
  );
}
