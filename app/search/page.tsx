'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    // Fetch newsletters data
    fetch('/api/newsletters')
      .then(res => res.json())
      .then(data => {
        setNewsletters(data);
        setResults(data);
        
        // Extract all unique tags
        const tags = new Set<string>();
        data.forEach((n: Newsletter) => n.tags.forEach(t => tags.add(t)));
        setAllTags(Array.from(tags).sort());
      });
  }, []);

  useEffect(() => {
    // Filter by search query and tags
    let filtered = newsletters;

    // Text search
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q) ||
        n.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(n =>
        selectedTags.every(tag => n.tags.includes(tag))
      );
    }

    setResults(filtered);
  }, [query, selectedTags, newsletters]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-violet-950 to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-600/30 via-purple-900/20 to-transparent pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
            <Link href="/">
              <h1 className="text-xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
                THE D<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">*AI*</span>LY BRIEF
              </h1>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/archive" className="text-sm text-white/60 hover:text-white transition-colors">
                Archive
              </Link>
              <a href="/#subscribe" className="px-6 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/30">
                Subscribe
              </a>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-16">
          
          {/* Page Header */}
          <div className="mb-12 space-y-4">
            <div className="text-sm font-mono text-fuchsia-400/80 tracking-wider">SEARCH & DISCOVER</div>
            <h2 className="text-5xl md:text-6xl font-bold">
              Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">AI Insights</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Tag Filter */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/30 to-black border border-purple-500/20 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4 text-white">Filter by Tag</h3>
                <div className="space-y-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="mt-4 text-sm text-fuchsia-400 hover:text-fuchsia-300"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {/* Active Filters */}
              {selectedTags.length > 0 && (
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="text-xs font-mono text-purple-300/80 mb-2">ACTIVE FILTERS</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-fuchsia-600/80 text-white text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles, topics, keywords..."
                  className="w-full px-6 py-4 pl-14 rounded-full bg-white/5 border border-purple-500/30 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent transition-all backdrop-blur-sm text-lg"
                />
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between">
                <div className="text-white/60">
                  {results.length} {results.length === 1 ? 'article' : 'articles'} found
                </div>
                {(query || selectedTags.length > 0) && (
                  <button
                    onClick={() => { setQuery(''); setSelectedTags([]); }}
                    className="text-sm text-fuchsia-400 hover:text-fuchsia-300"
                  >
                    Clear search
                  </button>
                )}
              </div>

              {/* Results */}
              {results.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <div className="text-xl text-white/40 mb-2">No articles found</div>
                  <div className="text-white/30">Try different keywords or clear filters</div>
                </div>
              ) : (
                <div className="space-y-6">
                  {results.map((newsletter) => (
                    <Link
                      key={newsletter.slug}
                      href={`/newsletter/${newsletter.slug}`}
                      className="group block"
                    >
                      <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/30 to-black border border-purple-500/20 hover:border-purple-400/40 transition-all p-8">
                        
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <time className="text-sm font-mono text-fuchsia-400/80">
                            {new Date(newsletter.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </time>
                          <div className="flex flex-wrap gap-2 justify-end">
                            {newsletter.tags.slice(0, 3).map((tag) => (
                              <span 
                                key={tag}
                                className={`text-xs px-3 py-1 rounded-full border ${
                                  selectedTags.includes(tag)
                                    ? 'bg-fuchsia-600/80 text-white border-fuchsia-500'
                                    : 'bg-purple-500/10 text-purple-300/70 border-purple-500/20'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-white group-hover:text-fuchsia-400 transition-colors mb-3">
                          {newsletter.title}
                        </h3>

                        <p className="text-white/60 leading-relaxed mb-4">
                          {newsletter.excerpt}
                        </p>

                        <div className="text-fuchsia-400 group-hover:text-fuchsia-300 font-medium text-sm inline-flex items-center gap-2">
                          Read article
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>

                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}
