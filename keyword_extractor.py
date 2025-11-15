import os
from dotenv import load_dotenv

load_dotenv()

def extractKeywords(text: str) -> list:
    geminiApiKey = os.getenv("GEMINI_API_KEY")
    
    if not geminiApiKey:
        return []
    
    try:
        import google.generativeai as genai
        genai.configure(api_key=geminiApiKey)
        
        model = genai.GenerativeModel("gemini-2.5-flash")
        
        keywordPrompt = f"""You are a legal expert. Extract ONLY the most important legal keywords from this case for searching legal databases.

CASE TEXT:
{text}

Extract:
1. Crime types (e.g., fraud, theft, assault)
2. Legal concepts (e.g., conspiracy, breach of trust)
3. Specific acts/objects (e.g., heroin, property, boundary)
4. Key parties' roles (e.g., government official, surveyor)
5. Relevant law areas (e.g., IPC, property law, criminal law)

OUTPUT FORMAT: Return ONLY a comma-separated list of 10-15 keywords, nothing else.
Example: fraud, conspiracy, property, boundary manipulation, government official, criminal breach of trust, cheating, IPC 420

YOUR KEYWORDS:"""

        response = model.generate_content(keywordPrompt)
        keywordsText = response.text.strip()
        
        keywords = [kw.strip() for kw in keywordsText.split(',')]
        return keywords[:15]
        
    except Exception as e:
        print(f"Keyword extraction failed: {e}")
        return []
