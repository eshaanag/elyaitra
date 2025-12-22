import os
from dotenv import load_dotenv
import google.generativeai as genai

from backend.app.ai_engine.chroma_client import get_collection

# --------------------------------------------------
# ENV
# --------------------------------------------------
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set")

# Configure Gemini
genai.configure(api_key=API_KEY)

# --------------------------------------------------
# PATHS
# --------------------------------------------------
PROJECT_ROOT = os.path.dirname(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

SYLLABUS_PATH = os.path.join(PROJECT_ROOT, "syllabus_data")

print("📁 Using syllabus path:", SYLLABUS_PATH)

# --------------------------------------------------
# GEMINI EMBEDDING FUNCTION
# --------------------------------------------------
def embed(text: str):
    """
    Returns embedding vector using Gemini
    """
    response = genai.embed_content(
        model="models/text-embedding-004",
        content=text
    )
    return response["embedding"]

# --------------------------------------------------
# INGESTION LOGIC
# --------------------------------------------------
def ingest():
    for subject in os.listdir(SYLLABUS_PATH):
        subject_path = os.path.join(SYLLABUS_PATH, subject)

        if not os.path.isdir(subject_path):
            continue

        print(f"[+] Ingesting subject: {subject}")
        collection = get_collection(subject)

        doc_id = 0

        for file in os.listdir(subject_path):
            if not file.endswith(".txt"):
                continue

            file_path = os.path.join(subject_path, file)

            with open(file_path, "r", encoding="utf-8") as f:
                text = f.read().strip()

            if not text:
                continue

            collection.add(
                documents=[text],
                embeddings=[embed(text)],
                metadatas=[{
                    "subject": subject,
                    "source": file
                }],
                ids=[f"{subject}_{doc_id}"]
            )

            doc_id += 1

        print(f"[✓] Done {subject}")

    print("✅ Ingestion complete (ChromaDB is persistent)")

# --------------------------------------------------
if __name__ == "__main__":
    ingest()
