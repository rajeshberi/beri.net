'use client';

import Link from 'next/link';
import { Newsletter } from '@/lib/newsletters';
import { Tool } from '@/lib/tools';

interface ArticleSidebarProps {
  currentSlug: string;
  tags: string[];
  relatedArticles: Newsletter[];
  allTags: string[];
  relatedTools?: Tool[];
}

export default function ArticleSidebar({ currentSlug, tags, relatedArticles, allTags, relatedTools = [] }: ArticleSidebarProps) {
  return (
    <aside className="space-y-6">
      
      {/* Subscribe Card - Sticky */}
      <div className="sticky top-24 z-10">
        <div className="card card-glow p-6 bg-[#0a0812]">
          <div className="space-y-4">
            <div className="text-sm font-semibold text-purple-400 uppercase tracking-wide">
              Stay Updated
            </div>
            <h3 className="text-lg font-bold leading-tight">
              Get AI insights every Tue & Thu
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Data-driven analysis for engineering leaders. No hype, just signal.
            </p>
            <a 
              href="#newsletter" 
              className="btn-primary block text-center !text-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Subscribe Free
            </a>
          </div>
        </div>
      </div>

      {/* Article Tags */}
      {tags.length > 0 && (
        <div className="card p-6">
          <div className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
            Topics
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag)}`}
                className="tag hover:bg-purple-500/20 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Tools */}
      {relatedTools && relatedTools.length > 0 && (
        <div className="card p-6">
          <div className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
            Related Tools
          </div>
          <div className="space-y-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="block group"
              >
                <article>
                  <div className="label text-purple-400/70 mb-1.5">
                    {tool.category}
                  </div>
                  <h4 className="text-sm font-semibold leading-snug group-hover:text-purple-200 transition-colors line-clamp-2 mb-1.5">
                    {tool.productName}
                  </h4>
                  <p className="text-xs text-white/50 line-clamp-2">
                    {tool.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <Link href="/tools" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
              Browse all tools →
            </Link>
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="card p-6">
          <div className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
            Related Reading
          </div>
          <div className="space-y-4">
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                className="block group"
              >
                <article>
                  {article.tags[0] && (
                    <div className="label text-purple-400/70 mb-1.5">
                      {article.tags[0]}
                    </div>
                  )}
                  <h4 className="text-sm font-semibold leading-snug group-hover:text-purple-200 transition-colors line-clamp-2 mb-1.5">
                    {article.title}
                  </h4>
                  <time className="text-xs text-white/30">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Popular Tags */}
      {allTags.length > 0 && (
        <div className="card p-6">
          <div className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
            Browse by Topic
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 10).map((tag) => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag)}`}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/50 hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-200 border border-white/5"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

    </aside>
  );
}
