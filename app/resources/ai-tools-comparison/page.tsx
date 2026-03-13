'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, Download, Users, TrendingUp, Shield } from 'lucide-react';

export default function AIToolsComparisonPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message || 'Success! Check your inbox.');
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0812] text-white noise">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-900/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          
          {isSuccess ? (
            // Success State
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Check Your Inbox! 📧
              </h1>
              
              <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
                {message}
              </p>
              
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold mb-4">What's Next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-white/60">Your Enterprise AI Tools Comparison Guide is in your inbox (check spam if you don't see it)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-white/60">You're now subscribed to THE D[AI]LY BRIEF — expect AI insights twice weekly</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-white/60">Explore more articles at <a href="/" className="text-purple-400 hover:text-purple-300">beri.net</a></p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Lead Capture Form
            <>
              {/* Hero Section */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-purple-900/20 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
                  <Download className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300 font-medium">Free Download</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 bg-clip-text text-transparent leading-tight">
                  Enterprise AI Tools<br />Comparison Guide 2026
                </h1>

                <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Comprehensive analysis of leading AI tools — pricing, features, deployment options, and use cases for engineering leaders.
                </p>
              </div>

              {/* Value Props */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
                  <Users className="w-10 h-10 text-purple-400 mb-4" />
                  <h3 className="font-semibold mb-2">100+ Tools Analyzed</h3>
                  <p className="text-sm text-white/60">Comprehensive coverage across all major categories</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
                  <TrendingUp className="w-10 h-10 text-purple-400 mb-4" />
                  <h3 className="font-semibold mb-2">Pricing Comparisons</h3>
                  <p className="text-sm text-white/60">Side-by-side pricing models and deployment costs</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
                  <Shield className="w-10 h-10 text-purple-400 mb-4" />
                  <h3 className="font-semibold mb-2">Enterprise Focus</h3>
                  <p className="text-sm text-white/60">Evaluated from an engineering leader's perspective</p>
                </div>
              </div>

              {/* Email Capture Form */}
              <div className="bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 border border-purple-500/30 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />
                
                <div className="relative">
                  <h2 className="text-2xl font-bold mb-2 text-center">Get Your Free Copy</h2>
                  <p className="text-white/60 mb-6 text-center">
                    Enter your details to receive the guide instantly + subscribe to THE D[AI]LY BRIEF
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 text-lg"
                    >
                      {isLoading ? 'Sending...' : 'Download Guide + Subscribe →'}
                    </button>

                    {message && !isSuccess && (
                      <p className="text-red-400 text-sm text-center mt-2">{message}</p>
                    )}
                  </form>

                  <p className="text-xs text-white/40 text-center mt-6">
                    By downloading, you'll subscribe to THE D[AI]LY BRIEF (twice weekly, no spam, unsubscribe anytime)
                  </p>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-12 text-center">
                <p className="text-white/40 text-sm mb-4">Trusted by engineering leaders at:</p>
                <div className="flex flex-wrap justify-center gap-8 text-white/20 text-sm font-medium">
                  <span>Fortune 500 Companies</span>
                  <span>•</span>
                  <span>Startups</span>
                  <span>•</span>
                  <span>Enterprise Tech</span>
                </div>
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
