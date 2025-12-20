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
      // Mock delay (replace with Razorpay later)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect after successful payment
      router.push("/subjects");
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        relative w-full min-h-screen
        flex items-center justify-center px-4
        bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800
      "
    >
      <div
        className="
          w-full max-w-md rounded-2xl
          bg-white p-8
          shadow-2xl ring-1 ring-black/10
        "
      >
        {/* Badge */}
        <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          One-Time Payment
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          IA-2 Complete Access
        </h1>

        <p className="mt-2 text-sm text-zinc-600">
          One-time payment for internal assessment preparation.
        </p>

        {/* Price */}
        <div className="my-6 text-center">
          <span className="text-5xl font-extrabold text-zinc-900">₹11</span>
        </div>

        {/* Features */}
        <ul className="space-y-3 text-sm text-zinc-700">
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

        {/* Error */}
        {error && (
          <p className="mt-4 text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        {/* CTA */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="
            mt-6 w-full rounded-xl
            bg-zinc-900 py-3.5
            text-white font-semibold
            transition hover:bg-zinc-800
            disabled:opacity-60
          "
        >
          {loading ? "Processing..." : "Pay & Start"}
        </button>
      </div>
    </div>
  );
}
