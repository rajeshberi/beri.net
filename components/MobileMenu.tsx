'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden p-3 text-white hover:text-purple-400 transition-colors"
        aria-label="Toggle menu"
        type="button"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Full-Screen Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#0a0812] sm:hidden"
          style={{ zIndex: 99999, paddingTop: '80px' }}
        >
          {/* Menu Items */}
          <nav className="px-8 py-6 flex flex-col gap-1">
            <Link
              href="/about"
              className="text-xl font-bold uppercase tracking-wider text-white py-5 border-b border-white/10 hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/articles"
              className="text-xl font-bold uppercase tracking-wider text-white py-5 border-b border-white/10 hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Articles
            </Link>
            <Link
              href="/tools"
              className="text-xl font-bold uppercase tracking-wider text-white py-5 border-b border-white/10 hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Tools
            </Link>
            <Link
              href="/search"
              className="text-xl font-bold uppercase tracking-wider text-white py-5 border-b border-white/10 hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Search
            </Link>
            <Link
              href="/tags"
              className="text-xl font-bold uppercase tracking-wider text-white py-5 border-b border-white/10 hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Topics
            </Link>
            
            <div className="pt-8">
              <a
                href="#newsletter"
                className="btn-primary block text-center text-lg py-4"
                onClick={() => setIsOpen(false)}
              >
                Subscribe
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
