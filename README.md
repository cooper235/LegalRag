<p align="center">
  <img src="frontend/public/pngkey.com-judge-hammer-png-7960135.png" alt="Legal RAG Logo" width="200"/>
</p>

<h1 align="center">⚖️ Legal AI Judge</h1>

<p align="center">
  <strong>AI-Powered Legal Case Analysis with Retrieval-Augmented Generation</strong>
</p>

<p align="center">
  <a href="https://legal-rag-iota.vercel.app/">
    <img src="https://img.shields.io/badge/🔴_LIVE_DEMO-Visit_App-b8935e?style=for-the-badge&labelColor=323232" alt="Live Demo"/>
  </a>
  <a href="https://huggingface.co/spaces/negi2725/LegalApiBackendService">
    <img src="https://img.shields.io/badge/🤗_Hugging_Face-API_Backend-FFD21E?style=for-the-badge&labelColor=323232" alt="Hugging Face"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/FAISS-Vector_DB-4285F4?style=flat-square&logo=meta&logoColor=white" alt="FAISS"/>
  <img src="https://img.shields.io/badge/Gemini_2.5-AI-8E75B2?style=flat-square&logo=google&logoColor=white" alt="Gemini"/>
</p>

---

## 🚨 Important Disclaimer

> [!CAUTION]
> **FOR EDUCATIONAL & RESEARCH PURPOSES ONLY**
> 
> This application is a **demonstration of AI/ML capabilities** and is **NOT intended for actual legal use**. 
> 
> - ❌ **Do NOT use this for real legal decisions or court proceedings**
> - ❌ **Do NOT rely on AI-generated verdicts for any legal matter**
> - ✅ Real courts and qualified legal professionals are the only legitimate authority for legal judgments
> - ✅ This project is meant for research, learning, and showcasing RAG architecture

> [!WARNING]
> **MISUSE PROHIBITED**
> 
> Any misuse of this application for fraudulent purposes, misrepresentation in legal proceedings, or any form of deception is **strictly prohibited** and may have legal consequences. The creators bear no responsibility for any misuse.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Live Demo & Hosted API](#-live-demo--hosted-api)
- [Local Setup](#-local-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Reference](#-api-reference)
- [RAG Pipeline](#-rag-pipeline)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Legal AI Judge** is a sophisticated full-stack application that leverages **Retrieval-Augmented Generation (RAG)** to analyze legal cases and provide AI-generated verdicts with supporting legal references. The system combines:

- 🧠 **Fine-tuned LegalBERT** for verdict prediction with confidence scores
- 📚 **Multi-source RAG** retrieving from 6 different legal knowledge bases
- 🤖 **Google Gemini 2.5** for generating detailed judicial explanations
- ⚡ **FAISS Vector Search** for sub-second similarity matching
- 🎨 **Modern React UI** with smooth animations and neomorphic design

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🔮 AI-Powered Analysis
- **Verdict Prediction** using fine-tuned LegalBERT
- **Confidence Scoring** with softmax probabilities
- **Keyword Extraction** via Gemini 2.5 Flash

</td>
<td width="50%">

### 📖 Legal Knowledge Base
- Indian Constitution provisions
- Indian Penal Code (IPC) sections
- Case law precedents
- Statutes & Legal Q&A

</td>
</tr>
<tr>
<td width="50%">

### 🚀 Performance
- **~100ms** embedding generation (BGE-Large)
- **<50ms** FAISS vector search per index
- **Concurrent processing** with threading

</td>
<td width="50%">

### 🎨 Premium UI/UX
- Neomorphic design aesthetic
- Framer Motion animations
- Fully responsive (mobile-first)
- Dark/Light theme support

</td>
</tr>
</table>

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              LEGAL AI JUDGE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐    HTTP/HTTPS    ┌──────────────────────────────────────┐ │
│  │              │ ◄──────────────► │           FASTAPI BACKEND            │ │
│  │   NEXT.JS    │                  │  ┌─────────────┐ ┌────────────────┐  │ │
│  │   FRONTEND   │                  │  │ LegalBERT   │ │ RAG Service    │  │ │
│  │              │                  │  │ (Verdict)   │ │ (Retrieval)    │  │ │
│  │  • React 18  │                  │  └─────────────┘ └────────────────┘  │ │
│  │  • Tailwind  │                  │         │               │            │ │
│  │  • Framer    │                  │         ▼               ▼            │ │
│  │    Motion    │                  │  ┌─────────────────────────────────┐ │ │
│  └──────────────┘                  │  │      PROMPT BUILDER             │ │ │
│         │                          │  │  (Combines All Context)         │ │ │
│         │                          │  └─────────────────────────────────┘ │ │
│         │                          │                   │                  │ │
│         │                          │                   ▼                  │ │
│         │                          │  ┌─────────────────────────────────┐ │ │
│         │                          │  │     GEMINI 2.5 PRO              │ │ │
│         ▼                          │  │  (Judicial Explanation)         │ │ │
│  ┌──────────────┐                  │  └─────────────────────────────────┘ │ │
│  │   VERCEL     │                  └──────────────────────────────────────┘ │
│  │   (Hosted)   │                                     │                     │
│  └──────────────┘                                     ▼                     │
│                                    ┌──────────────────────────────────────┐ │
│                                    │         HUGGING FACE SPACES          │ │
│                                    │  • API: negi2725/LegalApiBackendService │
│                                    │  • Data: negi2725/dataRag            │ │
│                                    │  • Model: negi2725/LegalBertNew      │ │
│                                    └──────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

                              RAG KNOWLEDGE SOURCES
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐│
│  │Constitution│ │    IPC     │ │ IPC Cases  │ │  Statutes  │ │   Legal    ││
│  │  Index     │ │   Index    │ │   Index    │ │   Index    │ │   Q&A      ││
│  │ (FAISS)    │ │  (FAISS)   │ │  (FAISS)   │ │  (FAISS)   │ │  (FAISS)   ││
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘ └────────────┘│
│                                                                             │
│  Embeddings: BAAI/bge-large-en-v1.5 (1024-dim)                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | High-performance async REST API framework |
| **LegalBERT** | Fine-tuned transformer for verdict classification |
| **FAISS** | Facebook's vector similarity search library |
| **Sentence-Transformers** | BGE-Large embeddings (1024 dimensions) |
| **Google Gemini 2.5** | LLM for generating judicial explanations |
| **Hugging Face Hub** | Model & dataset hosting |

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **React 18** | UI component library |
| **Tailwind CSS 3.4** | Utility-first CSS framework |
| **Framer Motion** | Animation library |
| **Axios** | HTTP client |

---

## 🌐 Live Demo & Hosted API

### 🔴 Live Application
**[https://legal-rag-iota.vercel.app/](https://legal-rag-iota.vercel.app/)**

### 🤗 Hugging Face Hosted API

The backend is deployed on **Hugging Face Spaces** and is publicly accessible:

| Endpoint | URL |
|----------|-----|
| **Primary API** | `https://negi2725-LegalApiBackendService.hf.space` |
| **Enhanced RAG** | `https://negi2725-LegalRagBackend.hf.space` |

#### Quick API Test
```bash
# Health Check
curl https://negi2725-LegalApiBackendService.hf.space/health

# Get Judgment
curl -X POST "https://negi2725-LegalApiBackendService.hf.space/explain" \
  -H "Content-Type: application/json" \
  -d '{"text": "The accused was found in possession of stolen property worth Rs 50,000"}'
```

> [!NOTE]
> The Hugging Face Spaces may experience cold starts (30-60 seconds) if inactive. The first request may take longer.

---

## 💻 Local Setup

### Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **npm** or **yarn**
- **Git**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/legalRag.git
   cd legalRag
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   
   # On Linux/macOS
   source venv/bin/activate
   
   # On Windows
   venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Create .env file
   touch .env
   
   # Add your Gemini API key
   echo "GEMINI_API_KEY=your_gemini_api_key_here" >> .env
   ```
   
   > Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

5. **Run the backend server**
   ```bash
   # Development mode
   uvicorn main:app --reload --host 0.0.0.0 --port 7860
   
   # Or use the start script
   bash start.sh
   ```

6. **Verify backend is running**
   ```bash
   curl http://localhost:7860/health
   # Expected: {"status": "ok"}
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure backend URL (for local development)**
   
   Edit `frontend/app/page.jsx` and update the API URLs to point to localhost:
   ```javascript
   // Change from:
   'https://negi2725-LegalApiBackendService.hf.space/explain'
   
   // To:
   'http://localhost:7860/explain'
   ```

4. **Run the frontend development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### 🐳 Docker Setup (Alternative)

```bash
# Build the Docker image
docker build -t legal-rag-backend .

# Run the container
docker run -p 7860:7860 -e GEMINI_API_KEY=your_key_here legal-rag-backend
```

---

## 📡 API Reference

### Endpoints

#### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

---

#### `POST /predict`
Get a quick verdict prediction without detailed explanation.

**Request:**
```json
{
  "text": "Case description here..."
}
```

**Response:**
```json
{
  "verdict": "guilty",
  "confidence": 0.8742
}
```

---

#### `POST /explain`
Get a comprehensive analysis with verdict, confidence, explanation, and retrieved legal references.

**Request:**
```json
{
  "text": "The accused was charged with theft of property worth Rs 1,00,000 from the complainant's residence. Evidence includes CCTV footage and witness testimony."
}
```

**Response:**
```json
{
  "verdict": "guilty",
  "confidence": 0.9123,
  "explanation": "**CASE SUMMARY**\nThe accused stands charged under Section 379 of the Indian Penal Code...",
  "retrievedChunks": {
    "constitution": ["Article 21 - Right to Life..."],
    "ipc": ["Section 379 - Punishment for theft..."],
    "ipcCase": ["State vs. Sharma (2019)..."],
    "statute": ["The Indian Evidence Act, 1872..."],
    "qa": ["Q: What constitutes theft?..."],
    "case": ["Similar case precedent..."]
  },
  "extractedKeywords": ["theft", "stolen property", "CCTV evidence", "IPC 379"],
  "prompt": "Full prompt sent to Gemini..."
}
```

---

## 🔄 RAG Pipeline

The Retrieval-Augmented Generation pipeline works as follows:

```
┌──────────────┐     ┌───────────────┐     ┌─────────────────┐
│   User       │     │   BGE-Large   │     │   FAISS         │
│   Query      │ ──► │   Encoder     │ ──► │   Search        │
│              │     │   (1024-dim)  │     │   (6 indexes)   │
└──────────────┘     └───────────────┘     └─────────────────┘
                                                    │
                                                    ▼
┌──────────────────────────────────────────────────────────────┐
│  1. Constitutional Provisions  │  2. IPC Sections            │
│  3. IPC Case Law               │  4. Statutes                │
│  5. Legal Q&A                  │  6. Case Precedents         │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
                ┌────────────────────┐
                │   Prompt Builder   │
                │   (Aggregates      │
                │    all context)    │
                └────────────────────┘
                           │
                           ▼
                ┌────────────────────┐
                │   Gemini 2.5 Pro   │
                │   (Generates       │
                │    Judgment)       │
                └────────────────────┘
                           │
                           ▼
                ┌────────────────────┐
                │   Structured       │
                │   Response         │
                └────────────────────┘
```

### Knowledge Sources

| Source | Description | Index Type |
|--------|-------------|------------|
| **Constitution** | Indian Constitutional provisions | FAISS (BGE-Large) |
| **IPC** | Indian Penal Code sections | FAISS (BGE-Large) |
| **IPC Cases** | Case law related to IPC | FAISS (BGE-Large) |
| **Statutes** | General legal statutes | FAISS |
| **Legal Q&A** | Question-answer pairs | FAISS |
| **Case Precedents** | Historical case judgments | FAISS |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Hugging Face** for model and dataset hosting
- **Google** for Gemini API access
- **Facebook AI** for FAISS library
- **Indian Legal Community** for open legal resources

---

<p align="center">
  <strong>Built with ❤️ for Research & Education</strong>
</p>

<p align="center">
  <sub>⚖️ Remember: Real justice requires real courts. This is just AI.</sub>
</p>
