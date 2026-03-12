require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function verifyLinks() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('beri-newsletter');
  
  // Check a few tools
  const chatgpt = await db.collection('tools').findOne({ slug: 'chatgpt' });
  console.log('ChatGPT relatedArticles:', chatgpt?.relatedArticles?.length || 0);
  if (chatgpt?.relatedArticles?.length > 0) {
    console.log('  First article:', chatgpt.relatedArticles[0].title);
  }
  
  const claude = await db.collection('tools').findOne({ slug: 'claude' });
  console.log('Claude relatedArticles:', claude?.relatedArticles?.length || 0);
  if (claude?.relatedArticles?.length > 0) {
    console.log('  First article:', claude.relatedArticles[0].title);
  }
  
  await client.close();
}

verifyLinks().catch(console.error);
