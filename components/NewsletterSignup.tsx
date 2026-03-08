'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function NewsletterSignup() {
  const [name, setName] = useState('');
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
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Success! Check your inbox.');
        // Keep name for thank you message, clear email
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const shareUrl = 'https://www.beri.net';
  const shareText = 'I just subscribed to THE D[AI]LY BRIEF — enterprise AI insights from someone who actually deploys AI at scale. Check it out!';

  const handleShare = (platform: 'twitter' | 'linkedin' | 'email') => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent('Check out THE D[AI]LY BRIEF')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <ScrollReveal>
      <section id="newsletter" className="mt-20 signup-section">
        {/* Decorative glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-fuchsia-600/8 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative px-8 py-20 max-w-2xl mx-auto text-center space-y-6">
          
          {status === 'success' ? (
            // Success state - Thank you + Referral
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="text-5xl">🎉</div>
                <h3 className="heading-lg text-gradient-subtle">
                  {name ? `Welcome, ${name}!` : "You're in!"}
                </h3>
                <p className="body-lg text-white/70 max-w-md mx-auto">
                  Thank you for subscribing to THE D[AI]LY BRIEF. You'll get your first deep dive next Tuesday.
                </p>
              </div>

              <div className="card p-6 max-w-md mx-auto text-left space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">💬</div>
                  <div>
                    <h4 className="font-semibold text-white/90">Know someone who'd love this?</h4>
                    <p className="text-sm text-white/50">Share with friends and colleagues</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex-1 min-w-[100px] px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all"
                  >
                    𝕏 Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex-1 min-w-[100px] px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all"
                  >
                    💼 LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('email')}
                    className="flex-1 min-w-[100px] px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all"
                  >
                    ✉️ Email
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={copyLink}
                    className="w-full px-4 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm font-medium text-purple-300 transition-all"
                  >
                    📋 Copy Link
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setStatus('idle');
                  setName('');
                  setEmail('');
                }}
                className="text-sm text-white/40 hover:text-white/60 transition-colors"
              >
                ← Subscribe another email
              </button>
            </div>
          ) : (
            // Default state - Signup form
            <>
              <h3 className="heading-lg text-gradient-subtle">
                Get AI insights in your inbox
              </h3>
              <p className="body-lg text-white/60 max-w-md mx-auto">
                Twice-weekly deep dives into what matters in AI. No spam, just signal.
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="First name"
                    aria-label="First name"
                    className="input flex-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === 'loading'}
                    required
                  />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    aria-label="Email address"
                    className="input flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="btn-primary w-full !rounded-xl"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe →'}
                </button>
              </form>

              {message && status === 'error' && (
                <p className="text-sm text-red-400">
                  {message}
                </p>
              )}

              <p className="text-xs text-white/20 mono">
                Every Tuesday & Thursday · Free forever · Unsubscribe anytime
              </p>
            </>
          )}
        </div>
      </section>
    </ScrollReveal>
  );
}
