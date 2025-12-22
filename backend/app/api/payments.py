from fastapi import APIRouter
from pydantic import BaseModel
import razorpay
import os
import hmac
import hashlib
from app.db.database import get_db_connection

router = APIRouter(prefix="/payments", tags=["payments"])

# Razorpay client
client = razorpay.Client(
    auth=(
        os.getenv("RAZORPAY_KEY_ID"),
        os.getenv("RAZORPAY_KEY_SECRET")
    )
)

# -----------------------------
# Models
# -----------------------------
class PaymentRequest(BaseModel):
    user_id: int
    amount: int
    razorpay_payment_id: str
    razorpay_order_id: str
    razorpay_signature: str


# -----------------------------
# Create Razorpay Order
# -----------------------------
@router.post("/create-order")
def create_order():
    amount_rupees = 69
    amount_paise = amount_rupees * 100

    order = client.order.create({
        "amount": amount_paise,   # 6900
        "currency": "INR",
        "payment_capture": 1
    })

    return order


# -----------------------------
# Verify & Record Payment
# -----------------------------
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

    # ✅ Save payment
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
        "SELECT 1 FROM payments WHERE user_id = ? AND status = 'success'",
        (user_id,)
    )

    paid = cursor.fetchone() is not None
    conn.close()

    return {"paid": paid}
