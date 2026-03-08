import { getAllTools, getCategories, getDomains } from '@/lib/tools';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

// Make this a dynamic route - tools are fetched from MongoDB at runtime
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: 'AI Tools Directory | THE D[AI]LY BRIEF',
  description: 'Comprehensive directory of AI tools, platforms, and services. Find the best AI solutions for your business across all categories and domains.',
};

export default async function ToolsPage() {
  const tools = await getAllTools();
  const categories = await getCategories();
  const domains = await getDomains();

  return (
    <div className="min-h-screen bg-[#0a0812] text-white noise">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          {/* Hero */}
          <ScrollReveal>
            <div className="mb-16 text-center">
              <div className="label text-purple-400/60 mb-4">AI Tools Directory</div>
              <h1 className="heading-xl mb-6">
                Discover the Best AI Tools
              </h1>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                {tools.length} curated AI platforms, services, and tools across {categories.length} categories and {domains.length} business domains
              </p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-3 gap-6 mb-16">
              <div className="card card-glow p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{tools.length}</div>
                <div className="text-sm text-white/50">Tools Listed</div>
              </div>
              <div className="card card-glow p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{categories.length}</div>
                <div className="text-sm text-white/50">Categories</div>
              </div>
              <div className="card card-glow p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{domains.length}</div>
                <div className="text-sm text-white/50">Business Domains</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
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
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white font-bold">
                          {tool.productName.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-purple-200 transition-colors line-clamp-1">
                          {tool.productName}
                        </h3>
                        <p className="text-sm text-white/40">by {tool.vendorName}</p>
                      </div>
                      {tool.verified && (
                        <span className="text-purple-400" title="Verified">✓</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/60 mb-4 line-clamp-2 flex-1">
                      {tool.description}
                    </p>

                    {/* Category & Pricing */}
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

          {/* Categories */}
          <ScrollReveal delay={200}>
            <div className="mt-16">
              <h2 className="heading-md mb-8">Browse by Category</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {categories.map((cat: any) => (
                  <Link 
                    key={cat.slug} 
                    href={`/tools?category=${cat.slug}`}
                    className="card card-glow p-6 hover:border-purple-500/30 transition-all group"
                  >
                    <h3 className="font-bold mb-2 group-hover:text-purple-200 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-white/50">{cat.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Domains */}
          <ScrollReveal delay={300}>
            <div className="mt-16">
              <h2 className="heading-md mb-8">Browse by Business Domain</h2>
              <div className="flex flex-wrap gap-3">
                {domains.map((domain: any) => (
                  <Link
                    key={domain.slug}
                    href={`/tools?domain=${domain.slug}`}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 transition-all text-sm"
                  >
                    <span className="mr-2">{domain.icon}</span>
                    {domain.name}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </main>

        <Footer />
      </div>
    </div>
  );
}
