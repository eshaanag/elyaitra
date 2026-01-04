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

SUBJECT = "chemistry"

# --------------------------------------------------
# PATHS
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))      # backend/app/ai_engine
APP_DIR = os.path.dirname(BASE_DIR)                        # backend/app
BACKEND_DIR = os.path.dirname(APP_DIR)                     # backend

# ✅ Railway persistent path (fallback to local)
CHROMA_PATH = os.getenv("CHROMA_PATH", os.path.join(BASE_DIR, "storage"))

DATA_PATH = os.path.join(BACKEND_DIR, "syllabus_data", SUBJECT)

if not os.path.exists(DATA_PATH):
    raise RuntimeError(f"❌ syllabus_data not found at {DATA_PATH}")

os.makedirs(CHROMA_PATH, exist_ok=True)

print("📁 Chroma path:", CHROMA_PATH)
print("📁 Data path:", DATA_PATH)
print("📄 Files found:", os.listdir(DATA_PATH))

# --------------------------------------------------
# INGESTION GUARD (CRITICAL)
# --------------------------------------------------
INGEST_FLAG = os.path.join(CHROMA_PATH, ".ingested")

# --------------------------------------------------
# CHROMA INIT
# --------------------------------------------------
os.environ["ANONYMIZED_TELEMETRY"] = "false"

client = chromadb.PersistentClient(path=CHROMA_PATH)
collection = client.get_or_create_collection(name=SUBJECT)

# --------------------------------------------------
# SPLITTER
# --------------------------------------------------
splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=50
)

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
# INGEST
# --------------------------------------------------
def ingest():
    # ✅ Run ONLY once
    if os.path.exists(INGEST_FLAG):
        print("✅ Syllabus already ingested. Skipping.")
        return

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
            continue

        chunks = splitter.split_text(text)

        for chunk in chunks:
            collection.add(
                documents=[chunk],
                embeddings=[embed(chunk)],
                metadatas=[{
                    "subject": SUBJECT,
                    "unit": str(unit),   # ✅ store as STRING
                    "source": file
                }],
                ids=[f"{SUBJECT}_{doc_id}"]
            )
            doc_id += 1
            chunks_added += 1

    # ✅ Mark ingestion complete
    with open(INGEST_FLAG, "w") as f:
        f.write("done")

    print(f"✅ Re-indexing complete | files={files_processed}, chunks={chunks_added}")


if __name__ == "__main__":
    ingest()
