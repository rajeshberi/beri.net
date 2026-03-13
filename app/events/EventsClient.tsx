'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

interface Event {
  name: string;
  slug: string;
  tagline?: string;
  date_start: string;
  date_end?: string;
  location?: {
    city?: string;
    country?: string;
    virtual?: boolean;
    hybrid?: boolean;
  };
  event_type?: string;
  topics?: string[];
  pricing?: {
    type?: string;
  };
  status?: string;
}

export default function EventsClient() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: 'upcoming',
    eventType: '',
    virtual: ''
  });

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key.replace(/([A-Z])/g, '_$1').toLowerCase(), value);
      });
      
      const response = await fetch(`/api/events?${params}`);
      if (!response.ok) throw new Error('Failed to fetch events');
      
      const data = await response.json();
      setEvents(data.events || []);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

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
              <div className="label text-purple-400/60 mb-4">AI Events Directory</div>
              <h1 className="heading-xl mb-6">
                Discover AI Conferences & Events
              </h1>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                {loading ? 'Loading...' : `${events.length} upcoming AI conferences, workshops, and meetups worldwide`}
              </p>
            </div>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal delay={100}>
            <div className="card card-glow p-6 mb-12">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="">All Events</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-white/60 mb-2">Format</label>
                  <select
                    value={filters.virtual}
                    onChange={(e) => setFilters({...filters, virtual: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="">All Formats</option>
                    <option value="true">Virtual</option>
                    <option value="false">In-Person</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Type</label>
                  <select
                    value={filters.eventType}
                    onChange={(e) => setFilters({...filters, eventType: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="">All Types</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="webinar">Webinar</option>
                    <option value="meetup">Meetup</option>
                  </select>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Events Grid */}
          {loading ? (
            <div className="text-center py-12 text-white/50">
              <p>Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-400">
              <p>Error: {error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12 text-white/50">
              <p>No events found matching your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <ScrollReveal key={event.slug} delay={index * 50}>
                  <Link href={`/events/${event.slug}`} className="block group">
                    <div className="card card-glow h-full p-6 hover:border-purple-500/50 transition-all">
                      {/* Event Type Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full">
                          {event.event_type || 'Conference'}
                        </span>
                        {event.location?.virtual && (
                          <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full">
                            Virtual
                          </span>
                        )}
                      </div>

                      {/* Event Name */}
                      <h3 className="text-lg font-bold mb-2 group-hover:text-purple-200 transition-colors line-clamp-2">
                        {event.name}
                      </h3>

                      {/* Tagline */}
                      {event.tagline && (
                        <p className="text-sm text-white/60 mb-4 line-clamp-2">
                          {event.tagline}
                        </p>
                      )}

                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {formatDate(event.date_start)}
                          {event.date_end && event.date_end !== event.date_start && ` - ${formatDate(event.date_end)}`}
                        </span>
                      </div>

                      {/* Location */}
                      {event.location && (event.location.city || event.location.country) && (
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>
                            {event.location.city}
                            {event.location.city && event.location.country && ', '}
                            {event.location.country}
                          </span>
                        </div>
                      )}

                      {/* Topics */}
                      {event.topics && event.topics.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {event.topics.slice(0, 3).map((topic, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white/5 text-white/60 text-xs rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
