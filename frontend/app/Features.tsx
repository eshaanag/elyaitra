'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, Target, Users } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Personalized study paths that adapt to your learning style and pace. Our AI learns from your strengths and weaknesses.',
    gradient: 'from-purple-600 to-purple-400',
  },
  {
    icon: Zap,
    title: 'Instant Answers',
    description: 'Get real-time explanations and solutions to any academic question. No more confusion, only clarity.',
    gradient: 'from-pink-600 to-pink-400',
  },
  {
    icon: Target,
    title: 'Smart Study Plans',
    description: 'AI creates optimized study schedules based on your goals, exams, and available time.',
    gradient: 'from-blue-600 to-blue-400',
  },
  {
    icon: Users,
    title: 'Peer Learning',
    description: 'Connect with thousands of students, share knowledge, and grow together in our community.',
    gradient: 'from-green-600 to-green-400',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features Built for Success
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to transform your learning experience with cutting-edge AI technology
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group glass p-8 rounded-2xl hover:glow-effect transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={32} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-6 h-1 w-0 group-hover:w-12 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-800"
        >
          {[
            { number: '50+', label: 'Subjects Covered' },
            { number: '1000+', label: 'Practice Questions' },
            { number: '98%', label: 'Student Satisfaction' },
            { number: '24/7', label: 'AI Support' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                {item.number}
              </div>
              <p className="text-gray-400 mt-2 text-sm">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background blur */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
    </section>
  );
}
