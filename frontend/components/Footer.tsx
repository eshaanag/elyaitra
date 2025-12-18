'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Linkedin, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-800 bg-dark-light/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white">
                eA
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                elyAItra
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming education with AI-powered personalized learning for students worldwide.
            </p>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#features" className="hover:text-purple-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-purple-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-bold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="mailto:hello@elyaitra.com"
                className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Mail size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-gray-400 text-sm">
            &copy; 2026 elyAItra. All rights reserved. Launching January 8, 2026.
          </p>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <Link href="#" className="hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Background gradient */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
    </footer>
  );
}
