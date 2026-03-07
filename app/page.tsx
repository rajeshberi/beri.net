import { getAllNewsletters } from '@/lib/newsletters';
import Link from 'next/link';

export default function Home() {
  const newsletters = getAllNewsletters().slice(0, 3); // Get latest 3
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Deep purple gradient background - more vibrant */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-violet-950 to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-600/30 via-purple-900/20 to-transparent pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
      
      {/* Floating gradient orbs - more vibrant */}
      <div className="fixed top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-fuchsia-500/40 to-purple-600/40 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="fixed bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/40 to-blue-600/40 rounded-full blur-[120px] pointer-events-none" style={{ animationDelay: '2s' }} />
      
      <div className="relative">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                THE D<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">*AI*</span>LY BRIEF
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <Link 
                href="/archive"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Archive
              </Link>
              <a 
                href="#subscribe" 
                className="px-6 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/30"
              >
                Subscribe
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section with Abstract Visual */}
        <main className="max-w-7xl mx-auto px-6">
          
          <section className="pt-24 pb-16 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left: Content */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="text-sm font-mono text-fuchsia-400/80 tracking-wider">AI × ENTERPRISE</div>
                  <h2 className="text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight">
                    Supercharged
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-blue-400">
                      AI-Powered
                    </span>
                    <br />
                    Intelligence
                  </h2>
                </div>
                
                <p className="text-xl text-white/70 leading-relaxed max-w-lg">
                  Twice-weekly deep dives into AI that actually moves the needle. 
                  No hype, just insights from building at enterprise scale.
                </p>

                <div className="flex gap-4">
                  <a 
                    href="#subscribe" 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/50 hover:shadow-fuchsia-500/70"
                  >
                    Get Started
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                <div className="flex gap-6 text-sm text-white/40 font-mono pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse" />
                    TUE + THU
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    FREE
                  </div>
                </div>
              </div>

              {/* Right: Abstract AI Visual */}
              <div className="relative h-[600px] hidden lg:block">
                {/* Robotic/AI hand illustration (abstract SVG) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Neural network mesh */}
                    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 600">
                      <defs>
                        <linearGradient id="hand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#e879f9" />
                          <stop offset="50%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                      
                      {/* Abstract geometric hand/AI shape */}
                      <g transform="translate(100, 150)">
                        {/* Palm */}
                        <rect x="80" y="200" width="40" height="100" fill="url(#hand-grad)" opacity="0.6" rx="5" />
                        
                        {/* Fingers */}
                        <rect x="60" y="150" width="15" height="60" fill="url(#hand-grad)" opacity="0.7" rx="3" />
                        <rect x="80" y="130" width="15" height="80" fill="url(#hand-grad)" opacity="0.8" rx="3" />
                        <rect x="100" y="140" width="15" height="70" fill="url(#hand-grad)" opacity="0.8" rx="3" />
                        <rect x="120" y="150" width="15" height="60" fill="url(#hand-grad)" opacity="0.7" rx="3" />
                        
                        {/* Neural connections */}
                        {Array.from({ length: 30 }).map((_, i) => (
                          <circle
                            key={i}
                            cx={Math.random() * 200}
                            cy={Math.random() * 400}
                            r={Math.random() * 2 + 0.5}
                            fill="url(#hand-grad)"
                            opacity={Math.random() * 0.5 + 0.2}
                          />
                        ))}
                        
                        {/* Connecting lines */}
                        <line x1="90" y1="130" x2="150" y2="50" stroke="url(#hand-grad)" strokeWidth="1" opacity="0.3" />
                        <line x1="100" y1="150" x2="50" y2="100" stroke="url(#hand-grad)" strokeWidth="1" opacity="0.3" />
                        <line x1="110" y1="200" x2="180" y2="200" stroke="url(#hand-grad)" strokeWidth="1" opacity="0.3" />
                      </g>
                    </svg>
                    
                    {/* Glowing orbs around the hand */}
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-fuchsia-500/30 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* What We Cover - Card Grid */}
          <section className="py-24">
            <div className="text-center mb-16 space-y-4">
              <div className="text-sm font-mono text-fuchsia-400/80 tracking-wider">WHAT WE COVER</div>
              <h3 className="text-4xl md:text-5xl font-bold">
                We Help You Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Intelligent Solutions</span>
              </h3>
              <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
                Deep technical analysis on AI systems, model performance, enterprise deployment, and what actually works in production.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/50 to-black border border-purple-500/20 hover:border-purple-400/40 transition-all">
                {/* Abstract visual background */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <rect x="20" y="20" width="160" height="160" fill="none" stroke="url(#hand-grad)" strokeWidth="1" opacity="0.3" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="url(#hand-grad)" strokeWidth="1" opacity="0.3" />
                  </svg>
                </div>
                
                <div className="relative p-8 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 flex items-center justify-center border border-purple-500/30">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-white">AI-Powered Automation</h4>
                  <p className="text-white/60 leading-relaxed">
                    Model selection, fine-tuning strategies, and deployment patterns that scale from prototype to production.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-fuchsia-950/50 to-black border border-fuchsia-500/20 hover:border-fuchsia-400/40 transition-all">
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <circle cx="50" cy="50" r="3" fill="url(#hand-grad)" />
                    <circle cx="150" cy="50" r="3" fill="url(#hand-grad)" />
                    <circle cx="50" cy="150" r="3" fill="url(#hand-grad)" />
                    <circle cx="150" cy="150" r="3" fill="url(#hand-grad)" />
                    <circle cx="100" cy="100" r="5" fill="url(#hand-grad)" />
                    <line x1="100" y1="100" x2="50" y2="50" stroke="url(#hand-grad)" strokeWidth="1" />
                    <line x1="100" y1="100" x2="150" y2="50" stroke="url(#hand-grad)" strokeWidth="1" />
                    <line x1="100" y1="100" x2="50" y2="150" stroke="url(#hand-grad)" strokeWidth="1" />
                    <line x1="100" y1="100" x2="150" y2="150" stroke="url(#hand-grad)" strokeWidth="1" />
                  </svg>
                </div>
                
                <div className="relative p-8 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 flex items-center justify-center border border-fuchsia-500/30">
                    <svg className="w-6 h-6 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-white">Realistic AI Deployment</h4>
                  <p className="text-white/60 leading-relaxed">
                    Cost analysis, inference optimization, and real-world benchmarks. What it takes to ship AI at scale.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950/50 to-black border border-blue-500/20 hover:border-blue-400/40 transition-all">
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139, 92, 246, 0.1) 10px, rgba(139, 92, 246, 0.1) 20px)`
                  }} />
                </div>
                
                <div className="relative p-8 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-white">Data-Driven Insights</h4>
                  <p className="text-white/60 leading-relaxed">
                    Benchmarks, performance metrics, and numbers that matter. No hand-waving, just facts.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Recent Editions - Event Card Style */}
          <section className="py-24 border-t border-white/5">
            <div className="text-center mb-16 space-y-4">
              <div className="text-sm font-mono text-fuchsia-400/80 tracking-wider">RECENT EDITIONS</div>
              <h3 className="text-4xl md:text-5xl font-bold">
                Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">AI Insights</span>
              </h3>
            </div>

            {/* Edition Cards - Event Style */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {newsletters.length === 0 ? (
                <div className="col-span-full text-center py-12 text-white/40">
                  First edition coming soon. <a href="#subscribe" className="text-fuchsia-400 hover:text-fuchsia-300">Subscribe to get notified</a>.
                </div>
              ) : (
                newsletters.map((edition, i) => {
                  const date = new Date(edition.date);
                  return (
                  <Link key={i} href={`/newsletter/${edition.slug}`} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/30 to-black border border-purple-500/20 hover:border-purple-400/40 transition-all block">
                    {/* Abstract background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full bg-gradient-to-br from-fuchsia-600/20 to-purple-600/20" />
                    </div>
                    
                    {/* Date badge */}
                    <div className="absolute top-6 left-6 w-16 h-20 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-lg flex flex-col items-center justify-center shadow-lg">
                      <div className="text-2xl font-bold">{date.getDate()}</div>
                      <div className="text-xs font-mono opacity-80">{date.toLocaleString('en-US', { month: 'short' }).toUpperCase()}</div>
                    </div>
                    
                    <div className="relative p-8 pt-32 space-y-4">
                      <h4 className="text-xl font-semibold text-white group-hover:text-fuchsia-400 transition-colors">{edition.title}</h4>
                      <p className="text-white/60 leading-relaxed text-sm">{edition.excerpt}</p>
                      <div className="pt-4">
                        <span className="text-fuchsia-400 group-hover:text-fuchsia-300 text-sm font-medium inline-flex items-center gap-2">
                          Read more 
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
              )}
            </div>

            {newsletters.length > 0 && (
              <div className="text-center mt-12">
                <Link 
                  href="/archive" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/50"
                >
                  View All Editions
                </Link>
              </div>
            )}
          </section>

          {/* Subscribe CTA */}
          <section id="subscribe" className="py-32 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 via-purple-600/10 to-transparent rounded-3xl blur-3xl" />
            
            <div className="relative max-w-2xl mx-auto text-center space-y-8 p-12 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                  Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">AI Insights</span>
                  <br />
                  Twice a Week
                </h3>
                <p className="text-white/60">
                  Join engineering leaders staying ahead of the curve
                </p>
              </div>

              <form className="space-y-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 rounded-full bg-white/5 border border-purple-500/30 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-transparent transition-all backdrop-blur-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/50 hover:shadow-fuchsia-500/70"
                >
                  Subscribe Free →
                </button>
              </form>

              <p className="text-xs text-white/30">
                No spam • Unsubscribe anytime • 2-3 min reads
              </p>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-24 bg-black/60 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              
              {/* Col 1 */}
              <div className="space-y-4">
                <div className="text-lg font-bold">
                  THE D<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">*AI*</span>LY BRIEF
                </div>
                <p className="text-white/50 text-sm">
                  Enterprise AI insights from the trenches
                </p>
              </div>

              {/* Col 2 */}
              <div className="space-y-4">
                <div className="text-sm font-semibold text-white/80">Information</div>
                <div className="space-y-2 text-sm text-white/50">
                  <div><a href="#" className="hover:text-white transition-colors">About</a></div>
                  <div><a href="#" className="hover:text-white transition-colors">Archive</a></div>
                  <div><a href="#" className="hover:text-white transition-colors">Contact</a></div>
                </div>
              </div>

              {/* Col 3 */}
              <div className="space-y-4">
                <div className="text-sm font-semibold text-white/80">Connect</div>
                <div className="space-y-2 text-sm text-white/50">
                  <div><a href="https://www.linkedin.com/in/rberi/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></div>
                  <div><a href="https://x.com/rajeshberi" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter / X</a></div>
                </div>
              </div>

              {/* Col 4 - Newsletter signup */}
              <div className="space-y-4">
                <div className="text-sm font-semibold text-white/80">Subscribe</div>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  />
                  <button className="w-full px-4 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-fuchsia-500 hover:to-purple-500 transition-all">
                    →
                  </button>
                </form>
              </div>

            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
              <div>© 2026 Rajesh Beri • THE D*AI*LY BRIEF</div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
