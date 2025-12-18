"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setError("Login failed");
        setLoading(false);
        return;
      }

      const data = await res.json();

      // store user_id (temporary auth)
      localStorage.setItem("user_id", String(data.user_id));

      router.push("/subjects");
    } catch (err) {
      setError("Backend not reachable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-center mb-2 text-white">
            Elyaitra Login
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Enter your email to continue
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                placeholder="Email address"
                className="pl-10 h-12 w-full bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-white text-black rounded-full font-semibold text-lg mt-6 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Continue"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
