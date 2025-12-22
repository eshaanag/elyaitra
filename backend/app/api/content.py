from fastapi import APIRouter, HTTPException
from app.db.database import get_db_connection

router = APIRouter(prefix="/content", tags=["content"])


# -----------------------------
# Flashcards
# -----------------------------
@router.get("/flashcards")
def get_flashcards(subject: str, unit: str, user_id: int):
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

    # ✅ Fetch flashcards
    cursor.execute(
        """
        SELECT question, answer
        FROM flashcards
        WHERE subject = ? AND unit = ?
        """,
        (subject, unit)
    )

    rows = cursor.fetchall()
    conn.close()

    return [
        {"question": row[0], "answer": row[1]}
        for row in rows
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
