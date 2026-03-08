/**
 * Category Taxonomy Configuration
 * 
 * HOW TO ADD NEW CATEGORIES:
 * 1. Add a new entry to CATEGORY_TAXONOMY array below
 * 2. Each category needs: slug, label, icon (emoji), and children (tag slugs)
 * 3. Children should match tag names used in newsletter frontmatter (case-insensitive matching is applied)
 * 4. A tag can appear in multiple categories
 * 5. Tags not in any category still work via /tag/[tag] routes
 * 
 * HOW TO ADD NEW CHILD TAGS:
 * - Just add the tag string to the relevant category's `children` array
 * - The tag must match what's used in content frontmatter `tags: [...]`
 */

export interface CategoryConfig {
  slug: string;
  label: string;
  icon: string;
  children: string[];
}

export const CATEGORY_TAXONOMY: CategoryConfig[] = [
  {
    slug: 'by-function',
    label: 'By Function',
    icon: '🏢',
    children: [
      'Sales',
      'Marketing',
      'Legal',
      'HR',
      'Finance',
      'Operations',
      'IT',
      'Engineering',
      'Product Management',
    ],
  },
  {
    slug: 'by-technology',
    label: 'By Technology',
    icon: '⚡',
    children: [
      'AI Models',
      'LLMs',
      'AI Agents',
      'AI Tools',
      'AI Hardware',
      'Infrastructure',
      'Architecture',
      'Benchmarks',
      'Claude',
      'Anthropic',
      'GPT-5',
      'OpenClaw',
    ],
  },
  {
    slug: 'by-use-case',
    label: 'By Use Case',
    icon: '🎯',
    children: [
      'Enterprise',
      'ROI',
      'Cost Analysis',
      'Automation',
      'Deployment',
      'Budget',
      'Vendor Risk',
      'AI Policy',
      'Government',
      'Production',
      'Cowork',
    ],
  },
];

/**
 * Get all unique child tags across all categories
 */
export function getAllCategoryTags(): string[] {
  const tags = new Set<string>();
  CATEGORY_TAXONOMY.forEach(cat => cat.children.forEach(t => tags.add(t)));
  return Array.from(tags);
}

/**
 * Find which categories a given tag belongs to
 */
export function getCategoriesForTag(tag: string): CategoryConfig[] {
  return CATEGORY_TAXONOMY.filter(cat =>
    cat.children.some(child => child.toLowerCase() === tag.toLowerCase())
  );
}
