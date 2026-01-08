import os
from dotenv import load_dotenv
import google.generativeai as genai
from app.ai_engine.chroma_client import get_collection

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set")

genai.configure(api_key=API_KEY)


def embed(text: str) -> list[float]:
    result = genai.embed_content(
        model="models/text-embedding-004",
        content=text
    )
    return result["embedding"]


def retrieve(question: str, subject: str, unit: int | None = None, k: int = 5):
    try:
        print("🔍 RETRIEVE CALLED WITH:")
        print("   subject =", subject)
        print("   unit    =", unit)
        print("   question=", question)

        collection = get_collection(subject)

        results = collection.query(
            query_embeddings=[embed(question)],
            n_results=k,
            where={"unit": str(unit)}  # MUST be string
        )

        print("📦 RAW CHROMA RESULTS:")
        print(results)

        docs = results.get("documents", [[]])[0]

        print("📄 DOC COUNT:", len(docs))

        return docs

    except Exception as e:
        print("❌ Retrieval error:", e)
        return []

