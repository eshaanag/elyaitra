"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserId } from "@/lib/auth";

/* --------------------------------------------------
   SUBJECT CONFIG
-------------------------------------------------- */
const SUBJECTS: Record<string, { title: string; description: string }> = {
  chemistry: {
    title: "Chemistry",
    description:
      "Exam-focused chemistry tutor with important diagrams and quick revision.",
  },
  "artificial-intelligence": {
    title: "Artificial Intelligence",
    description:
      "AI concepts, machine learning basics, and exam-oriented preparation.",
  },
  mechanical: {
    title: "Mechanical Engineering",
    description:
      "Core mechanical engineering concepts explained clearly.",
  },
  python: {
    title: "Python Programming",
    description:
      "Python coding, logic, and exam-focused practice.",
  },
};

/* --------------------------------------------------
   SUBJECT → UNITS
-------------------------------------------------- */
const SUBJECT_UNITS: Record<string, string[]> = {
  chemistry: ["1", "2", "3", "4", "5"],
  "artificial-intelligence": ["1", "2", "3", "4"],
  mechanical: ["1", "2", "3", "4", "5"],
  python: ["1", "2", "3", "4", "5"],
};

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */
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

  const subject = String(params.subject || "");
  const subjectData = SUBJECTS[subject];

  /* --------------------------------------------------
     AUTH + PAYMENT GUARD
  -------------------------------------------------- */
  useEffect(() => {
    const userId = getUserId();

    // Not logged in → go to auth
    if (!userId) {
      router.replace("/auth");
      return;
    }

    // Logged in → check payment
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/access/subjects?user_id=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Explicitly unpaid → go to payment
        if (data.allowed === false) {
          router.replace("/payment");
        }
        // allowed === true → stay on tutor page
      })
      .catch(() => {
        // DO NOTHING HERE
        // Network/backend delay ≠ logout
      });
  }, [router]);


  /* --------------------------------------------------
     SUBJECT GUARD
  -------------------------------------------------- */
  useEffect(() => {
    if (!subjectData) {
      router.replace("/subjects");
    }
  }, [subjectData, router]);

  /* --------------------------------------------------
     STATE
  -------------------------------------------------- */
  const [activeTab, setActiveTab] =
    useState<"chat" | "flowcharts" | "flashcards">("chat");

  const [unit, setUnit] = useState("3");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [flowcharts, setFlowcharts] = useState<Flowchart[]>([]);
  const [hasFetchedFlowcharts, setHasFetchedFlowcharts] = useState(false);

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasFetchedFlashcards, setHasFetchedFlashcards] = useState(false);

  /* --------------------------------------------------
     FETCH FLOWCHARTS
  -------------------------------------------------- */
  useEffect(() => {
    if (activeTab !== "flowcharts") return;

    const userId = getUserId();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!userId || !apiUrl) return;

    fetch(
      `${apiUrl}/content/flowcharts?subject=${subject}&unit=${unit}&user_id=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFlowcharts(Array.isArray(data) ? data : []);
        setHasFetchedFlowcharts(true);
      })
      .catch(() => {
        setFlowcharts([]);
        setHasFetchedFlowcharts(true);
      });
  }, [activeTab, subject, unit]);

  /* --------------------------------------------------
     FETCH FLASHCARDS
  -------------------------------------------------- */
  useEffect(() => {
    if (activeTab !== "flashcards") return;

    const userId = getUserId();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!userId || !apiUrl) return;

    fetch(
      `${apiUrl}/content/flashcards?subject=${subject}&unit=${unit}&user_id=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFlashcards(Array.isArray(data) ? data : []);
        setActiveCard(0);
        setShowAnswer(false);
        setHasFetchedFlashcards(true);
      })
      .catch(() => {
        setFlashcards([]);
        setHasFetchedFlashcards(true);
      });
  }, [activeTab, subject, unit]);

  function handleSend() {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      {
        role: "assistant",
        content: "This answer is strictly based on the syllabus.",
      },
    ]);

    setInput("");
  }

  if (!subjectData) return null;

  /* --------------------------------------------------
     RENDER (ALL JSX IS HERE — THIS FIXES EVERYTHING)
  -------------------------------------------------- */
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 py-20">
        {/* HERO */}
        <div className="rounded-3xl p-10 mb-10 border border-white/10 bg-white/5">
          <h1 className="text-4xl font-bold mb-4">
            {subjectData.title} Tutor
          </h1>
          <p className="text-muted-foreground">
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
          {["chat", "flowcharts", "flashcards"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 py-2 rounded-md text-sm font-medium ${activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
                }`}
            >
              {tab === "chat" && "Chat Tutor"}
              {tab === "flowcharts" && "Exam Flowcharts"}
              {tab === "flashcards" && "Flashcards"}
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
                  className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"
                    }`}
                >
                  <span
                    className={`inline-block px-4 py-2 rounded-xl text-sm ${msg.role === "user"
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
            {flowcharts.map((fc, i) => (
              <div key={i} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{fc.title}</h3>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${fc.image}`}
                  className="rounded-xl border"
                />
              </div>
            ))}
          </div>
        )}

        {/* FLASHCARDS */}
        {activeTab === "flashcards" && (
          <div className="rounded-3xl p-8 border border-white/10 bg-white/5">
            {flashcards.length === 0 && (
              <p className="text-muted-foreground">
                Flashcards will be added soon for this unit.
              </p>
            )}

            {flashcards.length > 0 && (
              <div className="max-w-2xl mx-auto">
                <div
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="cursor-pointer rounded-2xl p-8 border border-white/10 bg-background/70 hover:bg-background/90 transition"
                >
                  <p className="text-lg leading-relaxed text-center">
                    {showAnswer
                      ? flashcards[activeCard].answer
                      : flashcards[activeCard].question}
                  </p>

                  <p className="mt-6 text-xs text-muted-foreground text-center">
                    {showAnswer ? "Tap to hide answer" : "Tap to reveal answer"}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Card {activeCard + 1} of {flashcards.length}
                  </span>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAnswer(false);
                        setActiveCard(
                          (prev) =>
                            (prev - 1 + flashcards.length) % flashcards.length
                        );
                      }}
                      className="px-3 py-1 rounded-md bg-muted hover:bg-muted/70"
                    >
                      ← Prev
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAnswer(false);
                        setActiveCard(
                          (prev) => (prev + 1) % flashcards.length
                        );
                      }}
                      className="px-3 py-1 rounded-md bg-muted hover:bg-muted/70"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
