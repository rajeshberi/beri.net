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
      {/* Hamburger Button - Only visible on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden p-3 text-white hover:text-purple-400 transition-colors z-50 relative"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        type="button"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
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

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 sm:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#0a0812] z-50 sm:hidden overflow-y-auto pt-20">
            <nav className="px-6 py-8 space-y-4" role="navigation">
              <Link
                href="/about"
                className="block text-lg font-bold uppercase tracking-wider text-white hover:text-purple-400 transition-colors py-4 border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/articles"
                className="block text-lg font-bold uppercase tracking-wider text-white hover:text-purple-400 transition-colors py-4 border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/tools"
                className="block text-lg font-bold uppercase tracking-wider text-white hover:text-purple-400 transition-colors py-4 border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                Tools
              </Link>
              <Link
                href="/search"
                className="block text-lg font-bold uppercase tracking-wider text-white hover:text-purple-400 transition-colors py-4 border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                Search
              </Link>
              <Link
                href="/tags"
                className="block text-lg font-bold uppercase tracking-wider text-white hover:text-purple-400 transition-colors py-4 border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                Topics
              </Link>
              
              <div className="pt-4 border-t border-white/10">
                <a
                  href="#newsletter"
                  className="btn-primary block text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Subscribe to Newsletter
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
