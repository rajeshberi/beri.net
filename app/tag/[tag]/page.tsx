import { getAllNewsletters } from '@/lib/newsletters';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export async function generateStaticParams() {
  const newsletters = await getAllNewsletters();
  const tags = new Set<string>();
  newsletters.forEach(n => n.tags.forEach(t => tags.add(t)));
  return Array.from(tags).map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  return {
    title: `${decodeURIComponent(tag)} | THE D[AI]LY BRIEF`,
    description: `Articles tagged with ${decodeURIComponent(tag)}`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const newsletters = (await getAllNewsletters()).filter(n => n.tags.includes(decodedTag));

  if (newsletters.length === 0) notFound();

  return (
    <div className="min-h-screen bg-[#0c0a14] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-[900px] mx-auto px-4 py-12 md:px-6 md:py-24">
          <ScrollReveal>
            <Link href="/tags" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-purple-400 transition-colors mb-8">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All topics
            </Link>

            <div className="mb-14 space-y-3">
              <span className="inline-block px-4 py-1.5 text-sm font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full">
                {decodedTag}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">
                {newsletters.length} {newsletters.length === 1 ? 'Article' : 'Articles'}
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-1">
            {newsletters.map((newsletter, idx) => (
              <ScrollReveal key={newsletter.slug} delay={idx * 60}>
                <Link
                  href={`/article/${newsletter.slug}`}
                  className="group block py-6 border-b border-white/5 hover:border-purple-500/20 transition-all"
                >
                  <time className="text-xs font-mono text-white/25">
                    {new Date(newsletter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </time>
                  <h3 className="text-xl font-bold mt-1 mb-2 group-hover:text-purple-300 transition-colors">
                    {newsletter.title}
                  </h3>
                  <p className="text-sm text-white/35 leading-relaxed line-clamp-2">{newsletter.excerpt}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
