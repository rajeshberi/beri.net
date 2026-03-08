import { getAllNewsletters } from '@/lib/newsletters';
import { NextResponse } from 'next/server';

export async function GET() {
  const newsletters = await getAllNewsletters();
  
  // Return simplified data for client-side search
  const data = newsletters.map(n => ({
    slug: n.slug,
    title: n.title,
    date: n.date,
    excerpt: n.excerpt,
    tags: n.tags,
  }));

  return NextResponse.json(data);
}
