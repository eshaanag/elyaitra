"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;

  const handlePayment = async () => {
    if (!(window as any).Razorpay) {
      setError("Payment system not ready. Please refresh.");
      return;
    }

    setLoading(true);

    const orderRes = await fetch(`${API_URL}/payments/create-order`, {
      method: "POST",
    });
    const order = await orderRes.json();

    const razorpay = new (window as any).Razorpay({
      key: KEY,
      amount: order.amount,
      currency: "INR",
      order_id: order.id,
      name: "Elyaitra",
      description: "IA-2 Complete Access",

      handler: async (response: any) => {
        await fetch(`${API_URL}/payments/record`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: Number(localStorage.getItem("user_id")),
            amount: 69,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        router.push("/subjects");
      },
    });

    razorpay.open();
    setLoading(false);
  };

  return (
    <>
      {/* ✅ Razorpay SDK – Next.js safe */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay & Start"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
