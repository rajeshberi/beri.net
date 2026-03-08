'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CATEGORY_TAXONOMY, type CategoryConfig } from '@/lib/categoryTaxonomy';

export default function CategoryNav() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenCategory(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenCategory(null);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleCategory = useCallback((slug: string) => {
    setOpenCategory(prev => (prev === slug ? null : slug));
  }, []);

  return (
    <nav
      ref={navRef}
      className="glass-strong sticky top-[73px] z-40 border-b-[3px] border-purple-500/30"
      role="navigation"
      aria-label="Categories"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-3.5">
        {/* Desktop: horizontal pills with dropdowns */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/articles" className="category-pill category-pill-active">
            Latest
          </Link>
          {CATEGORY_TAXONOMY.map(cat => (
            <CategoryDropdown
              key={cat.slug}
              category={cat}
              isOpen={openCategory === cat.slug}
              onToggle={() => toggleCategory(cat.slug)}
              onClose={() => setOpenCategory(null)}
            />
          ))}
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <Link href="/articles" className="category-pill category-pill-active">
              Latest
            </Link>
            {CATEGORY_TAXONOMY.map(cat => (
              <button
                key={cat.slug}
                onClick={() => toggleCategory(cat.slug)}
                className={`category-pill flex items-center gap-1.5 ${
                  openCategory === cat.slug ? 'text-purple-400 bg-purple-500/10' : ''
                }`}
                aria-expanded={openCategory === cat.slug}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${
                    openCategory === cat.slug ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ))}
          </div>

          {/* Mobile expanded panel */}
          {openCategory && (
            <MobilePanel
              category={CATEGORY_TAXONOMY.find(c => c.slug === openCategory)!}
              onClose={() => setOpenCategory(null)}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

/* ─── Desktop Dropdown ─── */

function CategoryDropdown({
  category,
  isOpen,
  onToggle,
  onClose,
}: {
  category: CategoryConfig;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard nav within dropdown
  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;
    const items = containerRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]');
    if (!items?.length) return;
    const currentIndex = Array.from(items).findIndex(el => el === document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[Math.min(currentIndex + 1, items.length - 1)].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[Math.max(currentIndex - 1, 0)].focus();
    }
  }

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        onClick={onToggle}
        className={`category-pill flex items-center gap-1.5 ${
          isOpen ? 'text-purple-400 bg-purple-500/10' : ''
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{category.icon}</span>
        <span>{category.label}</span>
        <svg
          className={`w-3 h-3 ml-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-0 mt-2 min-w-[200px] rounded-xl overflow-hidden
          glass-strong border border-white/10 shadow-xl
          transition-all duration-200 origin-top
          ${isOpen
            ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-y-95 -translate-y-1 pointer-events-none'
          }`}
        role="menu"
        aria-label={category.label}
      >
        <div className="py-2">
          {category.children.map(tag => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              onClick={onClose}
              className="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-purple-500/10
                         transition-colors duration-150 focus:outline-none focus:bg-purple-500/10 focus:text-white"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Accordion Panel ─── */

function MobilePanel({
  category,
  onClose,
}: {
  category: CategoryConfig;
  onClose: () => void;
}) {
  return (
    <div
      className="mt-3 py-3 border-t border-white/10 animate-slideDown"
    >
      <div className="flex flex-wrap gap-2">
        {category.children.map(tag => (
          <Link
            key={tag}
            href={`/tag/${encodeURIComponent(tag)}`}
            onClick={onClose}
            className="category-pill text-white/60 hover:text-white hover:bg-purple-500/10
                       min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
