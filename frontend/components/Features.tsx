'use client';

import { motion } from "framer-motion";
import { Brain, Clock, Zap, Target, TrendingUp, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ProblemSolution() {
  const painPoints = [
    { title: "Limited Time", desc: "Struggling to balance academics with life." },
    { title: "Academic Pressure", desc: "Overwhelmed by constant deadlines." },
    { title: "Inefficient Study", desc: "Spending hours without retaining info." }
  ];

  const aiCapabilities = [
    { 
      icon: <Brain className="w-6 h-6 text-indigo-400" />, 
      title: "AI-Assisted Learning", 
      desc: "Get personalized, context-aware explanations instantly." 
    },
    { 
      icon: <Target className="w-6 h-6 text-purple-400" />, 
      title: "Smart Task Breakdown", 
      desc: "Turn overwhelming projects into manageable steps automatically." 
    },
    { 
      icon: <TrendingUp className="w-6 h-6 text-pink-400" />, 
      title: "Productivity Optimization", 
      desc: "Optimize your schedule for peak mental performance." 
    },
    { 
      icon: <ShieldCheck className="w-6 h-6 text-blue-400" />, 
      title: "Personalized Guidance", 
      desc: "An AI tutor that adapts to your specific learning style." 
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Pain Points (Section 3) */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">The Student Struggle is Real</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We understand the challenges you face every day.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {painPoints.map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-400">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                <p className="text-muted-foreground">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Capabilities (Section 4) */}
        <div>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-4">
              <Zap size={12} />
              Core Technology
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">What Our AI Model Does</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built specifically for academic contexts to maximize your potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiCapabilities.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Card className="h-full bg-background border-white/10 p-6 relative z-10 hover:translate-y-[-4px] transition-transform duration-300">
                  <div className="h-12 w-12 rounded-xl bg-background border border-white/10 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
