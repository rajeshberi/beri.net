import { getAllNewsletters } from '@/lib/newsletters';
import Link from 'next/link';

export default function Home() {
  const newsletters = getAllNewsletters();
  const featured = newsletters[0]; // Most recent as featured
  const latest = newsletters.slice(1, 7); // Next 6 for grid
  const more = newsletters.slice(7, 13); // More stories

  // Get all unique tags for category nav
  const allTags = Array.from(
    new Set(newsletters.flatMap(n => n.tags))
  ).slice(0, 6); // Top 6 categories

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle background */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 to-black pointer-events-none" />
      
      <div className="relative">
        {/* Header - TechCrunch style */}
        <header className="border-b border-white/10 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto">
            {/* Top bar */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
              <Link href="/">
                <h1 className="text-2xl font-bold tracking-tight cursor-pointer">
                  THE D<span className="text-fuchsia-500">*AI*</span>LY BRIEF
                </h1>
              </Link>
              
              <div className="flex items-center gap-6">
                <Link href="/search" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </Link>
                <a href="#newsletter" className="px-5 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-semibold rounded-md transition-colors">
                  Subscribe
                </a>
              </div>
            </div>

            {/* Category nav */}
            <nav className="px-6 py-3 flex items-center gap-8 overflow-x-auto scrollbar-hide">
              <Link href="/archive" className="text-sm font-medium text-white hover:text-fuchsia-400 transition-colors whitespace-nowrap">
                Latest
              </Link>
              {allTags.map(tag => (
                <Link 
                  key={tag}
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="text-sm font-medium text-white/70 hover:text-fuchsia-400 transition-colors whitespace-nowrap"
                >
                  {tag}
                </Link>
              ))}
              <Link href="/tags" className="text-sm font-medium text-white/70 hover:text-fuchsia-400 transition-colors whitespace-nowrap">
                All Topics
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-[1400px] mx-auto px-6 py-8">
          
          {featured ? (
            <>
              {/* Featured Story - TechCrunch hero style */}
              <section className="mb-12">
                <Link href={`/newsletter/${featured.slug}`} className="group block">
                  <div className="grid lg:grid-cols-2 gap-8 items-center p-8 rounded-2xl bg-gradient-to-br from-purple-950/30 to-black border border-purple-500/20 hover:border-fuchsia-500/40 transition-all">
                    {/* Bot character visual */}
                    <div className="h-[400px] rounded-xl bg-gradient-to-br from-fuchsia-600/20 to-purple-600/20 border border-fuchsia-500/20 overflow-hidden relative flex items-center justify-center">
                      {/* Background glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-fuchsia-500/20 to-transparent blur-3xl" />
                      
                      {/* Bot image */}
                      <img 
                        src="/bots/bot-3.jpg" 
                        alt="AI Bot" 
                        className="relative z-10 w-80 h-80 object-contain mix-blend-lighten opacity-90 hover:scale-105 transition-transform duration-300"
                        style={{ filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.4))' }}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 text-xs font-semibold bg-fuchsia-600 text-white rounded-md uppercase">
                          Featured Story
                        </span>
                        <span className="text-sm text-white/50">
                          {new Date(featured.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <h2 className="text-4xl font-bold leading-tight group-hover:text-fuchsia-400 transition-colors">
                        {featured.title}
                      </h2>
                      
                      <p className="text-lg text-white/70 leading-relaxed line-clamp-3">
                        {featured.excerpt}
                      </p>

                      <div className="flex gap-2 flex-wrap">
                        {featured.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </section>

              {/* Latest News - TechCrunch grid */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Latest News</h3>
                  <Link href="/archive" className="text-sm text-fuchsia-400 hover:text-fuchsia-300 font-medium">
                    View all →
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latest.map(article => (
                    <Link 
                      key={article.slug}
                      href={`/newsletter/${article.slug}`}
                      className="group"
                    >
                      <article className="h-full flex flex-col">
                        {/* Article image placeholder */}
                        <div className="h-48 rounded-lg bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 border border-purple-500/20 mb-4 overflow-hidden relative group-hover:border-fuchsia-500/40 transition-all">
                          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 200">
                            {Array.from({ length: 20 }).map((_, i) => (
                              <circle
                                key={i}
                                cx={Math.random() * 200}
                                cy={Math.random() * 200}
                                r={Math.random() * 2 + 1}
                                fill="url(#feat-grad)"
                                opacity={Math.random() * 0.5 + 0.2}
                              />
                            ))}
                          </svg>
                        </div>

                        <div className="flex-1 flex flex-col">
                          {/* Category tag */}
                          {article.tags[0] && (
                            <span className="text-xs font-semibold text-fuchsia-400 uppercase mb-2">
                              {article.tags[0]}
                            </span>
                          )}

                          {/* Title */}
                          <h4 className="text-xl font-bold mb-2 group-hover:text-fuchsia-400 transition-colors line-clamp-2">
                            {article.title}
                          </h4>

                          {/* Excerpt */}
                          <p className="text-sm text-white/60 mb-3 line-clamp-2 flex-1">
                            {article.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center gap-3 text-xs text-white/40">
                            <span>Rajesh Beri</span>
                            <span>•</span>
                            <time>
                              {new Date(article.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric'
                              })}
                            </time>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>

              {/* More Stories - Compact list */}
              {more.length > 0 && (
                <section className="mb-12">
                  <h3 className="text-2xl font-bold mb-6">More Stories</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {more.map(article => (
                      <Link
                        key={article.slug}
                        href={`/newsletter/${article.slug}`}
                        className="group flex gap-4 pb-6 border-b border-white/5 hover:border-fuchsia-500/20 transition-all"
                      >
                        {/* Small thumbnail */}
                        <div className="w-24 h-24 flex-shrink-0 rounded-lg bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 border border-purple-500/20 group-hover:border-fuchsia-500/40 transition-all" />
                        
                        <div className="flex-1 min-w-0">
                          {article.tags[0] && (
                            <span className="text-xs font-semibold text-fuchsia-400 uppercase">
                              {article.tags[0]}
                            </span>
                          )}
                          <h4 className="font-bold group-hover:text-fuchsia-400 transition-colors line-clamp-2 mt-1">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-white/40 mt-2">
                            <time>
                              {new Date(article.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric'
                              })}
                            </time>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <div className="text-white/40 text-lg mb-6">No stories published yet</div>
              <a href="#newsletter" className="inline-flex px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold rounded-lg transition-colors">
                Subscribe to get notified
              </a>
            </div>
          )}

          {/* Newsletter Signup - Sidebar style with bot */}
          <section id="newsletter" className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-fuchsia-950/30 to-purple-950/30 border border-fuchsia-500/20">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
                {/* Bot mascot */}
                <div className="flex justify-center">
                  <img 
                    src="/bots/bot-2.jpg" 
                    alt="AI Assistant" 
                    className="w-48 h-48 object-contain mix-blend-lighten opacity-90"
                    style={{ filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.3))' }}
                  />
                </div>

                {/* Content */}
                <div className="text-center md:text-left space-y-6">
                  <h3 className="text-3xl font-bold">
                    Get AI News in Your Inbox
                  </h3>
                  <p className="text-white/70 text-lg">
                    Twice-weekly deep dives into AI developments. No spam, just signal.
                  </p>
                  
                  <form className="flex gap-3 max-w-md">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                      required
                    />
                    <button className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
                      Subscribe →
                    </button>
                  </form>

                  <p className="text-xs text-white/30">
                    Every Tuesday & Thursday • Free forever • Unsubscribe anytime
                  </p>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* Footer - TechCrunch style */}
        <footer className="border-t border-white/10 mt-24 bg-black/95">
          <div className="max-w-[1400px] mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              
              {/* Col 1 */}
              <div>
                <div className="font-bold text-lg mb-4">
                  THE D<span className="text-fuchsia-500">*AI*</span>LY BRIEF
                </div>
                <p className="text-sm text-white/50">
                  Enterprise AI news and analysis for tech leaders
                </p>
              </div>

              {/* Col 2 */}
              <div>
                <div className="font-semibold mb-4">Browse</div>
                <div className="space-y-2 text-sm text-white/60">
                  <div><Link href="/archive" className="hover:text-fuchsia-400 transition-colors">Latest</Link></div>
                  <div><Link href="/search" className="hover:text-fuchsia-400 transition-colors">Search</Link></div>
                  <div><Link href="/tags" className="hover:text-fuchsia-400 transition-colors">Topics</Link></div>
                </div>
              </div>

              {/* Col 3 */}
              <div>
                <div className="font-semibold mb-4">Connect</div>
                <div className="space-y-2 text-sm text-white/60">
                  <div><a href="https://www.linkedin.com/in/rberi/" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors">LinkedIn</a></div>
                  <div><a href="https://x.com/rajeshberi" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors">Twitter / X</a></div>
                </div>
              </div>

              {/* Col 4 */}
              <div>
                <div className="font-semibold mb-4">Subscribe</div>
                <p className="text-sm text-white/60 mb-3">Get AI insights twice a week</p>
                <a href="#newsletter" className="inline-block px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-semibold rounded-md transition-colors">
                  Sign up →
                </a>
              </div>

            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
              <div>© 2026 THE D*AI*LY BRIEF by Rajesh Beri</div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
