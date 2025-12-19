"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  X,
  BookOpen,
  Clock,
  Brain,
  ArrowRight,
  Menu,
} from "lucide-react";

/* ====== ASSETS ====== */
import logoImg from "@/public/images/logo.png";
import heroBg from "@/public/images/hero-bg.png";

/* ====== NAVBAR ====== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoImg} alt="Elyaitra" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#features">Features</a>
          <a href="#why-us">Why Us</a>
        </div>

        <div className="hidden md:flex gap-4">
          <Link href="/auth" className="text-white">
            Login
          </Link>
          <Link
            href="/auth"
            className="px-5 py-2 rounded-full bg-white text-black font-semibold"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-white/10 p-6 flex flex-col gap-4">
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>
            Features
          </a>
          <a href="#why-us" onClick={() => setMobileMenuOpen(false)}>
            Why Us
          </a>
          <Link
            href="/auth"
            className="py-3 text-center bg-primary/20 text-primary rounded-lg"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ====== HERO ====== */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <img
        src="/images/hero-bg.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Learn Smarter. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Work Faster.
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            Exam-focused AI tutor for 1st semester CSE students. No fluff. Only
            syllabus.
          </p>

          <Link
            href="/auth"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ====== FEATURES / PROBLEM ====== */
function ProblemSection() {
  const problems = [
    {
      icon: <BookOpen />,
      title: "Syllabus Overload",
      desc: "Too much content, zero clarity.",
    },
    {
      icon: <Brain />,
      title: "Generic AI",
      desc: "Answers not aligned to exams.",
    },
    {
      icon: <Clock />,
      title: "Last Minute Panic",
      desc: "No time to search and filter.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {problems.map((p, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="mb-4 text-primary">{p.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
            <p className="text-gray-400">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ====== WHY US ====== */
function ComparisonSection() {
  return (
    <section id="why-us" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Why Elyaitra?
        </h2>

        {[
          ["Speed", "Slow", "Instant"],
          ["Syllabus", "Generic", "Exact"],
          ["Accuracy", "Unreliable", "Exam-grade"],
        ].map(([f, t, e], i) => (
          <div
            key={i}
            className="grid grid-cols-3 p-4 border-b border-white/10 text-center"
          >
            <div className="text-white">{f}</div>
            <div className="text-red-400 flex justify-center gap-1">
              <X className="w-4 h-4" /> {t}
            </div>
            <div className="text-primary flex justify-center gap-1">
              <Check className="w-4 h-4" /> {e}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ====== FOOTER ====== */
function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 text-center text-gray-500">
      © {new Date().getFullYear()} Elyaitra. All rights reserved.
    </footer>
  );
}

/* ====== PAGE EXPORT ====== */
export default function Page() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      <Navbar />
      <Hero />
      <ProblemSection />
      <ComparisonSection />
      <Footer />
    </div>
  );
}
