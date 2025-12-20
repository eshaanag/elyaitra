from app.ai_engine.chroma_client import get_chroma_client


def retrieve_chunks(query: str, subject: str, k: int = 4):
    client = get_chroma_client()

    try:
        collection = client.get_collection(name=subject)
    except Exception:
        return []

    results = collection.query(
        query_texts=[query],
        n_results=k
    )

    documents = results.get("documents", [[]])[0]
    return documents
