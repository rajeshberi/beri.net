require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function finalVerify() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('beri-newsletter');
  
  // Check article → tools
  const article = await db.collection('newsletters').findOne({ 
    slug: 'chatgpt-enterprise-vs-claude-enterprise-the-200k-decision' 
  });
  console.log('Article "ChatGPT Enterprise vs Claude Enterprise":');
  console.log('  Tools:', article?.tools?.join(', ') || 'none');
  
  // Check tool → articles  
  const chatgpt = await db.collection('tools').findOne({ slug: 'chatgpt' });
  console.log('\nChatGPT tool:');
  console.log('  Related articles:', chatgpt?.relatedArticles?.length || 0);
  if (chatgpt?.relatedArticles?.length > 0) {
    console.log('  Articles:', chatgpt.relatedArticles.map(a => a.title).slice(0, 3).join('\n           '));
  }
  
  await client.close();
}

finalVerify().catch(console.error);
