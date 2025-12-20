import os
from app.ai_engine.chroma_client import get_chroma_client

# --------------------------------------------------
# PATH SETUP (FIXED)
# --------------------------------------------------
# ingest.py is at:
# backend/app/ai_engine/ingest.py
# We need to go up 3 levels to reach project root
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "..")
)

SYLLABUS_DIR = os.path.join(BASE_DIR, "syllabus_data")


def ingest_subject(subject: str):
    subject_path = os.path.join(SYLLABUS_DIR, subject)

    if not os.path.exists(subject_path):
        print(f"❌ Subject folder not found: {subject_path}")
        return

    client = get_chroma_client()
    collection = client.get_or_create_collection(name=subject)

    documents = []
    ids = []

    for file in os.listdir(subject_path):
        if file.endswith(".txt"):
            file_path = os.path.join(subject_path, file)
            with open(file_path, "r", encoding="utf-8") as f:
                documents.append(f.read())
                ids.append(f"{subject}_{file}")

    if not documents:
        print("⚠ No text files found in subject folder")
        return

    collection.add(documents=documents, ids=ids)
    print(f"✅ Ingested {len(documents)} files into '{subject}'")


if __name__ == "__main__":
    ingest_subject("chemistry")
