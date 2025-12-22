import os
from dotenv import load_dotenv
import google.generativeai as genai

from app.ai_engine.chroma_client import get_collection

# --------------------------------------------------
# ENV
# --------------------------------------------------
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set")

# Configure Gemini (NO Client object)
genai.configure(api_key=API_KEY)

# --------------------------------------------------
# GEMINI EMBEDDING
# --------------------------------------------------
def embed(text: str) -> list[float]:
    """
    Generate an embedding vector for the given text
    using Gemini embedding model.
    """
    result = genai.embed_content(
        model="models/text-embedding-004",
        content=text
    )
    return result["embedding"]

# --------------------------------------------------
# RETRIEVE
# --------------------------------------------------
def retrieve(question: str, subject: str, k: int = 5):
    """
    Returns list of syllabus chunks.
    Empty list => Not in syllabus.
    """
    try:
        collection = get_collection(subject)

        results = collection.query(
            query_embeddings=[embed(question)],
            n_results=k
        )

        return results.get("documents", [[]])[0]

    except Exception as e:
        # NEVER crash the API
        print("❌ Retrieval error:", e)
        return []
