'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Hamburger Button - stays in header */}
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

      {/* Menu Overlay - portaled to body, outside header */}
      {mounted && createPortal(
        <div 
          className={`fixed inset-0 bg-[#0a0812] transition-transform duration-300 sm:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ zIndex: 99999, paddingTop: '80px' }}
        >
          <nav className="px-8 py-6 flex flex-col gap-1">
            <Link
              href="/about"
              className="text-xl font-bold uppercase tracking-wider text-white py-5 border-b border-white/10 active:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/articles"
              className="text-xl font-bold uppercase tracking-wider text-white py-5 border-b border-white/10 active:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              Articles
            </Link>
            <Link
              href="/tools"
              className="text-xl font-bold uppercase tracking-wider text-white py-5 border-b border-white/10 active:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              Tools
            </Link>
            <Link
              href="/events"
              className="text-xl font-bold uppercase tracking-wider text-white py-5 border-b border-white/10 active:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/search"
              className="text-xl font-bold uppercase tracking-wider text-white py-5 border-b border-white/10 active:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              Search
            </Link>
            <Link
              href="/tags"
              className="text-xl font-bold uppercase tracking-wider text-white py-5 border-b border-white/10 active:text-purple-400"
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
        </div>,
        document.body
      )}
    </>
  );
}
