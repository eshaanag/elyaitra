import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

/* --------------------------------------------------
   SUBJECT CONFIG (UI)
-------------------------------------------------- */
const SUBJECTS: Record<string, { title: string; description: string }> = {
  ai: {
    title: "Artificial Intelligence",
    description: "AI concepts, machine learning basics, and exam-oriented preparation.",
  },
  chemistry: {
    title: "Chemistry",
    description: "Exam-focused chemistry explanations with diagrams and revision.",
  },
  mechanical: {
    title: "Mechanical Engineering",
    description: "Core mechanical concepts explained clearly for exams.",
  },
  programming: {
    title: "Python Programming",
    description: "Python logic, coding practice, and exam-focused preparation.",
  },
};

/* --------------------------------------------------
   SUBJECT → BACKEND MAP (CRITICAL)
-------------------------------------------------- */
const SUBJECT_MAP: Record<string, string> = {
  ai: "artificial-intelligence",
  chemistry: "chemistry",
  mechanical: "mechanical",
  programming: "python",
};

/* --------------------------------------------------
   SUBJECT → UNITS
-------------------------------------------------- */
const SUBJECT_UNITS: Record<string, string[]> = {
  ai: ["1", "2", "3", "4"],
  chemistry: ["1", "2", "3", "4", "5"],
  mechanical: ["1", "2", "3", "4", "5"],
  programming: ["1", "2", "3", "4", "5"],
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

export default function Tutor() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const subjectData = subject ? SUBJECTS[subject] : null;
  const backendSubject = subject ? SUBJECT_MAP[subject] : null;

  /* --------------------------------------------------
     AUTH + PAYMENT GUARD
  -------------------------------------------------- */
  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    // Not logged in → signup
    if (!userId) {
      navigate("/signup", { replace: true });
      return;
    }

    // Logged in → check payment
    fetch(`${API_URL}/access/subjects?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.allowed === false) {
          navigate("/payment", { replace: true });
        }
      })
      .catch(() => {
        // network issue → do nothing
      });
  }, [navigate]);

  /* --------------------------------------------------
     SUBJECT GUARD
  -------------------------------------------------- */
  useEffect(() => {
    if (!subjectData || !backendSubject) {
      navigate("/subjects", { replace: true });
    }
  }, [subjectData, backendSubject, navigate]);

  /* --------------------------------------------------
     STATE
  -------------------------------------------------- */
  const [activeTab, setActiveTab] =
    useState<"chat" | "flowcharts" | "flashcards">("chat");

  const [unit, setUnit] = useState(
    SUBJECT_UNITS[subject ?? ""]?.[0] ?? "1"
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [flowcharts, setFlowcharts] = useState<Flowchart[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  /* --------------------------------------------------
     CHAT HANDLER
  -------------------------------------------------- */
  async function handleSend() {
    if (!input.trim()) return;

    const question = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/ai/tutor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: Number(localStorage.getItem("user_id")),
          subject: backendSubject,
          unit,
          topic: unit,
          mode: "chat",
          message: question,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer || "No answer received.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to reach the AI tutor. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  /* --------------------------------------------------
     FETCH FLOWCHARTS
  -------------------------------------------------- */
  useEffect(() => {
    if (activeTab !== "flowcharts") return;

    fetch(
      `${API_URL}/content/flowcharts?subject=${backendSubject}&unit=${unit}&user_id=${localStorage.getItem(
        "user_id"
      )}`
    )
      .then((res) => res.json())
      .then((data) => setFlowcharts(Array.isArray(data) ? data : []))
      .catch(() => setFlowcharts([]));
  }, [activeTab, backendSubject, unit]);

  /* --------------------------------------------------
     FETCH FLASHCARDS
  -------------------------------------------------- */
  useEffect(() => {
    if (activeTab !== "flashcards") return;

    fetch(
      `${API_URL}/content/flashcards?subject=${backendSubject}&unit=${unit}&user_id=${localStorage.getItem(
        "user_id"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFlashcards(Array.isArray(data) ? data : []);
        setActiveCard(0);
        setShowAnswer(false);
      })
      .catch(() => setFlashcards([]));
  }, [activeTab, backendSubject, unit]);

  if (!subjectData) return null;

  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* HERO */}
        <div className="rounded-3xl p-10 mb-10 border border-border bg-card/40">
          <h1 className="text-4xl font-bold mb-4 text-white">
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
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            {SUBJECT_UNITS[subject!]?.map((u) => (
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
              className={`px-5 py-2 rounded-md text-sm font-medium ${
                activeTab === tab
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
          <div className="rounded-3xl p-8 border border-border bg-card">
            <div className="min-h-[260px] rounded-xl border border-border bg-background/60 p-4 mb-4">
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
                placeholder="Ask a syllabus question…"
                className="flex-1 rounded-md border border-border bg-background px-4 py-2"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="px-6 py-2 rounded-md bg-primary text-primary-foreground"
              >
                {loading ? "Thinking…" : "Ask"}
              </button>
            </div>
          </div>
        )}

        {/* FLOWCHARTS */}
        {activeTab === "flowcharts" && (
          <div className="rounded-3xl p-8 border border-border bg-card">
            {flowcharts.length === 0 && (
              <p className="text-muted-foreground">
                Flowcharts will be added soon for this unit.
              </p>
            )}

            {flowcharts.map((fc, i) => (
              <div key={i} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{fc.title}</h3>
                <img
                  src={`${API_URL}${fc.image}`}
                  className="rounded-xl border"
                />
              </div>
            ))}
          </div>
        )}

        {/* FLASHCARDS */}
        {activeTab === "flashcards" && (
          <div className="rounded-3xl p-8 border border-border bg-card">
            {flashcards.length === 0 && (
              <p className="text-muted-foreground">
                Flashcards will be added soon for this unit.
              </p>
            )}

            {flashcards.length > 0 && (
              <div className="max-w-2xl mx-auto">
                <div
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="cursor-pointer rounded-2xl p-8 border border-border bg-background/70 hover:bg-background/90 transition"
                >
                  <p className="text-lg text-center">
                    {showAnswer
                      ? flashcards[activeCard].answer
                      : flashcards[activeCard].question}
                  </p>

                  <p className="mt-6 text-xs text-muted-foreground text-center">
                    Click to {showAnswer ? "hide" : "reveal"} answer
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Card {activeCard + 1} of {flashcards.length}
                  </span>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowAnswer(false);
                        setActiveCard(
                          (prev) =>
                            (prev - 1 + flashcards.length) % flashcards.length
                        );
                      }}
                      className="px-3 py-1 rounded-md bg-muted"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => {
                        setShowAnswer(false);
                        setActiveCard(
                          (prev) => (prev + 1) % flashcards.length
                        );
                      }}
                      className="px-3 py-1 rounded-md bg-muted"
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
