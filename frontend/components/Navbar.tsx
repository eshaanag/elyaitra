"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <img
              src="/images/logo.png"
              alt="ElyAItra Logo"
              className="h-8 w-8 rounded-lg"
            />
            <span className="font-heading font-bold text-xl tracking-tight text-white">
              ElyAItra
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#comparison"
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Why Us
            </a>
            <a
              href="#waitlist"
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Waitlist
            </a>

            <Link href="/auth">
              <button className="h-10 px-6 border border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium transition-all duration-300 flex items-center gap-2">
                <LogIn size={16} />
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] border-0 rounded-full px-6 py-2 font-medium">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-white/5 bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#comparison"
              className="text-sm font-medium text-muted-foreground hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Why Us
            </a>
            <a
              href="#waitlist"
              className="text-sm font-medium text-muted-foreground hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Waitlist
            </a>

            <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
              <Link href="/login">
                <button className="w-full justify-center border border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium py-2 flex items-center justify-center gap-2">
                  <LogIn size={16} />
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full font-medium py-2">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
