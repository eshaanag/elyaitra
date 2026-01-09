import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

/* ---------------- SUBJECT CONFIG ---------------- */
const SUBJECTS: Record<string, { title: string; description: string }> = {
  ai: {
    title: "Artificial Intelligence",
    description: "AI concepts, ML basics, and exam-oriented preparation.",
  },
  chemistry: {
    title: "Chemistry",
    description: "Exam-focused chemistry explanations and revisions.",
  },
  mechanical: {
    title: "Mechanical Engineering",
    description: "Core mechanical concepts explained simply.",
  },
  programming: {
    title: "Python Programming",
    description: "Python logic, coding, and exam practice.",
  },
};

export default function Tutor() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const subjectData = subject ? SUBJECTS[subject] : null;

  /* ---------------- AUTH + PAYMENT GUARD ---------------- */
  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      navigate("/signup", { replace: true });
      return;
    }

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

  /* ---------------- SUBJECT GUARD ---------------- */
  useEffect(() => {
    if (!subjectData) {
      navigate("/subjects", { replace: true });
    }
  }, [subjectData, navigate]);

  /* ---------------- CHAT STATE ---------------- */
  const [unit, setUnit] = useState("1");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
          subject,
          unit,
          message: question,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer || "No response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to reach tutor. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!subjectData) return null;

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {subjectData.title}
          </h1>
          <p className="text-muted-foreground">
            {subjectData.description}
          </p>
        </div>

        {/* Unit Selector */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground mr-2">Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="bg-background border border-border rounded-md px-3 py-2"
          >
            {["1", "2", "3", "4", "5"].map((u) => (
              <option key={u} value={u}>
                Unit {u}
              </option>
            ))}
          </select>
        </div>

        {/* Chat Box */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="min-h-[250px] mb-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-muted-foreground">
                Ask a question from Unit {unit}.
              </p>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm ${
                  m.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-xl ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {m.content}
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
              className="rounded-md bg-primary px-6 py-2 text-primary-foreground"
            >
              {loading ? "Thinking…" : "Ask"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
