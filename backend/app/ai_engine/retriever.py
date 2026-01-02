import os
from dotenv import load_dotenv
import google.generativeai as genai

from app.ai_engine.chroma_client import get_client

# --------------------------------------------------
# ENV
# --------------------------------------------------
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set")

genai.configure(api_key=API_KEY)

# --------------------------------------------------
# EMBEDDING
# --------------------------------------------------
def embed(text: str) -> list[float]:
    result = genai.embed_content(
        model="models/text-embedding-004",
        content=text
    )
    return result["embedding"]

# --------------------------------------------------
# RETRIEVE FROM SYLLABUS
# --------------------------------------------------
def retrieve(question: str, subject: str, unit: int, k: int = 5):
    """
    Retrieve syllabus chunks for a subject + unit.
    """
    try:
        # ✅ MUST match ingestion collection
        collection = get_client().get_collection("data")

        results = collection.query(
            query_embeddings=[embed(question)],
            n_results=k,
            where={
                "subject": subject,
                "unit": unit      # INT matches ingestion
            }
        )

        return results.get("documents", [[]])[0]

    except Exception as e:
        print("❌ Retrieval error:", e)
        return []
