'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface LLMModel {
  provider: string;
  model: string;
  pricing: string;
  contextWindow: string;
  speed: string;
  useCases: string[];
  enterpriseSupport: boolean;
  swebench?: string;
  gdpval?: string;
}

const models: LLMModel[] = [
  {
    provider: 'OpenAI',
    model: 'GPT-5.4',
    pricing: '$2.50/$15 per 1M tokens (in/out)',
    contextWindow: '1M tokens (272K standard)',
    speed: 'Fast (5.1s median)',
    useCases: ['Knowledge work', 'Desktop automation', 'Tool orchestration', 'Finance'],
    enterpriseSupport: true,
    swebench: '77.2%',
    gdpval: '83.0%',
  },
  {
    provider: 'OpenAI',
    model: 'GPT-5.4 Pro',
    pricing: '$30/$180 per 1M tokens',
    contextWindow: '1M tokens',
    speed: 'Fast',
    useCases: ['Maximum reasoning', 'Frontier science', 'Complex research'],
    enterpriseSupport: true,
    swebench: '57.7%',
    gdpval: '83.0%',
  },
  {
    provider: 'Anthropic',
    model: 'Claude Opus 4.6',
    pricing: '$5/$25 per 1M tokens',
    contextWindow: '200K (1M beta)',
    speed: 'Medium (8.2s median)',
    useCases: ['Production code', 'Code review', 'Multi-step research', 'Visual analysis'],
    enterpriseSupport: true,
    swebench: '80.8%',
    gdpval: '78.0%',
  },
  {
    provider: 'Anthropic',
    model: 'Claude Sonnet 4.6',
    pricing: '$3/$15 per 1M tokens',
    contextWindow: '200K',
    speed: 'Medium',
    useCases: ['Balanced coding', 'Cost-optimized production'],
    enterpriseSupport: true,
    swebench: '79.6%',
    gdpval: '—',
  },
  {
    provider: 'Google DeepMind',
    model: 'Gemini 3.1 Pro',
    pricing: '$2/$12 per 1M tokens (up to 200K)',
    contextWindow: '2M tokens',
    speed: 'Fast',
    useCases: ['Scientific reasoning', 'Budget optimization', 'Long documents'],
    enterpriseSupport: true,
    swebench: '80.6%',
    gdpval: '—',
  },
  {
    provider: 'OpenAI',
    model: 'GPT-5.3-Codex',
    pricing: '$2.50/$15 per 1M tokens',
    contextWindow: '272K',
    speed: 'Fast',
    useCases: ['Terminal work', 'Code generation'],
    enterpriseSupport: true,
    swebench: '56.8%',
    gdpval: '70.9%',
  },
];

export default function LLMComparisonPage() {
  const [filterUseCase, setFilterUseCase] = useState<string>('All');
  const [filterBudget, setFilterBudget] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('provider');

  // Get unique use cases for filter
  const allUseCases = useMemo(() => {
    const cases = new Set<string>();
    models.forEach(m => m.useCases.forEach(uc => cases.add(uc)));
    return ['All', ...Array.from(cases).sort()];
  }, []);

  // Filter and sort models
  const filteredModels = useMemo(() => {
    let filtered = models;

    // Filter by use case
    if (filterUseCase !== 'All') {
      filtered = filtered.filter(m => m.useCases.includes(filterUseCase));
    }

    // Filter by budget
    if (filterBudget === 'Low (<$3/M)') {
      filtered = filtered.filter(m => {
        const inputPrice = parseFloat(m.pricing.match(/\$(\d+\.?\d*)/)?.[1] || '999');
        return inputPrice < 3;
      });
    } else if (filterBudget === 'Medium ($3-5/M)') {
      filtered = filtered.filter(m => {
        const inputPrice = parseFloat(m.pricing.match(/\$(\d+\.?\d*)/)?.[1] || '999');
        return inputPrice >= 3 && inputPrice <= 5;
      });
    } else if (filterBudget === 'High (>$5/M)') {
      filtered = filtered.filter(m => {
        const inputPrice = parseFloat(m.pricing.match(/\$(\d+\.?\d*)/)?.[1] || '999');
        return inputPrice > 5;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'provider') return a.provider.localeCompare(b.provider);
      if (sortBy === 'model') return a.model.localeCompare(b.model);
      if (sortBy === 'price') {
        const priceA = parseFloat(a.pricing.match(/\$(\d+\.?\d*)/)?.[1] || '999');
        const priceB = parseFloat(b.pricing.match(/\$(\d+\.?\d*)/)?.[1] || '999');
        return priceA - priceB;
      }
      if (sortBy === 'context') {
        const contextA = parseInt(a.contextWindow.match(/(\d+)K/)?.[1] || '0');
        const contextB = parseInt(b.contextWindow.match(/(\d+)K/)?.[1] || '0');
        return contextB - contextA;
      }
      return 0;
    });

    return filtered;
  }, [filterUseCase, filterBudget, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Enterprise LLM Comparison Matrix 2026
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Compare GPT-5.4, Claude Opus 4.6, Gemini 3.1 Pro, and more. Sortable by price, performance, and use case.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Use Case Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Use Case
              </label>
              <select
                value={filterUseCase}
                onChange={(e) => setFilterUseCase(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                {allUseCases.map(uc => (
                  <option key={uc} value={uc}>{uc}</option>
                ))}
              </select>
            </div>

            {/* Budget Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Budget
              </label>
              <select
                value={filterBudget}
                onChange={(e) => setFilterBudget(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Budgets</option>
                <option value="Low (<$3/M)">Low (&lt;$3/M input)</option>
                <option value="Medium ($3-5/M)">Medium ($3-5/M)</option>
                <option value="High (>$5/M)">High (&gt;$5/M)</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="provider">Provider</option>
                <option value="model">Model Name</option>
                <option value="price">Price (Low to High)</option>
                <option value="context">Context Window (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {filteredModels.length} of {models.length} models
        </p>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pricing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Context Window
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Speed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SWE-Bench
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Use Cases
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredModels.map((model, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {model.provider}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {model.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {model.pricing}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {model.contextWindow}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {model.speed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {model.swebench || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex flex-wrap gap-1">
                        {model.useCases.slice(0, 3).map((uc, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {uc}
                          </span>
                        ))}
                        {model.useCases.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{model.useCases.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEO-Optimized Related Articles */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Comparison Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/article/gpt-5-4-vs-claude-opus-4-6-enterprise-guide" className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                GPT-5.4 vs Claude Opus 4.6: The Enterprise Guide
              </h3>
              <p className="text-sm text-gray-600">
                Complete performance and cost comparison with real deployment data
              </p>
            </Link>

            <Link href="/article/gpt-5-4-pricing-guide-2026-enterprise" className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                GPT-5.4 Pricing Guide 2026
              </h3>
              <p className="text-sm text-gray-600">
                Hidden costs, long-context surcharges, and budget planning
              </p>
            </Link>

            <Link href="/article/how-to-choose-gpt-5-4-vs-claude-opus-4-6-decision-guide" className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                How to Choose: 5-Minute Decision Framework
              </h3>
              <p className="text-sm text-gray-600">
                Answer 5 questions and know which model to buy
              </p>
            </Link>

            <Link href="/article/gpt-5-4-vs-claude-opus-4-6-performance-benchmarks" className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                Comprehensive Benchmark Comparison
              </h3>
              <p className="text-sm text-gray-600">
                Every number that matters with cited sources
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
