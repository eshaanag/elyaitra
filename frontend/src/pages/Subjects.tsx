import { useEffect } from "react";
import {
  ArrowLeft,
  Brain,
  Code,
  FlaskConical,
  Cog,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "@/lib/api";

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
    description: "Solve algorithms and data structures with expert guidance.",
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
    description: "Master mechanics, thermodynamics, and engineering principles.",
    icon: Cog,
  },
];

const Subjects = () => {
  const navigate = useNavigate();

  // 🔐 Access Guard (same logic as Next.js)
  useEffect(() => {
    const checkAccess = async () => {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const access = await apiFetch(
          `/access/subjects?user_id=${userId}`
        );

        if (!access.allowed) {
          navigate("/payment", { replace: true });
        }
      } catch {
        navigate("/login", { replace: true });
      }
    };

    checkAccess();
  }, [navigate]);

  return (
    <div className="dark min-h-screen bg-background">
      {/* Back */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Choose Your <span className="text-primary">Subject</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Select a subject to start your exam-focused learning journey.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <Link
                  key={subject.id}
                  to={`/tutor/${subject.id}`}
                  className="group relative p-8 rounded-2xl border border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary">
                        {subject.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {subject.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subjects;
