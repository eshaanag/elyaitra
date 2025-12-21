import os
import chromadb

# --------------------------------------------------
# PROJECT ROOT
# --------------------------------------------------
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "..")
)

CHROMA_DIR = os.path.join(BASE_DIR, "chroma_db")


def get_chroma_client():
    return chromadb.PersistentClient(
        path=CHROMA_DIR
    )
