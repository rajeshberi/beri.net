'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Tool {
  slug: string;
  // Support both old and new schema
  productName?: string;
  name?: string;
  vendorName?: string;
  company?: string;
  description?: string;
  tagline?: string;
  short_description?: string;
  logoUrl?: string;
  logo_url?: string;
  category?: string;
  primary_category?: string;
  pricingModel?: string;
  pricing_model?: string | string[];
  verified?: boolean;
}

export default function ToolCard({ tool, delay = 0 }: { tool: Tool; delay?: number }) {
  const [imageError, setImageError] = useState(false);
  
  // Support both old and new schema field names
  const toolName = tool.productName || tool.name || 'Unnamed Tool';
  const vendorName = tool.vendorName || tool.company || 'Unknown';
  const toolDescription = tool.description || tool.tagline || tool.short_description || 'No description available';
  const logoUrl = tool.logoUrl || tool.logo_url;
  const category = tool.category || tool.primary_category || 'Uncategorized';
  const pricingModel = tool.pricingModel || (Array.isArray(tool.pricing_model) ? tool.pricing_model[0] : tool.pricing_model);

  return (
    <Link href={`/tools/${tool.slug}`} className="group block h-full">
        <article className="card card-glow h-full flex flex-col p-6 hover:border-purple-500/30 transition-all">
          {/* Logo/Name */}
          <div className="flex items-start gap-4 mb-4">
            {logoUrl && !imageError ? (
              <img 
                src={logoUrl} 
                alt={toolName}
                className="w-12 h-12 rounded-lg object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white font-bold">
                {toolName.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg mb-1 group-hover:text-purple-200 transition-colors line-clamp-1">
                {toolName}
              </h3>
              <p className="text-sm text-white/40">by {vendorName}</p>
            </div>
            {tool.verified && (
              <span className="text-purple-400" title="Verified">✓</span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-white/60 mb-4 line-clamp-2 flex-1">
            {toolDescription}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="px-2 py-1 rounded bg-white/5 text-white/50">
              {category}
            </span>
            {pricingModel && (
              <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400">
                {pricingModel}
              </span>
            )}
          </div>
        </article>
      </Link>
  );
}
