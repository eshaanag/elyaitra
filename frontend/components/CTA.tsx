'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="glass p-12 md:p-16 rounded-3xl glow-effect border border-purple-500/30 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-semibold">
              Limited Time Offer
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Be Part of the{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Learning Revolution
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            Get early access to elyAItra and receive exclusive founding member benefits. Join thousands of students preparing for success.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            {[
              '✨ Lifetime 40% Discount',
              '🎁 Exclusive Founder Badge',
              '🚀 Priority Support',
            ].map((benefit, index) => (
              <div key={index} className="text-sm text-gray-300">
                {benefit}
              </div>
            ))}
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-dark-light border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold overflow-hidden whitespace-nowrap hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center space-x-2">
              <span className="relative">Get Access</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Additional info */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-500 text-sm"
          >
            Join 10K+ students waiting. No spam, unsubscribe anytime.
          </motion.p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
}
