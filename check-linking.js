require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function checkLinking() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('beri-newsletter');
  
  // Check a tool that should have related articles
  const tool = await db.collection('tools').findOne({ slug: 'chatgpt' });
  console.log('ChatGPT mentioned_in_articles:', tool?.mentioned_in_articles?.length || 0);
  
  // Check an article that should have related tools
  const article = await db.collection('newsletters').findOne({ slug: 'claude-cowork-enterprise-review' });
  console.log('Claude Cowork article tools:', article?.tools?.length || 0);
  if (article?.tools) {
    console.log('  Tools:', article.tools.join(', '));
  }
  
  await client.close();
}

checkLinking().catch(console.error);
