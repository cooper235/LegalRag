import json

def chunkToText(chunk):
    if isinstance(chunk, str):
        return chunk
    if isinstance(chunk, dict):
        return chunk.get("text") or chunk.get("description") or chunk.get("content") or json.dumps(chunk)
    return str(chunk)
