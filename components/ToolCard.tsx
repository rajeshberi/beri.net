'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Tool {
  slug: string;
  productName: string;
  vendorName: string;
  description: string;
  logoUrl?: string;
  category: string;
  pricingModel?: string;
  verified?: boolean;
}

export default function ToolCard({ tool, delay = 0 }: { tool: Tool; delay?: number }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/tools/${tool.slug}`} className="group block h-full">
        <article className="card card-glow h-full flex flex-col p-6 hover:border-purple-500/30 transition-all">
          {/* Logo/Name */}
          <div className="flex items-start gap-4 mb-4">
            {tool.logoUrl && !imageError ? (
              <img 
                src={tool.logoUrl} 
                alt={tool.productName}
                className="w-12 h-12 rounded-lg object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white font-bold">
                {tool.productName.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg mb-1 group-hover:text-purple-200 transition-colors line-clamp-1">
                {tool.productName}
              </h3>
              <p className="text-sm text-white/40">by {tool.vendorName}</p>
            </div>
            {tool.verified && (
              <span className="text-purple-400" title="Verified">✓</span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-white/60 mb-4 line-clamp-2 flex-1">
            {tool.description}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="px-2 py-1 rounded bg-white/5 text-white/50">
              {tool.category}
            </span>
            {tool.pricingModel && (
              <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400">
                {tool.pricingModel}
              </span>
            )}
          </div>
        </article>
      </Link>
  );
}
