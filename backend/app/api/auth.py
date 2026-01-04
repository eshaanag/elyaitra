from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.db.database import get_db_connection

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    email: str


@router.post("/login")
def login(data: LoginRequest):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT id FROM users WHERE email = ?",
            (data.email,)
        )
        user = cursor.fetchone()

        if user:
            user_id = user["id"]
        else:
            cursor.execute(
                "INSERT INTO users (email) VALUES (?)",
                (data.email,)
            )
            conn.commit()
            user_id = cursor.lastrowid

        conn.close()

        return {
            "user_id": user_id,
            "email": data.email
        }

    except Exception as e:
        print("❌ Login error:", e)
        raise HTTPException(
            status_code=500,
            detail="Login failed"
        )



@router.get("/me")
def me(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id, email FROM users WHERE id = ?",
        (user_id,)
    )
    user = cursor.fetchone()

    if not user:
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")

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

    return {
        "user_id": user["id"],
        "email": user["email"],
        "has_paid": payment is not None
    }
