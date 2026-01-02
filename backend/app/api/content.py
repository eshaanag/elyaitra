from fastapi import APIRouter, HTTPException
from app.db.database import get_db_connection
from app.ai_engine.retriever import retrieve
from app.ai_engine.flashcard_generator import generate_flashcards

router = APIRouter(prefix="/content", tags=["content"])


@router.get("/flashcards")
def get_flashcards(subject: str, unit: int, user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    # 🔐 Check payment
    cursor.execute(
        "SELECT 1 FROM payments WHERE user_id = ? AND status = 'success'",
        (user_id,)
    )
    paid = cursor.fetchone() is not None

    if not paid:
        conn.close()
        raise HTTPException(status_code=403, detail="Payment required")

    # 🔁 STEP 1: Check existing flashcards
    cursor.execute(
        """
        SELECT question, answer
        FROM flashcards
        WHERE subject = ? AND unit = ?
        """,
        (subject, unit),
    )
    rows = cursor.fetchall()

    if rows:
        conn.close()
        return [
            {"question": q, "answer": a}
            for q, a in rows
        ]

    # 🧠 STEP 2: Retrieve syllabus chunks
    try:
        docs = retrieve(
            question="important exam concepts",
            subject=subject,
            unit=unit
        )
    except Exception as e:
        print("❌ Retrieval failed:", e)
        conn.close()
        return []

    if not docs:
        conn.close()
        return []

    # 🧠 STEP 3: Generate flashcards
    try:
        flashcards = generate_flashcards(docs)
    except Exception as e:
        print("❌ Generation failed:", e)
        conn.close()
        return []

    if not flashcards:
        conn.close()
        return []

    # 💾 STEP 4: Save to DB
    for fc in flashcards:
        if "question" not in fc or "answer" not in fc:
            continue

        cursor.execute(
            """
            INSERT INTO flashcards (subject, unit, question, answer)
            VALUES (?, ?, ?, ?)
            """,
            (subject, unit, fc["question"], fc["answer"])
        )

    conn.commit()
    conn.close()

    # ✅ STEP 5: Return generated flashcards
    return flashcards

