from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
import torch.nn.functional as F

modelName = "negi2725/LegalBertNew"
model = AutoModelForSequenceClassification.from_pretrained(modelName)
tokenizer = AutoTokenizer.from_pretrained(modelName)

model.eval()

def predictVerdict(text: str) -> str:
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512, padding=True)
    
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = F.softmax(logits, dim=-1)
        predictedClass = torch.argmax(probabilities, dim=-1).item()
    
    return "guilty" if predictedClass == 1 else "not guilty"

def getConfidence(text: str) -> float:
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512, padding=True)
    
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = F.softmax(logits, dim=-1)
        confidence = torch.max(probabilities).item()
    
    return round(confidence, 4)
