import { MetadataRoute } from 'next';
import { getAllNewsletters } from '@/lib/newsletters';
import { getAllTools } from '@/lib/tools';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.beri.net';
  
  // Get all newsletters
  const newsletters = await getAllNewsletters();
  
  // Get all tools
  const tools = await getAllTools();
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(newsletters.flatMap(n => n.tags))
  );
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
  
  // Newsletter pages
  const newsletterPages: MetadataRoute.Sitemap = newsletters.map(newsletter => ({
    url: `${baseUrl}/article/${newsletter.slug}`,
    lastModified: new Date(newsletter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  // Tag pages
  const tagPages: MetadataRoute.Sitemap = allTags.map(tag => ({
    url: `${baseUrl}/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));
  
  // Tool pages
  const toolPages: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: tool.updatedAt ? new Date(tool.updatedAt) : new Date(tool.addedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  return [...staticPages, ...newsletterPages, ...toolPages, ...tagPages];
}
