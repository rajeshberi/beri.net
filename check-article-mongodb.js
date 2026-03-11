#!/usr/bin/env node
/**
 * Check if article exists in MongoDB with required fields
 * Usage: node check-article-mongodb.js <slug>
 * Exit codes: 0 = OK, 1 = Missing/Error, 2 = Missing fields
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const slug = process.argv[2];

if (!slug) {
  console.error('Usage: node check-article-mongodb.js <slug>');
  process.exit(1);
}

async function check() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    const article = await db.collection('newsletters').findOne({ slug });
    
    if (!article) {
      console.log('NOT_FOUND');
      process.exit(1);
    }
    
    // Check required fields
    const missing = [];
    if (!article.published_date) missing.push('published_date');
    if (!article.created_at) missing.push('created_at');
    if (article.published !== true) missing.push('published=true');
    
    if (missing.length > 0) {
      console.log('MISSING_FIELDS:' + missing.join(','));
      process.exit(2);
    }
    
    console.log('OK');
    process.exit(0);
    
  } catch (error) {
    console.error('ERROR:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

check();
