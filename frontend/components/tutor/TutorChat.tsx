"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function TutorChat({ subject }: { subject: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  async function getTutorResponse(question: string) {
    // TODO: connect to API route later
    return "This is a sample exam-focused answer.";
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
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold">
        {subject.toUpperCase()} Tutor
      </h1>

      <p className="mt-2 text-gray-500">
        Ask exam-focused questions from the syllabus.
      </p>

      {/* Chat box */}
      <div className="mt-8 border rounded-lg p-4 min-h-[300px] bg-white">
        {messages.length === 0 && (
          <p className="text-gray-400">
            No messages yet. Ask a question from the syllabus.
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
              className={`inline-block px-3 py-2 rounded-md text-sm ${
                msg.role === "user"
                  ? "bg-gray-200"
                  : "bg-gray-100"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 border rounded-md px-4 py-2"
        />

        <button
          onClick={handleSend}
          className="bg-black text-white px-5 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
