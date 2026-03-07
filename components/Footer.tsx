import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24 bg-[#080610]" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="font-bold text-lg mb-3">
              THE D<span className="text-shimmer">*AI*</span>LY BRIEF
            </div>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed">
              Enterprise AI news and analysis for engineering leaders. Twice-weekly deep dives — no hype, just signal.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Navigate</div>
            <div className="space-y-2.5 text-sm text-white/50">
              <div><Link href="/archive" className="hover:text-purple-400 transition-colors">Archive</Link></div>
              <div><Link href="/search" className="hover:text-purple-400 transition-colors">Search</Link></div>
              <div><Link href="/tags" className="hover:text-purple-400 transition-colors">Topics</Link></div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Connect</div>
            <div className="space-y-2.5 text-sm text-white/50">
              <div><a href="https://www.linkedin.com/in/rberi/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">LinkedIn</a></div>
              <div><a href="https://x.com/rajeshberi" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Twitter / X</a></div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <div>© {new Date().getFullYear()} THE D*AI*LY BRIEF by Rajesh Beri</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
