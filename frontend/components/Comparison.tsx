'use client';

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Comparison() {
  return (
    <section id="comparison" className="py-24 bg-white/[0.02] border-y border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why Choose Us?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how ElyAItra compares to traditional study methods.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-background/50 backdrop-blur-sm">
          <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-white/5">
            <div className="font-bold text-muted-foreground">Feature</div>
            <div className="font-bold text-center text-muted-foreground">Traditional</div>
            <div className="font-bold text-center text-primary text-lg">ElyAItra</div>
          </div>
          
          {[
            { name: "Speed", traditional: "Slow", elyaitra: "Instant" },
            { name: "Personalization", traditional: "Generic", elyaitra: "Tailored to You" },
            { name: "Availability", traditional: "Limited", elyaitra: "24/7" },
            { name: "Cost", traditional: "High ($$$)", elyaitra: "Affordable" },
            { name: "Accuracy", traditional: "Variable", elyaitra: "High Precision" },
          ].map((row, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-3 p-6 border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
            >
              <div className="font-medium text-white">{row.name}</div>
              <div className="text-center text-muted-foreground flex justify-center items-center gap-2">
                <X size={16} className="text-red-500/50" />
                {row.traditional}
              </div>
              <div className="text-center text-white font-semibold flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                <Check size={16} className="text-primary" />
                {row.elyaitra}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
