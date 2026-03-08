import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: "About | THE D*AI*LY BRIEF",
  description: "Meet Rajesh Beri — an enterprise AI practitioner sharing real-world insights on deploying AI at scale.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0812] text-white noise">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[140px] glow-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-900/15 rounded-full blur-[140px] glow-orb-delayed" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/30 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/50">About</span>
          </nav>

          <ScrollReveal>
            <article className="space-y-8">
              
              {/* Header */}
              <div className="space-y-4">
                <h1 className="heading-xl">About</h1>
                <div className="w-16 h-[2px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-transparent rounded-full" />
              </div>

              {/* Profile Card */}
              <div className="card card-glow p-8 flex items-start gap-6 flex-col sm:flex-row">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-3xl font-bold shrink-0">
                  RB
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Rajesh Beri</h2>
                  <p className="text-white/50 mb-4">Enterprise AI Practitioner</p>
                  <div className="flex gap-4 text-sm">
                    <a href="https://www.linkedin.com/in/rberi/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                      LinkedIn →
                    </a>
                    <a href="https://x.com/rajeshberi" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Twitter/X →
                    </a>
                  </div>
                </div>
              </div>

              {/* Story */}
              <div className="article-content space-y-6">
                
                <h2>Why I Write</h2>
                <p>
                  I've spent 30+ years building enterprise applications at scale. For the past couple of years, I've been focused on applying AI to make business functions more productive — helping sales, finance, operations, legal, and engineering teams get real value from AI, not just hype.
                </p>
                <p>
                  Most AI content is either overhyped vendor marketing or academic theory that doesn't survive contact with production. I write <strong>THE D*AI*LY BRIEF</strong> to cut through the noise and share what actually works in enterprise environments.
                </p>

                <h2>What You'll Find Here</h2>
                <ul>
                  <li><strong>Real benchmarks</strong> — not cherry-picked marketing numbers</li>
                  <li><strong>Cost analysis</strong> — what it actually costs to run AI at scale</li>
                  <li><strong>Implementation insights</strong> — lessons from deploying in production</li>
                  <li><strong>Vendor comparisons</strong> — unbiased, data-driven evaluations</li>
                </ul>

                <h2>My Approach</h2>
                <p>
                  I test everything I write about. If I'm comparing models, I run the benchmarks. If I'm discussing a tool, I've deployed it in production. If I don't have first-hand data, I say so.
                </p>
                <p>
                  I also talk to peers across functions — CIOs, CFOs, sales leaders, operations directors, engineering heads. Their experiences inform what I write, though I keep specifics confidential. The goal: help you make better decisions about AI in your business.
                </p>

                <h2>Who This Is For</h2>
                <p>
                  You're a business leader — engineering, sales, finance, operations, legal, marketing — or anyone who needs to understand AI without the hype. You value data over opinions. You need insights you can act on immediately.
                </p>
                <p>
                  If that's you, <a href="#newsletter" className="text-purple-400 hover:text-purple-300">subscribe</a>. I send deep dives every Tuesday and Thursday — no fluff, just signal.
                </p>

                <h2>Get In Touch</h2>
                <p>
                  Hit reply on any email, or find me on <a href="https://www.linkedin.com/in/rberi/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">LinkedIn</a> or <a href="https://x.com/rajeshberi" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Twitter/X</a>. I read everything.
                </p>

              </div>

            </article>
          </ScrollReveal>

          <NewsletterSignup />

        </main>

        <Footer />
      </div>
    </div>
  );
}
