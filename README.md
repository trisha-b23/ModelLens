# ModelLens: Interactive ML Platform

**ModelLens** is a full-stack project designed to demonstrate the integration of a Python-based machine learning backend with a React frontend. It allows for basic dataset uploads and model training through a web interface, serving as a functional proof-of-concept for end-to-end data processing. Upload a dataset, choose your settings, and train a model through a simple, clean interface.

> ⚠️ **Note on Deployment:** This app's backend is hosted on a **Render Free Tier** instance. If the site feels unresponsive at first, please allow **60–90 seconds** for the server to "wake up" from its sleep mode.

**URL:** https://model-lens-one.vercel.app
---

## Tech Stack
* **Frontend:** React (Vite) + CSS 
* **Backend:** FastAPI (Python) 
* **Machine Learning:** Scikit-Learn 
* **Data Handling:** Pandas & NumPy

---

## Key Features
* **Dynamic CSV Processing:** Upload any `.csv` file for analysis.
* **Real-time Training:** Train a live model via the FastAPI backend.
* **Predictions:** Use your custom-trained model to predict new values.
* **Responsive UI:** Optimized for desktop and mobile viewing.

---

## Data Requirements
To get the best results, please follow these guidelines:

1.  **Numerical Input:** Currently, the platform supports **numbers only** (integers and floats) for data entries. (Column names can be strings). 
2.  **Model Selection:** Select a model that best represents your target column. For instance:
    * Use **Linear Regression** for continuous numbers (like prices).
    * Use **Logistic Regression** for categories (like Yes/No).

---

## How to Use
1.  **Upload** your dataset.
2.  **Select** your target column (what you want to predict) and model type.
3.  **Click Train.**
4.  Once trained, **input values** into the fields to see your prediction!
