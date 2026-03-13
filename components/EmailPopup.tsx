'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

type PopupType = 'exit' | 'scroll';

interface EmailPopupProps {
  type: PopupType;
  headlineVariant?: 'default' | 'urgency' | 'social-proof';
}

const headlines = {
  default: {
    title: "Don't miss the next AI breakthrough",
    subtitle: "Join 2,000+ engineering leaders getting THE D[AI]LY BRIEF — twice weekly, zero fluff."
  },
  urgency: {
    title: "Wait! Before you go...",
    subtitle: "Get real AI benchmarks and vendor analysis — no hype, just signal."
  },
  'social-proof': {
    title: "Join 2,000+ engineering leaders",
    subtitle: "Get enterprise AI insights that actually matter, delivered to your inbox."
  }
};

export default function EmailPopup({ type, headlineVariant = 'default' }: EmailPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if popup was already shown
    const cookieName = `popup_${type}_shown`;
    const lastShown = localStorage.getItem(cookieName);
    
    if (lastShown) {
      const daysSinceShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSinceShown < 7) {
        return; // Don't show if shown within last 7 days
      }
    }

    if (type === 'exit') {
      // Exit-intent detection
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsVisible(true);
          localStorage.setItem(cookieName, Date.now().toString());
        }
      };
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    } else if (type === 'scroll') {
      // Scroll-triggered at 70%
      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent >= 70) {
          setIsVisible(true);
          localStorage.setItem(cookieName, Date.now().toString());
          window.removeEventListener('scroll', handleScroll);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [type]);

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
          source: `popup-${type}`
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message || 'Success! Check your inbox.');
        setTimeout(() => setIsVisible(false), 3000);
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const headline = headlines[headlineVariant];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-[#0a0812] border border-purple-500/20 rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto animate-scale-in relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-fuchsia-500/10 pointer-events-none" />
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors z-10"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative p-8">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center mb-4">
              <span className="text-xl">📰</span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {headline.title}
            </h3>
            <p className="text-white/60 mb-6 text-sm leading-relaxed">
              {headline.subtitle}
            </p>

            {isSuccess ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                <p className="text-green-400 text-sm font-medium">✓ {message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First name"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
                />
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-purple-500/20"
                >
                  {isLoading ? 'Subscribing...' : 'Get AI Insights →'}
                </button>

                {message && !isSuccess && (
                  <p className="text-red-400 text-xs text-center mt-2">{message}</p>
                )}
              </form>
            )}

            <p className="text-xs text-white/30 text-center mt-4">
              Twice weekly. No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
