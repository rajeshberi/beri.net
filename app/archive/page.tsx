import { getAllNewsletters } from '@/lib/newsletters';
import Link from 'next/link';

export const metadata = {
  title: 'Archive | THE D*AI*LY BRIEF',
  description: 'All past editions of THE D*AI*LY BRIEF - Enterprise AI insights and deep dives',
};

export default function ArchivePage() {
  const newsletters = getAllNewsletters();

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
              <Link href="/search" className="text-sm text-white/60 hover:text-white transition-colors">
                Search
              </Link>
              <Link href="/tags" className="text-sm text-white/60 hover:text-white transition-colors">
                Tags
              </Link>
              <a 
                href="/#subscribe" 
                className="px-6 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/30"
              >
                Subscribe
              </a>
            </div>
          </div>
        </header>

        {/* Archive Content */}
        <main className="max-w-5xl mx-auto px-6 py-24">
          
          {/* Page Header */}
          <div className="mb-16 space-y-4">
            <div className="text-sm font-mono text-fuchsia-400/80 tracking-wider">NEWSLETTER ARCHIVE</div>
            <h2 className="text-5xl md:text-6xl font-bold">
              All <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Editions</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl">
              Deep dives into AI advancements, benchmarks, and enterprise deployment strategies.
            </p>
          </div>

          {/* Newsletter List */}
          {newsletters.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-white/40 mb-4">No newsletters published yet</div>
              <a 
                href="/#subscribe"
                className="text-fuchsia-400 hover:text-fuchsia-300 font-medium"
              >
                Subscribe to get notified →
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {newsletters.map((newsletter) => (
                <Link
                  key={newsletter.slug}
                  href={`/newsletter/${newsletter.slug}`}
                  className="group block"
                >
                  <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/30 to-black border border-purple-500/20 hover:border-purple-400/40 transition-all p-8">
                    
                    {/* Date */}
                    <div className="flex items-center gap-4 mb-4">
                      <time className="text-sm font-mono text-fuchsia-400/80">
                        {new Date(newsletter.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </time>
                      <div className="flex gap-2">
                        {newsletter.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300/70 border border-purple-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-semibold text-white group-hover:text-fuchsia-400 transition-colors mb-3">
                      {newsletter.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-white/60 leading-relaxed mb-4">
                      {newsletter.excerpt}
                    </p>

                    {/* Read more */}
                    <div className="text-fuchsia-400 group-hover:text-fuchsia-300 font-medium text-sm inline-flex items-center gap-2">
                      Read full article
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                  </article>
                </Link>
              ))}
            </div>
          )}

        </main>

        {/* CTA Footer */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="relative p-12 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl text-center space-y-6">
            <h3 className="text-3xl font-bold">
              Never Miss an <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Edition</span>
            </h3>
            <p className="text-white/60">
              Get AI insights delivered to your inbox every Tuesday and Thursday
            </p>
            <a 
              href="/#subscribe"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/50"
            >
              Subscribe Free
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
