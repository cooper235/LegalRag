import sys
import os

print("=" * 60)
print("LEGAL RAG BACKEND - SETUP VERIFICATION")
print("=" * 60)

print("\n1. Checking Python version...")
print(f"   Python {sys.version}")

print("\n2. Checking required packages...")
required_packages = [
    "fastapi",
    "uvicorn",
    "transformers",
    "sentence_transformers",
    "torch",
    "huggingface_hub",
    "faiss",
    "google.generativeai",
    "numpy",
    "dotenv"
]

missing_packages = []
for package in required_packages:
    try:
        if package == "dotenv":
            __import__("dotenv")
        elif package == "google.generativeai":
            __import__("google.generativeai")
        else:
            __import__(package)
        print(f"   ✓ {package}")
    except ImportError:
        print(f"   ✗ {package} - MISSING")
        missing_packages.append(package)

print("\n3. Checking project files...")
project_files = [
    "main.py",
    "model_loader.py",
    "rag_loader.py",
    "rag_service.py",
    "prompt_builder.py",
    "utils.py",
    "requirements.txt",
    "Dockerfile",
    "start.sh",
    "README.md"
]

for file in project_files:
    if os.path.exists(file):
        size = os.path.getsize(file)
        print(f"   ✓ {file} ({size} bytes)")
    else:
        print(f"   ✗ {file} - MISSING")

print("\n4. Testing imports...")
try:
    print("   Testing model_loader...")
    from model_loader import predictVerdict, getConfidence
    print("   ✓ model_loader imports successful")
except Exception as e:
    print(f"   ✗ model_loader error: {e}")

try:
    print("   Testing rag_loader...")
    from rag_loader import retrieve
    print("   ✓ rag_loader imports successful")
except Exception as e:
    print(f"   ✗ rag_loader error: {e}")

try:
    print("   Testing rag_service...")
    from rag_service import evaluateCase
    print("   ✓ rag_service imports successful")
except Exception as e:
    print(f"   ✗ rag_service error: {e}")

try:
    print("   Testing prompt_builder...")
    from prompt_builder import buildPrompt
    print("   ✓ prompt_builder imports successful")
except Exception as e:
    print(f"   ✗ prompt_builder error: {e}")

print("\n5. Checking environment...")
env_file = ".env"
if os.path.exists(env_file):
    print(f"   ✓ .env file found")
    with open(env_file) as f:
        has_gemini = "GEMINI_API_KEY" in f.read()
        if has_gemini:
            print("   ✓ GEMINI_API_KEY configured")
        else:
            print("   ⚠ GEMINI_API_KEY not found in .env")
else:
    print("   ⚠ .env file not found (optional)")

print("\n" + "=" * 60)
if missing_packages:
    print("❌ SETUP INCOMPLETE")
    print(f"\nMissing packages: {', '.join(missing_packages)}")
    print("\nRun: pip install -r requirements.txt")
else:
    print("✅ ALL CHECKS PASSED")
    print("\nNext steps:")
    print("  1. Run: ./start.sh")
    print("  2. Open: http://localhost:7860/docs")
    print("  3. Test the API endpoints")
print("=" * 60)
