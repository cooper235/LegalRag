from huggingface_hub import hf_hub_download
from sentence_transformers import SentenceTransformer
import faiss
import json
import pickle
import numpy as np

repoId = "negi2725/dataRag"
repoType = "dataset"

encoder = SentenceTransformer("BAAI/bge-large-en-v1.5")

constitutionIndexPath = hf_hub_download(repo_id=repoId, repo_type=repoType, filename="constitution_bgeLarge.index")
ipcIndexPath = hf_hub_download(repo_id=repoId, repo_type=repoType, filename="ipc_bgeLarge.index")
ipcCaseIndexPath = hf_hub_download(repo_id=repoId, repo_type=repoType, filename="ipc_case_flat.index")
statuteIndexPath = hf_hub_download(repo_id=repoId, repo_type=repoType, filename="statute_index.faiss")
qaIndexPath = hf_hub_download(repo_id=repoId, repo_type=repoType, filename="qa_faiss_index.idx")
caseIndexPath = hf_hub_download(repo_id=repoId, repo_type=repoType, filename="case_faiss.index")

constitutionChunksPath = hf_hub_download(repo_id=repoId, repo_type=repoType, filename="constitution_chunks.json")
ipcChunksPath = hf_hub_download(repo_id=repoId, repo_type=repoType, filename="ipc_chunks.json")
ipcCaseChunksPath = hf_hub_download(repo_id=repoId, repo_type=repoType, filename="ipc_case_chunks.json")
qaChunksPath = hf_hub_download(repo_id=repoId, repo_type=repoType, filename="qa_text_chunks.json")
statuteChunksPath = hf_hub_download(repo_id=repoId, repo_type=repoType, filename="statute_chunks.pkl")
caseChunksPath = hf_hub_download(repo_id=repoId, repo_type=repoType, filename="case_chunks.pkl")

constitutionIndex = faiss.read_index(constitutionIndexPath)
ipcIndex = faiss.read_index(ipcIndexPath)
ipcCaseIndex = faiss.read_index(ipcCaseIndexPath)
statuteIndex = faiss.read_index(statuteIndexPath)
qaIndex = faiss.read_index(qaIndexPath)
caseIndex = faiss.read_index(caseIndexPath)

with open(constitutionChunksPath, "r") as f:
    constitutionChunks = json.load(f)

with open(ipcChunksPath, "r") as f:
    ipcChunks = json.load(f)

with open(ipcCaseChunksPath, "r") as f:
    ipcCaseChunks = json.load(f)

with open(qaChunksPath, "r") as f:
    qaChunks = json.load(f)

with open(statuteChunksPath, "rb") as f:
    statuteChunks = pickle.load(f)

with open(caseChunksPath, "rb") as f:
    caseChunks = pickle.load(f)

def retrieve(text: str, topK: int = 5) -> dict:
    queryEmbedding = encoder.encode([text])
    queryEmbedding = queryEmbedding.astype("float32")
    faiss.normalize_L2(queryEmbedding)
    
    results = {}
    
    distances, indices = constitutionIndex.search(queryEmbedding, topK)
    results["constitution"] = [constitutionChunks[idx] for idx in indices[0] if idx < len(constitutionChunks)]
    
    distances, indices = ipcIndex.search(queryEmbedding, topK)
    results["ipc"] = [ipcChunks[idx] for idx in indices[0] if idx < len(ipcChunks)]
    
    distances, indices = ipcCaseIndex.search(queryEmbedding, topK)
    results["ipcCase"] = [ipcCaseChunks[idx] for idx in indices[0] if idx < len(ipcCaseChunks)]
    
    distances, indices = statuteIndex.search(queryEmbedding, topK)
    results["statute"] = [statuteChunks[idx] for idx in indices[0] if idx < len(statuteChunks)]
    
    distances, indices = qaIndex.search(queryEmbedding, topK)
    results["qa"] = [qaChunks[idx] for idx in indices[0] if idx < len(qaChunks)]
    
    distances, indices = caseIndex.search(queryEmbedding, topK)
    results["case"] = [caseChunks[idx] for idx in indices[0] if idx < len(caseChunks)]
    
    return results
