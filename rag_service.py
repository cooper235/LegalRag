from model_loader import predictVerdict, getConfidence
from rag_loader import retrieve
from prompt_builder import buildPrompt
from keyword_extractor import extractKeywords
import os
from dotenv import load_dotenv
import threading

load_dotenv()

def evaluateCase(text: str) -> dict:
    verdictResult = None
    confidenceScore = None
    extractedKeywords = []
    
    def runPrediction():
        nonlocal verdictResult, confidenceScore
        verdictResult = predictVerdict(text)
        confidenceScore = getConfidence(text)
    
    def runKeywordExtraction():
        nonlocal extractedKeywords
        extractedKeywords = extractKeywords(text)
    
    predictionThread = threading.Thread(target=runPrediction)
    keywordThread = threading.Thread(target=runKeywordExtraction)
    
    predictionThread.start()
    keywordThread.start()
    
    predictionThread.join()
    keywordThread.join()
    
    supportChunks = retrieve(text, topK=5)
    
    if extractedKeywords:
        keywordQuery = " ".join(extractedKeywords)
        keywordChunks = retrieve(keywordQuery, topK=5)
        
        for category in supportChunks:
            if category in keywordChunks:
                existingIds = set(str(chunk) for chunk in supportChunks[category])
                for chunk in keywordChunks[category]:
                    if str(chunk) not in existingIds:
                        supportChunks[category].append(chunk)
    
    promptText = buildPrompt(text, verdictResult, confidenceScore, supportChunks, extractedKeywords)
    
    geminiApiKey = os.getenv("GEMINI_API_KEY")
    geminiResponse = ""
    
    if geminiApiKey:
        try:
            import google.generativeai as genai
            genai.configure(api_key=geminiApiKey)
            geminiModel = genai.GenerativeModel("gemini-2.5-pro")
            response = geminiModel.generate_content(promptText)
            geminiResponse = response.text
        except Exception as e:
            geminiResponse = f"Gemini API call failed: {str(e)}"
    else:
        geminiResponse = "Gemini API key not configured. Using prompt only."
    
    return {
        "verdict": verdictResult,
        "confidence": confidenceScore,
        "explanation": geminiResponse if geminiResponse else promptText,
        "retrievedChunks": supportChunks,
        "extractedKeywords": extractedKeywords,
        "prompt": promptText
    }
