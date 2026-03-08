import Link from 'next/link';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  tags?: string[];
  showCategoryNav?: boolean;
}

export default function Header({ tags = [], showCategoryNav = false }: HeaderProps) {
  return (
    <>
      {/* Main Header */}
      <header className="glass-strong sticky top-0 z-50" role="banner">
        <div className="max-w-[1200px] mx-auto">
          <div className="px-6 py-4 flex items-center justify-between">
            <Link href="/" aria-label="THE DAILY BRIEF - Home">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity font-display">
                THE D<span className="text-shimmer">*AI*</span>LY BRIEF
              </h1>
            </Link>

            <nav className="flex items-center gap-6" role="navigation" aria-label="Main navigation">
              <Link href="/about" className="nav-link hidden sm:block">About</Link>
              <Link href="/archive" className="nav-link hidden sm:block">Archive</Link>
              <Link href="/search" className="nav-link hidden sm:block">Search</Link>
              <Link href="/tags" className="nav-link hidden sm:block">Topics</Link>
              <a href="#newsletter" className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg hidden sm:inline-block">
                Subscribe
              </a>
              <MobileMenu />
            </nav>
          </div>
        </div>
      </header>

      {/* Sub-Header: Category Navigation */}
      {showCategoryNav && tags.length > 0 && (
        <nav 
          className="glass-strong sticky top-[73px] z-40 px-6 py-3.5 border-b-[3px] border-purple-500/30" 
          role="navigation" 
          aria-label="Categories"
        >
          <div className="max-w-[1200px] mx-auto flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <Link href="/archive" className="category-pill category-pill-active">
              Latest
            </Link>
            {tags.map(tag => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag)}`}
                className="category-pill"
              >
                {tag}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
