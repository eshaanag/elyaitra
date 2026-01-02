from fastapi import APIRouter, HTTPException
from app.db.database import get_db_connection
from app.ai_engine.retriever import retrieve
from app.ai_engine.flashcard_generator import generate_flashcards

router = APIRouter(prefix="/content", tags=["content"])


@router.get("/flashcards")
def get_flashcards(subject: str, unit: int, user_id: int):

    # 🔐 PAYMENT CHECK
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT 1 FROM payments WHERE user_id = ? AND status = 'success'",
        (user_id,)
    )
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=403, detail="Payment required")

    # 🔁 CHECK DB FIRST
    cursor.execute(
        """
        SELECT question, answer
        FROM flashcards
        WHERE subject = ? AND unit = ?
        """,
        (subject, unit)
    )
    rows = cursor.fetchall()

    if rows:
        conn.close()
        return [
            {"question": q, "answer": a}
            for q, a in rows
        ]

    # 🧠 FIRST TIME → GENERATE
    docs = retrieve(
        question="important exam concepts",
        subject=subject,
        unit=unit
    )

    if not docs:
        conn.close()
        return []

    flashcards = generate_flashcards(docs)

    # 💾 SAVE TO DB
    for fc in flashcards:
        cursor.execute(
            """
            INSERT INTO flashcards (subject, unit, question, answer)
            VALUES (?, ?, ?, ?)
            """,
            (subject, unit, fc["question"], fc["answer"])
        )

    conn.commit()
    conn.close()

    return flashcards
