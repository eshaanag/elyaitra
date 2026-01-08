import { useEffect, useState } from "react";
import { ArrowLeft, Brain, Code, FlaskConical, Cog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const subjects = [
  {
    id: "ai",
    title: "AI",
    description: "Master machine learning, neural networks, and AI fundamentals.",
    icon: Brain,
  },
  {
    id: "programming",
    title: "Python Programming",
    description: "Solve algorithms and build strong programming foundations.",
    icon: Code,
  },
  {
    id: "chemistry",
    title: "Chemistry",
    description: "Master organic, inorganic, and physical chemistry concepts.",
    icon: FlaskConical,
  },
  {
    id: "mechanical",
    title: "Mechanical",
    description: "Learn mechanics, thermodynamics, and engineering principles.",
    icon: Cog,
  },
];

const Subjects = () => {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);

  // 🔐 ACCESS CHECK
  useEffect(() => {
    const checkAccess = async () => {
      const userId = localStorage.getItem("user_id");

      // 1️⃣ Not logged in → signup
      if (!userId) {
        navigate("/signup", { replace: true });
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/access/subjects?user_id=${userId}`
        );
        const data = await res.json();

        // 2️⃣ Logged in → store access (NO redirect)
        setHasAccess(Boolean(data.allowed));
      } catch {
        console.error("Failed to check subject access");
      } finally {
        setChecking(false);
      }
    };

    checkAccess();
  }, [navigate, API_URL]);

  // 🧭 SUBJECT CLICK HANDLER
  const handleSubjectClick = (id: string) => {
    if (!hasAccess) {
      navigate("/payment");
      return;
    }

    navigate(`/tutor/${id}`);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading subjects…
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-background">
      {/* Back */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-muted-foreground hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Choose Your <span className="text-primary">Subject</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Select a subject to begin your exam-focused learning journey.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <button
                key={subject.id}
                onClick={() => handleSubjectClick(subject.id)}
                className="group relative text-left p-8 rounded-2xl border border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all"
              >
                {!hasAccess && (
                  <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center text-sm font-semibold text-white">
                    Unlock to access
                  </div>
                )}

                <div className="relative flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {subject.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {subject.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Subjects;
