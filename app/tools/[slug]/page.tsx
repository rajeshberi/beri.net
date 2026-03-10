import { getToolBySlug } from '@/lib/tools';
import { getAllNewsletters } from '@/lib/newsletters';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Make this a dynamic route - tools are fetched from MongoDB at runtime
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return { title: 'Tool Not Found' };

  return {
    title: `${tool.productName} - ${tool.category} | AI Tools Directory`,
    description: tool.description,
    openGraph: {
      title: tool.productName,
      description: tool.description,
      type: 'website',
      images: tool.logoUrl ? [{ url: tool.logoUrl }] : [],
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Fetch latest articles for sidebar
  const allArticles = await getAllNewsletters();
  const latestArticles = allArticles.slice(0, 5);

  // Check if company info exists
  const hasCompanyInfo = tool.founded || tool.headquarters || tool.teamSize || tool.metrics?.funding;
  const hasSocialLinks = tool.socialLinks?.twitter || tool.socialLinks?.linkedin || tool.socialLinks?.github;

  return (
    <div className="min-h-screen bg-[#0a0812] text-white noise">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Main Content */}
          <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/30 mb-12">
            <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-purple-400 transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-white/50">{tool.productName}</span>
          </nav>

          {/* Header */}
          <div className="card card-glow p-8 mb-8">
            <div className="flex items-start gap-6 mb-6">
              {tool.logoUrl ? (
                <img 
                  src={tool.logoUrl} 
                  alt={tool.productName}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white text-3xl font-bold shrink-0">
                  {tool.productName.charAt(0)}
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="heading-lg">{tool.productName}</h1>
                  {tool.verified && (
                    <span className="text-purple-400 text-2xl" title="Verified">✓</span>
                  )}
                </div>
                <p className="text-white/50 mb-4">by {tool.vendorName}</p>
                <p className="text-lg text-white/70 leading-relaxed">{tool.description}</p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 text-sm">
                <span className="text-white/40">Category:</span>{' '}
                <span className="text-white/80">{tool.category}</span>
              </span>
              {tool.subcategory && (
                <span className="px-3 py-1.5 rounded-lg bg-white/5 text-sm">
                  <span className="text-white/40">Type:</span>{' '}
                  <span className="text-white/80">{tool.subcategory}</span>
                </span>
              )}
              <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 text-sm font-medium">
                {tool.pricingModel}
              </span>
              {tool.apiAvailable && (
                <span className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-300 text-sm">
                  API Available
                </span>
              )}
            </div>

            {/* CTA */}
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Visit Website →
            </a>
          </div>

          {/* Business Domains */}
          {tool.domains && tool.domains.length > 0 && (
            <div className="card card-glow p-8 mb-8">
              <h2 className="heading-sm mb-4">Business Domains</h2>
              <div className="flex flex-wrap gap-2">
                {tool.domains.map(domain => (
                  <span key={domain} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white/70">
                    {domain.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Analysis */}
          {tool.detailedAnalysis && (
            <div className="card card-glow p-8 mb-8">
              <h2 className="heading-sm mb-4">Overview</h2>
              <div className="text-white/70 leading-relaxed space-y-4">
                {tool.detailedAnalysis.split('\n').map((para, i) => (
                  para.trim() && <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          )}

          {/* Market Analysis - Placeholder for future API integration */}
          <div className="card card-glow p-8 mb-8">
            <h2 className="heading-sm mb-4">Market Analysis</h2>
            <div className="space-y-6">
              {/* Adoption & Usage */}
              <div>
                <h3 className="font-bold text-white/90 mb-3 flex items-center gap-2">
                  <span className="text-purple-400">📊</span>
                  Adoption & Usage
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {tool.productName} is used across {tool.targetAudience?.join(', ') || 'various industries'} for {tool.useCases?.[0]?.toLowerCase() || 'diverse use cases'}. 
                  {tool.metrics?.customers && ` Serves ${tool.metrics.customers}+ customers.`}
                  {tool.productName === 'ChatGPT' && ' Widely adopted with 900M weekly active users globally.'}
                  {tool.productName === 'Claude' && ' Growing adoption among enterprises for complex reasoning and code generation tasks.'}
                  {tool.productName === 'Gemini' && ' Integrated across Google Workspace, benefiting from existing enterprise user base.'}
                </p>
              </div>

              {/* Strengths */}
              <div>
                <h3 className="font-bold text-white/90 mb-3 flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Key Strengths
                </h3>
                <ul className="space-y-2 text-sm">
                  {tool.pricingModel === 'Open Source' && (
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span className="text-white/70">Open-source with full control over deployment and data</span>
                    </li>
                  )}
                  {tool.apiAvailable && (
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span className="text-white/70">Well-documented API for easy integration</span>
                    </li>
                  )}
                  {tool.pricingModel === 'Freemium' && (
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span className="text-white/70">Free tier available for testing and small-scale use</span>
                    </li>
                  )}
                  {tool.metrics?.funding && (
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span className="text-white/70">Well-funded with strong backing ({tool.metrics.funding})</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span className="text-white/70">{tool.description}</span>
                  </li>
                </ul>
              </div>

              {/* Considerations */}
              <div>
                <h3 className="font-bold text-white/90 mb-3 flex items-center gap-2">
                  <span className="text-yellow-400">⚠</span>
                  Considerations
                </h3>
                <ul className="space-y-2 text-sm">
                  {tool.pricingModel === 'Enterprise' && (
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span className="text-white/70">Enterprise-only pricing may be cost-prohibitive for smaller teams</span>
                    </li>
                  )}
                  {tool.pricingModel === 'Open Source' && (
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span className="text-white/70">Requires technical expertise for deployment and maintenance</span>
                    </li>
                  )}
                  {!tool.apiAvailable && (
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span className="text-white/70">Limited API access may restrict integration options</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span className="text-white/70">Evaluate against specific use case requirements before commitment</span>
                  </li>
                </ul>
              </div>

              <p className="text-xs text-white/30 italic border-t border-white/5 pt-4">
                Market analysis based on public information, vendor documentation, and industry trends. 
                Always conduct your own evaluation for your specific use case.
              </p>
            </div>
          </div>

          {/* Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <div className="card card-glow p-8 mb-8">
              <h2 className="heading-sm mb-4">Use Cases</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {tool.useCases.map((useCase, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-white/70">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Details */}
          {tool.pricingDetails && (
            <div className="card card-glow p-8 mb-8">
              <h2 className="heading-sm mb-4">Pricing</h2>
              <p className="text-white/70">{tool.pricingDetails}</p>
            </div>
          )}

          {/* Company Info - Only show if data exists */}
          {hasCompanyInfo && (
            <div className="card card-glow p-8 mb-8">
              <h2 className="heading-sm mb-4">Company Info</h2>
              <div className="space-y-3">
                    {tool.founded && (
                      <div className="flex justify-between">
                        <span className="text-white/40">Founded</span>
                        <span className="text-white/70">{tool.founded}</span>
                      </div>
                    )}
                    {tool.headquarters && (
                      <div className="flex justify-between">
                        <span className="text-white/40">Headquarters</span>
                        <span className="text-white/70">{tool.headquarters}</span>
                      </div>
                    )}
                    {tool.teamSize && (
                      <div className="flex justify-between">
                        <span className="text-white/40">Team Size</span>
                        <span className="text-white/70">{tool.teamSize}</span>
                      </div>
                    )}
                    {tool.metrics?.funding && (
                      <div className="flex justify-between">
                        <span className="text-white/40">Funding</span>
                        <span className="text-white/70">{tool.metrics.funding}</span>
                      </div>
                    )}
              </div>
            </div>
          )}

          {/* Social Links - Only show if any link exists */}
          {hasSocialLinks && (
            <div className="card card-glow p-8 mb-8">
              <h2 className="heading-sm mb-4">Links</h2>
              <div className="flex flex-wrap gap-4">
                    {tool.socialLinks?.twitter && (
                      <a href={tool.socialLinks.twitter} target="_blank" rel="noopener" className="block text-sm text-purple-400 hover:text-purple-300 transition-colors">
                        Twitter/X →
                      </a>
                    )}
                    {tool.socialLinks?.linkedin && (
                      <a href={tool.socialLinks.linkedin} target="_blank" rel="noopener" className="block text-sm text-purple-400 hover:text-purple-300 transition-colors">
                        LinkedIn →
                      </a>
                    )}
                    {tool.socialLinks?.github && (
                      <a href={tool.socialLinks.github} target="_blank" rel="noopener" className="block text-sm text-purple-400 hover:text-purple-300 transition-colors">
                        GitHub →
                      </a>
                    )}
                    <a href={tool.websiteUrl} target="_blank" rel="noopener" className="block text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      Official Website →
                    </a>
                  </div>
            </div>
          )}

          {/* Related Articles moved to sidebar */}

          {/* Back Link */}
          <div className="text-center">
            <Link href="/tools" className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2">
              ← Back to All Tools
            </Link>
          </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Subscribe Card - Sticky */}
            <div className="sticky top-24 z-10">
              <div className="card card-glow p-6 bg-[#0a0812]">
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
              <div className="card p-6">
                <div className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
                  Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.slice(0, 10).map((tag) => (
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

            {/* Related Articles */}
            {tool.relatedArticles && tool.relatedArticles.length > 0 && (
              <div className="card p-6">
                <div className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
                  Featured In
                </div>
                <div className="space-y-4">
                  {tool.relatedArticles.slice(0, 3).map((article: any) => (
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
              </div>
            )}

            {/* Latest Articles */}
            <div className="card p-6">
              <div className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
                Latest Articles
              </div>
              <div className="space-y-4">
                {latestArticles.map((article: any) => (
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
              <div className="mt-4 pt-4 border-t border-white/5">
                <Link href="/articles" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  See all articles →
                </Link>
              </div>
            </div>

            {/* Category */}
            <div className="card p-6">
              <div className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
                Category
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-white/50">Primary:</span>{' '}
                  <span className="text-white/90">{tool.category}</span>
                </div>
                {tool.subcategory && (
                  <div className="text-sm">
                    <span className="text-white/50">Type:</span>{' '}
                    <span className="text-white/90">{tool.subcategory}</span>
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
