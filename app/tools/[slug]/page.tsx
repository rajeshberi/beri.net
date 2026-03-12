import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllNewsletters } from '@/lib/newsletters';

async function getTool(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beri.net';
  const res = await fetch(`${baseUrl}/api/tools/${slug}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) return null;
  const data = await res.json();
  return data.tool;
}

function CheckIcon({ checked }: { checked: boolean | null | undefined }) {
  if (checked === null || checked === undefined) {
    return <span className="text-white/40">—</span>;
  }
  return checked ? (
    <span className="text-green-400">✅</span>
  ) : (
    <span className="text-white/40">❌</span>
  );
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getTool(slug);

  if (!tool) {
    notFound();
  }

  // Note: Related articles (mentioned_in_articles) come from the API
  // Fallback to latest articles only if no related articles exist
  const allArticles = await getAllNewsletters();
  const latestArticles = allArticles.slice(0, 5);

  const cap = tool.capabilities || {};
  const sec = tool.security || {};

  return (
    <div className="min-h-screen bg-[#0a0812] text-white noise">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-[1200px] mx-auto px-4 pt-4 pb-12 md:px-6 md:pt-8 md:pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/30 mb-12">
            <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-purple-400 transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-white/50">{tool.name}</span>
          </nav>

          {/* Two-column layout: Tool + Sidebar */}
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            
            {/* Main Tool Column */}
            <article className="min-w-0">
              {/* Header */}
              <div className="space-y-6 mb-16">
                <div className="flex items-start gap-6">
                  {tool.logo_url ? (
                    <img 
                      src={tool.logo_url} 
                      alt={tool.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white text-3xl font-bold shrink-0">
                      {tool.name.charAt(0)}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="heading-xl">{tool.name}</h1>
                      {tool.verified && (
                        <span className="text-purple-400 text-2xl" title="Verified">✓</span>
                      )}
                    </div>
                    {tool.company && (
                      <p className="text-white/50 mb-4">
                        by {tool.company}
                        {tool.founded && ` • Founded ${tool.founded}`}
                        {tool.headquarters && ` • ${tool.headquarters}`}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xl text-white/70 leading-relaxed">{tool.tagline}</p>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-3">
                  {tool.primary_category && (
                    <Link
                      href={`/tools?category=${tool.primary_category.toLowerCase().replace(/ /g, '-')}`}
                      className="tag"
                    >
                      {tool.primary_category}
                    </Link>
                  )}
                  {tool.pricing_model && tool.pricing_model.length > 0 && (
                    <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 text-sm font-medium border border-purple-500/20">
                      {tool.pricing_model.join(', ')}
                    </span>
                  )}
                  {cap.api_access && (
                    <span className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-300 text-sm border border-green-500/20">
                      API Available
                    </span>
                  )}
                </div>

                {/* CTA */}
                {tool.website && (
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Visit Website →
                  </a>
                )}
              </div>

              {/* Overview */}
              {tool.short_description && (
                <div className="mb-16">
                  <h2 className="heading-md mb-6">Overview</h2>
                  <p className="text-white/70 leading-relaxed text-lg mb-8">{tool.short_description}</p>
                  
                  {tool.target_market && tool.target_market.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-white/90 mb-3">Target Market</h3>
                      <div className="flex flex-wrap gap-2">
                        {tool.target_market.map((market: string) => (
                          <span key={market} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white/70 border border-white/10">
                            {market}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Best For / Not Ideal For */}
              {(tool.best_for?.length > 0 || tool.not_ideal_for?.length > 0) && (
                <div className="mb-16">
                  <h2 className="heading-md mb-6">Best For / Not Ideal For</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {tool.best_for && tool.best_for.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-green-400 mb-4">✅ Best For</h3>
                        <ul className="space-y-2 text-white/70">
                          {tool.best_for.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {tool.not_ideal_for && tool.not_ideal_for.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-yellow-400 mb-4">⚠️ Not Ideal For</h3>
                        <ul className="space-y-2 text-white/70">
                          {tool.not_ideal_for.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-yellow-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Core Capabilities */}
              <div className="mb-16">
                <h2 className="heading-md mb-6">Core Capabilities</h2>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-white/80">
                  <div className="flex items-center justify-between">
                    <span>Text Generation</span>
                    <CheckIcon checked={cap.text_generation} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Image Generation</span>
                    <CheckIcon checked={cap.image_generation} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Video Generation</span>
                    <CheckIcon checked={cap.video_generation} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audio Generation</span>
                    <CheckIcon checked={cap.audio_generation} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Code Generation</span>
                    <CheckIcon checked={cap.code_generation} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Workflow Automation</span>
                    <CheckIcon checked={cap.workflow_automation} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Agent Orchestration</span>
                    <CheckIcon checked={cap.agent_orchestration} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API Access</span>
                    <CheckIcon checked={cap.api_access} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fine-tuning</span>
                    <CheckIcon checked={cap.fine_tuning} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Multi-language</span>
                    <CheckIcon checked={cap.multi_language} />
                  </div>
                </div>
              </div>

              {/* Key Features */}
              {tool.key_features && tool.key_features.length > 0 && (
                <div className="mb-16">
                  <h2 className="heading-md mb-6">Key Features</h2>
                  <ul className="space-y-4">
                    {tool.key_features.map((feature: any, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-green-400 mt-1 text-xl">✓</span>
                        <div>
                          <div className="font-semibold text-white mb-1">{feature.name || feature}</div>
                          {feature.benefit && (
                            <div className="text-sm text-white/60">{feature.benefit}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Security & Compliance */}
              <div className="mb-16">
                <h2 className="heading-md mb-6">Security & Compliance</h2>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-white/80">
                  <div className="flex items-center justify-between">
                    <span>SOC 2 Type II</span>
                    <CheckIcon checked={sec.soc2_type2} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>ISO 27001</span>
                    <CheckIcon checked={sec.iso27001} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>GDPR / CCPA</span>
                    <CheckIcon checked={sec.gdpr_ccpa} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Encryption</span>
                    <CheckIcon checked={sec.encryption_at_rest || sec.encryption_in_transit} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SSO</span>
                    <CheckIcon checked={sec.sso} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>RBAC</span>
                    <CheckIcon checked={sec.rbac} />
                  </div>
                </div>
              </div>

              {/* Use Cases */}
              {tool.use_cases && tool.use_cases.length > 0 && (
                <div className="mb-16">
                  <h2 className="heading-md mb-6">Use Cases</h2>
                  <div className="space-y-6">
                    {tool.use_cases.map((useCase: any, i: number) => (
                      <div key={i} className="border-l-4 border-purple-500/30 pl-6">
                        <h3 className="font-semibold mb-2 text-white text-lg">{useCase.title || useCase}</h3>
                        {useCase.description && (
                          <p className="text-white/60 leading-relaxed">{useCase.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              {tool.pricing?.plans && tool.pricing.plans.length > 0 && (
                <div className="mb-16">
                  <h2 className="heading-md mb-6">Pricing</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 text-white font-semibold">Plan</th>
                          <th className="text-left py-3 px-4 text-white font-semibold">Target User</th>
                          <th className="text-left py-3 px-4 text-white font-semibold">Pricing</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/70">
                        {tool.pricing.plans.map((plan: any, i: number) => (
                          <tr key={i} className="border-b border-white/5 last:border-0">
                            <td className="py-3 px-4 font-medium text-white">{plan.name}</td>
                            <td className="py-3 px-4">{plan.target_user}</td>
                            <td className="py-3 px-4">{plan.pricing_model}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Social Links */}
              {(tool.social_links?.twitter || tool.social_links?.linkedin || tool.social_links?.github || tool.website) && (
                <div className="mb-16">
                  <h2 className="heading-md mb-6">Links</h2>
                  <div className="flex flex-wrap gap-4">
                    {tool.website && (
                      <a href={tool.website} target="_blank" rel="noopener" className="text-purple-400 hover:text-purple-300 transition-colors">
                        Official Website →
                      </a>
                    )}
                    {tool.social_links?.twitter && (
                      <a href={tool.social_links.twitter} target="_blank" rel="noopener" className="text-purple-400 hover:text-purple-300 transition-colors">
                        Twitter/X →
                      </a>
                    )}
                    {tool.social_links?.linkedin && (
                      <a href={tool.social_links.linkedin} target="_blank" rel="noopener" className="text-purple-400 hover:text-purple-300 transition-colors">
                        LinkedIn →
                      </a>
                    )}
                    {tool.social_links?.github && (
                      <a href={tool.social_links.github} target="_blank" rel="noopener" className="text-purple-400 hover:text-purple-300 transition-colors">
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Back Link */}
              <div className="text-center pt-8 border-t border-white/10">
                <Link href="/tools" className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2">
                  ← Back to All Tools
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Subscribe Card - Sticky */}
              <div className="sticky top-24 z-10">
                <div className="card card-glow p-6" style={{ backgroundColor: '#0a0812' }}>
                  <div className="space-y-4">
                    <div className="text-sm font-semibold text-purple-400 uppercase tracking-wide">
                      Stay Updated
                    </div>
                    <h3 className="text-lg font-bold leading-tight">
                      Get AI insights every Tue & Thu
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Data-driven analysis for engineering leaders. No hype, just signal.
                    </p>
                    <a 
                      href="/#newsletter" 
                      className="btn-primary block text-center !text-sm"
                    >
                      Subscribe Free
                    </a>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {tool.tags && tool.tags.length > 0 && (
                <div className="card p-6" style={{ backgroundColor: '#0a0812' }}>
                  <div className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.slice(0, 10).map((tag: string) => (
                      <span
                        key={tag}
                        className="tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured In (Articles that mention this tool) */}
              {tool.mentioned_in_articles && tool.mentioned_in_articles.length > 0 && (
                <div className="card p-6" style={{ backgroundColor: '#0a0812' }}>
                  <div className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
                    Featured In
                  </div>
                  <div className="space-y-4">
                    {tool.mentioned_in_articles.map((article: any) => (
                      <Link
                        key={article.slug}
                        href={`/article/${article.slug}`}
                        className="block group"
                      >
                        <article>
                          <h4 className="text-sm font-semibold leading-snug group-hover:text-purple-200 transition-colors line-clamp-2 mb-1.5">
                            {article.title}
                          </h4>
                          <time className="text-xs text-white/30">
                            {new Date(article.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </time>
                        </article>
                      </Link>
                    ))}
                  </div>
                  {tool.mentioned_in_articles.length > 5 && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <Link href="/articles" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                        See all articles →
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Latest Articles (only show if no related articles) */}
              {(!tool.mentioned_in_articles || tool.mentioned_in_articles.length === 0) && latestArticles.length > 0 && (
                <div className="card p-6" style={{ backgroundColor: '#0a0812' }}>
                  <div className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
                    Latest From The Brief
                  </div>
                  <div className="space-y-4">
                    {latestArticles.slice(0, 3).map((article: any) => (
                      <Link
                        key={article.slug}
                        href={`/article/${article.slug}`}
                        className="block group"
                      >
                        <article>
                          {article.tags[0] && (
                            <div className="label text-purple-400/70 mb-1.5">
                              {article.tags[0]}
                            </div>
                          )}
                          <h4 className="text-sm font-semibold leading-snug group-hover:text-purple-200 transition-colors line-clamp-2 mb-1.5">
                            {article.title}
                          </h4>
                          <time className="text-xs text-white/30">
                            {new Date(article.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </time>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Category */}
              <div className="card p-6" style={{ backgroundColor: '#0a0812' }}>
                <div className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
                  Category
                </div>
                <div className="space-y-2">
                  {tool.primary_category && (
                    <div className="text-sm">
                      <span className="text-white/50">Primary:</span>{' '}
                      <Link href={`/tools?category=${tool.primary_category.toLowerCase().replace(/ /g, '-')}`} className="text-white/90 hover:text-purple-400">
                        {tool.primary_category}
                      </Link>
                    </div>
                  )}
                  {tool.secondary_categories && tool.secondary_categories.length > 0 && (
                    <div className="text-sm">
                      <span className="text-white/50">Also:</span>{' '}
                      <span className="text-white/90">{tool.secondary_categories.join(', ')}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <Link href="/tools" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                    Browse all tools →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getTool(slug);
  
  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} - AI Tools Directory | THE D[AI]LY BRIEF`,
    description: tool.tagline || tool.short_description || `Comprehensive profile for ${tool.name}`,
    openGraph: {
      title: tool.name,
      description: tool.tagline,
      type: 'website',
      images: tool.logo_url ? [{ url: tool.logo_url }] : [],
    },
  };
}
