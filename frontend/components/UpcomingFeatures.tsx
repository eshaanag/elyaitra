'use client';

import { motion } from "framer-motion";
import { BookOpen, FileText, PenTool, Layout, GraduationCap } from "lucide-react";

export default function UpcomingFeatures() {
  const upcoming = [
    {
      icon: <BookOpen className="w-8 h-8 text-white" />,
      title: "AI Study Assistant",
      desc: "Your personal 24/7 tutor for any subject.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <FileText className="w-8 h-8 text-white" />,
      title: "Smart Notes & Summaries",
      desc: "Instant summaries from lectures and PDFs.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <PenTool className="w-8 h-8 text-white" />,
      title: "Assignment Helper",
      desc: "Step-by-step guidance for complex tasks.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      title: "Exam Prep Tools",
      desc: "Auto-generated quizzes and flashcards.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Layout className="w-8 h-8 text-white" />,
      title: "Personalized Dashboards",
      desc: "Track your progress and mastery visually.",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Upcoming Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are building a comprehensive ecosystem for student success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-3xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative p-8 border border-white/10 rounded-3xl h-full bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-colors">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
