'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import ToolCard from '@/components/ToolCard';
import Link from 'next/link';

interface Tool {
  slug: string;
  name: string;
  tagline?: string;
  short_description?: string;
  website?: string;
  primary_category?: string;
  discovered?: string;
  [key: string]: any;
}

const CATEGORIES = [
  { id: 'ai-infrastructure', name: 'AI Infrastructure', description: 'Model training platforms, MLOps, AI dev frameworks' },
  { id: 'generative-ai', name: 'Generative AI', description: 'Text, image, video, code generation tools' },
  { id: 'enterprise-ai', name: 'Enterprise AI Applications', description: 'AI agents, automation, business applications' },
  { id: 'developer-tools', name: 'AI Developer Tools', description: 'APIs, databases, testing tools for AI developers' },
  { id: 'productivity', name: 'AI Productivity', description: 'Writing, note-taking, meeting assistants' },
  { id: 'data-analytics', name: 'AI for Data & Analytics', description: 'Data labeling, synthetic data, analytics' },
  { id: 'security-governance', name: 'AI Security & Governance', description: 'Security, compliance, risk management' },
];

const DOMAINS = [
  { id: 'sales', name: 'Sales', icon: '💼' },
  { id: 'marketing', name: 'Marketing', icon: '📢' },
  { id: 'customer-success', name: 'Customer Success', icon: '🤝' },
  { id: 'finance', name: 'Finance & Accounting', icon: '💰' },
  { id: 'hr', name: 'Human Resources', icon: '👥' },
  { id: 'operations', name: 'Operations', icon: '⚙️' },
  { id: 'engineering', name: 'Product & Engineering', icon: '💻' },
  { id: 'legal', name: 'Legal & Compliance', icon: '⚖️' },
  { id: 'data', name: 'Data & Analytics', icon: '📊' },
  { id: 'executive', name: 'Executive & Strategy', icon: '🎯' },
  { id: 'it-security', name: 'IT & Security', icon: '🔐' },
  { id: 'general', name: 'General/Cross-Functional', icon: '🌐' },
];

export default function ToolsClient() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/tools')
      .then(res => res.json())
      .then(data => {
        setTools(data.tools || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tools:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0812] text-white noise">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-[1200px] mx-auto px-4 py-12 md:px-6 md:py-24">
          {/* Hero */}
          <ScrollReveal>
            <div className="mb-16 text-center">
              <div className="label text-purple-400/60 mb-4">AI Tools Directory</div>
              <h1 className="heading-xl mb-6">
                Discover the Best AI Tools
              </h1>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                {loading ? 'Loading...' : `${tools.length} curated AI platforms, services, and tools across ${CATEGORIES.length} categories and ${DOMAINS.length} business domains`}
              </p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-3 gap-6 mb-16">
              <div className="card card-glow p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{loading ? '...' : tools.length}</div>
                <div className="text-sm text-white/50">Tools Listed</div>
              </div>
              <div className="card card-glow p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{CATEGORIES.length}</div>
                <div className="text-sm text-white/50">Categories</div>
              </div>
              <div className="card card-glow p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{DOMAINS.length}</div>
                <div className="text-sm text-white/50">Business Domains</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12 text-white/50">
                <p>Loading tools...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12 text-red-400">
                <p>Error loading tools: {error}</p>
              </div>
            ) : tools.length === 0 ? (
              <div className="col-span-full text-center py-12 text-white/50">
                <p>No tools found.</p>
              </div>
            ) : (
              tools.map((tool, index) => (
                <ScrollReveal key={tool.slug} delay={index * 50}>
                  <ToolCard tool={tool} />
                </ScrollReveal>
              ))
            )}
          </div>

          {/* Category Browse */}
          <ScrollReveal delay={200}>
            <div className="mt-16">
              <h2 className="heading-md mb-8">Browse by Category</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {CATEGORIES.map(cat => (
                  <Link key={cat.id} href={`/tools?category=${cat.id}`} className="card card-glow p-6 hover:border-purple-500/30 transition-all group">
                    <h3 className="font-bold mb-2 group-hover:text-purple-200 transition-colors">{cat.name}</h3>
                    <p className="text-sm text-white/50">{cat.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Domain Browse */}
          <ScrollReveal delay={300}>
            <div className="mt-16">
              <h2 className="heading-md mb-8">Browse by Business Domain</h2>
              <div className="flex flex-wrap gap-3">
                {DOMAINS.map(domain => (
                  <Link key={domain.id} href={`/tools?domain=${domain.id}`} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 transition-all text-sm">
                    <span className="mr-2">{domain.icon}</span>{domain.name}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </main>

        <Footer />
      </div>
    </div>
  );
}
