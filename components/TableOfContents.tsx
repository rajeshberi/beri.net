'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const article = document.querySelector('.article-content');
    if (!article) return;

    const headings = article.querySelectorAll('h2, h3');
    const tocItems: TocItem[] = [];

    headings.forEach((h, i) => {
      const id = `heading-${i}`;
      h.id = id;
      tocItems.push({
        id,
        text: h.textContent || '',
        level: h.tagName === 'H2' ? 2 : 3,
      });
    });

    setItems(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length < 3) return null;

  return (
    <div className="mb-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-purple-400 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h12" />
        </svg>
        Table of Contents
        <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <nav className="mt-4 p-5 rounded-xl border border-white/5 bg-white/[0.02]">
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item.id} style={{ paddingLeft: item.level === 3 ? '1rem' : 0 }}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm block py-1 transition-colors ${
                    activeId === item.id
                      ? 'text-purple-400 font-medium'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
