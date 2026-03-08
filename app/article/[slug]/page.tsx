import { getNewsletterBySlug, getAllSlugs, getRelatedNewsletters, getReadingTime, getAllTags } from '@/lib/newsletters';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';
import ReadingProgress from '@/components/ReadingProgress';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import InlineSubscribe from '@/components/InlineSubscribe';
import ArticleSidebar from '@/components/ArticleSidebar';
// ExitIntent and ScrollSubscribePrompt removed - too many subscribe prompts

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
      images: newsletter.image ? [
        {
          url: `https://beri.net${newsletter.image}`,
          width: 1792,
          height: 1024,
          alt: newsletter.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: newsletter.title,
      description: newsletter.excerpt,
      images: newsletter.image ? [`https://beri.net${newsletter.image}`] : [],
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
  const readingTime = getReadingTime(newsletter.content);
  const related = getRelatedNewsletters(slug, newsletter.tags, 5);
  const allTags = getAllTags();

  return (
    <div className="min-h-screen bg-[#0a0812] text-white noise">
      <ReadingProgress />
      {/* Subscribe prompts reduced to InlineSubscribe + bottom NewsletterSignup only */}

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/30 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-purple-400 transition-colors">Articles</Link>
            <span>/</span>
            <span className="text-white/50 truncate max-w-[200px]">{newsletter.title}</span>
          </nav>

          {/* Two-column layout: Article + Sidebar */}
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            
            {/* Main Article Column */}
            <article className="min-w-0">
            {/* Header */}
            <div className="space-y-5 mb-12">
              <div className="flex items-center gap-3 text-sm">
                <time className="font-mono text-purple-400/70">
                  {new Date(newsletter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span className="text-white/20">·</span>
                <span className="text-white/40">{readingTime} min read</span>
              </div>

              <h1 className="heading-xl">
                {newsletter.title}
              </h1>

              {newsletter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newsletter.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${encodeURIComponent(tag)}`}
                      className="tag"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Featured Image */}
              {newsletter.image && (
                <div className="my-8">
                  <div className="relative rounded-2xl overflow-hidden">
                    <img 
                      src={newsletter.image} 
                      alt={newsletter.title}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0812]/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                  {newsletter.imageCredit && (
                    <p className="text-xs text-white/30 mt-2 text-center" dangerouslySetInnerHTML={{ __html: newsletter.imageCredit }} />
                  )}
                </div>
              )}

              {/* Author + Share */}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-xs font-bold">
                    RB
                  </div>
                  <div className="text-sm text-white/40">
                    <span className="text-white/70 font-medium">Rajesh Beri</span> · Enterprise AI Practitioner
                  </div>
                </div>
                <ShareButtons title={newsletter.title} slug={slug} />
              </div>

              <div className="w-16 h-[2px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-transparent rounded-full" />
            </div>

            {/* Table of Contents */}
            <TableOfContents />

            {/* Content */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Mid-article subscribe prompt */}
            <InlineSubscribe />

            {/* Bottom share */}
            <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-sm text-white/40">Found this useful? Share it with your team.</p>
              <ShareButtons title={newsletter.title} slug={slug} />
            </div>
          </div>

          {/* Author CTA */}
          <div className="mt-12 pt-12 border-t border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-xl font-bold">
                RB
              </div>
              <div>
                <div className="font-semibold">Rajesh Beri</div>
                <div className="text-sm text-white/40">Enterprise AI Practitioner</div>
              </div>
            </div>
          </div>

            </article>
            
            {/* Sidebar Column - Hidden on mobile */}
            <div className="hidden lg:block">
              <ArticleSidebar
                currentSlug={slug}
                tags={newsletter.tags}
                relatedArticles={related.slice(0, 3)}
                allTags={allTags}
              />
            </div>

          </div>

          {/* Related Articles - Full Width on mobile, hidden on desktop (sidebar shows them) */}
          {related.length > 0 && (
            <section className="mt-16 pt-12 border-t border-white/5 lg:hidden">
              <h3 className="heading-md mb-8">You might also like</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.slice(0, 3).map(article => (
                  <Link key={article.slug} href={`/article/${article.slug}`} className="group block">
                    <article className="card card-glow h-full p-5">
                      {article.tags[0] && (
                        <span className="label text-purple-400/80">
                          {article.tags[0]}
                        </span>
                      )}
                      <h4 className="heading-sm text-sm mt-2 mb-2 group-hover:text-purple-200 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="body-sm text-white/50 line-clamp-2">{article.excerpt}</p>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <NewsletterSignup />

        </main>

        <Footer />
      </div>
    </div>
  );
}
