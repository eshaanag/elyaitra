import os
from app.ai_engine.retriever import retrieve
from app.ai_engine.llm_client import GeminiClient

# One Gemini client for generation
llm = GeminiClient()

# --------------------------------------------------
# Load rules from chat.txt (SYSTEM PROMPT)
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROMPT_PATH = os.path.join(BASE_DIR, "prompts", "chat.txt")

with open(PROMPT_PATH, "r", encoding="utf-8") as f:
    SYSTEM_PROMPT = f.read().strip()


def is_question_about_subject(question: str, subject: str) -> bool:
    """
    Allows foundational concepts needed to study the subject.
    Blocks questions belonging to other subjects.
    """

    prompt = f"""
{SYSTEM_PROMPT}

Answer only YES or NO.

A student is studying the subject "{subject}".

Is the following question EITHER:
- a core topic of {subject}, OR
- a basic foundational concept needed to understand {subject}?

If it belongs mainly to a DIFFERENT subject, answer NO.

Question: {question}
"""

    response = llm.generate(prompt).strip().upper()
    return response.startswith("YES")


def generate_chat_response(question: str, subject: str) -> str:
    """
    Subject-bounded RAG pipeline:
    """

    chunks = retrieve(question, subject)

    # --------------------------------------------------
    # Case 1: No syllabus context
    # --------------------------------------------------
    if not chunks:
        if not is_question_about_subject(question, subject):
            return "Not in syllabus"

        prompt = f"""
{SYSTEM_PROMPT}

You are an exam-focused tutor for the subject {subject}.
Answer clearly and concisely.
Do NOT include content from other subjects.

Question:
{question}

Answer:
"""
        return llm.generate(prompt)

    # --------------------------------------------------
    # Case 2: Syllabus context found (STRICT RAG)
    # --------------------------------------------------
    context = "\n\n".join(chunks)

    prompt = f"""
{SYSTEM_PROMPT}

--- SYLLABUS CONTEXT ---
{context}

--- QUESTION ---
{question}

--- ANSWER ---
"""

    return llm.generate(prompt)
