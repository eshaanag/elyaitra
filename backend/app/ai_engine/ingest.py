import os
import chromadb
from dotenv import load_dotenv
from google import genai
from langchain_text_splitters import RecursiveCharacterTextSplitter

# --------------------------------------------------
# ENV
# --------------------------------------------------
load_dotenv()
client_genai = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# --------------------------------------------------
# PATHS
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHROMA_PATH = os.path.join(BASE_DIR, "storage")
DATA_PATH = os.path.join(BASE_DIR, "data")

print("📁 Chroma path:", CHROMA_PATH)
print("📁 Data path:", DATA_PATH)

# --------------------------------------------------
# CHROMA INIT
# --------------------------------------------------
client = chromadb.PersistentClient(path=CHROMA_PATH)

# 🔥 DROP & RECREATE COLLECTION (SAFE WAY)
if "data" in [c.name for c in client.list_collections()]:
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
def embed(text: str):
    res = client_genai.models.embed_content(
        model="text-embedding-004",
        contents=text
    )
    return res.embeddings[0].values

# --------------------------------------------------
# INDEX FILES
# --------------------------------------------------
doc_id = 0

for file in os.listdir(DATA_PATH):
    if not file.endswith(".txt"):
        continue

    print("📄 Reading:", file)
    path = os.path.join(DATA_PATH, file)

    with open(path, "r", encoding="utf-8") as f:
        text = f.read().strip()

    chunks = splitter.split_text(text)

    for chunk in chunks:
        collection.add(
            documents=[chunk],
            embeddings=[embed(chunk)],
            metadatas=[{"source": file}],
            ids=[f"doc_{doc_id}"]
        )
        doc_id += 1

print("✅ Re-indexing complete with Gemini embeddings")
