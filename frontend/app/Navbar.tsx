'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white">
            eA
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            elyAItra
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="#features"
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-300 hover:text-purple-400 transition-colors"
          >
            Testimonials
          </Link>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
            Get Notified
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-gray-700">
          <div className="px-4 py-4 space-y-4">
            <Link href="#features" className="block text-gray-300 hover:text-purple-400">
              Features
            </Link>
            <Link href="#how-it-works" className="block text-gray-300 hover:text-purple-400">
              How It Works
            </Link>
            <Link href="#testimonials" className="block text-gray-300 hover:text-purple-400">
              Testimonials
            </Link>
            <button className="w-full px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold">
              Get Notified
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
