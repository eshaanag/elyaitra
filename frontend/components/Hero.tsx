"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Premium Background with Multiple Layers */}
      <div className="absolute inset-0 z-0">
        {/* Base Image */}
        <Image
          src="/premium-bg.png"
          alt="Premium Background"
          fill
          priority
          className="object-cover"
        />

        {/* Premium Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

        {/* Animated Light Rays */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 blur-3xl rounded-full mix-blend-screen" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/10 blur-3xl rounded-full mix-blend-screen" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600/10 blur-3xl rounded-full mix-blend-screen" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Launching Soon
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
            Learn Smarter. Work Faster. <br />
            <span className="text-gradient-primary">
              Achieve More with AI.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            ElyAItra helps students complete effective academic and learning
            tasks in significantly less time using AI-driven assistance, smart
            workflows, and guided learning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-12 px-8 text-base bg-gradient-to-r from-white to-white/80 text-black hover:from-white hover:to-white shadow-[0_0_40px_rgba(255,255,255,0.3)] border-0 rounded-full font-semibold"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base border-white/20 bg-white/5 hover:bg-white/15 backdrop-blur-sm rounded-full font-medium transition-all duration-300"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Additional Premium Glow Effects */}
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-primary/20 to-transparent blur-3xl pointer-events-none -z-10" />
    </section>
  );
}
