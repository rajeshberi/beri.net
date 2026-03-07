export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated gradient background - Purple/Blue AI theme */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950 via-black to-blue-950 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Neural network pattern overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern id="neural-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="white" />
              <circle cx="0" cy="0" r="1" fill="white" />
              <circle cx="100" cy="0" r="1" fill="white" />
              <circle cx="0" cy="100" r="1" fill="white" />
              <circle cx="100" cy="100" r="1" fill="white" />
              <line x1="50" y1="50" x2="0" y2="0" stroke="white" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="white" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="white" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="100" y2="100" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>
      
      {/* Floating abstract orbs */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px] pointer-events-none animate-pulse" />
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative">
        {/* Minimal Header */}
        <header className="border-b border-white/5 backdrop-blur-xl bg-black/40">
          <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
            <div>
              <div className="text-sm font-mono text-purple-400/60 mb-1">RAJESH BERI</div>
              <h1 className="text-xl font-light tracking-tight">
                THE D<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">*AI*</span>LY BRIEF
              </h1>
            </div>
            <a 
              href="#subscribe" 
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Subscribe
            </a>
          </div>
        </header>

        {/* Hero - Content First */}
        <main className="max-w-6xl mx-auto px-6">
          
          {/* Opening Statement */}
          <section className="pt-32 pb-24 relative">
            {/* Abstract neural nodes decoration */}
            <div className="absolute top-40 right-0 w-64 h-64 opacity-20 pointer-events-none">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient id="node-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="3" fill="url(#node-grad)" />
                <circle cx="50" cy="50" r="2" fill="url(#node-grad)" />
                <circle cx="150" cy="50" r="2" fill="url(#node-grad)" />
                <circle cx="50" cy="150" r="2" fill="url(#node-grad)" />
                <circle cx="150" cy="150" r="2" fill="url(#node-grad)" />
                <line x1="100" y1="100" x2="50" y2="50" stroke="url(#node-grad)" strokeWidth="1" opacity="0.5" />
                <line x1="100" y1="100" x2="150" y2="50" stroke="url(#node-grad)" strokeWidth="1" opacity="0.5" />
                <line x1="100" y1="100" x2="50" y2="150" stroke="url(#node-grad)" strokeWidth="1" opacity="0.5" />
                <line x1="100" y1="100" x2="150" y2="150" stroke="url(#node-grad)" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>

            <div className="space-y-8">
              <h2 className="text-6xl md:text-7xl font-light leading-[1.1] tracking-tight">
                AI insights from
                <br />
                <span className="text-white/40">the trenches of</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
                  enterprise scale
                </span>
              </h2>
              
              <div className="w-12 h-[1px] bg-gradient-to-r from-purple-500 via-blue-500 to-transparent" />
              
              <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl">
                Twice weekly. No hype. No fluff. Just the AI advancements that matter, 
                analyzed from the perspective of building at Zscaler.
              </p>

              <div className="pt-8">
                <a 
                  href="#subscribe" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full hover:from-purple-500 hover:to-blue-500 transition-all hover:gap-4 shadow-lg shadow-purple-500/50"
                >
                  Get the Brief
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <div className="flex gap-8 text-sm text-purple-300/40 font-mono pt-4">
                <div>TUE + THU</div>
                <div>•</div>
                <div>FREE</div>
                <div>•</div>
                <div>ENTERPRISE FOCUSED</div>
              </div>
            </div>
          </section>

          {/* Abstract AI visualization */}
          <section className="py-16">
            <div className="relative h-64 rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-purple-950/50 to-blue-950/50 backdrop-blur-sm">
              {/* Neural mesh background */}
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full">
                  <defs>
                    <linearGradient id="mesh-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line
                      key={i}
                      x1={Math.random() * 100 + '%'}
                      y1={Math.random() * 100 + '%'}
                      x2={Math.random() * 100 + '%'}
                      y2={Math.random() * 100 + '%'}
                      stroke="url(#mesh-grad)"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  ))}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={Math.random() * 100 + '%'}
                      cy={Math.random() * 100 + '%'}
                      r={Math.random() * 2 + 1}
                      fill="url(#mesh-grad)"
                    />
                  ))}
                </svg>
              </div>
              
              {/* Overlay text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="text-sm font-mono text-purple-300/60">DEEP LEARNING • TRANSFORMERS • ENTERPRISE AI</div>
                  <div className="text-3xl font-light text-white/80">Built for Scale</div>
                </div>
              </div>
            </div>
          </section>

          {/* What You Get - Story-Driven */}
          <section className="py-24 border-t border-white/5">
            <div className="space-y-16">
              
              <div className="space-y-4">
                <div className="text-sm font-mono text-purple-400/60">WHAT YOU GET</div>
                <h3 className="text-4xl font-light">
                  Signal, not noise
                </h3>
              </div>

              {/* Feature Grid - Bento Style with purple/blue accents */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Card 1 - Purple accent */}
                <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-950/30 to-black/50 border border-purple-500/20 hover:border-purple-400/40 transition-all backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center border border-purple-500/30">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-medium text-white">Data Over Hype</h4>
                    <p className="text-white/50 leading-relaxed">
                      Every claim backed by numbers. Benchmarks, metrics, real-world performance—not marketing speak.
                    </p>
                  </div>
                </div>

                {/* Card 2 - Blue accent */}
                <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-950/30 to-black/50 border border-blue-500/20 hover:border-blue-400/40 transition-all backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center border border-blue-500/30">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-medium text-white">Enterprise Lens</h4>
                    <p className="text-white/50 leading-relaxed">
                      Written from the perspective of deploying AI at scale. What works in production, not just demos.
                    </p>
                  </div>
                </div>

                {/* Card 3 - Full Width with gradient and code */}
                <div className="md:col-span-2 group p-8 rounded-2xl bg-gradient-to-br from-purple-950/20 via-blue-950/20 to-black/50 border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center border border-cyan-500/30">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-medium text-white">Actionable Monday Morning</h4>
                      <p className="text-white/50 leading-relaxed">
                        Every issue ends with "What This Means For You"—decisions you can make, experiments you can run, strategies you can adopt.
                      </p>
                    </div>
                    <div className="bg-black/40 border border-purple-500/20 rounded-xl p-6 font-mono text-sm text-purple-300/60 space-y-2 backdrop-blur-sm">
                      <div className="text-purple-400/40">// Example takeaway</div>
                      <div><span className="text-purple-400">if</span> (model_performance &gt; threshold) {"{"}</div>
                      <div className="pl-4 text-blue-300/60">consider_migration();</div>
                      <div className="pl-4 text-blue-300/60">benchmark_costs();</div>
                      <div className="pl-4 text-blue-300/60">plan_rollout();</div>
                      <div>{"}"}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Subscribe - Clean CTA with neural decoration */}
          <section id="subscribe" className="py-32 relative">
            {/* Decorative neural nodes */}
            <div className="absolute top-10 left-0 w-48 h-48 opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="2" fill="url(#node-grad)" />
                <circle cx="20" cy="30" r="1.5" fill="url(#node-grad)" />
                <circle cx="80" cy="30" r="1.5" fill="url(#node-grad)" />
                <circle cx="20" cy="70" r="1.5" fill="url(#node-grad)" />
                <circle cx="80" cy="70" r="1.5" fill="url(#node-grad)" />
                <line x1="50" y1="50" x2="20" y2="30" stroke="url(#node-grad)" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="80" y2="30" stroke="url(#node-grad)" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="20" y2="70" stroke="url(#node-grad)" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="80" y2="70" stroke="url(#node-grad)" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="max-w-xl mx-auto">
              <div className="space-y-8 text-center">
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl font-light leading-tight">
                    Stay ahead of
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      the AI curve
                    </span>
                  </h3>
                  <p className="text-white/40">
                    Join engineering leaders getting insights twice a week
                  </p>
                </div>

                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 rounded-full bg-white/5 border border-purple-500/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all backdrop-blur-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/30"
                  >
                    Subscribe Free
                  </button>
                </form>

                <p className="text-xs text-white/20">
                  No spam. Unsubscribe anytime. Typically 2-3 min reads.
                </p>
              </div>
            </div>
          </section>

          {/* About - Minimal */}
          <section className="py-24 border-t border-white/5">
            <div className="max-w-2xl space-y-8">
              <div className="space-y-4">
                <div className="text-sm font-mono text-purple-400/60">WRITTEN BY</div>
                <h3 className="text-3xl font-light text-white">Rajesh Beri</h3>
              </div>
              
              <p className="text-lg text-white/50 leading-relaxed">
                Head of AI Engineering at Zscaler. I lead teams building and deploying AI 
                systems at enterprise scale. This newsletter is my way of sharing what's 
                actually working—and what's just noise.
              </p>

              <div className="flex gap-6 pt-4">
                <a 
                  href="https://www.linkedin.com/in/rberi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-purple-400 transition-colors text-sm"
                >
                  LinkedIn →
                </a>
                <a 
                  href="https://x.com/rajeshberi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-blue-400 transition-colors text-sm"
                >
                  X / Twitter →
                </a>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-24 backdrop-blur-sm bg-black/40">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-sm text-white/30">
              <div className="space-y-2">
                <div className="font-mono text-purple-400/40">THE D*AI*LY BRIEF</div>
                <div>© 2026 Rajesh Beri</div>
              </div>
              <div className="flex gap-8 font-mono text-purple-300/30">
                <div>Tue + Thu</div>
                <div>Free</div>
                <div>Enterprise AI</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
