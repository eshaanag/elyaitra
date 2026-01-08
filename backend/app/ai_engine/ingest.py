import os
from dotenv import load_dotenv
import google.generativeai as genai
from langchain.text_splitter import RecursiveCharacterTextSplitter

from app.ai_engine.chroma_client import get_collection

print("🔥🔥🔥 INGEST FUNCTION CALLED 🔥🔥🔥")

# --------------------------------------------------
# ENV
# --------------------------------------------------
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("❌ GEMINI_API_KEY not set")

genai.configure(api_key=API_KEY)

SUBJECT = "chemistry"

# --------------------------------------------------
# PATHS
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))      # backend/app/ai_engine
APP_DIR = os.path.dirname(BASE_DIR)                        # backend/app
BACKEND_DIR = os.path.dirname(APP_DIR)                     # backend

DATA_PATH = os.path.join(BACKEND_DIR, "syllabus_data", SUBJECT)

print("DATA_PATH =", DATA_PATH)

if not os.path.exists(DATA_PATH):
    raise RuntimeError(f"❌ syllabus_data not found at {DATA_PATH}")

print("📄 Files found:", os.listdir(DATA_PATH))

# --------------------------------------------------
# GET SHARED CHROMA COLLECTION (CRITICAL FIX)
# --------------------------------------------------
collection = get_collection(SUBJECT)

# --------------------------------------------------
# SPLITTER
# --------------------------------------------------
splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=50
)

# --------------------------------------------------
# EMBEDDING FUNCTION
# --------------------------------------------------
def embed(text: str) -> list[float]:
    result = genai.embed_content(
        model="models/text-embedding-004",
        content=text
    )
    return result["embedding"]

# --------------------------------------------------
# INGEST
# --------------------------------------------------
def ingest():
    # ⚠️ FULL RESET (TEMPORARY FOR DEBUG)
    try:
        collection.delete(where={})
        print("🧹 Cleared existing collection")
    except Exception as e:
        print("⚠️ Could not clear collection:", e)

    doc_id = 0
    files_processed = 0
    chunks_added = 0

    for file in os.listdir(DATA_PATH):
        if not file.lower().endswith(".txt"):
            continue

        unit = file.replace("unit", "").replace(".txt", "")
        print(f"📄 Reading: {file} | unit: {unit}")
        files_processed += 1

        with open(os.path.join(DATA_PATH, file), "r", encoding="utf-8") as f:
            text = f.read().strip()

        if not text:
            print("⚠️ Empty file:", file)
            continue

        chunks = splitter.split_text(text)

        for chunk in chunks:
            collection.add(
                documents=[chunk],
                embeddings=[embed(chunk)],
                metadatas=[{
                    "subject": SUBJECT,
                    "unit": str(unit),
                    "source": file
                }],
                ids=[f"{SUBJECT}_{doc_id}"]
            )
            doc_id += 1
            chunks_added += 1

    print(f"✅ Re-indexing complete | files={files_processed}, chunks={chunks_added}")
    print("📊 FINAL CHROMA COUNT:", collection.count())


if __name__ == "__main__":
    ingest()
