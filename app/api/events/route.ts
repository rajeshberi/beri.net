import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const eventType = searchParams.get('event_type');
    const status = searchParams.get('status') || 'upcoming';
    const location = searchParams.get('location');
    const topic = searchParams.get('topic');
    const virtual = searchParams.get('virtual');
    const free = searchParams.get('free');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100');
    const sortBy = searchParams.get('sort') || 'date_start';
    const sortOrder = searchParams.get('order') ? (searchParams.get('order') === 'desc' ? -1 : 1) : 1;
    const after = searchParams.get('after'); // Date filter: events after this date
    const before = searchParams.get('before'); // Date filter: events before this date
    
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    const collection = db.collection('events');
    
    // Build query
    const query: any = {};
    
    // Status filter (default: upcoming)
    if (status) {
      query.status = status;
    }
    
    // Event type filter
    if (eventType) {
      query.event_type = eventType;
    }
    
    // Location filter (city or country)
    if (location) {
      query.$or = [
        { 'location.city': new RegExp(location, 'i') },
        { 'location.country': new RegExp(location, 'i') }
      ];
    }
    
    // Topic filter
    if (topic) {
      query.topics = topic;
    }
    
    // Virtual filter
    if (virtual !== null && virtual !== undefined) {
      query['location.virtual'] = virtual === 'true';
    }
    
    // Free event filter
    if (free !== null && free !== undefined) {
      if (free === 'true') {
        query.$or = [
          { 'pricing.type': 'Free' },
          { 'pricing.free_tier_available': true }
        ];
      }
    }
    
    // Date range filters
    if (after || before) {
      query.date_start = {};
      if (after) {
        query.date_start.$gte = new Date(after);
      }
      if (before) {
        query.date_start.$lte = new Date(before);
      }
    }
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Build sort
    const sort: any = {};
    if (search) {
      sort.score = { $meta: 'textScore' };
    } else {
      sort[sortBy] = sortOrder;
    }
    
    // Execute query
    const projection: any = { _id: 0 };
    if (search) {
      projection.score = { $meta: 'textScore' };
    }
    
    const events = await collection
      .find(query, { projection })
      .sort(sort)
      .limit(limit)
      .toArray();
    
    // Get metadata
    const total = await collection.countDocuments(query);
    const eventTypes = await collection.distinct('event_type');
    const topics = await collection.distinct('topics');
    
    return NextResponse.json({
      events,
      metadata: {
        total,
        returned: events.length,
        eventTypes: eventTypes.sort(),
        topics: topics.sort(),
        filters: {
          status,
          eventType,
          location,
          topic,
          virtual,
          free,
          search,
          after,
          before
        }
      }
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
      }
    });
    
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
