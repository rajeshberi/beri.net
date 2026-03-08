import clientPromise from './mongodb';

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
    const client = await clientPromise;
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
    const client = await clientPromise;
    const db = client.db('beri-newsletter');
    
    const tool = await db.collection('ai_tools').findOne({ slug });
    
    if (!tool) return null;
    
    return {
      ...tool,
      _id: undefined,
      addedDate: tool.addedDate?.toISOString(),
      lastUpdated: tool.lastUpdated?.toISOString(),
    } as any;
  } catch (error) {
    console.error('Error fetching tool:', error);
    return null;
  }
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
  try {
    const client = await clientPromise;
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
    const client = await clientPromise;
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

export async function getCategories() {
  try {
    const client = await clientPromise;
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
    const client = await clientPromise;
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
