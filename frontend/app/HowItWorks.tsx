'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Sign Up & Profile',
    description: 'Create your account and tell us about your learning goals and current level.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    number: '02',
    title: 'AI Assessment',
    description: 'Our AI evaluates your skills and learning patterns to understand your unique needs.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    number: '03',
    title: 'Personalized Plan',
    description: 'Get a customized study plan tailored to your goals, schedule, and learning style.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    number: '04',
    title: 'Learn & Improve',
    description: 'Access thousands of resources, get AI-powered explanations, and track your progress in real-time.',
    color: 'from-green-500 to-green-600',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Four simple steps to transform your learning journey
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Step number and content */}
              <div className={`flex-1 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                >
                  <div className={`text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4`}>
                    {step.number}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {['Feature-rich experience', 'Real-time feedback', 'Progress tracking'].map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + index * 0.1 + 0.3 }}
                        className="flex items-center space-x-3 text-gray-300"
                      >
                        <Check size={20} className="text-green-400" />
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Visual element */}
              <motion.div
                className={`flex-1 ${index % 2 === 1 ? 'md:order-1' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
              >
                <div className={`w-full aspect-square glass rounded-2xl flex items-center justify-center group hover:glow-effect transition-all duration-300`}>
                  <div className={`w-32 h-32 bg-gradient-to-r ${step.color} rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl`}></div>
                </div>
              </motion.div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="w-1 h-16 bg-gradient-to-b from-purple-500 to-pink-500 mx-auto my-4 md:my-0 hidden md:block"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16 pt-12 border-t border-gray-800"
        >
          <p className="text-gray-300 text-lg mb-6">Ready to get started?</p>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Start Your Free Trial</span>
          </button>
        </motion.div>
      </div>

      {/* Background blur */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
    </section>
  );
}
