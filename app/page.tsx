export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-blue-800/30 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">
                THE D<span className="text-blue-400">*AI*</span>LY BRIEF
              </h1>
              <p className="text-sm text-blue-300 mt-1">by Rajesh Beri</p>
            </div>
            <nav className="flex gap-6">
              <a href="#subscribe" className="text-blue-300 hover:text-white transition-colors">
                Subscribe
              </a>
              <a href="#about" className="text-blue-300 hover:text-white transition-colors">
                About
              </a>
              <a href="https://www.linkedin.com/in/rberi/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors">
                LinkedIn
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              AI Insights That Actually <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Matter</span>
            </h2>
            <p className="text-xl text-blue-200 mb-8 leading-relaxed">
              Twice-weekly deep dives into AI advancements. No hype, no fluff—just the insights engineering leaders and tech decision-makers need to stay ahead.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#subscribe" 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/50"
              >
                Subscribe Free
              </a>
              <a 
                href="#recent" 
                className="px-8 py-4 border-2 border-blue-400 text-blue-300 hover:bg-blue-900/30 font-semibold rounded-lg transition-colors"
              >
                Read Latest
              </a>
            </div>
            <p className="text-sm text-blue-300/70 mt-6">
              📰 Every Tuesday & Thursday · 📊 Data-driven · 🎯 Enterprise-focused
            </p>
          </div>
        </section>

        {/* Value Props */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-800/30 rounded-lg p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">Enterprise Perspective</h3>
              <p className="text-blue-200">
                Written from the trenches of building AI at scale at Zscaler. Real-world insights, not academic theory.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-800/30 rounded-lg p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-3">Numbers Over Noise</h3>
              <p className="text-blue-200">
                Data-driven analysis. We cut through the hype to show you what actually moves the needle.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-800/30 rounded-lg p-8">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3">Actionable Takeaways</h3>
              <p className="text-blue-200">
                Every issue ends with "What This Means For You"—practical implications you can use Monday morning.
              </p>
            </div>
          </div>
        </section>

        {/* Subscribe Form */}
        <section id="subscribe" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="bg-gradient-to-br from-blue-900/50 to-slate-800/50 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4 text-center">
              Join the Brief
            </h3>
            <p className="text-blue-200 text-center mb-8">
              Get AI insights twice a week. Unsubscribe anytime.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-6 py-4 rounded-lg bg-slate-900/50 border border-blue-700/50 text-white placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-blue-500/50"
              >
                Subscribe Free →
              </button>
            </form>
            <p className="text-xs text-blue-300/60 text-center mt-4">
              No spam. No ads (yet). Just AI insights you can use.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-6">About Rajesh Beri</h3>
            <p className="text-lg text-blue-200 leading-relaxed mb-6">
              Head of AI Engineering at Zscaler, where I lead teams building AI at enterprise scale. 
              I write THE D*AI*LY BRIEF to cut through AI hype and share what's actually working in production.
            </p>
            <div className="flex justify-center gap-6">
              <a 
                href="https://www.linkedin.com/in/rberi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                LinkedIn →
              </a>
              <a 
                href="https://x.com/rajeshberi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Twitter/X →
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-800/30 backdrop-blur-sm bg-slate-900/50 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-blue-300/60 text-sm">
            <p>© 2026 THE D*AI*LY BRIEF by Rajesh Beri</p>
            <p className="mt-2">Twice weekly AI insights · No hype, just value</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
