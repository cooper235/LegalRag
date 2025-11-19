# Legal RAG Frontend (One-Page)

Minimal Next.js single-page UI for Legal RAG backend.

Features:
- One static screen (no routing, no scrolling)
- Judge illustration (Lottie optional)
- Large textarea for case input
- "Get Judgment" button (calls LegalApiBackendService)
- "Recheck Judgment" button (calls LegalRagBackend) appears after initial result
- Result box with verdict, confidence, explanation, retrieved chunks and prompt

Run locally:

1. Install dependencies

```bash
cd legal-rag-frontend
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Open http://localhost:3000

Notes:
- To use an animation, place a Lottie JSON at `/public/animations/judge.json` and update `judgeAnimation` variable in `app/page.jsx`.
- Tailwind is configured; run `npm run dev` after installing deps.
