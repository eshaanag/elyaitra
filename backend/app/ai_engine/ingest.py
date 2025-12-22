import os
import chromadb
from dotenv import load_dotenv
import google.generativeai as genai
from langchain_text_splitters import RecursiveCharacterTextSplitter

# --------------------------------------------------
# ENV
# --------------------------------------------------
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set")

genai.configure(api_key=API_KEY)

# --------------------------------------------------
# PATHS
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHROMA_PATH = os.path.join(BASE_DIR, "storage")
DATA_PATH = r"C:\Users\asus\Documents\GitHub\elyaitra\syllabus_data\chemistry"

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
# SPLITTER
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
# INDEX FILES
# --------------------------------------------------
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
            metadatas=[{"source": file, "subject": "chemistry"}],
            ids=[f"chemistry_{doc_id}"]
        )
        doc_id += 1
        chunks_added += 1

print(f"✅ Re-indexing complete | files={files_processed}, chunks={chunks_added}")
