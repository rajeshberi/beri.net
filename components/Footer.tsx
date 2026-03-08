import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#07060e] relative" role="contentinfo">
      <div className="divider-accent" />
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="font-display font-bold text-xl mb-4">
              THE D<span className="text-shimmer">*AI*</span>LY BRIEF
            </div>
            <p className="body-sm text-white/50 max-w-sm leading-relaxed">
              Enterprise AI news and analysis for engineering leaders. Twice-weekly deep dives — no hype, just signal.
            </p>
          </div>

          <div>
            <div className="label text-white/25 mb-5">Navigate</div>
            <div className="space-y-3 body-sm">
              <div><Link href="/about" className="text-white/45 hover:text-purple-400 transition-colors duration-200">About</Link></div>
              <div><Link href="/articles" className="text-white/45 hover:text-purple-400 transition-colors duration-200">Articles</Link></div>
              <div><Link href="/search" className="text-white/45 hover:text-purple-400 transition-colors duration-200">Search</Link></div>
              <div><Link href="/tags" className="text-white/45 hover:text-purple-400 transition-colors duration-200">Topics</Link></div>
            </div>
          </div>

          <div>
            <div className="label text-white/25 mb-5">Connect</div>
            <div className="space-y-3 body-sm">
              <div><a href="https://www.linkedin.com/in/rberi/" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-purple-400 transition-colors duration-200">LinkedIn</a></div>
              <div><a href="https://x.com/rajeshberi" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-purple-400 transition-colors duration-200">Twitter / X</a></div>
            </div>
          </div>
        </div>

        <div className="divider mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/25">
          <div className="mono">© {new Date().getFullYear()} THE D*AI*LY BRIEF by Rajesh Beri</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/50 transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-white/50 transition-colors duration-200">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
