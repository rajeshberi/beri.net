import Link from 'next/link';
import MobileMenu from './MobileMenu';
import CategoryNav from './CategoryNav';

interface HeaderProps {
  showCategoryNav?: boolean;
}

export default function Header({ showCategoryNav = false }: HeaderProps) {
  return (
    <>
      {/* Main Header */}
      <header className="glass-strong sticky top-0 z-50 border-b border-white/5" role="banner">
        <div className="max-w-[1200px] mx-auto">
          <div className="px-6 py-5 flex items-center justify-between">
            <Link href="/" aria-label="THE DAILY BRIEF - Home">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity font-display">
                THE D<span className="text-shimmer">[AI]</span>LY BRIEF
              </h1>
            </Link>

            <nav className="flex items-center gap-6" role="navigation" aria-label="Main navigation">
              <Link href="/about" className="nav-link hidden sm:block">About</Link>
              <Link href="/articles" className="nav-link hidden sm:block">Articles</Link>
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

      {/* Sub-Header: Hierarchical Category Navigation */}
      {showCategoryNav && <CategoryNav />}
    </>
  );
}
