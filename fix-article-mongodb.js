#!/usr/bin/env node
/**
 * Fix article MongoDB fields (add published_date, created_at, published=true)
 * Usage: node fix-article-mongodb.js <slug>
 */

// Change to beri.net directory where node_modules is
process.chdir(__dirname + '/beri.net');

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const slug = process.argv[2];

if (!slug) {
  console.error('Usage: node fix-article-mongodb.js <slug>');
  process.exit(1);
}

async function fix() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    const now = new Date();
    
    const result = await db.collection('newsletters').updateOne(
      { slug },
      { $set: { published: true, published_date: now, created_at: now } }
    );
    
    if (result.matchedCount === 0) {
      console.error('❌ Article not found in MongoDB');
      process.exit(1);
    }
    
    console.log('✅ Fixed MongoDB fields');
    console.log('   published: true');
    console.log('   published_date:', now.toISOString());
    console.log('   created_at:', now.toISOString());
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

fix();
