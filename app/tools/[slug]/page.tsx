import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

function Section({ title, children, icon }: { title: string; children: React.ReactNode; icon?: string }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
        {icon && <span>{icon}</span>}
        {title}
      </h2>
      <div className="card card-glow p-6">
        {children}
      </div>
    </section>
  );
}

function SnapshotCard({ snapshot }: { snapshot: any }) {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-lg border border-purple-500/30 p-6 mb-8">
      <h3 className="text-lg font-bold mb-4 text-white">Quick Snapshot</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <div className="text-sm text-white/50 mb-1">Ideal Buyer</div>
          <div className="font-semibold text-white">{snapshot?.ideal_buyer || 'N/A'}</div>
        </div>
        <div>
          <div className="text-sm text-white/50 mb-1">Pricing Level</div>
          <div className="font-semibold text-white">{snapshot?.pricing_level || 'N/A'}</div>
        </div>
        <div>
          <div className="text-sm text-white/50 mb-1">Adoption</div>
          <div className="font-semibold text-white">{snapshot?.ease_of_adoption || 'N/A'}</div>
        </div>
        <div>
          <div className="text-sm text-white/50 mb-1">Enterprise Ready</div>
          <div className="font-semibold text-white">{snapshot?.enterprise_ready || 'N/A'}</div>
        </div>
        <div>
          <div className="text-sm text-white/50 mb-1">API Available</div>
          <div className="font-semibold text-white">{snapshot?.api_available || 'N/A'}</div>
        </div>
        <div>
          <div className="text-sm text-white/50 mb-1">Free Trial</div>
          <div className="font-semibold text-white">{snapshot?.free_trial || 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getTool(slug);

  if (!tool) {
    notFound();
  }

  const cap = tool.capabilities || {};
  const sec = tool.security || {};
  const deploy = tool.deployment || {};
  const perf = tool.performance || {};
  const market = tool.market || {};
  const comp = tool.competitive || {};

  return (
    <div className="min-h-screen bg-[#0a0812] text-white noise">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>
      
      <div className="relative">
        <Header />
        
        <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-8">
          <Link href="/tools" className="text-white/60 hover:text-white mb-4 inline-block">
            ← Back to Tools Directory
          </Link>
          <h1 className="text-5xl font-bold mb-4 text-white">{tool.name}</h1>
          <p className="text-xl text-white/80 mb-4">{tool.tagline}</p>
          
          {tool.company && (
            <div className="text-white/70 mb-2">
              <strong>Company:</strong> {tool.company}
              {tool.founded && ` • Founded: ${tool.founded}`}
              {tool.headquarters && ` • HQ: ${tool.headquarters}`}
            </div>
          )}
          
          <div className="flex gap-4 mb-6">
            {tool.website && (
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/30 transition-all"
              >
                Visit Website →
              </a>
            )}
          </div>

          {tool.primary_category && (
            <div className="flex gap-2 flex-wrap">
              <Link
                href={`/tags/${tool.primary_category.toLowerCase().replace(/ /g, '-')}`}
                className="px-3 py-1 bg-purple-500/20 text-purple-200 border border-purple-500/30 rounded-full text-sm hover:bg-purple-500/30"
              >
                {tool.primary_category}
              </Link>
              {tool.secondary_categories?.map((cat: string) => (
                <Link
                  key={cat}
                  href={`/tags/${cat.toLowerCase().replace(/ /g, '-')}`}
                  className="px-3 py-1 bg-white/5 text-white/80 border border-white/10 rounded-full text-sm hover:bg-white/10"
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Quick Snapshot */}
        {tool.snapshot && <SnapshotCard snapshot={tool.snapshot} />}

        {/* Overview */}
        <Section title="Overview" icon="📋">
          {tool.short_description && (
            <p className="text-lg text-white/80 mb-4">{tool.short_description}</p>
          )}
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {tool.target_market && tool.target_market.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-white">Target Market</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  {tool.target_market.map((m: string) => (
                    <li key={m}>• {m}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {tool.deployment_model && tool.deployment_model.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-white">Deployment</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  {tool.deployment_model.map((d: string) => (
                    <li key={d}>• {d}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {tool.pricing_model && tool.pricing_model.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-white">Pricing Model</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  {tool.pricing_model.map((p: string) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>

        {/* Best For / Not Ideal For */}
        {(tool.best_for?.length > 0 || tool.not_ideal_for?.length > 0) && (
          <Section title="Best For / Not Ideal For" icon="🎯">
            <div className="grid md:grid-cols-2 gap-6">
              {tool.best_for && tool.best_for.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">✅ Best For</h4>
                  <ul className="space-y-2 text-white/70">
                    {tool.best_for.map((item: string, i: number) => (
                      <li key={i} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {tool.not_ideal_for && tool.not_ideal_for.length > 0 && (
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-3">⚠️ Not Ideal For</h4>
                  <ul className="space-y-2 text-white/70">
                    {tool.not_ideal_for.map((item: string, i: number) => (
                      <li key={i} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Core Capabilities */}
        <Section title="Core Capabilities" icon="🧠">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-white/80">
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
        </Section>

        {/* Key Features */}
        {tool.key_features && tool.key_features.length > 0 && (
          <Section title="Key Features" icon="⚙️">
            <ul className="space-y-3">
              {tool.key_features.map((feature: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <div className="font-semibold text-white">{feature.name || feature}</div>
                    {feature.benefit && (
                      <div className="text-sm text-white/60">{feature.benefit}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Security & Compliance */}
        <Section title="Security & Compliance" icon="🔐">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-white/80">
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
              <span>Encryption (at rest/transit)</span>
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
          
          {sec.sso_methods && sec.sso_methods.length > 0 && (
            <div className="mt-4 text-sm text-white/60">
              <strong>SSO Methods:</strong> {sec.sso_methods.join(', ')}
            </div>
          )}
          
          {sec.data_retention_policy && (
            <div className="mt-2 text-sm text-white/60">
              <strong>Data Retention:</strong> {sec.data_retention_policy}
            </div>
          )}
        </Section>

        {/* Pricing */}
        {tool.pricing?.plans && tool.pricing.plans.length > 0 && (
          <Section title="Pricing" icon="💰">
            <div className="overflow-x-auto">
              <table className="w-full text-white/80">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-4 text-white">Plan</th>
                    <th className="text-left py-2 px-4 text-white">Target User</th>
                    <th className="text-left py-2 px-4 text-white">Pricing</th>
                    <th className="text-left py-2 px-4 text-white">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {tool.pricing.plans.map((plan: any, i: number) => (
                    <tr key={i} className="border-b border-white/10 last:border-0">
                      <td className="py-3 px-4 font-semibold text-white">{plan.name}</td>
                      <td className="py-3 px-4">{plan.target_user}</td>
                      <td className="py-3 px-4">{plan.pricing_model}</td>
                      <td className="py-3 px-4 text-sm text-white/60">{plan.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-white/70">
              {tool.pricing.free_trial && (
                <div>
                  <strong className="text-white">Free Trial:</strong> {tool.pricing.trial_days ? `${tool.pricing.trial_days} days` : 'Yes'}
                </div>
              )}
              {tool.pricing.minimum_contract && (
                <div>
                  <strong className="text-white">Minimum Contract:</strong> {tool.pricing.minimum_contract}
                </div>
              )}
              {tool.pricing.volume_discounts && (
                <div><strong className="text-white">Volume Discounts:</strong> Available</div>
              )}
            </div>
          </Section>
        )}

        {/* Market & Adoption */}
        {(market.notable_clients?.length > 0 || market.estimated_customers) && (
          <Section title="Market & Adoption" icon="📊">
            <div className="text-white/70 space-y-4">
              {market.estimated_customers && (
                <div>
                  <strong className="text-white">Estimated Customers:</strong> {market.estimated_customers}
                </div>
              )}
              
              {market.notable_clients && market.notable_clients.length > 0 && (
                <div>
                  <strong className="text-white">Notable Clients:</strong> {market.notable_clients.join(', ')}
                </div>
              )}
              
              {market.industries && market.industries.length > 0 && (
                <div>
                  <strong className="text-white">Industries:</strong> {market.industries.join(', ')}
                </div>
              )}
              
              {market.funding?.total && (
                <div>
                  <strong className="text-white">Funding:</strong> {market.funding.total}
                  {market.funding.stage && ` (${market.funding.stage})`}
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Strengths & Considerations */}
        {(tool.strengths?.length > 0 || tool.considerations?.length > 0) && (
          <Section title="Strengths & Considerations" icon="⭐">
            <div className="grid md:grid-cols-2 gap-6">
              {tool.strengths && tool.strengths.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">✅ Strengths</h4>
                  <ul className="space-y-2 text-white/70">
                    {tool.strengths.map((item: string, i: number) => (
                      <li key={i} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {tool.considerations && tool.considerations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-3">⚠️ Considerations</h4>
                  <ul className="space-y-2 text-white/70">
                    {tool.considerations.map((item: string, i: number) => (
                      <li key={i} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Competitive Positioning */}
        {(comp.primary_competitors?.length > 0 || comp.differentiators?.length > 0) && (
          <Section title="Competitive Positioning" icon="🏆">
            {comp.primary_competitors && comp.primary_competitors.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-white">Primary Competitors</h4>
                <div className="flex gap-2 flex-wrap">
                  {comp.primary_competitors.map((competitor: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-sm text-white/80">
                      {competitor}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {comp.differentiators && comp.differentiators.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-white">Key Differentiators</h4>
                <ul className="space-y-2 text-white/70">
                  {comp.differentiators.map((diff: string, i: number) => (
                    <li key={i} className="text-sm">• {diff}</li>
                  ))}
                </ul>
              </div>
            )}
          </Section>
        )}

        {/* Use Cases */}
        {tool.use_cases && tool.use_cases.length > 0 && (
          <Section title="Use Cases" icon="🧪">
            <div className="space-y-4">
              {tool.use_cases.map((useCase: any, i: number) => (
                <div key={i} className="border-l-4 border-purple-500/30 pl-4">
                  <h4 className="font-semibold mb-1 text-white">{useCase.title || useCase}</h4>
                  {useCase.description && (
                    <p className="text-sm text-white/60">{useCase.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Related Articles */}
        {tool.mentioned_in_articles && tool.mentioned_in_articles.length > 0 && (
          <Section title="Mentioned In" icon="📰">
            <div className="space-y-3">
              {tool.mentioned_in_articles.map((article: any) => (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="block p-4 border border-white/10 rounded-lg hover:border-purple-500/30 hover:bg-white/5 transition"
                >
                  <h4 className="font-semibold mb-1 text-white">{article.title}</h4>
                  <p className="text-sm text-white/50">{article.date}</p>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* Footer Metadata */}
        <div className="mt-12 pt-6 border-t border-white/10 text-sm text-white/50">
          {tool.source && <div>Source: {tool.source}</div>}
          {tool.discovered && <div>Discovered: {tool.discovered}</div>}
          {tool.last_updated && <div>Last Updated: {tool.last_updated}</div>}
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
    title: `${tool.name} - AI Tools Directory | beri.net`,
    description: tool.tagline || tool.short_description || `Comprehensive profile for ${tool.name}`,
  };
}
