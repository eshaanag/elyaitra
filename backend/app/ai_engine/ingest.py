import os
import chromadb
from dotenv import load_dotenv
import google.generativeai as genai
from langchain.text_splitter import RecursiveCharacterTextSplitter

# --------------------------------------------------
# ENV
# --------------------------------------------------
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("❌ GEMINI_API_KEY not set")

genai.configure(api_key=API_KEY)

# --------------------------------------------------
# PATHS (PRODUCTION-SAFE)
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))   # /app/app/ai_engine
APP_DIR = os.path.dirname(BASE_DIR)                     # /app/app
REPO_ROOT = os.path.dirname(APP_DIR)                    # /app

CHROMA_PATH = os.path.join(BASE_DIR, "storage")
DATA_PATH = os.path.join(REPO_ROOT, "syllabus_data", "chemistry")

if not os.path.exists(DATA_PATH):
    raise RuntimeError(f"❌ syllabus_data not found at {DATA_PATH}")

print("📁 Chroma path:", CHROMA_PATH)
print("📁 Data path:", DATA_PATH)
print("📄 Files found:", os.listdir(DATA_PATH))

# --------------------------------------------------
# CHROMA INIT
# --------------------------------------------------
client = chromadb.PersistentClient(path=CHROMA_PATH)

existing = [c.name for c in client.list_collections()]
if "data" in existing:
    print("🧹 Deleting old collection...")
    client.delete_collection("data")

collection = client.get_or_create_collection(name="data")

# --------------------------------------------------
# TEXT SPLITTER
# --------------------------------------------------
splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=50
)

# --------------------------------------------------
# GEMINI EMBEDDING FUNCTION
# --------------------------------------------------
def embed(text: str) -> list[float]:
    result = genai.embed_content(
        model="models/text-embedding-004",
        content=text
    )
    return result["embedding"]

# --------------------------------------------------
# INGESTION LOGIC
# --------------------------------------------------
def ingest():
    doc_id = 0
    files_processed = 0
    chunks_added = 0

    for file in os.listdir(DATA_PATH):
        if not file.lower().endswith(".txt"):
            continue

        files_processed += 1
        print("📄 Reading:", file)

        path = os.path.join(DATA_PATH, file)
        with open(path, "r", encoding="utf-8") as f:
            text = f.read().strip()

        if not text:
            print("⚠️ Skipping empty file:", file)
            continue

        chunks = splitter.split_text(text)

        for chunk in chunks:
            collection.add(
                documents=[chunk],
                embeddings=[embed(chunk)],
                metadatas=[{
                    "subject": "chemistry",
                    "source": file
                }],
                ids=[f"chemistry_{doc_id}"]
            )
            doc_id += 1
            chunks_added += 1

    print(
        f"✅ Re-indexing complete | files={files_processed}, chunks={chunks_added}"
    )

# --------------------------------------------------
# ALLOW MANUAL RUN
# --------------------------------------------------
if __name__ == "__main__":
    ingest()
