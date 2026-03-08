'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Success! Check your inbox.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <ScrollReveal>
      <section id="newsletter" className="mt-20 signup-section">
        {/* Decorative glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-fuchsia-600/8 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative px-8 py-20 max-w-2xl mx-auto text-center space-y-6">
          <h3 className="heading-lg text-gradient-subtle">
            Get AI insights in your inbox
          </h3>
          <p className="body-lg text-white/60 max-w-md mx-auto">
            Twice-weekly deep dives into what matters in AI. No spam, just signal.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@company.com"
              aria-label="Email address"
              className="input flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              required
            />
            <button 
              type="submit"
              className="btn-primary whitespace-nowrap !rounded-xl"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Subscribing...' : status === 'success' ? '✓ Subscribed' : 'Subscribe →'}
            </button>
          </form>

          {message && (
            <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}

          <p className="text-xs text-white/20 mono">
            Every Tuesday & Thursday · Free forever · Unsubscribe anytime
          </p>
        </div>
      </section>
    </ScrollReveal>
  );
}
