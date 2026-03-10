import { connectToDatabase } from './mongodb';

export interface Tool {
  slug: string;
  productName: string;
  vendorName: string;
  websiteUrl: string;
  logoUrl: string;
  description: string;
  detailedAnalysis: string;
  category: string;
  subcategory: string;
  domains: string[];
  tags: string[];
  pricingModel: string;
  pricingDetails: string;
  targetAudience: string[];
  useCases: string[];
  founded?: number;
  headquarters: string;
  teamSize: string;
  integrations: string[];
  apiAvailable: boolean;
  featured: boolean;
  verified: boolean;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  metrics: {
    funding?: string;
    customers?: number;
    rating?: number;
  };
  addedDate: Date;
  lastUpdated: Date;
  addedBy: string;
  relatedArticles: string[];
}

export async function getAllTools(): Promise<Tool[]> {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    const tools = await db
      .collection('ai_tools')
      .find({})
      .sort({ addedDate: -1 })
      .toArray();
    
    return tools.map(tool => ({
      ...tool,
      _id: undefined,
      addedDate: tool.addedDate?.toISOString(),
      lastUpdated: tool.lastUpdated?.toISOString(),
    })) as any;
  } catch (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    const tool = await db.collection('ai_tools').findOne({ slug });
    
    if (!tool) return null;
    
    // Fetch related articles if they exist
    let relatedArticlesData: any[] = [];
    if (tool.relatedArticles && tool.relatedArticles.length > 0) {
      relatedArticlesData = await db.collection('newsletters')
        .find({ slug: { $in: tool.relatedArticles } })
        .project({ title: 1, slug: 1, excerpt: 1, date: 1, published_date: 1 })
        .sort({ published_date: -1 })
        .limit(5)
        .toArray();
    }
    
    return {
      ...tool,
      _id: undefined,
      addedDate: tool.addedDate?.toISOString(),
      lastUpdated: tool.lastUpdated?.toISOString(),
      relatedArticles: relatedArticlesData.map((article: any) => ({
        ...article,
        _id: undefined,
        date: article.date || (article.published_date ? article.published_date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
      })),
    } as any;
  } catch (error) {
    console.error('Error fetching tool:', error);
    return null;
  }
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    const tools = await db
      .collection('ai_tools')
      .find({ category })
      .sort({ featured: -1, addedDate: -1 })
      .toArray();
    
    return tools.map(tool => ({
      ...tool,
      _id: undefined,
      addedDate: tool.addedDate?.toISOString(),
      lastUpdated: tool.lastUpdated?.toISOString(),
    })) as any;
  } catch (error) {
    console.error('Error fetching tools by category:', error);
    return [];
  }
}

export async function getToolsByDomain(domain: string): Promise<Tool[]> {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    const tools = await db
      .collection('ai_tools')
      .find({ domains: domain })
      .sort({ featured: -1, addedDate: -1 })
      .toArray();
    
    return tools.map(tool => ({
      ...tool,
      _id: undefined,
      addedDate: tool.addedDate?.toISOString(),
      lastUpdated: tool.lastUpdated?.toISOString(),
    })) as any;
  } catch (error) {
    console.error('Error fetching tools by domain:', error);
    return [];
  }
}

export async function getToolsForArticle(articleSlug: string): Promise<Tool[]> {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    // Find tools that have this article in their relatedArticles array
    // relatedArticles can be either array of strings or array of objects with slug field
    const tools = await db
      .collection('ai_tools')
      .find({
        $or: [
          { relatedArticles: articleSlug }, // Simple string array
          { 'relatedArticles.slug': articleSlug } // Array of objects with slug field
        ]
      })
      .sort({ featured: -1, addedDate: -1 })
      .limit(5)
      .toArray();
    
    return tools.map(tool => ({
      ...tool,
      _id: undefined,
      addedDate: tool.addedDate?.toISOString(),
      lastUpdated: tool.lastUpdated?.toISOString(),
      relatedArticles: [], // Don't need nested articles for sidebar
    })) as any;
  } catch (error) {
    console.error('Error fetching tools for article:', error);
    return [];
  }
}

export async function getCategories() {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    const categories = await db
      .collection('tool_categories')
      .find({})
      .toArray();
    
    return categories.map(cat => ({
      ...cat,
      _id: undefined,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getDomains() {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    
    const domains = await db
      .collection('tool_domains')
      .find({})
      .toArray();
    
    return domains.map(domain => ({
      ...domain,
      _id: undefined,
    }));
  } catch (error) {
    console.error('Error fetching domains:', error);
    return [];
  }
}
