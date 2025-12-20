from fastapi import APIRouter
from app.db.database import get_db_connection

router = APIRouter(prefix="/access", tags=["access"])

#  TEMPORARY: Enable free access for IA-2
# After IA-2, change this to False
IA2_FREE_MODE = False


@router.get("/subjects")
def can_access_subjects(user_id: int):
    # ✅ IA-2 FREE ACCESS MODE
    if IA2_FREE_MODE:
        return {"allowed": True}

    # 🔒 Normal paid access logic (kept intact)
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT 1 FROM payments WHERE user_id = ? LIMIT 1",
        (user_id,)
    )
    payment = cursor.fetchone()

    conn.close()

    return {
        "allowed": payment is not None
    }
