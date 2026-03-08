'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import InlineSubscribe from './InlineSubscribe';

export default function InlineSubscribePortalClient() {
  const containerRef = useRef<Element | null>(null);

  useEffect(() => {
    containerRef.current = document.getElementById('inline-subscribe-slot');
  }, []);

  if (typeof window === 'undefined') return null;

  const el = document.getElementById('inline-subscribe-slot');
  if (!el) return <InlineSubscribe />;
  return createPortal(<InlineSubscribe />, el);
}
