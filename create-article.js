#!/usr/bin/env node
/**
 * Create a new article in MongoDB
 * Usage: node create-article.js <slug> [options]
 */

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function createArticle(slug, data) {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    
    // Check if article already exists
    const existing = await db.collection('newsletters').findOne({ slug });
    if (existing) {
      console.log(`❌ Article already exists: ${slug}`);
      console.log('   Use update-article.js to modify it');
      return;
    }
    
    // Create new article document
    const now = new Date();
    const article = {
      slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      content: data.content || '',
      date: data.date || now.toISOString().split('T')[0],
      author: data.author || 'Rajesh Beri',
      tags: data.tags || [],
      image: data.image || null,
      imageCredit: data.imageCredit || 'Photo by Unsplash',
      type: data.type || 'curated',
      originalUrl: data.originalUrl || null,
      originalAuthor: data.originalAuthor || null,
      originalSource: data.originalSource || null,
      published: true,
      published_date: now,
      created_at: now,
      addedDate: now
    };
    
    await db.collection('newsletters').insertOne(article);
    
    console.log(`✅ Created article: ${slug}`);
    console.log(`   Title: "${article.title}"`);
    console.log(`   Tags: ${article.tags.join(', ')}`);
    console.log(`   URL: https://beri.net/article/${slug}`);
    console.log(`\n💡 Article is LIVE immediately (no rebuild needed)`);
    console.log(`\n🔄 Running post-publish workflow...\n`);
    
    await client.close();
    
    // Run post-publish workflow
    const { exec } = require('child_process');
    exec(`node ${__dirname}/post-publish.js ${slug}`, (error, stdout, stderr) => {
      if (error) {
        console.error('⚠️  Post-publish workflow failed:', error.message);
        return;
      }
      console.log(stdout);
      if (stderr) console.error(stderr);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    await client.close();
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Usage: node create-article.js <slug> [options]');
  console.log('');
  console.log('Options:');
  console.log('  --title="Article Title"');
  console.log('  --excerpt="Brief summary"');
  console.log('  --content="Full article content"');
  console.log('  --date="2026-03-08"');
  console.log('  --tag="Tag1" (can use multiple times)');
  console.log('  --image="https://images.unsplash.com/..."');
  console.log('  --type="curated|evergreen"');
  console.log('  --original-url="https://..."');
  console.log('  --original-author="Author Name"');
  console.log('  --original-source="Publication"');
  console.log('');
  console.log('Example:');
  console.log('  node create-article.js my-new-article \\');
  console.log('    --title="My Title" \\');
  console.log('    --excerpt="Summary" \\');
  console.log('    --content="Content here" \\');
  console.log('    --tag="AI" \\');
  console.log('    --tag="Enterprise"');
  process.exit(1);
}

const slug = args[0];
const data = { tags: [] };

args.slice(1).forEach(arg => {
  const match = arg.match(/^--([^=]+)="?([^"]+)"?$/);
  if (match) {
    const [, key, value] = match;
    const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    
    if (camelKey === 'tag') {
      data.tags.push(value);
    } else {
      data[camelKey] = value;
    }
  }
});

createArticle(slug, data);
