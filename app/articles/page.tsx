import { getAllNewsletters } from '@/lib/newsletters';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import NewsletterSignup from '@/components/NewsletterSignup';

export const metadata = {
  title: 'Articles | THE D[AI]LY BRIEF',
  description: 'All articles from THE D[AI]LY BRIEF — Enterprise AI insights and deep dives',
};

export default async function ArticlesPage() {
  const newsletters = await getAllNewsletters();

  return (
    <div className="min-h-screen bg-[#0a0812] text-white noise">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-[1000px] mx-auto px-6 py-16 md:py-24">
          <ScrollReveal>
            <div className="mb-14 space-y-3">
              <div className="label text-purple-400/60 mb-2">All Articles</div>
              <h2 className="heading-xl">
                Latest Analysis
              </h2>
              <p className="text-lg text-white/40 max-w-xl">
                Deep dives into AI advancements, benchmarks, and enterprise deployment strategies.
              </p>
            </div>
          </ScrollReveal>

          {newsletters.length === 0 ? (
            <div className="text-center py-20 text-white/30">
              No stories published yet.{' '}
              <a href="#newsletter" className="text-purple-400 hover:text-purple-300">Subscribe</a> to get notified.
            </div>
          ) : (
            <div className="space-y-1">
              {newsletters.map((newsletter, idx) => (
                <ScrollReveal key={newsletter.slug} delay={idx * 60}>
                  <Link
                    href={`/article/${newsletter.slug}`}
                    className="group flex items-start gap-6 py-6 border-b border-white/5 hover:border-purple-500/20 transition-all"
                  >
                    <time className="text-sm font-mono text-white/25 w-24 flex-shrink-0 pt-1">
                      {new Date(newsletter.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>

                    <div className="flex-1 min-w-0">
                      {newsletter.tags[0] && (
                        <span className="text-[10px] font-bold text-purple-400/80 uppercase tracking-wider">
                          {newsletter.tags[0]}
                        </span>
                      )}
                      <h3 className="text-xl font-bold mt-1 mb-2 group-hover:text-purple-300 transition-colors">
                        {newsletter.title}
                      </h3>
                      <p className="text-sm text-white/35 leading-relaxed line-clamp-2">
                        {newsletter.excerpt}
                      </p>
                    </div>

                    <svg className="w-5 h-5 text-white/15 group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}

          <NewsletterSignup />
        </main>

        <Footer />
      </div>
    </div>
  );
}
