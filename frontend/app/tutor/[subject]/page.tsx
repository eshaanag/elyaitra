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
   SUBJECT → UNITS MAP
-------------------------------------------------- */
const SUBJECT_UNITS: Record<string, string[]> = {
  chemistry: ["1", "2", "3", "4", "5"],
  programming: ["1", "2", "3", "4"],
  ai: ["1", "2", "3"],
  mechanical: ["1", "2", "3", "4", "5"],
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Flowchart = {
  title: string;
  image: string;
};

type Flashcard = {
  question: string;
  answer: string;
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

  /* --------------------------------------------------
     STATE
  -------------------------------------------------- */
  const [activeTab, setActiveTab] = useState<
    "chat" | "flowcharts" | "flashcards"
  >("chat");

  const [unit, setUnit] = useState("1");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [flowcharts, setFlowcharts] = useState<Flowchart[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  /* --------------------------------------------------
     RESET UNIT WHEN SUBJECT CHANGES
  -------------------------------------------------- */
  useEffect(() => {
    const units = SUBJECT_UNITS[subject];
    if (units?.length) {
      setUnit(units[0]);
    }
  }, [subject]);

  if (!subjectData) return null;

  /* --------------------------------------------------
     FETCH CONTENT
  -------------------------------------------------- */
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!userId || !apiUrl) return;

    if (activeTab === "flowcharts") {
      setFlowcharts([]);
      fetch(
        `${apiUrl}/content/flowcharts?subject=${subject}&unit=${unit}&user_id=${userId}`
      )
        .then((res) => res.json())
        .then((data) => setFlowcharts(Array.isArray(data) ? data : []))
        .catch(() => setFlowcharts([]));
    }

    if (activeTab === "flashcards") {
      setFlashcards([]);
      fetch(
        `${apiUrl}/content/flashcards?subject=${subject}&unit=${unit}&user_id=${userId}`
      )
        .then((res) => res.json())
        .then((data) => setFlashcards(Array.isArray(data) ? data : []))
        .catch(() => setFlashcards([]));
    }
  }, [activeTab, subject, unit]);

  /* --------------------------------------------------
     MOCK CHAT (AI LATER)
  -------------------------------------------------- */
  async function getTutorResponse() {
    return `This explanation is strictly based on the ${subject.toUpperCase()} syllabus for Unit ${unit}.`;
  }

  function handleSend() {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    getTutorResponse().then((answer) => {
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    });

    setInput("");
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 py-20">
        {/* SUBJECT HERO */}
        <div className="rounded-3xl p-10 mb-10 border border-white/10 bg-white/5">
          <h1 className="text-4xl font-bold mb-4">
            {subjectData.title} Tutor
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {subjectData.description}
          </p>
        </div>

        {/* UNIT SELECTOR */}
        <div className="mb-8 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Unit:</span>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="rounded-md border border-white/10 bg-background px-3 py-2 text-sm"
          >
            {SUBJECT_UNITS[subject]?.map((u) => (
              <option key={u} value={u}>
                Unit {u}
              </option>
            ))}
          </select>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-10">
          {[
            { id: "chat", label: "Chat Tutor" },
            { id: "flowcharts", label: "Exam Flowcharts" },
            { id: "flashcards", label: "Important Flashcards" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-md text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CHAT */}
        {activeTab === "chat" && (
          <div className="rounded-3xl p-8 border border-white/10 bg-white/5">
            <div className="min-h-[260px] rounded-xl border border-white/10 bg-background/60 p-4 mb-4">
              {messages.length === 0 && (
                <p className="text-muted-foreground">
                  Ask a question from Unit {unit}.
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
                    className={`inline-block px-4 py-2 rounded-xl text-sm ${
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
                placeholder="Ask a syllabus question..."
                className="flex-1 rounded-md border border-white/10 bg-background px-4 py-2"
              />
              <button
                onClick={handleSend}
                className="px-6 py-2 rounded-md bg-primary text-primary-foreground"
              >
                Ask
              </button>
            </div>
          </div>
        )}

        {/* FLOWCHARTS */}
        {activeTab === "flowcharts" && (
          <div className="rounded-3xl p-8 border border-white/10 bg-white/5">
            {flowcharts.length === 0 ? (
              <p className="text-muted-foreground">
                Flowcharts for Unit {unit} will be added soon.
              </p>
            ) : (
              <div className="space-y-8">
                {flowcharts.map((fc, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-6 border border-white/10 bg-background/60"
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      {fc.title}
                    </h3>
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${fc.image}`}
                      alt={fc.title}
                      className="rounded-xl border border-white/10 bg-transparent max-w-full md:max-w-3xl mx-auto"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FLASHCARDS */}
        {activeTab === "flashcards" && (
          <div className="rounded-3xl p-8 border border-white/10 bg-white/5">
            {flashcards.length === 0 ? (
              <p className="text-muted-foreground">
                Flashcards for Unit {unit} will be added soon.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {flashcards.map((fc, i) => (
                  <Flashcard
                    key={i}
                    question={fc.question}
                    answer={fc.answer}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* FLASHCARD COMPONENT */
function Flashcard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div
      onClick={() => setShow(!show)}
      className="cursor-pointer rounded-xl p-6 border border-white/10 bg-background hover:bg-background/80 transition"
    >
      <p className="text-sm">{show ? answer : question}</p>
      <p className="mt-3 text-xs text-muted-foreground">
        {show ? "Tap to hide answer" : "Tap to reveal answer"}
      </p>
    </div>
  );
}
