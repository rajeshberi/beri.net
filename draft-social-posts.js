#!/usr/bin/env node
/**
 * Generate LinkedIn and Twitter/X posts for articles
 * Usage: node draft-social-posts.js <article-slug>
 */

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI || 'mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function draftPosts(slug) {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    
    const article = await db.collection('newsletters').findOne({ slug });
    if (!article) {
      console.log('❌ Article not found');
      return;
    }
    
    console.log(`\n📱 Social Media Drafts for: ${article.title}\n`);
    console.log('='.repeat(70));
    
    // LinkedIn Post (longer, professional)
    console.log('\n📘 LINKEDIN POST:\n');
    console.log('---');
    
    const linkedInHook = article.excerpt.split('.')[0] + '.';
    const linkedInBody = `
${linkedInHook}

Most teams I talk to are missing this.

Here's what I learned:

${article.tags.slice(0, 3).map((tag, i) => `${i + 1}. ${tag} matters more than you think`).join('\n')}

Full breakdown: https://beri.net/article/${slug}

${article.tags.map(t => '#' + t.replace(/\s+/g, '')).join(' ')} #AI #Enterprise
    `.trim();
    
    console.log(linkedInBody);
    console.log('\n---');
    
    // Twitter/X Thread (concise, multiple tweets)
    console.log('\n🐦 TWITTER/X THREAD:\n');
    console.log('---');
    
    const tweet1 = `${linkedInHook}\n\nA thread 🧵`;
    const tweet2 = `Most ${article.tags[0] || 'AI'} implementations miss this:\n\n${article.excerpt.split('.').slice(0, 2).join('.')}...`;
    const tweet3 = `Why this matters:\n\n• ${article.tags[0]}\n• ${article.tags[1] || 'Implementation'}\n• ${article.tags[2] || 'ROI'}`;
    const tweet4 = `Full breakdown (3 min read):\nhttps://beri.net/article/${slug}\n\n${article.tags.slice(0, 3).map(t => '#' + t.replace(/\s+/g, '')).join(' ')}`;
    
    console.log(`1/${tweet1.length <= 280 ? '✅' : '⚠️'} ${tweet1}\n`);
    console.log(`2/${tweet2.length <= 280 ? '✅' : '⚠️'} ${tweet2}\n`);
    console.log(`3/${tweet3.length <= 280 ? '✅' : '⚠️'} ${tweet3}\n`);
    console.log(`4/${tweet4.length <= 280 ? '✅' : '⚠️'} ${tweet4}\n`);
    console.log('---');
    
    // Facebook (similar to LinkedIn but slightly more casual)
    console.log('\n📕 FACEBOOK POST:\n');
    console.log('---');
    
    const facebookPost = `
${article.title}

${linkedInHook}

${article.excerpt}

Read more: https://beri.net/article/${slug}

${article.tags.map(t => '#' + t.replace(/\s+/g, '')).join(' ')}
    `.trim();
    
    console.log(facebookPost);
    console.log('\n---');
    
    console.log('\n💡 Copy the posts above and schedule them via:');
    console.log('   - LinkedIn: https://www.linkedin.com/in/rberi/');
    console.log('   - Twitter/X: https://x.com/rajeshberi');
    console.log('   - Facebook: https://www.facebook.com/rajeshberi');
    console.log('');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Usage: node draft-social-posts.js <article-slug>');
  console.log('');
  console.log('Example:');
  console.log('  node draft-social-posts.js rag-skills-executable-capabilities');
  process.exit(1);
}

const slug = args[0];
draftPosts(slug);
