import { NextRequest, NextResponse } from 'next/server';
import { searchNewsletters } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const results = await searchNewsletters(query);

    return NextResponse.json({
      success: true,
      query,
      count: results.length,
      results: results.map(n => ({
        slug: n.slug,
        title: n.title,
        excerpt: n.excerpt,
        tags: n.tags,
        published_date: n.published_date,
        reading_time: n.reading_time
      }))
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed. Please try again.' },
      { status: 500 }
    );
  }
}
