"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const SUBJECTS: Record<string, { title: string; description: string }> = {
  chemistry: {
    title: "Chemistry",
    description: "Exam-focused chemistry tutor with diagrams and revision.",
  },
};

const SUBJECT_UNITS: Record<string, string[]> = {
  chemistry: ["1", "2", "3", "4", "5"],
};

type Message = { role: "user" | "assistant"; content: string };
type Flowchart = { title: string; image: string };

export default function TutorPage() {
  const { subject } = useParams();
  const router = useRouter();

  if (subject !== "chemistry") router.replace("/subjects");

  const [tab, setTab] = useState<"chat" | "flowcharts">("chat");
  const [unit, setUnit] = useState("3");

  // chat
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // flowcharts
  const [flowcharts, setFlowcharts] = useState<Flowchart[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH FLOWCHARTS (FIXED)
  useEffect(() => {
    if (tab !== "flowcharts") return;

    const userId = localStorage.getItem("user_id");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!userId || !apiUrl) return;

    setLoading(true);

    fetch(
      `${apiUrl}/content/flowcharts?subject=chemistry&unit=${unit}&user_id=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("FLOWCHART DATA:", data);
        if (Array.isArray(data)) setFlowcharts(data);
      })
      .finally(() => setLoading(false));
  }, [tab, unit]);

  function sendChat() {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", content: input }]);
    setMessages((m) => [
      ...m,
      { role: "assistant", content: "Exam-focused answer from syllabus." },
    ]);
    setInput("");
  }

  return (
    <div className="min-h-screen bg-background p-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Chemistry Tutor</h1>

      {/* UNIT */}
      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        className="mb-6 px-3 py-2 border rounded"
      >
        {SUBJECT_UNITS.chemistry.map((u) => (
          <option key={u} value={u}>
            Unit {u}
          </option>
        ))}
      </select>

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setTab("chat")}>Chat</button>
        <button onClick={() => setTab("flowcharts")}>Flowcharts</button>
      </div>

      {/* CHAT */}
      {tab === "chat" && (
        <div>
          <div className="min-h-[200px] border p-4 mb-3">
            {messages.map((m, i) => (
              <p key={i}>
                <b>{m.role}:</b> {m.content}
              </p>
            ))}
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border px-3 py-2 mr-2"
          />
          <button onClick={sendChat}>Send</button>
        </div>
      )}

      {/* FLOWCHARTS */}
      {tab === "flowcharts" && (
        <div>
          {loading && <p>Loading flowcharts…</p>}

          {!loading && flowcharts.length === 0 && (
            <p>No flowcharts for this unit.</p>
          )}

          {flowcharts.map((fc, i) => (
            <div key={i} className="mt-6">
              <h3 className="font-semibold mb-2">{fc.title}</h3>
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${fc.image}`}
                className="max-w-2xl border"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
