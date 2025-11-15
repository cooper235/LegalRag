import requests
import json
import time

BASE_URL = "http://localhost:7860"

print("=" * 60)
print("LEGAL RAG BACKEND - API TEST")
print("=" * 60)

print("\n1. Testing health endpoint...")
try:
    response = requests.get(f"{BASE_URL}/health", timeout=5)
    if response.status_code == 200:
        print(f"   ✓ Health check passed: {response.json()}")
    else:
        print(f"   ✗ Health check failed: {response.status_code}")
except Exception as e:
    print(f"   ✗ Cannot connect to server: {e}")
    print("\n   Make sure the server is running:")
    print("   ./start.sh")
    exit(1)

print("\n2. Testing /predict endpoint...")
test_case = {
    "text": "The accused was found in possession of stolen goods worth Rs. 50,000. The police recovered the items from his residence during a search operation."
}

try:
    start = time.time()
    response = requests.post(f"{BASE_URL}/predict", json=test_case, timeout=30)
    duration = time.time() - start
    
    if response.status_code == 200:
        result = response.json()
        print(f"   ✓ Prediction successful ({duration:.2f}s)")
        print(f"   Verdict: {result['verdict']}")
        print(f"   Confidence: {result['confidence']:.4f}")
    else:
        print(f"   ✗ Prediction failed: {response.status_code}")
        print(f"   Error: {response.text}")
except Exception as e:
    print(f"   ✗ Error: {e}")

print("\n3. Testing /explain endpoint...")
try:
    start = time.time()
    response = requests.post(f"{BASE_URL}/explain", json=test_case, timeout=60)
    duration = time.time() - start
    
    if response.status_code == 200:
        result = response.json()
        print(f"   ✓ Explanation successful ({duration:.2f}s)")
        print(f"   Verdict: {result['verdict']}")
        print(f"   Confidence: {result['confidence']:.4f}")
        print(f"   Explanation length: {len(result['explanation'])} chars")
        print(f"   Retrieved chunks:")
        for category, chunks in result['retrievedChunks'].items():
            print(f"     - {category}: {len(chunks)} chunks")
    else:
        print(f"   ✗ Explanation failed: {response.status_code}")
        print(f"   Error: {response.text}")
except Exception as e:
    print(f"   ✗ Error: {e}")

print("\n" + "=" * 60)
print("✅ API TESTING COMPLETE")
print("=" * 60)
