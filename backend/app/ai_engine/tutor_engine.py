# backend/app/ai_engine/tutor_engine.py

from typing import List, Dict

from app.ai_engine.retriever import retrieve
from app.ai_engine.llm_client import GeminiClient
from app.ai_engine.prompts import chat as chat_prompt
from app.ai_engine.prompts import flashcards as flashcard_prompt


ALLOWED_MODES = {"chat", "flowchart", "flashcard", "quiz"}


class TutorEngine:
    def __init__(self):
        self.llm = GeminiClient()

    def respond(
        self,
        *,
        user_id: int,
        subject: str,
        unit: str,
        topic: str,
        mode: str,
        message: str
    ) -> Dict[str, List[str] | str]:

        # --------------------
        # 1. Validate mode
        # --------------------
        if mode not in ALLOWED_MODES:
            raise ValueError(f"Invalid mode: {mode}")

        # --------------------
        # 2. Retrieve syllabus content
        # --------------------
        query = message if message else topic

        docs = retrieve(
            question=query,
            subject=subject,
            unit=unit
        )

        # --------------------
        # 3. Syllabus lock
        # --------------------
        if not docs:
            return {
                "answer": "❌ This is not in your syllabus. You can safely skip this.",
                "events": []
            }

        syllabus_context = "\n".join(docs)

        # --------------------
        # 4. Build prompt
        # --------------------
        system_prompt = self._get_system_prompt(mode)

        final_prompt = f"""
{system_prompt}

SUBJECT: {subject}
UNIT: {unit}
TOPIC: {topic}
MODE: {mode}

APPROVED SYLLABUS CONTENT:
{syllabus_context}

STUDENT INPUT:
{message}
"""

        # --------------------
        # 5. Generate answer
        # --------------------
        answer = self.llm.generate(final_prompt)

        # --------------------
        # 6. Emit events
        # --------------------
        events = self._emit_events(mode)

        return {
            "answer": answer.strip(),
            "events": events
        }

    # ------------------------
    # Helpers
    # ------------------------

    def _get_system_prompt(self, mode: str) -> str:
        if mode == "chat":
            return chat_prompt.SYSTEM_PROMPT

        if mode == "flashcard":
            return flashcard_prompt.SYSTEM_PROMPT

        if mode == "flowchart":
            return (
                "You are Elyaitra Tutor AI.\n"
                "Respond ONLY in flowchart format.\n"
                "• No paragraphs\n"
                "• Use arrows\n"
                "• Step-by-step logic\n"
                "• Exam relevant only\n"
            )

        if mode == "quiz":
            return (
                "You are Elyaitra Tutor AI.\n"
                "Ask ONE exam-style question only.\n"
                "Wait for student response.\n"
                "Do not give answers unless evaluating.\n"
            )

        return ""

    def _emit_events(self, mode: str) -> List[str]:
        if mode in {"chat", "flowchart"}:
            return ["EXPLANATION_REQUESTED"]

        if mode == "flashcard":
            return ["TOPIC_VIEWED"]

        if mode == "quiz":
            return ["QUIZ_ATTEMPTED"]

        return []
