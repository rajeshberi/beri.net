'use client';

import { useState } from 'react';

export default function InlineEmailSignup() {
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
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          name,
          source: 'inline'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message || 'Success! Check your inbox.');
        setEmail('');
        setName('');
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
    <div className="my-12 p-8 bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 border border-purple-500/20 rounded-2xl relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center">
            <span className="text-lg">📰</span>
          </div>
          <h3 className="text-xl font-bold">Get articles like this in your inbox</h3>
        </div>

        <p className="text-white/60 mb-6 text-sm">
          Join 2,000+ engineering leaders getting real AI benchmarks and vendor analysis. Twice weekly, zero fluff.
        </p>

        {isSuccess ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
            <p className="text-green-400 text-sm font-medium">✓ {message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name"
                required
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-purple-500/20"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe →'}
            </button>

            {message && !isSuccess && (
              <p className="text-red-400 text-xs mt-2">{message}</p>
            )}
          </form>
        )}

        <p className="text-xs text-white/30 mt-4">
          Twice weekly. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
