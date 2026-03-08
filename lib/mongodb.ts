import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || 'beri-newsletter';

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(MONGODB_URI);
  cachedClient = client;
  
  return client;
}

export async function getDatabase() {
  const client = await connectToDatabase();
  return client.db(MONGODB_DB);
}

export interface Newsletter {
  _id?: any;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published: boolean;
  published_date: Date;
  updated_date: Date;
  tags: string[];
  reading_time: number;
  meta_description: string;
  views: number;
  unique_views: number;
  shares: {
    twitter: number;
    linkedin: number;
    email: number;
  };
  source_file: string;
  content_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface Tag {
  _id?: any;
  name: string;
  slug: string;
  article_count: number;
  created_at: Date;
  updated_at: Date;
}

export async function getAllNewsletters(): Promise<Newsletter[]> {
  const db = await getDatabase();
  const newsletters = await db
    .collection<Newsletter>('newsletters')
    .find({ published: true })
    .sort({ published_date: -1 })
    .toArray();
  
  return newsletters.map(n => ({
    ...n,
    _id: n._id?.toString()
  }));
}

export async function getNewsletterBySlug(slug: string): Promise<Newsletter | null> {
  const db = await getDatabase();
  const newsletter = await db
    .collection<Newsletter>('newsletters')
    .findOne({ slug, published: true });
  
  if (!newsletter) return null;
  
  return {
    ...newsletter,
    _id: newsletter._id?.toString()
  };
}

export async function getNewslettersByTag(tag: string): Promise<Newsletter[]> {
  const db = await getDatabase();
  const newsletters = await db
    .collection<Newsletter>('newsletters')
    .find({ tags: tag, published: true })
    .sort({ published_date: -1 })
    .toArray();
  
  return newsletters.map(n => ({
    ...n,
    _id: n._id?.toString()
  }));
}

export async function getAllTags(): Promise<Tag[]> {
  const db = await getDatabase();
  const tags = await db
    .collection<Tag>('tags')
    .find({})
    .sort({ article_count: -1 })
    .toArray();
  
  return tags.map(t => ({
    ...t,
    _id: t._id?.toString()
  }));
}

export async function getRelatedNewsletters(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): Promise<Newsletter[]> {
  const db = await getDatabase();
  const newsletters = await db
    .collection<Newsletter>('newsletters')
    .find({
      slug: { $ne: currentSlug },
      tags: { $in: tags },
      published: true
    })
    .sort({ published_date: -1 })
    .limit(limit)
    .toArray();
  
  return newsletters.map(n => ({
    ...n,
    _id: n._id?.toString()
  }));
}

export async function searchNewsletters(query: string): Promise<Newsletter[]> {
  const db = await getDatabase();
  const newsletters = await db
    .collection<Newsletter>('newsletters')
    .find({
      $text: { $search: query },
      published: true
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(20)
    .toArray();
  
  return newsletters.map(n => ({
    ...n,
    _id: n._id?.toString()
  }));
}

export async function incrementViews(slug: string) {
  const db = await getDatabase();
  await db.collection('newsletters').updateOne(
    { slug },
    { 
      $inc: { views: 1 },
      $set: { updated_at: new Date() }
    }
  );
}
