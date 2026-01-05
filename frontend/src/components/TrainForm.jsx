import { useState } from "react";
import axios from "axios";
import "./TrainForm.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function TrainForm({ columns, setIsTrained, setTargetColumn }) {
  const [selectedTarget, setSelectedTargetLocal] = useState(columns[0] || ""); 
  const [modelType, setModelType] = useState("linear");
  const [message, setMessage] = useState("");

  const handleTrain = async () => {
    if (!selectedTarget) return;

    try {
      const res = await axios.post(`${backendUrl}/train`, {
        target_column: selectedTarget,
        model_type: modelType,
      });

      setTargetColumn(selectedTarget);
      setIsTrained(true);
      setMessage(`Trained! MSE: ${res.data.mse}`);
    } catch (err) {
      console.error(err);
      setMessage("Training failed! Check backend or CSV data.");
    }
  };

  return (
    <div className="train-card">
      <h2>Train Model</h2>

      <label htmlFor="target-column">Target Column:</label>
      <select
        id="target-column"
        value={selectedTarget}
        onChange={e => setSelectedTargetLocal(e.target.value)}
      >
        {columns.map(col => (
          <option key={col} value={col}>{col}</option>
        ))}
      </select>

      <label htmlFor="model-type">Model Type:</label>
      <select
        id="model-type"
        value={modelType}
        onChange={e => setModelType(e.target.value)}
      >
        <option value="linear">Linear Regression</option>
        <option value="logistic">Logistic Regression</option>
        <option value="tree">Decision Tree</option>
      </select>

      <button onClick={handleTrain}>Train</button>

      {message && <div className="train-message">{message}</div>}
    </div>
  );
}
