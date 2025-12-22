import os
import chromadb

# Absolute path to: backend/app/ai_engine/storage
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHROMA_PATH = os.path.join(BASE_DIR, "storage")

# Ensure storage directory exists
os.makedirs(CHROMA_PATH, exist_ok=True)

# 🔒 Persistent Chroma client (disk-backed)
client = chromadb.PersistentClient(path=CHROMA_PATH)

def get_collection(name: str):
    """
    Get or create a Chroma collection.
    Collection name MUST match subject folder name.
    """
    return client.get_or_create_collection(name=name)
