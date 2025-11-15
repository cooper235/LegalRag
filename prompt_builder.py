from utils import chunkToText

def buildPrompt(text: str, verdict: str, confidence: float, support: dict, keywords: list = None) -> str:
    prompt = f"""You are an experienced legal judge tasked with analyzing a legal case and providing a comprehensive verdict.

=== CASE FACTS ===
{text}

=== MODEL PREDICTION ===
Verdict: {verdict.upper()}
Confidence: {confidence * 100:.2f}%
"""
    
    if keywords:
        prompt += f"\n=== EXTRACTED LEGAL KEYWORDS ===\n{', '.join(keywords)}\n"
    
    prompt += """
=== SUPPORTING LEGAL REFERENCES ===

--- Constitutional Provisions ---
"""
    
    for idx, chunk in enumerate(support.get("constitution", [])[:3], 1):
        prompt += f"{idx}. {chunkToText(chunk)}\n\n"
    
    prompt += "\n--- Indian Penal Code (IPC) Sections ---\n"
    for idx, chunk in enumerate(support.get("ipc", [])[:3], 1):
        prompt += f"{idx}. {chunkToText(chunk)}\n\n"
    
    prompt += "\n--- IPC Case Law ---\n"
    for idx, chunk in enumerate(support.get("ipcCase", [])[:3], 1):
        prompt += f"{idx}. {chunkToText(chunk)}\n\n"
    
    prompt += "\n--- Relevant Statutes ---\n"
    for idx, chunk in enumerate(support.get("statute", [])[:3], 1):
        prompt += f"{idx}. {chunkToText(chunk)}\n\n"
    
    prompt += "\n--- Legal Q&A References ---\n"
    for idx, chunk in enumerate(support.get("qa", [])[:3], 1):
        prompt += f"{idx}. {chunkToText(chunk)}\n\n"
    
    prompt += "\n--- Case Precedents ---\n"
    for idx, chunk in enumerate(support.get("case", [])[:3], 1):
        prompt += f"{idx}. {chunkToText(chunk)}\n\n"
    
    prompt += """
=== INSTRUCTIONS ===
You are a judge delivering a verdict. Write a CONCISE judgment (400-600 words maximum) in formal judicial style.

STRUCTURE YOUR RESPONSE AS:
1. **CASE SUMMARY** (2-3 sentences): State the charges and key facts
2. **APPLICABLE LAWS** (3-4 sentences): List the relevant IPC sections, constitutional provisions, or statutes with brief descriptions
3. **EVIDENCE ANALYSIS** (3-4 sentences): Evaluate the strength of evidence presented
4. **SIMILAR CASE PRECEDENTS** (3-4 sentences): **IMPORTANT** - Reference similar cases from the provided case law above. State the case name, similar facts, and what verdict/sentence was given in that case. This is MANDATORY.
5. **LEGAL REASONING** (4-5 sentences): Apply the law to the facts using the similar cases as guidance
6. **VERDICT** (2-3 sentences): Deliver clear judgment (GUILTY/NOT GUILTY) with recommended sentence/action based on similar case outcomes

CRITICAL REQUIREMENTS:
- **MUST reference at least 1-2 similar cases** from the "Case Precedents" section above
- For each similar case: mention case name, how it's similar, and what the outcome was
- Use those precedent outcomes to guide your sentencing recommendation
- Keep it readable and concise like a real judge explaining the verdict
- Use formal legal language but avoid unnecessary verbosity
- Cite specific section numbers (e.g., "IPC Section 420", "Article 21")
- Be decisive and clear in your conclusion
- Total length: 400-600 words (NOT MORE)

Deliver your judgment:
"""
    
    return prompt
