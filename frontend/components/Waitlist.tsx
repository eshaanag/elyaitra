"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section id="waitlist" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Be the first to experience <span className="text-gradient-primary">ElyAItra</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join thousands of students waiting to revolutionize their learning workflow. Get early access and exclusive launch perks.
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-2xl flex flex-col items-center gap-3"
              >
                <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-bold">You're on the list!</h3>
                <p>We'll notify you as soon as we launch.</p>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="pl-10 h-14 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 rounded-xl focus-visible:ring-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium text-lg min-w-[140px]"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? <Loader2 className="animate-spin" /> : "Join Now"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
          
          <p className="mt-6 text-sm text-muted-foreground/60">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
