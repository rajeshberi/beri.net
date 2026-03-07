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

          {/* Newsletter List - TechCrunch compact style */}
          {newsletters.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-white/40 mb-4">No stories published yet</div>
              <a 
                href="/#newsletter"
                className="text-fuchsia-400 hover:text-fuchsia-300 font-medium"
              >
                Subscribe to get notified →
              </a>
            </div>
          ) : (
            <div className="space-y-8">
              {newsletters.map((newsletter, idx) => (
                <Link
                  key={newsletter.slug}
                  href={`/newsletter/${newsletter.slug}`}
                  className="group flex gap-6 pb-8 border-b border-white/5 hover:border-fuchsia-500/20 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-64 h-40 flex-shrink-0 rounded-xl overflow-hidden relative group-hover:ring-2 group-hover:ring-fuchsia-500/40 transition-all">
                    <img 
                      src={`https://images.unsplash.com/photo-${[
                        '1677442136019-21780ecad995',
                        '1655720828018-edd2daec01fe',
                        '1677756119517-756a188d2d94',
                        '1620712943543-bcc4659bd783'
                      ][idx % 4]}?w=400&q=80`}
                      alt={newsletter.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Category */}
                    {newsletter.tags[0] && (
                      <span className="text-xs font-semibold text-fuchsia-400 uppercase">
                        {newsletter.tags[0]}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-2xl font-bold mt-2 mb-3 group-hover:text-fuchsia-400 transition-colors">
                      {newsletter.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-white/60 leading-relaxed mb-4 line-clamp-2">
                      {newsletter.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-white/50">Rajesh Beri</span>
                      <span className="text-white/30">•</span>
                      <time className="text-white/50">
                        {new Date(newsletter.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </time>
                      <span className="text-white/30">•</span>
                      <div className="flex gap-2">
                        {newsletter.tags.slice(1, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
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
