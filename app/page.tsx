export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-black to-purple-950/20 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative">
        {/* Minimal Header */}
        <header className="border-b border-white/5 backdrop-blur-xl bg-black/40">
          <div className="max-w-4xl mx-auto px-6 py-8 flex justify-between items-center">
            <div>
              <div className="text-sm font-mono text-white/40 mb-1">RAJESH BERI</div>
              <h1 className="text-xl font-light tracking-tight">
                THE D<span className="text-blue-400">*AI*</span>LY BRIEF
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
        <main className="max-w-4xl mx-auto px-6">
          
          {/* Opening Statement */}
          <section className="pt-32 pb-24">
            <div className="space-y-8">
              <h2 className="text-6xl md:text-7xl font-light leading-[1.1] tracking-tight">
                AI insights from
                <br />
                <span className="text-white/40">the trenches of</span>
                <br />
                enterprise scale
              </h2>
              
              <div className="w-12 h-[1px] bg-gradient-to-r from-blue-500 to-transparent" />
              
              <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl">
                Twice weekly. No hype. No fluff. Just the AI advancements that matter, 
                analyzed from the perspective of building at Zscaler.
              </p>

              <div className="pt-8">
                <a 
                  href="#subscribe" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all hover:gap-4"
                >
                  Get the Brief
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <div className="flex gap-8 text-sm text-white/30 font-mono pt-4">
                <div>TUE + THU</div>
                <div>•</div>
                <div>FREE</div>
                <div>•</div>
                <div>ENTERPRISE FOCUSED</div>
              </div>
            </div>
          </section>

          {/* What You Get - Story-Driven */}
          <section className="py-24 border-t border-white/5">
            <div className="space-y-16">
              
              <div className="space-y-4">
                <div className="text-sm font-mono text-white/40">WHAT YOU GET</div>
                <h3 className="text-4xl font-light">
                  Signal, not noise
                </h3>
              </div>

              {/* Feature Grid - Bento Style */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Card 1 */}
                <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                  <div className="space-y-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-medium">Data Over Hype</h4>
                    <p className="text-white/50 leading-relaxed">
                      Every claim backed by numbers. Benchmarks, metrics, real-world performance—not marketing speak.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                  <div className="space-y-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-medium">Enterprise Lens</h4>
                    <p className="text-white/50 leading-relaxed">
                      Written from the perspective of deploying AI at scale. What works in production, not just demos.
                    </p>
                  </div>
                </div>

                {/* Card 3 - Full Width */}
                <div className="md:col-span-2 group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-medium">Actionable Monday Morning</h4>
                      <p className="text-white/50 leading-relaxed">
                        Every issue ends with "What This Means For You"—decisions you can make, experiments you can run, strategies you can adopt.
                      </p>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 font-mono text-sm text-white/40 space-y-2">
                      <div className="text-white/20">// Example takeaway</div>
                      <div>if (model_performance &gt; threshold) {"{"}</div>
                      <div className="pl-4">consider_migration();</div>
                      <div className="pl-4">benchmark_costs();</div>
                      <div className="pl-4">plan_rollout();</div>
                      <div>{"}"}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Subscribe - Clean CTA */}
          <section id="subscribe" className="py-32">
            <div className="max-w-xl mx-auto">
              <div className="space-y-8 text-center">
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl font-light leading-tight">
                    Stay ahead of
                    <br />
                    the AI curve
                  </h3>
                  <p className="text-white/40">
                    Join engineering leaders getting insights twice a week
                  </p>
                </div>

                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all"
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
                <div className="text-sm font-mono text-white/40">WRITTEN BY</div>
                <h3 className="text-3xl font-light">Rajesh Beri</h3>
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
                  className="text-white/40 hover:text-white transition-colors text-sm"
                >
                  LinkedIn →
                </a>
                <a 
                  href="https://x.com/rajeshberi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors text-sm"
                >
                  X / Twitter →
                </a>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-24">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-sm text-white/30">
              <div className="space-y-2">
                <div className="font-mono">THE D*AI*LY BRIEF</div>
                <div>© 2026 Rajesh Beri</div>
              </div>
              <div className="flex gap-8">
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
