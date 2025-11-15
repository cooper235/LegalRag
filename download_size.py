#!/usr/bin/env python3

print("=" * 70)
print("LEGAL RAG BACKEND - DOWNLOAD SIZE ESTIMATE")
print("=" * 70)

downloads = {
    "Python Packages": [
        ("PyTorch + CUDA libraries", 4200),
        ("Transformers", 12),
        ("Sentence Transformers", 2),
        ("FastAPI + Uvicorn", 1),
        ("FAISS", 31),
        ("Google Generative AI", 15),
        ("Other dependencies", 50)
    ],
    "Models from HuggingFace": [
        ("LegalBERT (negi2725/LegalBertNew)", 438),
        ("BGE-Large-EN (BAAI/bge-large-en-v1.5)", 1340)
    ],
    "RAG Dataset from HuggingFace": [
        ("FAISS Indices (6 files)", 171),
        ("Chunks (6 files including case_chunks.pkl)", 372)
    ]
}

total_size = 0

for category, items in downloads.items():
    print(f"\n{category}:")
    category_total = 0
    for name, size_mb in items:
        print(f"  • {name}: ~{size_mb} MB")
        category_total += size_mb
    print(f"  Subtotal: ~{category_total} MB (~{category_total/1024:.2f} GB)")
    total_size += category_total

print("\n" + "=" * 70)
print(f"TOTAL ESTIMATED DOWNLOAD: ~{total_size} MB (~{total_size/1024:.2f} GB)")
print("=" * 70)

print("\nBreakdown by type:")
print(f"  • Dependencies: ~4.3 GB")
print(f"  • Models: ~1.8 GB")
print(f"  • RAG Data: ~0.5 GB")
print(f"\n  TOTAL: ~6.6 GB")

print("\n" + "=" * 70)
print("Note: First-time setup will download all of these.")
print("Subsequent runs will use cached files from:")
print("  • ~/.cache/huggingface/ (for models & datasets)")
print("  • Python site-packages (for dependencies)")
print("=" * 70)
