import { getAllNewsletters } from '@/lib/newsletters';
import { getAllTools } from '@/lib/tools';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import NewsletterSignup from '@/components/NewsletterSignup';

// Revalidate every 5 minutes to show new articles/tools quickly
export const revalidate = 300;

export default async function Home() {
  const newsletters = await getAllNewsletters();
  const tools = await getAllTools();
  const featured = newsletters[0];
  const latest = newsletters.slice(1, 7);
  const newTools = tools
    .sort((a, b) => new Date(b.addedDate || 0).getTime() - new Date(a.addedDate || 0).getTime())
    .slice(0, 6);

  const allTags = Array.from(
    new Set(newsletters.flatMap(n => n.tags))
  ).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#0a0812] text-white noise">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/12 rounded-full blur-[140px] glow-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-900/8 rounded-full blur-[140px] glow-orb-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full grid-pattern opacity-30" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-[1200px] mx-auto px-4 pt-4 pb-12 md:px-6 md:pt-8 md:pb-24">

          {featured ? (
            <>
              {/* ===== HERO / FEATURED ===== */}
              <section className="pt-6 pb-12 md:pt-12 md:pb-20">
                <ScrollReveal>
                  <Link href={`/article/${featured.slug}`} className="group block" aria-label={`Read featured article: ${featured.title}`}>
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                      {/* Visual */}
                      <div className="relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden featured-visual card-hover">
                        {featured.image ? (
                          <>
                            <img 
                              src={featured.image} 
                              alt={featured.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0812]/80 via-transparent to-transparent" />
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(168,85,247,0.2),transparent_70%)]" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(217,70,239,0.12),transparent_60%)]" />
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative">
                                <div className="absolute inset-0 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl" style={{animation: 'pulse-ring 4s ease-in-out infinite'}} />
                                <div className="text-7xl md:text-8xl opacity-20 group-hover:opacity-35 transition-all duration-700 group-hover:scale-110 select-none">✦</div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-3">
                          <span className="tag-featured">
                            Featured
                          </span>
                          <span className="text-sm text-white/30 mono">
                            {new Date(featured.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        <h2 className="heading-xl group-hover:text-purple-200 transition-colors duration-300">
                          {featured.title}
                        </h2>

                        <p className="body-lg text-white/60 line-clamp-3">
                          {featured.excerpt}
                        </p>

                        <div className="flex gap-2 flex-wrap">
                          {featured.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="text-purple-400 font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                          Read full analysis
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="heading-md text-white/90">Latest Analysis</h3>
                      <Link href="/articles" className="text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors inline-flex items-center gap-1 group/link">
                        View all 
                        <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
                      </Link>
                    </div>
                  </ScrollReveal>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latest.map((article, i) => (
                      <ScrollReveal key={article.slug} delay={i * 80}>
                        <Link href={`/article/${article.slug}`} className="group block h-full" aria-label={`Read article: ${article.title}`}>
                          <article className="card card-glow h-full flex flex-col overflow-hidden">
                            {article.image && (
                              <div className="relative h-[220px] overflow-hidden">
                                <img 
                                  src={article.image} 
                                  alt={article.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0812] via-transparent to-transparent" />
                              </div>
                            )}
                            <div className="flex-1 flex flex-col relative p-7">
                              {article.tags[0] && (
                                <span className="label text-purple-400/80 mb-3">
                                  {article.tags[0]}
                                </span>
                              )}

                              <h4 className="heading-sm mb-3 group-hover:text-purple-200 transition-colors line-clamp-2">
                                {article.title}
                              </h4>

                              <p className="body-sm text-white/50 mb-5 line-clamp-2 flex-1">
                                {article.excerpt}
                              </p>

                              <div className="flex items-center gap-2 text-xs text-white/25">
                                <span className="font-medium text-white/35">Rajesh Beri</span>
                                <span className="text-purple-500/40">·</span>
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

              {/* ===== NEW TOOLS DISCOVERY ===== */}
              {newTools.length > 0 && (
                <ScrollReveal>
                  <section className="pb-16">
                    <div className="flex items-center justify-between mb-10">
                      <div>
                        <h3 className="heading-md text-white/90">New in Our Tools Directory</h3>
                        <p className="text-white/40 text-sm mt-2">Recently added AI tools and platforms</p>
                      </div>
                      <Link href="/tools" className="text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors inline-flex items-center gap-1 group/link">
                        View all tools
                        <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
                      </Link>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {newTools.map((tool, i) => (
                        <ScrollReveal key={tool.slug} delay={i * 50}>
                          <Link href={`/tools/${tool.slug}`} className="group block h-full">
                            <article className="card card-glow h-full flex flex-col p-6 hover:border-purple-500/30 transition-all">
                              {/* Logo/Name */}
                              <div className="flex items-start gap-4 mb-4">
                                {tool.logoUrl ? (
                                  <img 
                                    src={tool.logoUrl} 
                                    alt={tool.productName}
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white font-bold">
                                    {tool.productName.charAt(0)}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-base mb-1 group-hover:text-purple-200 transition-colors line-clamp-1">
                                    {tool.productName}
                                  </h4>
                                  <p className="text-xs text-white/40">by {tool.vendorName}</p>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-sm text-white/60 mb-4 line-clamp-2 flex-1">
                                {tool.description}
                              </p>

                              {/* Tags */}
                              <div className="flex items-center gap-2 text-xs flex-wrap">
                                <span className="px-2 py-1 rounded bg-white/5 text-white/50">
                                  {tool.category}
                                </span>
                                <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400">
                                  {tool.pricingModel}
                                </span>
                              </div>
                            </article>
                          </Link>
                        </ScrollReveal>
                      ))}
                    </div>
                  </section>
                </ScrollReveal>
              )}
            </>
          ) : (
            <div className="text-center py-32">
              <div className="text-white/30 text-lg mb-6 font-display">No stories published yet</div>
              <a href="#newsletter" className="btn-primary">Subscribe to get notified</a>
            </div>
          )}

          {/* ===== SOCIAL PROOF BAR ===== */}
          <ScrollReveal>
            <section className="py-8 section-break">
              <div className="flex items-center justify-center gap-8 flex-wrap text-sm text-white/30">
                <span className="flex items-center gap-2">
                  <span className="text-lg">👥</span>
                  <span>For <strong className="text-white/60">engineering leaders</strong></span>
                </span>
                <span className="hidden sm:inline text-white/10">|</span>
                <span className="flex items-center gap-2">
                  <span className="text-lg">📬</span>
                  <span>Every <strong className="text-white/60">Tue & Thu</strong></span>
                </span>
                <span className="hidden sm:inline text-white/10">|</span>
                <span className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <span><strong className="text-white/60">Free</strong> forever</span>
                </span>
              </div>
            </section>
          </ScrollReveal>

          {/* ===== VALUE PROP ===== */}
          <ScrollReveal>
            <section className="py-16 section-break">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: '📊', title: 'Data-Driven', desc: 'Real benchmarks from production workloads — not marketing claims.' },
                  { icon: '🏢', title: 'Enterprise Focus', desc: 'Written for engineering leaders deploying AI at scale.' },
                  { icon: '⚡', title: 'Signal Only', desc: 'Twice-weekly deep dives. No fluff, no hype — just what matters.' },
                ].map((item, i) => (
                  <ScrollReveal key={item.title} delay={i * 100}>
                    <div className="value-card">
                      <div className="icon">{item.icon}</div>
                      <h4 className="font-display font-bold text-lg mb-2">{item.title}</h4>
                      <p className="body-sm text-white/55">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* ===== ABOUT ===== */}
          <ScrollReveal>
            <section className="pb-16">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <img 
                    src="/images/rajesh-beri.jpg" 
                    alt="Rajesh Beri"
                    className="w-20 h-20 rounded-full object-cover shrink-0 ring-2 ring-purple-500/20"
                  />
                  <div className="flex-1">
                    <p className="text-lg text-white/60 leading-relaxed mb-3">
                      Started as a personal AI news tracker. A few friends asked for my summaries. Word spread — 22 people, all referrals. So I turned it into <strong className="text-white/80">THE D[AI]LY BRIEF</strong> — now open to everyone who wants enterprise AI insights without the hype.
                    </p>
                    <p className="text-sm text-white/40">Real benchmarks. Real analysis. No vendor spin. <Link href="/about" className="text-purple-400 hover:text-purple-300 transition-colors">Read the full story →</Link></p>
                  </div>
                </div>
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
