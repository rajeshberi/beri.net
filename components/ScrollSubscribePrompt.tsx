'use client';

import { useEffect, useState } from 'react';

export default function ScrollSubscribePrompt() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('scroll-prompt-dismissed')) {
      setDismissed(true);
      return;
    }

    const handler = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPct > 0.4) setShow(true);
      else setShow(false);
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('scroll-prompt-dismissed', '1');
  };

  if (dismissed || !show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in">
      <div className="rounded-xl border border-purple-500/20 bg-[#12101e]/95 backdrop-blur-xl p-5 shadow-2xl shadow-purple-500/10">
        <button onClick={dismiss} className="absolute top-3 right-3 text-white/30 hover:text-white/60">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="font-semibold text-sm mb-1">Like what you&apos;re reading?</p>
        <p className="text-xs text-white/40 mb-3">Get insights like this in your inbox. Twice a week.</p>
        <a href="#newsletter" onClick={dismiss} className="btn-primary !py-2 !px-4 !text-xs inline-block">
          Subscribe free →
        </a>
      </div>
    </div>
  );
}
