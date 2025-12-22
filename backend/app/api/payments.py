from fastapi import APIRouter
from pydantic import BaseModel
from app.db.database import get_db_connection
import razorpay
import os

router = APIRouter(prefix="/payments", tags=["payments"])

# Razorpay client
client = razorpay.Client(
    auth=(
        os.getenv("RAZORPAY_KEY_ID"),
        os.getenv("RAZORPAY_KEY_SECRET")
    )
)

class PaymentRequest(BaseModel):
    user_id: int
    amount: int = 50


# -----------------------------
# Create Razorpay Order
# -----------------------------
@router.post("/create-order")
def create_order(amount: int = 50):
    order = client.order.create({
        "amount": amount * 100,  # paise
        "currency": "INR",
        "payment_capture": 1
    })
    return order


# -----------------------------
# Record Payment (after success)
# -----------------------------
@router.post("/record")
def record_payment(data: PaymentRequest):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO payments (user_id, amount, status)
        VALUES (?, ?, ?)
        """,
        (data.user_id, data.amount, "success")
    )

    conn.commit()
    conn.close()

    return {"status": "success"}


# -----------------------------
# Check Payment Status
# -----------------------------
@router.get("/status")
def payment_status(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT status FROM payments
        WHERE user_id = ? AND status = 'success'
        """,
        (user_id,)
    )

    payment = cursor.fetchone()
    conn.close()

    return {"paid": bool(payment)}
