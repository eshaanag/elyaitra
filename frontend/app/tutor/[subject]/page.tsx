"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* --------------------------------------------------
   SUBJECT CONFIG
-------------------------------------------------- */
const SUBJECTS: Record<
  string,
  { title: string; description: string }
> = {
  chemistry: {
    title: "Chemistry",
    description:
      "Exam-focused chemistry tutor with important diagrams and revision.",
  },
};

/* --------------------------------------------------
   SUBJECT → UNITS
-------------------------------------------------- */
const SUBJECT_UNITS: Record<string, string[]> = {
  chemistry: ["1", "2", "3", "4", "5"],
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Flowchart = {
  title: string;
  image: string;
};

export default function TutorPage() {
  const params = useParams();
  const router = useRouter();

  const subject = String(params.subject || "");
  const subjectData = SUBJECTS[subject];

  /* --------------------------------------------------
     GUARD
  -------------------------------------------------- */
  useEffect(() => {
    if (!subjectData) router.replace("/subjects");
  }, [subjectData, router]);

  /* --------------------------------------------------
     STATE
  -------------------------------------------------- */
  const [activeTab, setActiveTab] = useState<
    "chat" | "flowcharts"
  >("chat");

  const [unit, setUnit] = useState("3");

  // chat
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // flowcharts
  const [flowcharts, setFlowcharts] = useState<Flowchart[]>([]);
  const [loadingFlowcharts, setLoadingFlowcharts] =
    useState(false);

  /* --------------------------------------------------
     FETCH FLOWCHARTS (CORRECT)
  -------------------------------------------------- */
  useEffect(() => {
    if (activeTab !== "flowcharts") return;

    const userId = localStorage.getItem("user_id");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!userId || !apiUrl) return;

    setLoadingFlowcharts(true);

    fetch(
      `${apiUrl}/content/flowcharts?subject=${subject}&unit=${unit}&user_id=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFlowcharts(data);
        } else {
          setFlowcharts([]);
        }
      })
      .catch(() => setFlowcharts([]))
      .finally(() => setLoadingFlowcharts(false));
  }, [activeTab, subject, unit]);

  /* --------------------------------------------------
     CHAT (MOCK)
  -------------------------------------------------- */
  function handleSend() {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      {
        role: "assistant",
        content:
          "This answer is strictly based on the syllabus.",
      },
    ]);

    setInput("");
  }

  if (!subjectData) return null;

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
          <span className="text-sm text-muted-foreground">
            Unit:
          </span>
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
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-5 py-2 rounded-md text-sm font-medium ${
              activeTab === "chat"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            Chat Tutor
          </button>
          <button
            onClick={() => setActiveTab("flowcharts")}
            className={`px-5 py-2 rounded-md text-sm font-medium ${
              activeTab === "flowcharts"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            Exam Flowcharts
          </button>
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
                    msg.role === "user"
                      ? "text-right"
                      : "text-left"
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
            {loadingFlowcharts && (
              <p className="text-muted-foreground">
                Loading flowcharts…
              </p>
            )}

            {!loadingFlowcharts &&
              flowcharts.length === 0 && (
                <p className="text-muted-foreground">
                  Flowcharts for Unit {unit} will be added
                  soon.
                </p>
              )}

            {!loadingFlowcharts &&
              flowcharts.length > 0 && (
                <div className="space-y-10">
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
                        className="w-full max-w-3xl mx-auto rounded-xl border"
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}
      </main>
    </div>
  );
}
