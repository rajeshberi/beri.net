'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    location: '',
    topic: '',
    virtual: '',
    free: ''
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Events Directory</h1>
        <p className="text-xl text-gray-600">
          Discover upcoming AI conferences, webinars, workshops, and meetups worldwide
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">Filter Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="past">Past</option>
              <option value="">All</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Event Type</label>
            <select
              value={filters.eventType}
              onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All Types</option>
              <option value="conference">Conference</option>
              <option value="webinar">Webinar</option>
              <option value="workshop">Workshop</option>
              <option value="meetup">Meetup</option>
              <option value="summit">Summit</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Virtual</label>
            <select
              value={filters.virtual}
              onChange={(e) => setFilters({ ...filters, virtual: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All Events</option>
              <option value="true">Virtual Only</option>
              <option value="false">In-Person Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No events found matching your filters.
          </div>
        ) : (
          events.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="block bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              {/* Event Type Badge */}
              {event.event_type && (
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                    {event.event_type}
                  </span>
                </div>
              )}
              
              {/* Event Name */}
              <h3 className="text-xl font-bold mb-2">{event.name}</h3>
              
              {/* Tagline */}
              {event.tagline && (
                <p className="text-gray-600 text-sm mb-4">{event.tagline}</p>
              )}
              
              {/* Date */}
              <div className="flex items-center text-sm text-gray-700 mb-2">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(event.date_start)}
                {event.date_end && ` - ${formatDate(event.date_end)}`}
              </div>
              
              {/* Location */}
              {event.location && (
                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location.virtual ? 'Virtual' : `${event.location.city}, ${event.location.country}`}
                  {event.location.hybrid && ' (Hybrid)'}
                </div>
              )}
              
              {/* Pricing */}
              {event.pricing?.type && (
                <div className="flex items-center text-sm text-gray-700 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {event.pricing.type}
                </div>
              )}
              
              {/* Topics */}
              {event.topics && event.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {event.topics.slice(0, 3).map((topic, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {topic}
                    </span>
                  ))}
                  {event.topics.length > 3 && (
                    <span className="text-gray-500 text-xs">+{event.topics.length - 3} more</span>
                  )}
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
