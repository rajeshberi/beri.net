import { connectToDatabase } from './mongodb';

export interface Newsletter {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  imageCredit?: string;
  type?: 'curated' | 'evergreen';
  originalUrl?: string;
  originalAuthor?: string;
  originalSource?: string;
  relatedArticles?: string[];
}

export async function getAllNewsletters(): Promise<Newsletter[]> {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    const newsletters = await db
      .collection('newsletters')
      .find({ published: { $ne: false } })  // Only published articles
      .sort({ published_date: -1, created_at: -1, _id: -1 })  // Sort by datetime, not string
      .toArray();
    
    return newsletters.map(n => ({
      ...n,
      _id: undefined,
      // Ensure date is always a string for Next.js
      date: n.date || (n.published_date ? n.published_date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
    })) as any;
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    return [];
  }
}

export async function getNewsletterBySlug(slug: string): Promise<Newsletter | null> {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    const newsletter = await db.collection('newsletters').findOne({ slug });
    
    if (!newsletter) return null;
    
    return {
      ...newsletter,
      _id: undefined,
    } as any;
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    return null;
  }
}

export async function getNewslettersByTag(tag: string): Promise<Newsletter[]> {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    const newsletters = await db
      .collection('newsletters')
      .find({ tags: tag, published: { $ne: false } })
      .sort({ published_date: -1, created_at: -1 })
      .toArray();
    
    return newsletters.map(n => ({
      ...n,
      _id: undefined,
      date: n.date || (n.published_date ? n.published_date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
    })) as any;
  } catch (error) {
    console.error('Error fetching newsletters by tag:', error);
    return [];
  }
}

export async function getAllTags(): Promise<string[]> {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    const newsletters = await db
      .collection('newsletters')
      .find({})
      .toArray();
    
    const tagsSet = new Set<string>();
    newsletters.forEach(n => {
      if (n.tags) {
        n.tags.forEach((tag: string) => tagsSet.add(tag));
      }
    });
    
    return Array.from(tagsSet).sort();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export async function searchNewsletters(query: string): Promise<Newsletter[]> {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    const newsletters = await db
      .collection('newsletters')
      .find({
        $text: { $search: query },
        published: { $ne: false }
      })
      .sort({ score: { $meta: 'textScore' } })
      .toArray();
    
    return newsletters.map(n => ({
      ...n,
      _id: undefined,
      date: n.date || (n.published_date ? n.published_date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
    })) as any;
  } catch (error) {
    console.error('Error searching newsletters:', error);
    return [];
  }
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function getRelatedNewsletters(slug: string, limit: number = 3): Promise<Newsletter[]> {
  try {
    const current = await getNewsletterBySlug(slug);
    if (!current) return [];
    
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    // Find articles with overlapping tags
    const related = await db
      .collection('newsletters')
      .find({
        slug: { $ne: slug },
        tags: { $in: current.tags },
        published: { $ne: false }
      })
      .limit(limit * 2) // Get more than needed for filtering
      .toArray();
    
    // Sort by number of matching tags
    const scored = related.map(n => ({
      ...n,
      _id: undefined,
      date: n.date || (n.published_date ? n.published_date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
      matchCount: n.tags.filter((t: string) => current.tags.includes(t)).length
    }));
    
    scored.sort((a, b) => b.matchCount - a.matchCount);
    
    return scored.slice(0, limit) as any;
  } catch (error) {
    console.error('Error fetching related newsletters:', error);
    return [];
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    const newsletters = await db
      .collection('newsletters')
      .find({}, { projection: { slug: 1 } })
      .toArray();
    
    return newsletters.map(n => n.slug);
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
}
