from fastapi import APIRouter, HTTPException
from app.db.database import get_db_connection
from app.ai_engine.retriever import retrieve

router = APIRouter(prefix="/content", tags=["content"])


@router.get("/flashcards")
def get_flashcards(subject: str, unit: int, user_id: int):
    # 🔐 Check payment (KEEP THIS)
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT 1 FROM payments WHERE user_id = ? AND status = 'success'",
        (user_id,)
    )
    paid = cursor.fetchone() is not None
    conn.close()

    if not paid:
        raise HTTPException(status_code=403, detail="Payment required")

    # ✅ Retrieve syllabus chunks
    docs = retrieve(
        question="important concepts",
        subject=subject,
        unit=unit
    )

    if not docs:
        return []

    # TEMP: return raw chunks as flashcards
    return [
        {
            "question": f"Explain concept {i+1}",
            "answer": doc
        }
        for i, doc in enumerate(docs)
    ]

# -----------------------------
# Flowcharts
# -----------------------------
@router.get("/flowcharts")
def get_flowcharts(subject: str, unit: str, user_id: int):
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

    # ✅ Fetch flowcharts
    cursor.execute(
        """
        SELECT title, image_path
        FROM flowcharts
        WHERE subject = ? AND unit = ?
        """,
        (subject, unit)
    )

    rows = cursor.fetchall()
    conn.close()

    return [
        {"title": row[0], "image": row[1]}
        for row in rows
    ]
