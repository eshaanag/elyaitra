import os
import chromadb
import ollama
from langchain_text_splitters import RecursiveCharacterTextSplitter

# --------------------------------------------------
# PATH SETUP
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHROMA_PATH = os.path.join(BASE_DIR, "storage")
DATA_PATH = os.path.join(BASE_DIR, "data")

print("📁 Chroma path:", CHROMA_PATH)
print("📁 Data path:", DATA_PATH)

os.makedirs(CHROMA_PATH, exist_ok=True)

if not os.path.exists(DATA_PATH):
    raise Exception("❌ data folder not found")

# --------------------------------------------------
# INIT CHROMADB (PERSISTENT CLIENT — IMPORTANT)
# --------------------------------------------------
client = chromadb.PersistentClient(
    path=CHROMA_PATH
)

# --------------------------------------------------
# CREATE / LOAD COLLECTION
# --------------------------------------------------
collection = client.get_or_create_collection(name="chemistry")

# --------------------------------------------------
# TEXT SPLITTER
# --------------------------------------------------
splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=50
)

# --------------------------------------------------
# EMBEDDING FUNCTION
# --------------------------------------------------
def embed(text: str):
    return ollama.embeddings(
        model="nomic-embed-text",
        prompt=text
    )["embedding"]

# --------------------------------------------------
# INDEX DATA
# --------------------------------------------------
doc_id = 0

for file_name in os.listdir(DATA_PATH):
    print("📄 Reading:", file_name)

    if not file_name.endswith(".txt"):
        continue

    unit_name = file_name.replace(".txt", "")
    file_path = os.path.join(DATA_PATH, file_name)

    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read().strip()

    if not text:
        print(f"⚠️ Skipping empty file: {file_name}")
        continue

    chunks = splitter.split_text(text)

    for chunk in chunks:
        print("➕ Adding chunk from:", unit_name)

        collection.add(
            documents=[chunk],
            embeddings=[embed(chunk)],
            metadatas=[{
                "subject": "chemistry",
                "unit": unit_name,
                "source": "syllabus"
            }],
            ids=[f"chem_{doc_id}"]
        )
        doc_id += 1

print("✅ Chemistry syllabus indexed successfully")
