# 🛡️ ShieldAI: Enterprise-Grade Spam Detection System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)
![Next JS](https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white)

ShieldAI is a full-stack Trust & Safety platform designed to detect SMS and Email spam in real-time. It leverages a Microservices architecture with a specialized Machine Learning pipeline to identify high-risk messages with 98.8% accuracy.

## 🏗️ Architecture

The system is containerized and composed of three core services:

* **Frontend:** Next.js 14 (React) dashboard with a "Cyber-Security Operations" aesthetic.
* **Backend:** FastAPI (Python) serving the inference engine.
* **ML Engine:** Scikit-learn pipeline using Logistic Regression with TF-IDF vectorization.

## 🚀 Key Features

* **Microservices:** Fully decoupled and Dockerized architecture.
* **Real-time Inference:** Sub-millisecond prediction latency.
* **Explainability:** Visual confidence gauge and threshold sensitivity control.
* **Production Ready:** Includes type safety, Pydantic validation, and scalable directory structure.

## 🛠️ Installation & Setup

**Prerequisites:** Docker Desktop installed.

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/ShieldAI.git](https://github.com/YOUR_USERNAME/ShieldAI.git)
    cd ShieldAI
    ```

2.  **Run with Docker Compose**
    ```bash
    docker-compose up --build
    ```

3.  **Access the Dashboard**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧠 Model Performance

The model was trained on the UCI SMS Spam Collection dataset using **Logistic Regression** with class balancing.

| Metric | Score |
| :--- | :--- |
| **Accuracy** | 98.8% |
| **Precision** | 97.8% |
| **Recall** | 92.7% |
| **ROC-AUC** | 0.998 |

## 📂 Project Structure

```bash
/
├── backend/            # FastAPI Application
│   ├── app/            # API Source Code
│   └── models/         # Serialized ML Models (.joblib)
├── frontend/           # Next.js Application
│   ├── src/app         # App Router Pages
│   └── src/components  # UI Components
└── docker-compose.yml  # Orchestration