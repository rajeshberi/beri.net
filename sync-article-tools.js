#!/usr/bin/env node
/**
 * Sync article.tools arrays from tool.relatedArticles
 * Ensures bidirectional consistency
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function syncArticleTools() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    
    console.log('🔄 Syncing article.tools from tool.relatedArticles...\n');
    
    const tools = await db.collection('tools').find({}).toArray();
    
    // Build map of article slug -> tool slugs
    const articleToolMap = new Map();
    
    for (const tool of tools) {
      if (tool.relatedArticles && tool.relatedArticles.length > 0) {
        for (const article of tool.relatedArticles) {
          const articleSlug = article.slug || article;
          if (!articleToolMap.has(articleSlug)) {
            articleToolMap.set(articleSlug, []);
          }
          articleToolMap.get(articleSlug).push(tool.slug);
        }
      }
    }
    
    console.log(`Found ${articleToolMap.size} articles with tool references\n`);
    
    let updated = 0;
    
    for (const [articleSlug, toolSlugs] of articleToolMap.entries()) {
      await db.collection('newsletters').updateOne(
        { slug: articleSlug },
        { $set: { tools: toolSlugs } }
      );
      updated++;
      console.log(`✅ ${articleSlug} → ${toolSlugs.length} tool(s)`);
    }
    
    console.log(`\n✨ Sync complete! Updated ${updated} articles.`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

syncArticleTools();
