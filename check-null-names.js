require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function checkNullNames() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('beri-newsletter');
  
  const tools = await db.collection('tools').find({}).toArray();
  console.log(`Total tools: ${tools.length}`);
  
  const noName = tools.filter(t => !t.name);
  console.log(`\nTools without name field: ${noName.length}`);
  noName.forEach(t => {
    console.log(`  - Slug: ${t.slug}, productName: ${t.productName}`);
  });
  
  const emptyName = tools.filter(t => t.name === '');
  console.log(`\nTools with empty name: ${emptyName.length}`);
  emptyName.forEach(t => {
    console.log(`  - Slug: ${t.slug}`);
  });
  
  await client.close();
}

checkNullNames().catch(console.error);
