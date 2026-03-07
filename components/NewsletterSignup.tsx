import ScrollReveal from './ScrollReveal';

export default function NewsletterSignup() {
  return (
    <ScrollReveal>
      <section id="newsletter" className="mt-20 relative overflow-hidden rounded-2xl border border-purple-500/10 bg-gradient-to-br from-purple-950/40 to-[#0c0a14]">
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative px-8 py-16 max-w-2xl mx-auto text-center space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold">
            Get AI insights in your inbox
          </h3>
          <p className="text-white/50 text-lg">
            Twice-weekly deep dives into what matters in AI. No spam, just signal.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@company.com"
              aria-label="Email address"
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
              required
            />
            <button className="btn-primary whitespace-nowrap !rounded-xl">
              Subscribe →
            </button>
          </form>

          <p className="text-xs text-white/25">
            Every Tuesday & Thursday · Free forever · Unsubscribe anytime
          </p>
        </div>
      </section>
    </ScrollReveal>
  );
}
