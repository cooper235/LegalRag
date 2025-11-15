#!/usr/bin/env python3
import os
from dotenv import load_dotenv

load_dotenv()

geminiApiKey = os.getenv("GEMINI_API_KEY")

if not geminiApiKey:
    print("❌ GEMINI_API_KEY not found in .env file")
    exit(1)

print("🔍 Checking available Gemini models...")
print("=" * 70)

try:
    import google.generativeai as genai
    genai.configure(api_key=geminiApiKey)
    
    print("\n✓ SDK Version:", genai.__version__)
    print("\n📋 Available Models:\n")
    
    models = genai.list_models()
    for model in models:
        if 'generateContent' in model.supported_generation_methods:
            print(f"  • {model.name}")
            print(f"    Display Name: {model.display_name}")
            print(f"    Description: {model.description[:100]}...")
            print()
    
    print("=" * 70)
    print("\n✅ Now testing with the first available model...")
    
    test_model_name = None
    for model in genai.list_models():
        if 'generateContent' in model.supported_generation_methods:
            test_model_name = model.name
            break
    
    if test_model_name:
        print(f"\n🧪 Testing with: {test_model_name}")
        test_model = genai.GenerativeModel(test_model_name)
        response = test_model.generate_content("Say 'Hello, Legal RAG Backend!'")
        print(f"✓ Response: {response.text}")
        print(f"\n✅ Gemini API is working! Use model: {test_model_name}")
    else:
        print("❌ No suitable models found")
        
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
