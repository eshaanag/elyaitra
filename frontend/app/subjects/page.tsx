import Link from "next/link";
import Image from "next/image";

const SUBJECTS = [
  {
    id: "ai",
    title: "AI",
    description: "Master machine learning, neural networks, and AI fundamentals.",
    route: "/tutor/artificial-intelligence",
    gradient: "from-orange-500 to-red-400",
  },
  {
    id: "programming",
    title: "Programming",
    description: "Solve algorithms and data structures with expert guidance.",
    route: "/tutor/python",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    id: "chemistry",
    title: "Chemistry",
    description: "Master organic, inorganic, and physical chemistry concepts.",
    route: "/tutor/chemistry",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    id: "mechanical",
    title: "Mechanical",
    description: "Master mechanics, thermodynamics, and engineering principles.",
    route: "/tutor/mechanical",
    gradient: "from-blue-500 to-cyan-400",
  },
];

export default function SubjectsPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] bg-accent/10 rounded-full blur-[120px]" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center">
          <Image src="/elyaltra-logo.png" alt="Elyaitra" width={140} height={48} priority />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Choose Your <span className="text-gradient">Subject</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mb-14">
          Select a subject to start your exam-focused learning journey with AI-powered tutoring.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SUBJECTS.map((s, i) => (
            <Link
              key={s.id}
              href={s.route}
              className="group relative rounded-3xl p-8 border border-white/10 
                         bg-white/5 backdrop-blur-xl
                         transition-all duration-300
                         hover:-translate-y-1 hover:shadow-2xl hover:border-primary/40"
            >
              {/* ICON */}
              <div className={`icon-box mb-6 bg-gradient-to-br ${s.gradient}`}>
                {s.id === "ai" && (
                  <svg viewBox="0 0 24 24" className="icon-svg">
                    <path d="M12 2l2.4 6.2L21 10l-6.6 1.8L12 18l-2.4-6.2L3 10l6.6-1.8L12 2z" />
                  </svg>
                )}

                {s.id === "programming" && (
                  <svg viewBox="0 0 24 24" className="icon-svg">
                    <path d="M8 17l-5-5 5-5M16 7l5 5-5 5" />
                  </svg>
                )}

                {s.id === "chemistry" && (
                  <svg viewBox="0 0 24 24" className="icon-svg">
                    <path d="M9 2h6v2l-1 2v4.5l5.5 9.5A2 2 0 0117.8 22H6.2a2 2 0 01-1.7-3l5.5-9.5V6L9 4V2z" />
                  </svg>
                )}

                {s.id === "mechanical" && (
                  <svg viewBox="0 0 24 24" className="icon-svg">
                    <path d="M14 7l3-3 3 3-3 3-3-3zM2 14l6 6 6-6-6-6-6 6z" />
                  </svg>
                )}
              </div>

              <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition">
                {s.title}
              </h3>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                {s.description}
              </p>

              <span className="inline-flex items-center text-sm font-medium text-primary 
                               opacity-0 group-hover:opacity-100 transition">
                Start Learning →
              </span>

              {/* Decorative index */}
              <span className="absolute -top-8 -right-6 text-[7rem] font-bold 
                               text-white/5 select-none pointer-events-none">
                0{i + 1}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
