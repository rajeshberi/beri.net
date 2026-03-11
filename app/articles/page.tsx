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

// Revalidate every 5 minutes to show new articles quickly
export const revalidate = 300;

export default async function ArticlesPage() {
  const newsletters = await getAllNewsletters();

  return (
    <div className="min-h-screen bg-[#0a0812] text-white noise">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-[1000px] mx-auto px-4 pt-4 pb-12 md:px-6 md:pt-8 md:pb-24">
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
                    className="group block py-4 border-b border-white/5 hover:border-purple-500/20 transition-all"
                  >
                    {/* Meta row: category + date inline */}
                    <div className="flex items-center gap-2 mb-2">
                      {newsletter.tags[0] && (
                        <span className="text-[10px] font-bold text-purple-400/80 uppercase tracking-wider">
                          {newsletter.tags[0]}
                        </span>
                      )}
                      <span className="text-white/20 text-xs">•</span>
                      <time className="text-xs font-mono text-white/30" dateTime={newsletter.date}>
                        {new Date(newsletter.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    {/* Title + arrow */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                          {newsletter.title}
                        </h3>
                        <p className="text-sm text-white/35 leading-relaxed line-clamp-2">
                          {newsletter.excerpt}
                        </p>
                      </div>
                      
                      <svg className="w-5 h-5 text-white/15 group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
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
