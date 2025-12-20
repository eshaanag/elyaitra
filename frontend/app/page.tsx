"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ---------- NAV ---------- */

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Image
          src="/elyaltra-text-logo.png"
          alt="Elyaitra"
          width={140}
          height={36}
        />

        <div className="hidden md:flex items-center gap-8 text-sm">
          <a
            href="#features"
            className="text-muted-foreground hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#why"
            className="text-muted-foreground hover:text-foreground"
          >
            Why Elyaitra
          </a>
          <a
            href="#pricing"
            className="text-muted-foreground hover:text-foreground"
          >
            Pricing
          </a>
        </div>

        <div className="hidden md:flex gap-3">
          <Link
            href="/auth"
            className="h-10 px-5 inline-flex items-center rounded-md hover:bg-muted"
          >
            Login
          </Link>
          <Link
            href="/auth"
            className="h-10 px-5 inline-flex items-center rounded-md bg-primary text-primary-foreground"
          >
            Get Started
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}
/* ---------- HERO ---------- */

function Hero() {
  return (
    <section className="relative min-h-screen pt-32 flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Learn Smarter.
          <br />
          <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            Work Faster.
          </span>
        </h1>

        {/* TEXT GROUP */}
        <div className="mt-6">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Exam-focused AI tutor for 1st semester CSE students. No fluff. No
            distractions. Just marks.
          </p>

          <p className="text-sm text-muted-foreground mt-4">
            Made with ❤️ for <span className="font-medium">BMSIT CSE</span> &{" "}
            <span className="font-medium">CSE (Chemistry Cycle)</span>.
            <br className="sm:hidden" />
            <span className="opacity-80">
              (Sorry Physics Cycle folks — your turn is coming 😄)
            </span>
          </p>
        </div>

        {/* CTA GROUP */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/auth"
            className="h-12 px-8 rounded-md bg-primary text-primary-foreground inline-flex items-center justify-center text-lg transition hover:scale-[1.02]"
          >
            Get Started
          </Link>

          <Link
            href="/auth"
            className="h-12 px-8 rounded-md border inline-flex items-center justify-center text-lg hover:bg-muted transition"
          >
            Watch Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
/* ---------- SUBJECTS ---------- */

function Subjects() {
  const data = [
    ["AI & its Applications", "All garbage & useless theory concepts taught"],
    [
      "Programming",
      "Not Snake! Learn how to write code in copy - that matters in college",
    ],
    ["Chemistry", "Yes, its in CSE syllabus! no problem, we got you covered"],
    [
      "Mechanical",
      "Course everyone chose because it's easy! we will make it easy for you",
    ],
  ];

  return (
    <section id="features" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          All 4 Core Subjects
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map(([t, d]) => (
            <div
              key={t}
              className="p-6 rounded-xl bg-card border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-2">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY ---------- */

function Why() {
  const points = [
    { icon: "🎯", title: "Exam-Focused", desc: "Only what your exam expects" },
    { icon: "📘", title: "Syllabus-Only", desc: "Strict university alignment" },
    { icon: "⏱", title: "24/7 Available", desc: "Late-night doubts solved" },
  ];

  return (
    <section id="why" className="py-28 bg-muted/40">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Elyaitra Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {points.map((p) => (
            <div
              key={p.title}
              className="p-8 bg-background rounded-xl border text-center transition hover:shadow-lg"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PRICING ---------- */

function Pricing() {
  return (
    <section id="pricing" className="py-28">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-card border rounded-xl p-10 text-center">
          <span className="inline-block mb-4 px-3 py-1 text-xs rounded-full bg-primary text-primary-foreground">
            One-Time Payment
          </span>

          <h3 className="text-2xl font-bold mb-2">Full Access</h3>
          <p className="text-muted-foreground mb-6">
            All subjects. Unlimited questions.
          </p>

          <p className="text-6xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
            ₹11
          </p>

          <ul className="text-sm text-left mb-8 space-y-2">
            <li>✓ All 4 core subjects</li>
            <li>✓ Exam-focused answers</li>
            <li>✓ No subscription</li>
            <li>✓ Pay once, use during exams</li>
          </ul>

          <Link
            href="/auth"
            className="h-12 w-full bg-primary text-primary-foreground rounded-md inline-flex items-center justify-center text-lg transition hover:scale-[1.02]"
          >
            Pay & Start
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    ["What subjects are covered?", "AI, Python, Chemistry, Mechanical."],
    ["Is this a subscription?", "No. ₹11 one-time payment."],
    [
      "Is this ChatGPT?",
      "Unlike ChatGPT, Elyaitra is trained specifically on your university syllabus. Every answer is tailored to your exam pattern and what your professors expect.",
    ],
    ["Can I use it on mobile?", "Yes. Works on any browser."],
    ["Will it go out of syllabus?", "No. It answers strictly from syllabus."],
  ];

  return (
    <section className="py-28 bg-muted/40">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">FAQs</h2>

        <div className="space-y-4">
          {faqs.map(([q, a], i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-4 flex justify-between text-left hover:bg-muted transition"
              >
                <span className="font-medium">{q}</span>
                <span>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */

function Footer() {
  return (
    <footer className="py-12 border-t">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Image
          src="/elyaltra-text-logo.png"
          alt="Elyaitra"
          width={140}
          height={36}
        />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Elyaitra
        </p>
      </div>
    </footer>
  );
}

/* ---------- PAGE ---------- */

export default function Page() {
  return (
    <div className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Subjects />
      <Why />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
