#!/usr/bin/env python3
import sys
import json

print("=" * 80)
print("LEGAL RAG BACKEND - PROPERTY FRAUD CASE TEST")
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

print("\n📋 PROPERTY FRAUD TEST CASE:")
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

print("\nStep 5: Running full case evaluation...")
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
    if chunks:
        print(f"\n  [{category.upper()}] - {len(chunks)} documents")
        from utils import chunkToText
        sample = chunkToText(chunks[0])
        preview = sample[:150] + "..." if len(sample) > 150 else sample
        print(f"  Sample: {preview}")

print(f"\n📝 LEGAL JUDGMENT:")
print("=" * 80)
explanation = result['explanation']
print(explanation)
print("=" * 80)

print(f"\n📊 Statistics:")
print(f"  • Explanation length: {len(explanation)} characters")
print(f"  • Words: ~{len(explanation.split())} words")
print(f"  • Retrieved documents: {sum(len(v) for v in result['retrievedChunks'].values())}")

print("\n" + "=" * 80)
print("✅ PROPERTY FRAUD CASE ANALYSIS COMPLETED")
print("=" * 80)

print("\n💾 Saving results to 'property_fraud_result.json'...")
output_data = {
    "case_type": "Property Fraud - Boundary Manipulation",
    "test_case": test_case.strip(),
    "verdict": result['verdict'],
    "confidence": result['confidence'],
    "retrieved_sources": {k: len(v) for k, v in result['retrievedChunks'].items()},
    "explanation_length": len(result['explanation']),
    "full_judgment": result['explanation']
}

with open('property_fraud_result.json', 'w') as f:
    json.dump(output_data, f, indent=2)

print("✓ Results saved to 'property_fraud_result.json'")
