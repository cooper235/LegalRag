from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from model_loader import predictVerdict, getConfidence
from rag_service import evaluateCase
import uvicorn

app = FastAPI(title="Legal RAG Backend", version="1.0.0")

class PredictRequest(BaseModel):
    text: str

class PredictResponse(BaseModel):
    verdict: str
    confidence: float

class ExplainResponse(BaseModel):
    verdict: str
    confidence: float
    explanation: str
    retrievedChunks: dict

@app.get("/health")
async def healthCheck():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictResponse)
async def predict(request: PredictRequest):
    try:
        verdictResult = predictVerdict(request.text)
        confidenceScore = getConfidence(request.text)
        return PredictResponse(verdict=verdictResult, confidence=confidenceScore)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/explain", response_model=ExplainResponse)
async def explain(request: PredictRequest):
    try:
        result = evaluateCase(request.text)
        return ExplainResponse(
            verdict=result["verdict"],
            confidence=result["confidence"],
            explanation=result["explanation"],
            retrievedChunks=result["retrievedChunks"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7860)
