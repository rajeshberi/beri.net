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
        className="sm:hidden p-2 -mr-2 text-white/60 hover:text-white transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="fixed top-[73px] left-0 right-0 bottom-0 bg-[#0a0812] z-50 sm:hidden overflow-y-auto">
            <nav className="px-6 py-8 space-y-6" role="navigation">
              <Link
                href="/about"
                className="block text-base font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors py-3"
                style={{ letterSpacing: '0.12em' }}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/articles"
                className="block text-base font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors py-3"
                style={{ letterSpacing: '0.12em' }}
                onClick={() => setIsOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/search"
                className="block text-base font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors py-3"
                style={{ letterSpacing: '0.12em' }}
                onClick={() => setIsOpen(false)}
              >
                Search
              </Link>
              <Link
                href="/tags"
                className="block text-base font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors py-3"
                style={{ letterSpacing: '0.12em' }}
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
