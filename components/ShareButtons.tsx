'use client';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const url = `https://www.beri.net/article/${slug}`;
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    const btn = document.getElementById('copy-btn');
    if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => btn.textContent = 'Copy link', 2000); }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs text-white/30 font-medium uppercase tracking-wider">Share</span>
      <a href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer"
         className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all" title="Share on X">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer"
         className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all" title="Share on LinkedIn">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <button onClick={copyLink} id="copy-btn"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs font-medium transition-all">
        Copy link
      </button>
    </div>
  );
}
