#!/usr/bin/env node
/**
 * Scan all newsletter articles and auto-link tools that are mentioned
 * This creates bidirectional SEO links: articles → tools, tools → articles
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = process.env.MONGODB_URI || 'mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function linkToolsToArticles() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    
    const tools = await db.collection('ai_tools').find({}).toArray();
    const newsletters = await db.collection('newsletters').find({}).toArray();
    
    console.log(`📊 Scanning ${newsletters.length} articles for ${tools.length} tools...\n`);
    
    let totalLinks = 0;
    
    for (const tool of tools) {
      const relatedArticles = [];
      
      // Search for tool mentions in articles
      const searchTerms = [
        tool.productName.toLowerCase(),
        tool.vendorName.toLowerCase(),
        tool.slug
      ];
      
      for (const article of newsletters) {
        const content = (article.content || '').toLowerCase();
        const title = (article.title || '').toLowerCase();
        const excerpt = (article.excerpt || '').toLowerCase();
        
        // Check if tool is mentioned
        const mentioned = searchTerms.some(term => 
          content.includes(term) || title.includes(term) || excerpt.includes(term)
        );
        
        if (mentioned) {
          relatedArticles.push({
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            date: article.date
          });
        }
      }
      
      if (relatedArticles.length > 0) {
        // Update tool with related articles
        await db.collection('ai_tools').updateOne(
          { _id: tool._id },
          { $set: { relatedArticles } }
        );
        
        console.log(`✅ ${tool.productName}: ${relatedArticles.length} article(s)`);
        relatedArticles.forEach(a => console.log(`   → ${a.title}`));
        console.log();
        
        totalLinks += relatedArticles.length;
      }
    }
    
    console.log(`\n✅ Linked ${totalLinks} tool-article relationships`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

linkToolsToArticles();
