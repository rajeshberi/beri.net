// Content type definitions for THE D*AI*LY BRIEF

export type ContentType = 'curated' | 'original';

export interface CuratedPost {
  type: 'curated';
  originalUrl: string;
  originalAuthor: string;
  originalSource: string; // e.g., "TechCrunch", "Ars Technica"
  originalPublishDate?: string;
  yourTake: string; // Rajesh's commentary
}

export interface OriginalPost {
  type: 'original';
  // Full article content in markdown
}

export interface BasePost {
  slug: string;
  title: string;
  date: string;
  published: boolean;
  excerpt: string;
  tags: string[];
  content: string;
}

export type Post = BasePost & (CuratedPost | OriginalPost);

export function isCurated(post: Post): post is BasePost & CuratedPost {
  return post.type === 'curated';
}

export function isOriginal(post: Post): post is BasePost & OriginalPost {
  return post.type === 'original';
}
