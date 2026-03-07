import { getNewsletterBySlug, getAllSlugs } from '@/lib/newsletters';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { remark } from 'remark';
import html from 'remark-html';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const newsletter = getNewsletterBySlug(slug);
  
  if (!newsletter) {
    return {
      title: 'Newsletter Not Found',
    };
  }

  return {
    title: `${newsletter.title} | THE D*AI*LY BRIEF`,
    description: newsletter.excerpt,
    openGraph: {
      title: newsletter.title,
      description: newsletter.excerpt,
      type: 'article',
      publishedTime: newsletter.date,
      tags: newsletter.tags,
    },
  };
}

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export default async function NewsletterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const newsletter = getNewsletterBySlug(slug);

  if (!newsletter) {
    notFound();
  }

  const contentHtml = await markdownToHtml(newsletter.content);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-violet-950 to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-600/30 via-purple-900/20 to-transparent pointer-events-none" />
      
      <div className="relative">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
            <Link href="/">
              <h1 className="text-xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
                THE D<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">*AI*</span>LY BRIEF
              </h1>
            </Link>
            <div className="flex gap-4">
              <Link 
                href="/archive"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Archive
              </Link>
              <a 
                href="/#subscribe" 
                className="px-6 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/30"
              >
                Subscribe
              </a>
            </div>
          </div>
        </header>

        {/* Article */}
        <main className="max-w-3xl mx-auto px-6 py-16">
          
          {/* Back link */}
          <Link 
            href="/archive"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-fuchsia-400 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to archive
          </Link>

          {/* Article Header */}
          <article className="space-y-8">
            
            {/* Meta */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <time className="text-sm font-mono text-fuchsia-400/80">
                  {new Date(newsletter.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {newsletter.title}
              </h1>

              {newsletter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newsletter.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300/70 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-12 h-[1px] bg-gradient-to-r from-fuchsia-500 via-purple-500 to-transparent" />

            {/* Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-4xl prose-h1:mb-4
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-white
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-white/90
                prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-6
                prose-strong:text-white prose-strong:font-semibold
                prose-a:text-fuchsia-400 prose-a:no-underline hover:prose-a:text-fuchsia-300
                prose-ul:text-white/70 prose-ul:space-y-2
                prose-li:text-white/70
                prose-code:text-purple-300 prose-code:bg-purple-950/30 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
                prose-blockquote:border-l-4 prose-blockquote:border-fuchsia-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/60"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

          </article>

          {/* Share / Subscribe CTA */}
          <div className="mt-16 pt-12 border-t border-white/10 space-y-8">
            
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                RB
              </div>
              <div>
                <div className="font-semibold text-white">Rajesh Beri</div>
                <div className="text-sm text-white/60">Head of AI Engineering at Zscaler</div>
              </div>
            </div>

            {/* Subscribe CTA */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-950/30 to-black border border-purple-500/20 backdrop-blur-sm">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">
                  Get insights like this <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">twice a week</span>
                </h3>
                <p className="text-white/60">
                  Join engineering leaders getting AI insights delivered to their inbox every Tuesday and Thursday.
                </p>
                <a 
                  href="/#subscribe"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/50"
                >
                  Subscribe Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </main>

      </div>
    </div>
  );
}
