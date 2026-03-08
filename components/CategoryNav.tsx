'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CategoryNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when scrolling up or at top
      // Hide when scrolling down and past header
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div 
      className={`glass-strong sticky z-40 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ top: '73px' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-3">
        <nav className="flex items-center gap-3 overflow-x-auto scrollbar-hide" role="navigation" aria-label="Article categories">
          <Link 
            href="/articles"
            className="category-pill"
          >
            Latest
          </Link>
          <Link 
            href="/tags"
            className="category-pill"
          >
            <span className="text-base">📋</span>
            <span>By Function</span>
          </Link>
          <Link 
            href="/tags"
            className="category-pill"
          >
            <span className="text-base">⚡</span>
            <span>By Tech</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
