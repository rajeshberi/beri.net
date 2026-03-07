import { getAllNewsletters } from '@/lib/newsletters';
import Link from 'next/link';

export const metadata = {
  title: 'Tags | THE D*AI*LY BRIEF',
  description: 'Browse AI newsletter topics by tag - Models, Benchmarks, Enterprise, Deployment',
};

export default function TagsPage() {
  const newsletters = getAllNewsletters();
  
  // Count articles per tag
  const tagCounts = new Map<string, number>();
  newsletters.forEach(n => {
    n.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  // Sort tags by count (descending)
  const sortedTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1]);

  // Calculate size tiers for visual hierarchy
  const maxCount = Math.max(...Array.from(tagCounts.values()));
  const getTagSize = (count: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.7) return 'text-3xl';
    if (ratio > 0.4) return 'text-2xl';
    if (ratio > 0.2) return 'text-xl';
    return 'text-lg';
  };

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
              <a href="/#subscribe" className="px-6 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/30">
                Subscribe
              </a>
            </div>
          </div>
        </header>

        {/* Tags Content */}
        <main className="max-w-6xl mx-auto px-6 py-24">
          
          {/* Page Header */}
          <div className="mb-16 space-y-4">
            <div className="text-sm font-mono text-fuchsia-400/80 tracking-wider">BROWSE BY TOPIC</div>
            <h2 className="text-5xl md:text-6xl font-bold">
              All <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Tags</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl">
              Explore AI insights organized by topic. Size indicates article count.
            </p>
          </div>

          {sortedTags.length === 0 ? (
            <div className="text-center py-16 text-white/40">
              No tags yet. <a href="/#subscribe" className="text-fuchsia-400">Subscribe</a> to get notified when content is published.
            </div>
          ) : (
            <>
              {/* Tag Cloud */}
              <div className="mb-16 p-12 rounded-3xl bg-gradient-to-br from-purple-950/30 to-black border border-purple-500/20 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {sortedTags.map(([tag, count]) => (
                    <Link
                      key={tag}
                      href={`/tag/${encodeURIComponent(tag)}`}
                      className={`group font-semibold hover:text-fuchsia-400 transition-all ${getTagSize(count)}`}
                      style={{ 
                        opacity: 0.6 + (count / maxCount) * 0.4,
                        color: `hsl(${280 + (count / maxCount) * 40}, 70%, ${50 + (count / maxCount) * 20}%)`
                      }}
                    >
                      {tag}
                      <span className="text-sm opacity-60 ml-2">({count})</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tag List with Details */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-6 text-white">All Topics</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedTags.map(([tag, count]) => (
                    <Link
                      key={tag}
                      href={`/tag/${encodeURIComponent(tag)}`}
                      className="group p-6 rounded-xl bg-gradient-to-br from-purple-950/30 to-black border border-purple-500/20 hover:border-purple-400/40 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-white group-hover:text-fuchsia-400 transition-colors">
                          {tag}
                        </h4>
                        <span className="px-3 py-1 rounded-full bg-fuchsia-600/20 text-fuchsia-300 text-sm font-medium border border-fuchsia-500/30">
                          {count}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-white/50">
                        {count} {count === 1 ? 'article' : 'articles'}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

        </main>

      </div>
    </div>
  );
}
