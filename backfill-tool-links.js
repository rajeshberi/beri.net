#!/usr/bin/env node
/**
 * Backfill tool-article relationships
 * Runs post-publish workflow for all existing articles
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function backfillLinks() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    
    console.log('🔄 Backfilling tool-article relationships...\n');
    
    const articles = await db.collection('newsletters').find({}).toArray();
    const tools = await db.collection('tools').find({}).toArray();
    
    console.log(`Found ${articles.length} articles and ${tools.length} tools\n`);
    
    let totalLinks = 0;
    
    for (const article of articles) {
      const content = article.content?.toLowerCase() || '';
      const title = article.title?.toLowerCase() || '';
      let articleLinks = 0;
      const articleToolSlugs = [];
      
      for (const tool of tools) {
        const toolName = tool.productName || tool.name;
        const vendorName = tool.vendorName || tool.company;
        
        const searchTerms = [
          toolName?.toLowerCase(),
          vendorName?.toLowerCase(),
          tool.slug
        ].filter(Boolean);
        
        const mentioned = searchTerms.some(term => 
          content.includes(term) || title.includes(term)
        );
        
        if (mentioned) {
          // Add article to tool's relatedArticles
          const existingArticles = tool.relatedArticles || [];
          const alreadyLinked = existingArticles.some(a => a.slug === article.slug);
          
          if (!alreadyLinked) {
            existingArticles.push({
              slug: article.slug,
              title: article.title,
              excerpt: article.excerpt,
              date: article.date
            });
            
            await db.collection('tools').updateOne(
              { _id: tool._id },
              { $set: { relatedArticles: existingArticles } }
            );
            
            articleLinks++;
            totalLinks++;
            articleToolSlugs.push(tool.slug);
          }
        }
      }
      
      // Update article with tools array
      if (articleToolSlugs.length > 0) {
        await db.collection('newsletters').updateOne(
          { _id: article._id },
          { $set: { tools: articleToolSlugs } }
        );
        console.log(`✅ ${article.title} → ${articleLinks} tool(s)`);
      }
    }
    
    console.log(`\n✨ Backfill complete! Created ${totalLinks} tool-article links.`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

backfillLinks();
