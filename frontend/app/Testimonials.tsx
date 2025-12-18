'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'High School Student',
    content: 'elyAItra helped me improve my grades from C to A in just 3 months. The personalized learning path is amazing!',
    rating: 5,
    image: '👨‍🎓',
  },
  {
    name: 'Alex Chen',
    role: 'College Student',
    content: 'As a busy college student, having 24/7 AI support has been a game-changer. I can study anytime, anywhere.',
    rating: 5,
    image: '👩‍🎓',
  },
  {
    name: 'Emma Williams',
    role: 'Test Prep Student',
    content: 'I scored 2100 on the SAT! elyAItra\'s adaptive learning helped me focus on my weak areas efficiently.',
    rating: 5,
    image: '🎓',
  },
  {
    name: 'Michael Ahmed',
    role: 'International Student',
    content: 'As an international student, the instant explanations in multiple subjects have been incredibly helpful.',
    rating: 5,
    image: '👨‍💼',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Students Worldwide
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of students who have transformed their learning experience
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-8 rounded-2xl hover:glow-effect transition-all duration-300 group"
            >
              {/* Rating */}
              <div className="flex space-x-2 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-gray-800 text-center"
        >
          <p className="text-gray-400 mb-6">Trusted by students from</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center opacity-50 hover:opacity-75 transition-opacity">
            {['Harvard', 'MIT', 'Stanford', 'Yale', 'Oxford'].map((school, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="font-bold text-gray-300"
              >
                {school}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
    </section>
  );
}
