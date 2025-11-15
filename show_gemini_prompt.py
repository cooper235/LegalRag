#!/usr/bin/env python3

print("=" * 80)
print("SHOWING THE EXACT PROMPT SENT TO GEMINI API")
print("=" * 80)

test_case = """
Rajesh Kumar, a landowner, conspired with Suresh Sharma, a government surveyor 
responsible for marking property boundaries. Rajesh paid Suresh Rs. 2,00,000 to 
alter the boundary markings of his agricultural land, thereby encroaching upon 
3 acres of his neighbor Mohan Das's property. The fraudulent boundary stones were 
placed, and official records were manipulated to reflect the false boundaries. 
Mohan Das discovered the fraud when he attempted to sell his land and found the 
area reduced. Investigation revealed bank transfers from Rajesh to Suresh and 
WhatsApp messages discussing the boundary manipulation. Both accused have prior 
clean records.
"""

print("\n1. Loading model and making prediction...")
from model_loader import predictVerdict, getConfidence
verdict = predictVerdict(test_case)
confidence = getConfidence(test_case)
print(f"   Verdict: {verdict}, Confidence: {confidence:.4f}")

print("\n2. Retrieving relevant documents...")
from rag_loader import retrieve
retrieved_chunks = retrieve(test_case, topK=3)
print(f"   Retrieved {sum(len(v) for v in retrieved_chunks.values())} documents")

print("\n3. Building the prompt that will be sent to Gemini...")
from prompt_builder import buildPrompt
prompt = buildPrompt(test_case, verdict, confidence, retrieved_chunks)

print("\n" + "=" * 80)
print("THE COMPLETE PROMPT SENT TO GEMINI API:")
print("=" * 80)
print(prompt)
print("=" * 80)
print(f"\nPrompt Statistics:")
print(f"  • Total characters: {len(prompt)}")
print(f"  • Total words: ~{len(prompt.split())}")
print(f"  • Total lines: {len(prompt.splitlines())}")
print("=" * 80)

print("\nThis entire prompt is sent to: genai.GenerativeModel('gemini-2.5-flash')")
print("Gemini processes this and returns the judgment you saw!")
