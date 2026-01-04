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
              amount: 1,
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
      {/* Razorpay SDK */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setRazorpayReady(true)}
        onError={() =>
          setError("Failed to load payment system. Please refresh.")
        }
      />

      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800" />

      {checking ? (
        <div className="min-h-screen flex items-center justify-center text-white">
          Checking payment status...
        </div>
      ) : (
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-black/10">
            <div className="mb-4 inline-block rounded-full bg-zinc-900/10 px-3 py-1 text-sm font-medium text-zinc-900">
              One-Time Payment
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              IA-2 Complete Access
            </h1>

            <p className="mt-2 text-sm text-zinc-600">
              Full access to exam-focused answers and preparation material.
            </p>

            <div className="my-6 text-center">
              <span className="text-5xl font-extrabold text-zinc-900">
                ₹1
              </span>
              <p className="mt-1 text-sm text-zinc-500">
                Pay once • No subscription
              </p>
            </div>

            <ul className="space-y-3 text-sm text-zinc-700">
              <li className="flex gap-2">
                <span className="text-green-600">✓</span> All 4 core subjects
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span> Exam-oriented answers
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span> AI-assisted explanations
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span> Valid during IA exams
              </li>
            </ul>

            {error && (
              <p className="mt-4 text-sm text-red-500 text-center">
                {error}
              </p>
            )}

            <button
              onClick={handlePayment}
              disabled={loading || !razorpayReady}
              className="mt-6 w-full rounded-xl bg-zinc-900 py-3.5 text-white font-semibold hover:bg-zinc-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Processing..."
                : razorpayReady
                ? "Pay & Start"
                : "Loading payment..."}
            </button>

            <p className="mt-4 text-xs text-center text-zinc-500">
              Secure payments powered by Razorpay
            </p>
          </div>
        </div>
      )}
    </>
  );
}
