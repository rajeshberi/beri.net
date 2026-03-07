import Link from 'next/link';

interface HeaderProps {
  tags?: string[];
  showCategoryNav?: boolean;
}

export default function Header({ tags = [], showCategoryNav = false }: HeaderProps) {
  return (
    <header className="border-b border-white/5 bg-[#0c0a14]/90 backdrop-blur-xl sticky top-0 z-50" role="banner">
      <div className="max-w-[1200px] mx-auto">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/" aria-label="THE DAILY BRIEF - Home">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
              THE D<span className="text-shimmer">*AI*</span>LY BRIEF
            </h1>
          </Link>

          <nav className="flex items-center gap-5" role="navigation" aria-label="Main navigation">
            <Link href="/archive" className="nav-link hidden sm:block">Archive</Link>
            <Link href="/search" className="nav-link hidden sm:block">Search</Link>
            <Link href="/tags" className="nav-link hidden sm:block">Topics</Link>
            <a href="#newsletter" className="btn-primary !py-2 !px-5 !text-sm !rounded-lg">
              Subscribe
            </a>
          </nav>
        </div>

        {showCategoryNav && tags.length > 0 && (
          <nav className="px-6 py-2.5 flex items-center gap-6 overflow-x-auto border-t border-white/5" 
               role="navigation" 
               aria-label="Categories">
            <Link href="/archive" className="text-xs font-semibold text-purple-400 uppercase tracking-wider whitespace-nowrap hover:text-purple-300 transition-colors">
              Latest
            </Link>
            {tags.map(tag => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag)}`}
                className="text-xs font-medium text-white/50 uppercase tracking-wider whitespace-nowrap hover:text-purple-400 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
