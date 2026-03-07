import { getNewsletterBySlug, getAllSlugs } from '@/lib/newsletters';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const newsletter = getNewsletterBySlug(slug);
  if (!newsletter) return { title: 'Not Found' };

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
  const result = await remark().use(remarkGfm).use(html, { sanitize: false }).process(markdown);
  return result.toString();
}

export default async function NewsletterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const newsletter = getNewsletterBySlug(slug);
  if (!newsletter) notFound();

  const contentHtml = await markdownToHtml(newsletter.content);

  return (
    <div className="min-h-screen bg-[#0c0a14] text-white">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">

          {/* Back */}
          <Link
            href="/archive"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-purple-400 transition-colors mb-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to archive
          </Link>

          <article>
            {/* Header */}
              <div className="space-y-5 mb-12">
                <time className="text-sm font-mono text-purple-400/70">
                  {new Date(newsletter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>

                <h1 className="text-3xl md:text-5xl font-bold leading-[1.1]">
                  {newsletter.title}
                </h1>

                {newsletter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newsletter.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tag/${encodeURIComponent(tag)}`}
                        className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300/60 border border-purple-500/15 hover:bg-purple-500/20 hover:text-purple-200 transition-all"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Author line */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-xs font-bold">
                    RB
                  </div>
                  <div className="text-sm text-white/40">
                    <span className="text-white/70 font-medium">Rajesh Beri</span> · Head of AI Engineering at Zscaler
                  </div>
                </div>

                <div className="w-12 h-[2px] bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
              </div>

            {/* Content */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
          </article>

          {/* Author CTA */}
            <div className="mt-16 pt-12 border-t border-white/5 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-xl font-bold">
                  RB
                </div>
                <div>
                  <div className="font-semibold">Rajesh Beri</div>
                  <div className="text-sm text-white/40">Head of AI Engineering at Zscaler</div>
                </div>
              </div>
            </div>

          <NewsletterSignup />

        </main>

        <Footer />
      </div>
    </div>
  );
}
