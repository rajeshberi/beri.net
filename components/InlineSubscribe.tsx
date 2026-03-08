'use client';

export default function InlineSubscribe() {
  return (
    <div className="my-12 p-6 rounded-xl border border-purple-500/15 bg-gradient-to-r from-purple-950/30 to-transparent">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-semibold text-white/90 mb-1">Enjoying this analysis?</p>
          <p className="text-sm text-white/40">Get enterprise AI insights delivered twice a week. Free forever.</p>
        </div>
        <a href="#newsletter" className="btn-primary !py-2.5 !px-5 !text-sm whitespace-nowrap shrink-0">
          Subscribe free →
        </a>
      </div>
    </div>
  );
}
