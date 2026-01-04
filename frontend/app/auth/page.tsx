"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

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
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Invalid email or password");
      }

      // ✅ Save user session
      localStorage.setItem("user_id", String(data.user_id));

      // 2️⃣ CHECK ACCESS
      const accessRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/access/subjects?user_id=${data.user_id}`
      );

      if (!accessRes.ok) {
        throw new Error("Access check failed");
      }

      const accessData = await accessRes.json();

      // 3️⃣ REDIRECT
      if (accessData.allowed) {
        router.replace("/subjects");
      } else {
        router.replace("/payment");
      }

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="w-full max-w-sm bg-background/80 border rounded-2xl p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/elyaltra-text-logo.png"
            alt="Elyaitra"
            width={160}
            height={40}
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">
          Log in to Elyaitra
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full h-12 px-4 rounded-md border"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full h-12 px-4 rounded-md border"
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-md bg-primary text-primary-foreground"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-muted-foreground">
          Don’t have an account?{" "}
          <button
            className="underline"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
