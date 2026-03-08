'use client';

import { useEffect, useState } from 'react';

export default function ExitIntent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('exit-intent-shown')) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setShow(true);
        sessionStorage.setItem('exit-intent-shown', '1');
        document.removeEventListener('mouseout', handler);
      }
    };

    // Only trigger after 15s on page
    const timer = setTimeout(() => {
      document.addEventListener('mouseout', handler);
    }, 15000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handler);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShow(false)}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative max-w-md w-full rounded-2xl border border-purple-500/20 bg-[#12101e] p-8 text-center space-y-5 animate-in"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-4xl">📬</div>
        <h3 className="text-2xl font-bold">Before you go...</h3>
        <p className="text-white/50">
          Join 500+ engineering leaders getting enterprise AI insights every Tuesday & Thursday. No spam — just signal.
        </p>
        <a href="#newsletter" onClick={() => setShow(false)} className="btn-primary inline-block w-full">
          Subscribe free →
        </a>
        <button onClick={() => setShow(false)} className="text-xs text-white/30 hover:text-white/50 transition-colors">
          No thanks, I&apos;ll pass
        </button>
      </div>
    </div>
  );
}
