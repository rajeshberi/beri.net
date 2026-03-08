'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Newsletter {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [results, setResults] = useState<Newsletter[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    // Load all newsletters and tags on mount
    fetch('/api/newsletters')
      .then(res => res.json())
      .then(data => {
        setNewsletters(data);
        setResults(data);
        const tags = new Set<string>();
        data.forEach((n: Newsletter) => n.tags.forEach((t: string) => tags.add(t)));
        setAllTags(Array.from(tags).sort());
      });
  }, []);

  useEffect(() => {
    // Use MongoDB full-text search if query exists
    if (query && query.trim().length > 0) {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            let filtered = data.results.map((r: any) => ({
              slug: r.slug,
              title: r.title,
              date: r.published_date,
              excerpt: r.excerpt,
              tags: r.tags
            }));
            
            // Apply tag filters if any
            if (selectedTags.length > 0) {
              filtered = filtered.filter((n: Newsletter) => 
                selectedTags.every(tag => n.tags.includes(tag))
              );
            }
            
            setResults(filtered);
          }
        })
        .catch(err => {
          console.error('Search error:', err);
          // Fall back to client-side filter
          const filtered = newsletters.filter(n =>
            n.title.toLowerCase().includes(query.toLowerCase()) ||
            n.excerpt.toLowerCase().includes(query.toLowerCase())
          );
          setResults(filtered);
        });
    } else {
      // No query - show all or filter by tags
      let filtered = newsletters;
      if (selectedTags.length > 0) {
        filtered = filtered.filter(n => selectedTags.every(tag => n.tags.includes(tag)));
      }
      setResults(filtered);
    }
  }, [query, selectedTags, newsletters]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="min-h-screen bg-[#0c0a14] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-[1000px] mx-auto px-6 py-16 md:py-24">
          <div className="mb-10 space-y-3">
            <div className="text-xs font-mono text-purple-400/60 tracking-widest uppercase">Search & Discover</div>
            <h2 className="text-4xl md:text-5xl font-bold">Find Insights</h2>
          </div>

          {/* Search bar */}
          <div className="relative mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, topics..."
              aria-label="Search articles"
              className="w-full px-5 py-4 pl-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent transition-all text-lg"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button onClick={() => setSelectedTags([])} className="text-xs text-purple-400 hover:text-purple-300 ml-2">
                Clear
              </button>
            )}
          </div>

          {/* Results */}
          <div className="text-sm text-white/30 mb-6">{results.length} articles</div>

          {results.length === 0 ? (
            <div className="text-center py-16 text-white/30">
              No articles found. Try different keywords.
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((newsletter) => (
                <Link
                  key={newsletter.slug}
                  href={`/newsletter/${newsletter.slug}`}
                  className="group flex items-start gap-6 py-5 border-b border-white/5 hover:border-purple-500/20 transition-all"
                >
                  <time className="text-xs font-mono text-white/20 w-20 flex-shrink-0 pt-1">
                    {new Date(newsletter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </time>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold group-hover:text-purple-300 transition-colors mb-1">
                      {newsletter.title}
                    </h3>
                    <p className="text-sm text-white/30 line-clamp-1">{newsletter.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
