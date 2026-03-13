import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getEvent(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/events/${slug}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getEvent(slug);
  
  if (!data || !data.event) {
    return {
      title: 'Event Not Found | THE D[AI]LY BRIEF'
    };
  }
  
  const event = data.event;
  
  return {
    title: `${event.name} | AI Events Directory`,
    description: event.tagline || event.description?.substring(0, 160),
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getEvent(slug);
  
  if (!data || !data.event) {
    notFound();
  }
  
  const { event, related } = data;
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/events" className="hover:text-blue-600">Events</Link>
        <span className="mx-2">/</span>
        <span>{event.name}</span>
      </div>
      
      {/* Event Header */}
      <div className="mb-8">
        {event.event_type && (
          <div className="mb-3">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
              {event.event_type}
            </span>
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
        
        {event.tagline && (
          <p className="text-xl text-gray-600 mb-6">{event.tagline}</p>
        )}
        
        {/* Key Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg">
          {/* Date */}
          <div>
            <div className="text-sm text-gray-500 mb-1">Date</div>
            <div className="font-semibold">
              {formatDate(event.date_start)}
              {event.date_end && (
                <>
                  <br />
                  <span className="text-sm">to {formatDate(event.date_end)}</span>
                </>
              )}
            </div>
          </div>
          
          {/* Location */}
          <div>
            <div className="text-sm text-gray-500 mb-1">Location</div>
            <div className="font-semibold">
              {event.location?.virtual ? (
                <>Virtual{event.location?.hybrid && ' + In-Person'}</>
              ) : (
                <>
                  {event.location?.city}{event.location?.city && ', '}{event.location?.country}
                </>
              )}
            </div>
            {event.location?.venue && (
              <div className="text-sm text-gray-600">{event.location.venue}</div>
            )}
          </div>
          
          {/* Pricing */}
          <div>
            <div className="text-sm text-gray-500 mb-1">Pricing</div>
            <div className="font-semibold">{event.pricing?.type || 'TBD'}</div>
            {event.pricing?.free_tier_available && (
              <div className="text-sm text-green-600">Free tier available</div>
            )}
          </div>
        </div>
      </div>
      
      {/* CTA Button */}
      {event.website && (
        <div className="mb-12">
          <a
            href={event.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Visit Event Website →
          </a>
          {event.registration_url && event.registration_url !== event.website && (
            <a
              href={event.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block ml-4 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Register Now →
            </a>
          )}
        </div>
      )}
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2">
          {/* Description */}
          {event.description && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <div className="prose max-w-none">
                {event.description.split('\n').map((para: string, idx: number) => (
                  <p key={idx} className="mb-4">{para}</p>
                ))}
              </div>
            </div>
          )}
          
          {/* Topics */}
          {event.topics && event.topics.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Topics Covered</h2>
              <div className="flex flex-wrap gap-2">
                {event.topics.map((topic: string, idx: number) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Target Audience */}
          {event.target_audience && event.target_audience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Who Should Attend</h2>
              <ul className="list-disc list-inside space-y-2">
                {event.target_audience.map((audience: string, idx: number) => (
                  <li key={idx}>{audience}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Right Column - Sidebar */}
        <div>
          {/* Organizer */}
          {event.organizer && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold mb-3">Organized By</h3>
              <div className="text-lg font-semibold mb-2">{event.organizer.name}</div>
              {event.organizer.website && (
                <a
                  href={event.organizer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Visit Website →
                </a>
              )}
            </div>
          )}
          
          {/* Expected Attendance */}
          {event.expected_attendance && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold mb-3">Expected Attendance</h3>
              <div className="text-2xl font-bold text-blue-600">{event.expected_attendance}</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Content */}
      {(related.tools?.length > 0 || related.articles?.length > 0 || related.similarEvents?.length > 0) && (
        <div className="mt-16 pt-12 border-t">
          <h2 className="text-3xl font-bold mb-8">Related Content</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Related Tools */}
            {related.tools?.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Featured Tools</h3>
                <div className="space-y-3">
                  {related.tools.map((tool: any) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="block bg-gray-50 p-4 rounded hover:shadow transition-shadow"
                    >
                      <div className="font-semibold">{tool.name}</div>
                      {tool.tagline && <div className="text-sm text-gray-600">{tool.tagline}</div>}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Related Articles */}
            {related.articles?.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                <div className="space-y-3">
                  {related.articles.map((article: any) => (
                    <Link
                      key={article.slug}
                      href={`/articles/${article.slug}`}
                      className="block bg-gray-50 p-4 rounded hover:shadow transition-shadow"
                    >
                      <div className="font-semibold">{article.title}</div>
                      {article.excerpt && <div className="text-sm text-gray-600">{article.excerpt}</div>}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Similar Events */}
          {related.similarEvents?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Similar Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.similarEvents.map((similarEvent: any) => (
                  <Link
                    key={similarEvent.slug}
                    href={`/events/${similarEvent.slug}`}
                    className="block bg-gray-50 p-4 rounded hover:shadow transition-shadow"
                  >
                    <div className="font-semibold mb-2">{similarEvent.name}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(similarEvent.date_start).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
