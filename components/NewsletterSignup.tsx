import ScrollReveal from './ScrollReveal';

export default function NewsletterSignup() {
  return (
    <ScrollReveal>
      <section id="newsletter" className="mt-20 signup-section">
        {/* Decorative glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-fuchsia-600/8 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative px-8 py-20 max-w-2xl mx-auto text-center space-y-6">
          <h3 className="heading-lg text-gradient-subtle">
            Get AI insights in your inbox
          </h3>
          <p className="body-lg text-white/45 max-w-md mx-auto">
            Twice-weekly deep dives into what matters in AI. No spam, just signal.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@company.com"
              aria-label="Email address"
              className="input flex-1"
              required
            />
            <button className="btn-primary whitespace-nowrap !rounded-xl">
              Subscribe →
            </button>
          </form>

          <p className="text-xs text-white/20 mono">
            Every Tuesday & Thursday · Free forever · Unsubscribe anytime
          </p>
        </div>
      </section>
    </ScrollReveal>
  );
}
