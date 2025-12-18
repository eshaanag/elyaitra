"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/**
 * Elyaitra v1 supported subjects ONLY
 */
const ALLOWED_SUBJECTS = [
    "maths",
    "programming",
    "physics",
    "electrical",
];

export default function TutorPage() {
    const params = useParams();
    const router = useRouter();

    // ---------- SUBJECT HANDLING ----------
    const rawSubject = params.subject;

    const subject =
        typeof rawSubject === "string"
            ? rawSubject
            : Array.isArray(rawSubject)
                ? rawSubject[0]
                : "";

    // ---------- BLOCK INVALID SUBJECTS ----------
    useEffect(() => {
        if (!subject || !ALLOWED_SUBJECTS.includes(subject)) {
            router.replace("/subjects");
        }
    }, [subject, router]);

    // ---------- CHAT STATE ----------
    const [messages, setMessages] = useState<
        { role: "user" | "assistant"; content: string }[]
    >([]);

    const [input, setInput] = useState("");
    async function getTutorResponse(question: string) {
        // TEMPORARY mock
        return "This is a sample exam-focused answer.";
    }

    // ---------- SEND HANDLER ----------
    function handleSend() {
        if (!input.trim()) return;

        // Add user message
        setMessages((prev) => [
            ...prev,
            { role: "user", content: input },
        ]);

        // Fake AI response (temporary)
        getTutorResponse(input).then((answer) => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: answer,
                },
            ]);
        });


        setInput("");
    }

    // ---------- UI ----------
    return (
        <div style={{ padding: 40 }}>
            <h1 style={{ fontSize: 28, fontWeight: "bold" }}>
                {subject ? subject.toUpperCase() : "SUBJECT"} Tutor
            </h1>

            <p style={{ marginTop: 10, color: "#666" }}>
                Ask exam-focused questions from the syllabus.
            </p>

            {/* CHAT AREA */}
            <div
                style={{
                    marginTop: 30,
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 20,
                    minHeight: 300,
                }}
            >
                {messages.length === 0 && (
                    <p style={{ color: "#999" }}>
                        No messages yet. Ask a question from the syllabus.
                    </p>
                )}

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: 10,
                            textAlign: msg.role === "user" ? "right" : "left",
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                padding: "8px 12px",
                                borderRadius: 6,
                                background:
                                    msg.role === "user" ? "#e5e7eb" : "#f3f4f6",
                            }}
                        >
                            {msg.content}
                        </span>
                    </div>
                ))}
            </div>

            {/* INPUT + SEND */}
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                <input
                    type="text"
                    placeholder="Ask a question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{
                        flex: 1,
                        padding: 12,
                        borderRadius: 6,
                        border: "1px solid #ccc",
                    }}
                />

                <button
                    onClick={handleSend}
                    style={{
                        padding: "12px 20px",
                        borderRadius: 6,
                        background: "black",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
