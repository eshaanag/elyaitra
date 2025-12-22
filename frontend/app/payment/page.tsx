"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const loadRazorpay = () => {
  return new Promise((resolve) => {
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

    const razorpayLoaded = await loadRazorpay();
    if (!razorpayLoaded) {
      setError("Payment service failed to load.");
      setLoading(false);
      return;
    }

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      router.push("/auth");
      return;
    }

    try {
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/create-order`,
        { method: "POST" }
      );

      const order = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Elyaitra",
        description: "IA-2 Complete Access",
        order_id: order.id,
        handler: async () => {
          await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/record`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: Number(userId),
                amount: 50,
              }),
            }
          );
          router.push("/subjects");
        },
        theme: { color: "#18181b" },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch {
      setError("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800" />

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-black/10">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            One-Time Payment
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            IA-2 Complete Access
          </h1>

          <p className="mt-2 text-sm text-zinc-600">
            One-time payment for internal assessment preparation.
          </p>

          <div className="my-6 text-center">
            <span className="text-5xl font-extrabold text-zinc-900">₹50</span>
          </div>

          <ul className="space-y-3 text-sm text-zinc-700">
            <li className="flex gap-2"><span className="text-green-600">✓</span>All 4 core subjects</li>
            <li className="flex gap-2"><span className="text-green-600">✓</span>Exam-focused answers</li>
            <li className="flex gap-2"><span className="text-green-600">✓</span>No subscription</li>
            <li className="flex gap-2"><span className="text-green-600">✓</span>Pay once, use during exams</li>
          </ul>

          {error && (
            <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-zinc-900 py-3.5 text-white font-semibold hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? "Processing..." : "Pay & Start"}
          </button>
        </div>
      </div>
    </>
  );
}
