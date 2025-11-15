#!/usr/bin/env python3
import sys
import json

print("=" * 80)
print("LEGAL RAG BACKEND - FULL PIPELINE INFERENCE TEST")
print("=" * 80)

test_case = """
A person named Ramesh was caught by police officers while carrying 500 grams of 
heroin in his bag during a routine check at the railway station. Upon questioning, 
he admitted that he was transporting the drugs from one city to another for 
monetary compensation. He has no prior criminal record. The substance was 
confirmed to be heroin through forensic testing.
"""

print("\n📋 TEST CASE:")
print("-" * 80)
print(test_case.strip())
print("-" * 80)

print("\n🔄 Starting inference pipeline...")
print("\nStep 1: Loading LegalBERT model...")
try:
    from model_loader import predictVerdict, getConfidence
    print("✓ Model loaded successfully")
except Exception as e:
    print(f"✗ Error loading model: {e}")
    sys.exit(1)

print("\nStep 2: Predicting verdict...")
try:
    verdict = predictVerdict(test_case)
    confidence = getConfidence(test_case)
    print(f"✓ Verdict: {verdict.upper()}")
    print(f"✓ Confidence: {confidence:.4f} ({confidence*100:.2f}%)")
except Exception as e:
    print(f"✗ Error in prediction: {e}")
    sys.exit(1)

print("\nStep 3: Loading RAG system (FAISS + embeddings)...")
try:
    from rag_loader import retrieve
    print("✓ RAG system loaded (6 FAISS indices ready)")
except Exception as e:
    print(f"✗ Error loading RAG: {e}")
    sys.exit(1)

print("\nStep 4: Retrieving relevant legal documents...")
try:
    retrieved_chunks = retrieve(test_case, topK=3)
    print(f"✓ Retrieved chunks from {len(retrieved_chunks)} legal sources:")
    for source, chunks in retrieved_chunks.items():
        print(f"  • {source}: {len(chunks)} relevant documents")
except Exception as e:
    print(f"✗ Error in retrieval: {e}")
    sys.exit(1)

print("\nStep 5: Building comprehensive legal prompt...")
try:
    from prompt_builder import buildPrompt
    prompt = buildPrompt(test_case, verdict, confidence, retrieved_chunks)
    print(f"✓ Prompt generated ({len(prompt)} characters)")
except Exception as e:
    print(f"✗ Error building prompt: {e}")
    sys.exit(1)

print("\nStep 6: Running full case evaluation...")
try:
    from rag_service import evaluateCase
    result = evaluateCase(test_case)
    print("✓ Case evaluation complete")
except Exception as e:
    print(f"✗ Error in evaluation: {e}")
    sys.exit(1)

print("\n" + "=" * 80)
print("📊 FINAL RESULTS")
print("=" * 80)

print(f"\n🔍 VERDICT: {result['verdict'].upper()}")
print(f"📈 CONFIDENCE: {result['confidence']:.4f} ({result['confidence']*100:.2f}%)")

print(f"\n📚 RETRIEVED LEGAL REFERENCES:")
for category, chunks in result['retrievedChunks'].items():
    print(f"\n  [{category.upper()}] - {len(chunks)} documents retrieved")
    if chunks:
        print(f"  Sample from top result:")
        from utils import chunkToText
        sample = chunkToText(chunks[0])
        print(f"  {sample[:200]}..." if len(sample) > 200 else f"  {sample}")

print(f"\n📝 EXPLANATION/ANALYSIS:")
print("-" * 80)
explanation = result['explanation']
if len(explanation) > 1500:
    print(explanation[:1500])
    print(f"\n... (truncated, full length: {len(explanation)} characters)")
else:
    print(explanation)

print("\n" + "=" * 80)
print("✅ INFERENCE PIPELINE COMPLETED SUCCESSFULLY")
print("=" * 80)

print("\n💾 Saving detailed results to 'inference_result.json'...")
output_data = {
    "test_case": test_case.strip(),
    "verdict": result['verdict'],
    "confidence": result['confidence'],
    "retrieved_sources": {k: len(v) for k, v in result['retrievedChunks'].items()},
    "explanation_length": len(result['explanation']),
    "full_explanation": result['explanation']
}

with open('inference_result.json', 'w') as f:
    json.dump(output_data, f, indent=2)

print("✓ Results saved to 'inference_result.json'")
