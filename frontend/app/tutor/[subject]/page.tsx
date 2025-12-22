"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* --------------------------------------------------
   SUBJECT CONFIG — MUST MATCH SubjectsPage
-------------------------------------------------- */
const SUBJECTS: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  ai: {
    title: "AI",
    description:
      "Learn artificial intelligence with a strong focus on fundamentals, intuition, and real exam-style problems.",
  },
  programming: {
    title: "Programming",
    description:
      "Strengthen problem-solving skills with algorithms, data structures, and clean coding practices.",
  },
  chemistry: {
    title: "Chemistry",
    description:
      "Understand chemistry concepts deeply with step-by-step explanations and exam-oriented practice.",
  },
  mechanical: {
    title: "Mechanical",
    description:
      "Build strong fundamentals in mechanics, thermodynamics, and core engineering subjects.",
  },
};

/* --------------------------------------------------
   LEARNING MODES
-------------------------------------------------- */
const MODES = [
  {
    id: "concepts",
    title: "Concept Learning",
    desc: "Clear explanations to understand theory from basics to exam level.",
  },
  {
    id: "problems",
    title: "Problem Solving",
    desc: "Step-by-step solutions to exam-style and numerical questions.",
  },
  {
    id: "revision",
    title: "Quick Revision",
    desc: "Fast, focused revision before tests and exams.",
  },
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function TutorPage() {
  const params = useParams();
  const router = useRouter();

  const rawSubject = params.subject;
  const subject =
    typeof rawSubject === "string"
      ? rawSubject
      : Array.isArray(rawSubject)
      ? rawSubject[0]
      : "";

  const subjectData = SUBJECTS[subject];

  /* --------------------------------------------------
     INVALID SUBJECT GUARD
  -------------------------------------------------- */
  useEffect(() => {
    if (!subjectData) {
      router.replace("/subjects");
    }
  }, [subjectData, router]);

  const [mode, setMode] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  if (!subjectData) return null;

  /* --------------------------------------------------
     MOCK RESPONSE (replace later with API)
  -------------------------------------------------- */
  async function getTutorResponse(question: string) {
    return `This is an exam-focused ${mode} explanation for ${subject.toUpperCase()}.`;
  }

  function handleSend() {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
    ]);

    getTutorResponse(input).then((answer) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: answer },
      ]);
    });

    setInput("");
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] bg-accent/10 rounded-full blur-[120px]" />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        {/* --------------------------------------------------
           SUBJECT HERO
        -------------------------------------------------- */}
        <div
          className="relative rounded-3xl p-10 mb-14
                     border border-white/10
                     bg-white/5 backdrop-blur-xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {subjectData.title} Tutor
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl">
            {subjectData.description}
          </p>
        </div>

        {/* --------------------------------------------------
           LEARNING MODES
        -------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {MODES.map((m, i) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                setMessages([]);
              }}
              className="group relative rounded-3xl p-8
                         border border-white/10
                         bg-white/5 backdrop-blur-xl
                         transition-all duration-300
                         hover:-translate-y-1 hover:shadow-2xl
                         hover:border-primary/40"
            >
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition">
                {m.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {m.desc}
              </p>

              <span
                className="absolute -top-6 -right-6 text-[6rem] font-bold
                           text-white/5 select-none pointer-events-none"
              >
                0{i + 1}
              </span>
            </button>
          ))}
        </div>

        {/* --------------------------------------------------
           CHAT SECTION
        -------------------------------------------------- */}
        {mode && (
          <div
            className="rounded-3xl p-8
                       border border-white/10
                       bg-white/5 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-semibold mb-6">
              {mode === "concepts" && "Concept Tutor"}
              {mode === "problems" && "Problem Solver"}
              {mode === "revision" && "Quick Revision Tutor"}
            </h2>

            <div
              className="min-h-[260px] rounded-xl
                         border border-white/10
                         bg-background/60 p-4 mb-4"
            >
              {messages.length === 0 && (
                <p className="text-muted-foreground">
                  Ask your first question to begin.
                </p>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-3 ${
                    msg.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block px-4 py-2 rounded-xl text-sm
                      ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 rounded-md border border-white/10
                           bg-background/80 px-4 py-2"
              />
              <button
                onClick={handleSend}
                className="px-6 py-2 rounded-md
                           bg-primary text-primary-foreground"
              >
                Ask
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
