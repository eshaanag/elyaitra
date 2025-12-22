from fastapi import APIRouter
from app.db.database import get_db_connection

router = APIRouter(prefix="/access", tags=["access"])

IA2_FREE_MODE = False


@router.get("/subjects")
def can_access_subjects(user_id: int):
    if IA2_FREE_MODE:
        return {"allowed": True}

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT 1 FROM payments
        WHERE user_id = ?
        AND status = 'success'
        LIMIT 1
        """,
        (user_id,)
    )

    payment = cursor.fetchone()
    conn.close()

    return {"allowed": payment is not None}
