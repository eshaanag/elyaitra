"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const loadRazorpay = () => {
  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    const loaded = await loadRazorpay();
    if (!loaded) {
      setError("Razorpay SDK failed to load");
      setLoading(false);
      return;
    }

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      router.push("/auth");
      return;
    }

    try {
      // 1️⃣ Create order from backend
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/create-order`,
        { method: "POST" }
      );
      const order = await orderRes.json();

      // 2️⃣ Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount, // 6900 paise
        currency: "INR",
        name: "Elyaitra",
        description: "IA-2 Complete Access",
        order_id: order.id,

        handler: async (response: any) => {
          // 3️⃣ Verify & record payment
          await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/record`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: Number(userId),
                amount: 69,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          router.push("/subjects");
        },

        theme: { color: "#18181b" },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">IA-2 Complete Access</h1>
        <p className="mt-2">One-time payment</p>

        <div className="my-4 text-center text-4xl font-extrabold">₹69</div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-4 w-full rounded bg-black py-3 text-white"
        >
          {loading ? "Processing..." : "Pay & Start"}
        </button>
      </div>
    </div>
  );
}
