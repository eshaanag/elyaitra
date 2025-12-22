"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ LOGIN
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();
      localStorage.setItem("user_id", String(data.user_id));

      // 2️⃣ CHECK ACCESS
      const accessRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/access/subjects?user_id=${data.user_id}`
      );

      if (!accessRes.ok) {
        throw new Error("Access check failed");
      }

      const accessData = await accessRes.json();

      // 3️⃣ REDIRECT BASED ON PAYMENT
      if (accessData.allowed) {
        router.push("/subjects");
      } else {
        router.push("/payment");
      }

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 bg-background overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full" />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-background/80 backdrop-blur-md border rounded-2xl p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <Image
              src="/elyaltra-text-logo.png"
              alt="Elyaitra"
              width={160}
              height={40}
            />
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">
            Continue to Elyaitra
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Enter your email to access your exam-focused AI tutor
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full h-12 px-4 rounded-md border bg-background outline-none focus:ring-2 focus:ring-primary transition"
            />

            {error && (
              <p className="text-sm text-red-500 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-md bg-primary text-primary-foreground font-medium transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Please wait..." : "Continue"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            No password. No spam. Pay only if you find it useful.
          </p>
        </div>
      </div>
    </div>
  );
}
