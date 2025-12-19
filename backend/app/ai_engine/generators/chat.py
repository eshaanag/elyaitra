from app.ai_engine.llm_client import LocalOllamaClient
from app.ai_engine.retriever import retrieve_chunks

# Load strict system prompt once
with open("app/ai_engine/prompts/chat.txt", "r", encoding="utf-8") as f:
    PROMPT_TEMPLATE = f.read()

# Initialize LLM once (DO NOT recreate per request)
llm = LocalOllamaClient()


def generate_chat_response(question: str, subject: str) -> str:
    """
    Generate an answer strictly based on syllabus content.
    Returns 'Not in syllabus' if no relevant chunks are found.
    """

    # 1. Retrieve relevant syllabus chunks
    chunks = retrieve_chunks(question, subject)

    # 2. If nothing retrieved → outside syllabus
    if not chunks:
        return "Not in syllabus"

    # 3. Build context from retrieved chunks
    context = "\n\n".join(chunks)

    # 4. Inject context into strict prompt
    prompt = PROMPT_TEMPLATE.format(
        context=context,
        question=question
    )

    # 5. Generate answer using the preloaded LLM
    answer = llm.generate(prompt)

    return answer.strip()
