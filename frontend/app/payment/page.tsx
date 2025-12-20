"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    const userId = localStorage.getItem("user_id") || "123";

    setLoading(true);
    setError("");

    try {
      // Temporary mock delay (replace with Razorpay later)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // After successful payment
      router.push("/subjects");
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        
        <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          One-Time Payment
        </div>

        <h1 className="text-2xl font-bold tracking-tight">
          IA-2 Complete Access
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          One-time payment for internal assessment preparation.
        </p>

        <div className="my-6 text-center">
          <span className="text-4xl font-bold">₹11</span>
        </div>

        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            All 4 core subjects
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            Exam-focused answers
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            No subscription
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            Pay once, use during exams
          </li>
        </ul>

        {error && (
          <p className="mt-4 text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-black py-3 text-white font-medium transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Processing..." : "Pay & Start"}
        </button>
      </div>
    </div>
  );
}
