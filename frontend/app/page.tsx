"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-6 flex flex-col">
      
      {/* HERO */}
      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Learn Smarter. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Score Faster.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-gray-400 text-lg">
          Elyaitra is an exam-focused AI tutor built specifically for
          1st-semester CSE students. Strictly syllabus-based. No fluff.
        </p>

        <button
          onClick={() => router.push("/auth")}
          className="mt-10 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition"
        >
          Start for ₹50
        </button>
      </section>

      {/* PROBLEM */}
      <section className="py-20 max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          First Semester is Overwhelming
        </h2>
        <p className="text-gray-400 text-center mb-12">
          We know exactly where students struggle.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            Too many subjects and no clarity on what actually matters for exams.
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            Generic AI gives long answers that don’t match exam expectations.
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            Last-minute panic wastes hours instead of helping you revise.
          </div>
        </div>
      </section>

      {/* WHY ELYAITRA */}
      <section className="py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Why Elyaitra Works
        </h2>

        <ul className="space-y-4 text-gray-300 text-left max-w-xl mx-auto">
          <li>✓ Answers strictly within your university syllabus</li>
          <li>✓ Short, exam-ready explanations</li>
          <li>✓ One-time ₹50 payment — no subscription</li>
          <li>✓ Built only for 1st-semester CSE students</li>
        </ul>

        <button
          onClick={() => router.push("/auth")}
          className="mt-10 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition"
        >
          Start Preparing Now
        </button>
      </section>

    </main>
  );
}
