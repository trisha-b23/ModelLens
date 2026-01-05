import UploadForm from "./components/UploadForm";
import "./index.css";
import TrainForm from "./components/TrainForm";
import PredictForm from "./components/PredictForm";
import { useState } from "react";


function App() {
  const [columns, setColumns] = useState([]);         
  const [targetColumn, setTargetColumn] = useState(""); 
  const [isTrained, setIsTrained] = useState(false);  
  return (
    <div className="app-container">
      <header className="app-header">
        <img src="/ModelLens.png" alt="Model ⟨Lens⟩ logo" />
      </header>
      <main className="app-main">
        <UploadForm setColumns={setColumns} />
        
        <TrainForm
            columns={columns}
            setIsTrained={setIsTrained}
            setTargetColumn={setTargetColumn}
        />

        <PredictForm
            columns={columns}
            targetColumn={targetColumn}
            isTrained={isTrained}
        />
        
      </main>
    </div>
  );
}

export default App;
