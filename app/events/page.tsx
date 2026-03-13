import EventsClient from './EventsClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'AI Events Directory | THE D[AI]LY BRIEF',
  description: 'Discover upcoming AI conferences, webinars, workshops, and meetups. Find the best AI events worldwide with dates, locations, and registration information.',
};

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12"><div className="text-center">Loading events...</div></div>}>
      <EventsClient />
    </Suspense>
  );
}
