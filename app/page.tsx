import { getAllNewsletters } from '@/lib/newsletters';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function Home() {
  const newsletters = getAllNewsletters();
  const featured = newsletters[0];
  const latest = newsletters.slice(1, 7);

  const allTags = Array.from(
    new Set(newsletters.flatMap(n => n.tags))
  ).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#0c0a14] text-white">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] glow-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-900/15 rounded-full blur-[120px] glow-orb-delayed" />
      </div>

      <div className="relative">
        <Header tags={allTags} showCategoryNav />

        <main className="max-w-[1200px] mx-auto px-6">

          {featured ? (
            <>
              {/* ===== HERO / FEATURED ===== */}
              <section className="py-16 md:py-24">
                <ScrollReveal>
                  <Link href={`/newsletter/${featured.slug}`} className="group block">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                      {/* Visual - Abstract gradient */}
                      <div className="relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden card-hover bg-gradient-to-br from-purple-900/40 via-fuchsia-900/30 to-indigo-900/40">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(168,85,247,0.15),transparent_70%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(217,70,239,0.1),transparent_60%)]" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-7xl md:text-8xl opacity-20 group-hover:opacity-30 transition-opacity duration-700 select-none">✦</div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 text-[10px] font-bold bg-purple-600/80 text-white rounded-md uppercase tracking-wider">
                            Featured
                          </span>
                          <span className="text-sm text-white/40 font-mono">
                            {new Date(featured.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] group-hover:text-purple-300 transition-colors duration-300">
                          {featured.title}
                        </h2>

                        <p className="text-lg text-white/50 leading-relaxed line-clamp-3">
                          {featured.excerpt}
                        </p>

                        <div className="flex gap-2 flex-wrap">
                          {featured.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300/70 border border-purple-500/20">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="text-purple-400 font-medium text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                          Read full analysis
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              </section>

              {/* ===== LATEST NEWS GRID ===== */}
              {latest.length > 0 && (
                <section className="pb-16">
                  <ScrollReveal>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold text-white/90">Latest Analysis</h3>
                      <Link href="/archive" className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors">
                        View all →
                      </Link>
                    </div>
                  </ScrollReveal>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latest.map((article, i) => (
                      <ScrollReveal key={article.slug} delay={i * 80}>
                        <Link href={`/newsletter/${article.slug}`} className="group block h-full">
                          <article className="h-full flex flex-col rounded-xl border border-white/5 bg-white/[0.02] p-6 card-hover group-hover:border-purple-500/10 transition-colors duration-300">
                            <div className="flex-1 flex flex-col">
                              {article.tags[0] && (
                                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-2">
                                  {article.tags[0]}
                                </span>
                              )}

                              <h4 className="text-lg font-bold mb-2 group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                                {article.title}
                              </h4>

                              <p className="text-sm text-white/40 mb-4 line-clamp-2 flex-1 leading-relaxed">
                                {article.excerpt}
                              </p>

                              <div className="flex items-center gap-2 text-xs text-white/30">
                                <span className="font-medium">Rajesh Beri</span>
                                <span>·</span>
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
                      </ScrollReveal>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="text-center py-32">
              <div className="text-white/30 text-lg mb-6">No stories published yet</div>
              <a href="#newsletter" className="btn-primary">Subscribe to get notified</a>
            </div>
          )}

          {/* ===== ABOUT / VALUE PROP ===== */}
          <ScrollReveal>
            <section className="py-16 border-t border-white/5">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: '📊', title: 'Data-Driven', desc: 'Real benchmarks from production workloads — not marketing claims.' },
                  { icon: '🏢', title: 'Enterprise Focus', desc: 'Written for engineering leaders deploying AI at scale.' },
                  { icon: '⚡', title: 'Signal Only', desc: 'Twice-weekly deep dives. No fluff, no hype — just what matters.' },
                ].map((item, i) => (
                  <ScrollReveal key={item.title} delay={i * 100}>
                    <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] card-hover text-center">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h4 className="font-bold mb-2">{item.title}</h4>
                      <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* ===== NEWSLETTER SIGNUP ===== */}
          <NewsletterSignup />

        </main>

        <Footer />
      </div>
    </div>
  );
}
