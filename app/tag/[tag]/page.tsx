import { getAllNewsletters } from '@/lib/newsletters';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const newsletters = getAllNewsletters();
  const tags = new Set<string>();
  newsletters.forEach(n => n.tags.forEach(t => tags.add(t)));
  
  return Array.from(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  return {
    title: `${decodedTag} | THE D*AI*LY BRIEF`,
    description: `All articles tagged with ${decodedTag} - Enterprise AI insights and deep dives`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  const newsletters = getAllNewsletters().filter(n =>
    n.tags.includes(decodedTag)
  );

  if (newsletters.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-violet-950 to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-600/30 via-purple-900/20 to-transparent pointer-events-none" />
      
      <div className="relative">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
            <Link href="/">
              <h1 className="text-xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
                THE D<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">*AI*</span>LY BRIEF
              </h1>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/archive" className="text-sm text-white/60 hover:text-white transition-colors">
                Archive
              </Link>
              <Link href="/search" className="text-sm text-white/60 hover:text-white transition-colors">
                Search
              </Link>
              <Link href="/tags" className="text-sm text-white/60 hover:text-white transition-colors">
                Tags
              </Link>
              <a href="/#subscribe" className="px-6 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/30">
                Subscribe
              </a>
            </div>
          </div>
        </header>

        {/* Tag Content */}
        <main className="max-w-5xl mx-auto px-6 py-24">
          
          {/* Back link */}
          <Link 
            href="/tags"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-fuchsia-400 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All tags
          </Link>

          {/* Page Header */}
          <div className="mb-16 space-y-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 border border-fuchsia-500/30">
              <svg className="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="font-mono text-fuchsia-300">{decodedTag}</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">{newsletters.length}</span> {newsletters.length === 1 ? 'Article' : 'Articles'}
            </h2>
            <p className="text-xl text-white/60">
              All insights tagged with <span className="text-fuchsia-400">{decodedTag}</span>
            </p>
          </div>

          {/* Newsletter List */}
          <div className="space-y-6">
            {newsletters.map((newsletter) => (
              <Link
                key={newsletter.slug}
                href={`/newsletter/${newsletter.slug}`}
                className="group block"
              >
                <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/30 to-black border border-purple-500/20 hover:border-purple-400/40 transition-all p-8">
                  
                  {/* Date & Tags */}
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <time className="text-sm font-mono text-fuchsia-400/80">
                      {new Date(newsletter.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </time>
                    <div className="flex gap-2 flex-wrap">
                      {newsletter.tags.map((t) => (
                        <span 
                          key={t}
                          className={`text-xs px-3 py-1 rounded-full ${
                            t === decodedTag
                              ? 'bg-fuchsia-600 text-white border border-fuchsia-500'
                              : 'bg-purple-500/10 text-purple-300/70 border border-purple-500/20'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-white group-hover:text-fuchsia-400 transition-colors mb-3">
                    {newsletter.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/60 leading-relaxed mb-4">
                    {newsletter.excerpt}
                  </p>

                  {/* Read more */}
                  <div className="text-fuchsia-400 group-hover:text-fuchsia-300 font-medium text-sm inline-flex items-center gap-2">
                    Read article
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                </article>
              </Link>
            ))}
          </div>

        </main>

      </div>
    </div>
  );
}
