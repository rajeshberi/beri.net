'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleUnsubscribe = async () => {
    if (!email) {
      setStatus('error');
      setMessage('No email address provided');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully unsubscribed');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to unsubscribe');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  if (!email) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">Invalid Unsubscribe Link</h2>
        <p className="text-white/60 mb-8">
          This unsubscribe link is missing an email address.
        </p>
        <Link href="/" className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6">
          <span className="text-3xl">✅</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">You've Been Unsubscribed</h2>
        <p className="text-white/60 mb-2">
          <strong className="text-white">{email}</strong> has been removed from THE D[AI]LY BRIEF.
        </p>
        <p className="text-white/60 mb-8">
          You won't receive any more newsletters from us.
        </p>
        <div className="space-y-4">
          <p className="text-sm text-white/40">
            Changed your mind?{' '}
            <Link href="/#newsletter" className="text-purple-400 hover:text-purple-300 underline">
              Resubscribe here
            </Link>
          </p>
          <Link href="/" className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
          <span className="text-3xl">❌</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">Something Went Wrong</h2>
        <p className="text-white/60 mb-8">{message}</p>
        <div className="space-x-4">
          <button
            onClick={handleUnsubscribe}
            className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
          <Link href="/" className="inline-block px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-6">
        <span className="text-3xl">📧</span>
      </div>
      <h2 className="text-2xl font-bold mb-4">Unsubscribe from THE D[AI]LY BRIEF</h2>
      <p className="text-white/60 mb-2">
        Are you sure you want to unsubscribe?
      </p>
      <p className="text-white/40 mb-8">
        Email: <strong className="text-white">{email}</strong>
      </p>
      <div className="space-x-4">
        <button
          onClick={handleUnsubscribe}
          disabled={status === 'loading'}
          className="inline-block px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Unsubscribing...' : 'Yes, Unsubscribe Me'}
        </button>
        <Link href="/" className="inline-block px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen bg-[#0a0812] text-white noise">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[140px] glow-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-900/15 rounded-full blur-[140px] glow-orb-delayed" />
      </div>

      <div className="relative">
        <Header />

        <main className="max-w-2xl mx-auto px-4 py-8 md:px-6 md:py-20">
          <Suspense fallback={
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <UnsubscribeContent />
          </Suspense>
        </main>

        <Footer />
      </div>
    </div>
  );
}
