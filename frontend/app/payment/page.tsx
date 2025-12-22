"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [razorpayReady, setRazorpayReady] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;

  // ✅ CHECK PAYMENT STATUS
  useEffect(() => {
    const checkPaymentStatus = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        router.push("/auth");
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/payments/status?user_id=${userId}`
        );
        const data = await res.json();

        if (data.paid) {
          router.push("/subjects");
          return;
        }
      } catch {
        console.error("Failed to check payment status");
      } finally {
        setChecking(false);
      }
    };

    checkPaymentStatus();
  }, [router, API_URL]);

  const handlePayment = async () => {
    if (!razorpayReady) {
      setError("Payment system not ready. Please wait a moment.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderRes = await fetch(`${API_URL}/payments/create-order`, {
        method: "POST",
      });
      const order = await orderRes.json();

      const razorpay = new (window as any).Razorpay({
        key: RAZORPAY_KEY,
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
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Razorpay SDK MUST be here — ALWAYS rendered */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setRazorpayReady(true)}
        onError={() =>
          setError("Failed to load payment system. Please refresh.")
        }
      />

      {checking ? (
        <div className="min-h-screen flex items-center justify-center text-white">
          Checking payment status...
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <button
            onClick={handlePayment}
            disabled={loading || !razorpayReady}
            className="px-6 py-3 bg-black text-white rounded-lg"
          >
            {loading ? "Processing..." : "Pay ₹69"}
          </button>

          {error && (
            <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
          )}
        </div>
      )}
    </>
  );
}
