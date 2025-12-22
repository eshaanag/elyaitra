from fastapi import APIRouter
from pydantic import BaseModel
import razorpay
import os
import hmac
import hashlib
from app.db.database import get_db_connection

router = APIRouter(prefix="/payments", tags=["payments"])

client = razorpay.Client(
    auth=(
        os.getenv("RAZORPAY_KEY_ID"),
        os.getenv("RAZORPAY_KEY_SECRET")
    )
)


class PaymentRequest(BaseModel):
    user_id: int
    amount: int
    razorpay_payment_id: str
    razorpay_order_id: str
    razorpay_signature: str


@router.post("/create-order")
def create_order():
    amount_rupees = 69
    amount_paise = amount_rupees * 100

    order = client.order.create({
        "amount": amount_paise,
        "currency": "INR",
        "payment_capture": 1
    })

    return order


@router.post("/record")
def record_payment(data: PaymentRequest):
    # 🔐 Verify signature
    message = f"{data.razorpay_order_id}|{data.razorpay_payment_id}"
    secret = os.getenv("RAZORPAY_KEY_SECRET")

    generated_signature = hmac.new(
        secret.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()

    if generated_signature != data.razorpay_signature:
        return {"status": "failed", "reason": "Invalid signature"}

    conn = get_db_connection()
    cursor = conn.cursor()

    # ✅ CHECK IF USER ALREADY PAID
    cursor.execute(
        """
        SELECT 1 FROM payments
        WHERE user_id = ?
        AND status = 'success'
        LIMIT 1
        """,
        (data.user_id,)
    )

    already_paid = cursor.fetchone()

    if already_paid:
        conn.close()
        return {"status": "success", "message": "Already paid"}

    # ✅ INSERT PAYMENT ONCE
    cursor.execute(
        """
        INSERT INTO payments (user_id, amount, status)
        VALUES (?, ?, 'success')
        """,
        (data.user_id, data.amount)
    )

    conn.commit()
    conn.close()

    return {"status": "success"}
