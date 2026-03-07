import { getAllNewsletters } from '@/lib/newsletters';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'Topics | THE D*AI*LY BRIEF',
  description: 'Browse AI newsletter topics — Models, Benchmarks, Enterprise, Infrastructure',
};

export default function TagsPage() {
  const newsletters = getAllNewsletters();

  const tagCounts = new Map<string, number>();
  newsletters.forEach(n => n.tags.forEach(tag => tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)));

  const sortedTags = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen bg-[#0c0a14] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
          <ScrollReveal>
            <div className="mb-14 space-y-3">
              <div className="text-xs font-mono text-purple-400/60 tracking-widest uppercase">Browse by Topic</div>
              <h2 className="text-4xl md:text-5xl font-bold">All Topics</h2>
              <p className="text-lg text-white/40">Explore insights organized by subject area.</p>
            </div>
          </ScrollReveal>

          {sortedTags.length === 0 ? (
            <div className="text-center py-20 text-white/30">No topics yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedTags.map(([tag, count], i) => (
                <ScrollReveal key={tag} delay={i * 60}>
                  <Link
                    href={`/tag/${encodeURIComponent(tag)}`}
                    className="group block p-5 rounded-xl border border-white/5 bg-white/[0.02] card-hover"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold group-hover:text-purple-300 transition-colors">{tag}</h4>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300/60 font-mono">
                        {count}
                      </span>
                    </div>
                    <p className="text-xs text-white/30">
                      {count} {count === 1 ? 'article' : 'articles'}
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
