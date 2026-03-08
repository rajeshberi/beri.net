#!/usr/bin/env node
/**
 * Suggest related tools for newsletter articles
 * Usage: node suggest-tools-for-newsletter.js article-slug1 article-slug2 ...
 */

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function suggestTools(articleSlugs) {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    
    const articles = await db.collection('newsletters').find({
      slug: { $in: articleSlugs }
    }).toArray();
    
    if (articles.length === 0) {
      console.log('❌ No articles found');
      return;
    }
    
    console.log(`\n📧 Tool Recommendations for Newsletter\n`);
    console.log(`Articles: ${articles.map(a => a.title).join(', ')}\n`);
    
    // Collect all tools mentioned across articles
    const toolMentions = new Map();
    
    for (const article of articles) {
      const tools = await db.collection('ai_tools').find({
        'relatedArticles.slug': article.slug
      }).toArray();
      
      for (const tool of tools) {
        if (!toolMentions.has(tool.slug)) {
          toolMentions.set(tool.slug, {
            ...tool,
            mentionCount: 0,
            inArticles: []
          });
        }
        const existing = toolMentions.get(tool.slug);
        existing.mentionCount++;
        existing.inArticles.push(article.title);
      }
    }
    
    // Sort by mention count
    const recommendedTools = Array.from(toolMentions.values())
      .sort((a, b) => b.mentionCount - a.mentionCount)
      .slice(0, 5);
    
    if (recommendedTools.length === 0) {
      console.log('ℹ️  No tools found in these articles\n');
      return;
    }
    
    console.log(`🔧 Recommended Tools (${recommendedTools.length}):\n`);
    
    recommendedTools.forEach((tool, i) => {
      console.log(`${i + 1}. ${tool.productName} (${tool.vendorName})`);
      console.log(`   Category: ${tool.category} | Pricing: ${tool.pricingModel}`);
      console.log(`   ${tool.description}`);
      console.log(`   🔗 https://beri.net/tools/${tool.slug}`);
      console.log(`   Mentioned in: ${tool.inArticles.join(', ')}`);
      console.log();
    });
    
    // Generate newsletter footer text
    console.log(`\n📝 Newsletter Footer Text:\n`);
    console.log(`---`);
    console.log(`\n## Tools Mentioned\n`);
    recommendedTools.forEach((tool, i) => {
      console.log(`**${i + 1}. [${tool.productName}](https://beri.net/tools/${tool.slug})** - ${tool.description.split('.')[0]}. ${tool.pricingModel}.`);
    });
    console.log(`\nExplore our full [AI Tools Directory](https://beri.net/tools) for ${await db.collection('ai_tools').countDocuments()}+ tools.`);
    console.log(`\n---`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node suggest-tools-for-newsletter.js article-slug1 article-slug2 ...');
  process.exit(1);
}

suggestTools(args);
