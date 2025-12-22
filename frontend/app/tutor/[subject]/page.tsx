"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* --------------------------------------------------
   SUBJECT CONFIG
-------------------------------------------------- */
const SUBJECTS: Record<string, { title: string; description: string }> = {
  ai: {
    title: "AI",
    description: "Learn artificial intelligence with exam-focused explanations.",
  },
  programming: {
    title: "Programming",
    description: "Algorithms, logic, and coding for exams.",
  },
  chemistry: {
    title: "Chemistry",
    description: "Clear chemistry concepts with exam diagrams.",
  },
  mechanical: {
    title: "Mechanical",
    description: "Core mechanical engineering fundamentals.",
  },
};

/* --------------------------------------------------
   SUBJECT → UNITS
-------------------------------------------------- */
const SUBJECT_UNITS: Record<string, string[]> = {
  chemistry: ["1", "2", "3", "4", "5"],
  programming: ["1", "2", "3", "4"],
  ai: ["1", "2", "3"],
  mechanical: ["1", "2", "3", "4", "5"],
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

  useEffect(() => {
    if (!subjectData) router.replace("/subjects");
  }, [subjectData, router]);

  const [activeTab, setActiveTab] = useState<
    "chat" | "flowcharts" | "flashcards"
  >("chat");

  const [unit, setUnit] = useState("1");

  const [flowcharts, setFlowcharts] = useState<Flowchart[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loadingFlowcharts, setLoadingFlowcharts] = useState(false);
  const [loadingFlashcards, setLoadingFlashcards] = useState(false);

  useEffect(() => {
    const units = SUBJECT_UNITS[subject];
    if (units?.length) setUnit(units[0]);
  }, [subject]);

  /* --------------------------------------------------
     FETCH CONTENT (FIXED)
  -------------------------------------------------- */
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!userId || !apiUrl) return;

    if (activeTab === "flowcharts") {
      setLoadingFlowcharts(true);
      fetch(
        `${apiUrl}/content/flowcharts?subject=${subject}&unit=${unit}&user_id=${userId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setFlowcharts(Array.isArray(data) ? data : []);
        })
        .finally(() => setLoadingFlowcharts(false));
    }

    if (activeTab === "flashcards") {
      setLoadingFlashcards(true);
      fetch(
        `${apiUrl}/content/flashcards?subject=${subject}&unit=${unit}&user_id=${userId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setFlashcards(Array.isArray(data) ? data : []);
        })
        .finally(() => setLoadingFlashcards(false));
    }
  }, [activeTab, subject, unit]);

  if (!subjectData) return null;

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 py-20">
        {/* HERO */}
        <div className="rounded-3xl p-10 mb-10 border border-white/10 bg-white/5">
          <h1 className="text-4xl font-bold mb-3">{subjectData.title} Tutor</h1>
          <p className="text-muted-foreground">{subjectData.description}</p>
        </div>

        {/* UNIT SELECT */}
        <div className="mb-8 flex gap-3 items-center">
          <span className="text-sm text-muted-foreground">Unit:</span>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="rounded-md border border-white/10 bg-background px-3 py-2"
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
            { id: "flashcards", label: "Flashcards" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-5 py-2 rounded-md ${
                activeTab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* FLOWCHARTS */}
        {activeTab === "flowcharts" && (
          <div className="rounded-3xl p-8 border border-white/10 bg-white/5">
            {loadingFlowcharts ? (
              <p className="text-muted-foreground">Loading flowcharts…</p>
            ) : flowcharts.length > 0 ? (
              <div className="space-y-8">
                {flowcharts.map((fc, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-6 border border-white/10 bg-background/60"
                  >
                    <h3 className="text-lg font-semibold mb-4">{fc.title}</h3>
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${fc.image}`}
                      alt={fc.title}
                      className="rounded-xl border border-white/10 max-w-full md:max-w-3xl mx-auto"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Flowcharts for Unit {unit} will be added soon.
              </p>
            )}
          </div>
        )}

        {/* FLASHCARDS */}
        {activeTab === "flashcards" && (
          <div className="rounded-3xl p-8 border border-white/10 bg-white/5">
            {loadingFlashcards ? (
              <p className="text-muted-foreground">Loading flashcards…</p>
            ) : flashcards.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {flashcards.map((fc, i) => (
                  <Flashcard key={i} {...fc} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Flashcards for Unit {unit} will be added soon.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* FLASHCARD */
function Flashcard({ question, answer }: Flashcard) {
  const [show, setShow] = useState(false);
  return (
    <div
      onClick={() => setShow(!show)}
      className="cursor-pointer rounded-xl p-6 border border-white/10 bg-background hover:bg-background/80"
    >
      <p className="text-sm">{show ? answer : question}</p>
      <p className="mt-3 text-xs text-muted-foreground">
        {show ? "Tap to hide answer" : "Tap to reveal answer"}
      </p>
    </div>
  );
}
