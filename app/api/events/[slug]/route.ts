import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    const eventsCollection = db.collection('events');
    const toolsCollection = db.collection('tools');
    const articlesCollection = db.collection('articles');
    
    // Get event
    const event = await eventsCollection.findOne(
      { slug },
      { projection: { _id: 0 } }
    );
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Get related tools (if any)
    const relatedTools = event.related_tools && event.related_tools.length > 0
      ? await toolsCollection.find(
          { slug: { $in: event.related_tools } },
          { projection: { _id: 0, name: 1, slug: 1, tagline: 1, website: 1 } }
        ).toArray()
      : [];
    
    // Get related articles (if any)
    const relatedArticles = event.related_articles && event.related_articles.length > 0
      ? await articlesCollection.find(
          { slug: { $in: event.related_articles } },
          { projection: { _id: 0, title: 1, slug: 1, excerpt: 1, publishedAt: 1 } }
        ).toArray()
      : [];
    
    // Get similar events (same topics, upcoming)
    const similarEvents = event.topics && event.topics.length > 0
      ? await eventsCollection.find(
          {
            slug: { $ne: slug },
            status: 'upcoming',
            topics: { $in: event.topics }
          },
          { projection: { _id: 0, name: 1, slug: 1, tagline: 1, date_start: 1, location: 1 } }
        )
        .limit(5)
        .sort({ date_start: 1 })
        .toArray()
      : [];
    
    return NextResponse.json({
      event,
      related: {
        tools: relatedTools,
        articles: relatedArticles,
        similarEvents
      }
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
      }
    });
    
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
