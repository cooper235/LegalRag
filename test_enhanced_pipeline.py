"""
Test the enhanced Legal RAG pipeline with dual retrieval and Gemini 2.0 Flash
"""

from rag_service import evaluateCase

propertyFraudCase = """
A property dispute case where Ramesh Kumar claimed ownership of a plot in Pune's 
Baner area measuring 2400 sq ft. Investigation revealed that Ramesh had:
1) Created forged sale deeds dated 2018 showing purchase from fictitious seller "Vijay Sharma"
2) Manipulated municipal records by bribing clerk Sunil Patil (witness testimony confirmed)
3) Altered boundary markers by moving fence posts 15 feet inward onto neighbor's land
4) Used fake power of attorney documents to sell portions to unsuspecting buyers
5) Collected Rs 45 lakhs from 3 buyers using fabricated ownership documents

Forensic analysis confirmed signatures on deeds were forgeries. Municipal officer Sunil Patil 
testified receiving Rs 50,000 bribe. Original landowner Mrs. Priya Deshmukh provided 
authenticated documents proving continuous ownership since 2005. Buyers Amit Shah, 
Neeta Joshi, and Kiran Patwardhan lost their investments and filed complaints.
"""

print("=" * 80)
print("TESTING ENHANCED LEGAL RAG PIPELINE")
print("=" * 80)
print("\n📋 CASE DESCRIPTION:")
print(propertyFraudCase)
print("\n" + "=" * 80)
print("🔄 PROCESSING WITH DUAL RETRIEVAL (Semantic + Keywords)...")
print("=" * 80)

result = evaluateCase(propertyFraudCase)

print("\n✅ PREDICTION RESULTS:")
print(f"Verdict: {result['verdict']}")
print(f"Confidence: {result['confidence'] * 100:.2f}%")

print("\n🔑 EXTRACTED KEYWORDS:")
print(", ".join(result['extractedKeywords']))

print("\n📚 RETRIEVED CHUNKS:")
for category, chunks in result['retrievedChunks'].items():
    print(f"\n{category}: {len(chunks)} chunks")

print("\n" + "=" * 80)
print("⚖️ FINAL JUDGMENT (Gemini 2.0 Flash Exp):")
print("=" * 80)
print(result['explanation'])

print("\n" + "=" * 80)
print("📊 RESPONSE STATS:")
print("=" * 80)
print(f"Word count: {len(result['explanation'].split())}")
print(f"Character count: {len(result['explanation'])}")
print(f"Total keywords extracted: {len(result['extractedKeywords'])}")

totalChunks = sum(len(chunks) for chunks in result['retrievedChunks'].values())
print(f"Total chunks retrieved: {totalChunks}")
