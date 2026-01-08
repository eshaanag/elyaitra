import { ArrowLeft, Brain, Code, FlaskConical, Cog, Atom, Calculator, BookOpen, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const subjects = [
  {
    id: "ai",
    title: "AI",
    description: "Master machine learning, neural networks, and AI fundamentals.",
    icon: Brain,
  },
  {
    id: "programming",
    title: "Programming",
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
  {
    id: "physics",
    title: "Physics",
    description: "Explore quantum mechanics, relativity, and classical physics.",
    icon: Atom,
  },
  {
    id: "mathematics",
    title: "Mathematics",
    description: "Master calculus, algebra, statistics, and advanced mathematics.",
    icon: Calculator,
  },
  {
    id: "biology",
    title: "Biology",
    description: "Study cellular biology, genetics, and life sciences.",
    icon: BookOpen,
  },
  {
    id: "geography",
    title: "Geography",
    description: "Explore physical and human geography concepts.",
    icon: Globe,
  },
];

const Subjects = () => {
  return (
    <div className="dark min-h-screen bg-background">
      {/* Back link */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Hero Section */}
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

      {/* Subjects Grid */}
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
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        {subject.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {subject.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl border border-border/30 bg-card/20 p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Don't see your subject?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We're constantly adding new subjects. Let us know what you'd like to learn next.
              </p>
              <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Request a Subject
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subjects;