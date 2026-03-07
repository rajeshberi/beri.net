import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const newslettersDirectory = path.join(process.cwd(), 'content/newsletters');

export interface Newsletter {
  slug: string;
  title: string;
  date: string;
  published: boolean;
  excerpt: string;
  tags: string[];
  content: string;
}

export function getAllNewsletters(): Newsletter[] {
  try {
    const fileNames = fs.readdirSync(newslettersDirectory);
    const allNewsletters = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(newslettersDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title || '',
          date: data.date || '',
          published: data.published !== false,
          excerpt: data.excerpt || '',
          tags: data.tags || [],
          content,
        } as Newsletter;
      })
      .filter(newsletter => newsletter.published)
      .sort((a, b) => (a.date > b.date ? -1 : 1));

    return allNewsletters;
  } catch (error) {
    console.error('Error reading newsletters:', error);
    return [];
  }
}

export function getNewsletterBySlug(slug: string): Newsletter | null {
  try {
    const fullPath = path.join(newslettersDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      published: data.published !== false,
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(newslettersDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    return [];
  }
}
