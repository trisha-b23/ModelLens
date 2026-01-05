import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css"; 
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UploadForm = ({setColumns}) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(""); 
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${backendUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setColumns(response.data.columns);
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="upload-card">
      <h2>Upload CSV Dataset</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default UploadForm;
