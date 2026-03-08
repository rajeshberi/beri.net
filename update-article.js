#!/usr/bin/env node
/**
 * Quick article updates for SEO optimization
 * Usage: node update-article.js <slug> [options]
 * 
 * Options:
 *   --title="New title"
 *   --excerpt="New excerpt"
 *   --add-tag="Tag"
 *   --remove-tag="Tag"
 *   --add-tool-mention="tool-slug"
 *   --meta-description="New meta description"
 */

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function updateArticle(slug, updates) {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    
    const article = await db.collection('newsletters').findOne({ slug });
    if (!article) {
      console.log(`❌ Article not found: ${slug}`);
      return;
    }
    
    const updateDoc = { $set: {} };
    
    // Handle different update types
    if (updates.title) {
      updateDoc.$set.title = updates.title;
    }
    
    if (updates.excerpt) {
      updateDoc.$set.excerpt = updates.excerpt;
    }
    
    if (updates.metaDescription) {
      updateDoc.$set.metaDescription = updates.metaDescription;
    }
    
    if (updates.addTag) {
      updateDoc.$addToSet = { tags: updates.addTag };
    }
    
    if (updates.removeTag) {
      updateDoc.$pull = { tags: updates.removeTag };
    }
    
    if (updates.addToolMention) {
      // Add tool mention to content if not already present
      const toolSlug = updates.addToolMention;
      const toolLink = `[tool](/tools/${toolSlug})`;
      
      if (!article.content.includes(`/tools/${toolSlug}`)) {
        // Find a good place to insert (after first paragraph)
        const paragraphs = article.content.split('\n\n');
        if (paragraphs.length > 1) {
          paragraphs.splice(1, 0, `\n*Related: Check out [${toolSlug}](/tools/${toolSlug}) in our tools directory.*\n`);
          updateDoc.$set.content = paragraphs.join('\n\n');
        }
      }
    }
    
    if (Object.keys(updateDoc.$set || {}).length > 0 || updateDoc.$addToSet || updateDoc.$pull) {
      await db.collection('newsletters').updateOne({ slug }, updateDoc);
      console.log(`✅ Updated ${slug}`);
      
      if (updates.title) console.log(`   Title: "${updates.title}"`);
      if (updates.excerpt) console.log(`   Excerpt: "${updates.excerpt}"`);
      if (updates.addTag) console.log(`   Added tag: ${updates.addTag}`);
      if (updates.removeTag) console.log(`   Removed tag: ${updates.removeTag}`);
      if (updates.addToolMention) console.log(`   Added tool mention: ${updates.addToolMention}`);
      if (updates.metaDescription) console.log(`   Meta description updated`);
    } else {
      console.log('ℹ️  No changes specified');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Usage: node update-article.js <slug> [options]');
  console.log('');
  console.log('Options:');
  console.log('  --title="New title"');
  console.log('  --excerpt="New excerpt"');
  console.log('  --add-tag="Tag"');
  console.log('  --remove-tag="Tag"');
  console.log('  --add-tool-mention="tool-slug"');
  console.log('  --meta-description="Description"');
  console.log('');
  console.log('Examples:');
  console.log('  node update-article.js my-article --title="New Title"');
  console.log('  node update-article.js my-article --add-tag="SEO"');
  console.log('  node update-article.js my-article --add-tool-mention="cursor"');
  process.exit(1);
}

const slug = args[0];
const updates = {};

args.slice(1).forEach(arg => {
  const match = arg.match(/^--([^=]+)="?([^"]+)"?$/);
  if (match) {
    const [, key, value] = match;
    const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    updates[camelKey] = value;
  }
});

updateArticle(slug, updates);
