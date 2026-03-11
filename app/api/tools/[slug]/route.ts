import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('beri-newsletter');
    
    const tool = await db.collection('tools').findOne(
      { slug: params.slug },
      { projection: { _id: 0 } }
    );
    
    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }
    
    // Get articles that mention this tool
    const mentioned_in = await db.collection('newsletters')
      .find(
        { tools: tool.slug },
        { projection: { slug: 1, title: 1, date: 1, _id: 0 } }
      )
      .sort({ date: -1 })
      .limit(10)
      .toArray();
    
    tool.mentioned_in_articles = mentioned_in;
    
    return NextResponse.json({
      tool,
      cache: 'no-store'
    });
    
  } catch (error) {
    console.error('Error fetching tool:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
