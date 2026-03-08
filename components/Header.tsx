import Link from 'next/link';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  tags?: string[];
  showCategoryNav?: boolean;
}

export default function Header({ tags = [], showCategoryNav = false }: HeaderProps) {
  return (
    <header className="glass-strong sticky top-0 z-50" role="banner">
      <div className="max-w-[1200px] mx-auto">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/" aria-label="THE DAILY BRIEF - Home">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity font-display">
              THE D<span className="text-shimmer">*AI*</span>LY BRIEF
            </h1>
          </Link>

          <nav className="flex items-center gap-6" role="navigation" aria-label="Main navigation">
            <Link href="/archive" className="nav-link hidden sm:block">Archive</Link>
            <Link href="/search" className="nav-link hidden sm:block">Search</Link>
            <Link href="/tags" className="nav-link hidden sm:block">Topics</Link>
            <a href="#newsletter" className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg hidden sm:inline-block">
              Subscribe
            </a>
            <MobileMenu />
          </nav>
        </div>

        {showCategoryNav && tags.length > 0 && (
          <nav className="px-6 py-2.5 flex items-center gap-2 overflow-x-auto divider scrollbar-hide" 
               role="navigation" 
               aria-label="Categories"
               style={{ borderTop: '1px solid var(--border-subtle)' }}>
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
          </nav>
        )}
      </div>
    </header>
  );
}
