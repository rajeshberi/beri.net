#!/usr/bin/env node
/**
 * Post-Publish Workflow
 * Runs after creating a new article to integrate it into the site
 * 
 * Usage: node post-publish.js <article-slug>
 */

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function postPublish(slug) {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    
    console.log(`\n🚀 Post-publish workflow for: ${slug}\n`);
    
    // Get the article
    const article = await db.collection('newsletters').findOne({ slug });
    if (!article) {
      console.log('❌ Article not found');
      return;
    }
    
    let updates = [];
    
    // ======================
    // 1. AUTO-LINK TO TOOLS
    // ======================
    console.log('🔗 Step 1: Linking to mentioned tools...');
    
    const tools = await db.collection('tools').find({}).toArray();
    const content = article.content.toLowerCase();
    const title = article.title.toLowerCase();
    
    let toolsLinked = 0;
    
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
        const alreadyLinked = existingArticles.some(a => a.slug === slug);
        
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
          
          toolsLinked++;
          console.log(`   ✅ Linked to tool: ${toolName}`);
        }
      }
    }
    
    if (toolsLinked > 0) {
      updates.push(`Linked to ${toolsLinked} tool(s)`);
    } else {
      console.log('   ℹ️  No tools mentioned in this article');
    }
    
    // ======================
    // 2. FIND RELATED ARTICLES
    // ======================
    console.log('\n📚 Step 2: Finding related articles...');
    
    const relatedArticles = await db.collection('newsletters')
      .find({
        slug: { $ne: slug },
        tags: { $in: article.tags }
      })
      .limit(5)
      .toArray();
    
    if (relatedArticles.length > 0) {
      // Score by number of matching tags
      const scored = relatedArticles.map(a => ({
        ...a,
        matchCount: a.tags.filter(t => article.tags.includes(t)).length
      }));
      
      scored.sort((a, b) => b.matchCount - a.matchCount);
      
      const top3 = scored.slice(0, 3);
      
      console.log(`   Found ${relatedArticles.length} related articles (showing top 3):`);
      top3.forEach(a => {
        console.log(`   - ${a.title} (${a.matchCount} matching tags)`);
      });
      
      updates.push(`Found ${relatedArticles.length} related articles`);
    } else {
      console.log('   ℹ️  No related articles found');
    }
    
    // ======================
    // 3. CHECK FEATURED STATUS
    // ======================
    console.log('\n⭐ Step 3: Checking featured status...');
    
    const shouldBeFeatured = article.tags?.includes('Featured') || article.tags?.includes('Breaking');
    
    if (shouldBeFeatured) {
      console.log('   ✅ Article has Featured/Breaking tag - will appear prominently');
      updates.push('Marked as featured article');
    } else {
      // Check if it's the newest article
      const newestArticle = await db.collection('newsletters')
        .find({})
        .sort({ date: -1 })
        .limit(1)
        .toArray();
      
      if (newestArticle[0]?.slug === slug) {
        console.log('   ✅ This is the newest article - will show on homepage');
        updates.push('Latest article (auto-featured on homepage)');
      } else {
        console.log('   ℹ️  Not featured (not newest, no Featured tag)');
      }
    }
    
    // ======================
    // 4. INTERNAL LINK OPPORTUNITIES
    // ======================
    console.log('\n🔗 Step 4: Identifying internal link opportunities...');
    
    // Find articles with similar topics that could link to this one
    const linkCandidates = await db.collection('newsletters')
      .find({
        slug: { $ne: slug },
        tags: { $in: article.tags }
      })
      .limit(10)
      .toArray();
    
    if (linkCandidates.length > 0) {
      console.log(`   💡 ${linkCandidates.length} articles could link to this one:`);
      linkCandidates.slice(0, 5).forEach(a => {
        console.log(`      - ${a.title}`);
      });
      console.log(`   \n   📝 Consider adding internal links in future updates`);
      updates.push(`${linkCandidates.length} internal link opportunities identified`);
    }
    
    // ======================
    // 5. SEO CHECKLIST
    // ======================
    console.log('\n🔍 Step 5: SEO validation...');
    
    const seoChecks = [];
    
    if (article.image) {
      seoChecks.push('✅ Featured image present');
    } else {
      seoChecks.push('⚠️  No featured image');
    }
    
    if (article.tags && article.tags.length >= 3) {
      seoChecks.push(`✅ ${article.tags.length} tags`);
    } else {
      seoChecks.push(`⚠️  Only ${article.tags?.length || 0} tags (recommend 3+)`);
    }
    
    if (article.excerpt && article.excerpt.length >= 100) {
      seoChecks.push('✅ Excerpt (100+ chars)');
    } else {
      seoChecks.push('⚠️  Short excerpt');
    }
    
    const wordCount = article.content?.split(/\s+/).length || 0;
    if (wordCount >= 800) {
      seoChecks.push(`✅ ${wordCount} words`);
    } else {
      seoChecks.push(`⚠️  Only ${wordCount} words (recommend 800+)`);
    }
    
    seoChecks.forEach(check => console.log(`   ${check}`));
    
    // ======================
    // 6. SUMMARY
    // ======================
    console.log('\n' + '='.repeat(60));
    console.log('✅ POST-PUBLISH WORKFLOW COMPLETE');
    console.log('='.repeat(60));
    
    console.log('\n📊 Summary:');
    console.log(`   Article: ${article.title}`);
    console.log(`   URL: https://beri.net/article/${slug}`);
    console.log(`   Date: ${article.date}`);
    console.log(`   Tags: ${article.tags?.join(', ') || 'None'}`);
    
    if (updates.length > 0) {
      console.log('\n✨ Updates made:');
      updates.forEach(u => console.log(`   • ${u}`));
    }
    
    console.log('\n🔄 Next steps:');
    console.log('   1. Homepage will refresh within 1 hour (cache revalidation)');
    console.log('   2. Sitemap regenerates on next deploy');
    console.log('   3. Consider adding to newsletter digest');
    if (toolsLinked > 0) {
      console.log(`   4. Tool pages now link back to this article`);
    }
    
    console.log('\n💡 Article is LIVE: https://beri.net/article/' + slug);
    console.log('');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

// Parse command line
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Usage: node post-publish.js <article-slug>');
  console.log('');
  console.log('Example:');
  console.log('  node post-publish.js my-new-article');
  process.exit(1);
}

const slug = args[0];
postPublish(slug);
