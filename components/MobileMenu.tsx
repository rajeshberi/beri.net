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
        className="sm:hidden p-3 text-white hover:text-purple-400 transition-colors relative"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Menu Overlay - Higher z-index than header (which is z-50) */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] sm:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="fixed inset-0 z-[70] sm:hidden overflow-y-auto">
            {/* Close button at top */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 text-white hover:text-purple-400 transition-colors"
                aria-label="Close menu"
                type="button"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="px-6 pb-8" role="navigation">
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
              
              <div className="pt-8">
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
