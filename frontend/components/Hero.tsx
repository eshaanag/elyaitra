'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 md:px-0">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="glass px-4 py-2 rounded-full flex items-center space-x-2 group cursor-pointer">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                Launching January 8, 2026
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Transform Your</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Learning Journey
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of education with <span className="text-purple-400 font-semibold">AI-powered personalized learning</span>. 
            Get instant answers, personalized study plans, and unlock your full academic potential.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12"
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>Get Early Access</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-purple-500 rounded-lg font-bold text-lg hover:bg-purple-500/10 transition-all duration-300 flex items-center space-x-2">
              <span>Learn More</span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-800"
          >
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-400">10K+</div>
              <div className="text-gray-400 mt-2">Students Ready</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-pink-400">99%</div>
              <div className="text-gray-400 mt-2">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400">24/7</div>
              <div className="text-gray-400 mt-2">AI Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
