// Add new AI tools discovered from research
// Weekly scouting: March 9, 2026
// Run with: MONGODB_URI=... node add-new-tools.js

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const newTools = [
  {
    slug: 'luma-agents',
    productName: 'Luma Agents',
    vendorName: 'Luma AI',
    description: 'Creative AI agents platform powered by Unified Intelligence models for end-to-end content creation across text, image, video, and audio',
    websiteUrl: 'https://lumalabs.ai',
    category: 'Generative AI',
    subcategory: 'Creative Agents',
    pricingModel: 'Enterprise',
    pricingDetails: 'Enterprise pricing, gradual rollout access',
    apiAvailable: true,
    targetAudience: ['Creative Agencies', 'Marketing Teams', 'Enterprise Brands'],
    useCases: ['Multi-format creative production', 'Campaign localization', 'Content coordination', 'Ad creative generation'],
    domains: ['marketing', 'general'],
    founded: 2021,
    headquarters: 'Palo Alto, CA',
    metrics: {
      funding: '$1.1B total raised',
      customers: 'Publicis Groupe, Serviceplan, Adidas, Mazda'
    },
    verified: true,
    added: new Date('2026-03-09')
  },
  {
    slug: 'collectiviq',
    productName: 'CollectivIQ',
    vendorName: 'CollectivIQ',
    description: 'Multi-AI platform that queries up to 10 different AI models simultaneously to reduce hallucinations and improve response accuracy',
    websiteUrl: 'https://collectiviq.ai',
    category: 'Enterprise AI',
    subcategory: 'AI Reliability',
    pricingModel: 'Subscription',
    pricingDetails: 'Contact for pricing',
    apiAvailable: false,
    targetAudience: ['Enterprise Teams', 'Business Decision Makers'],
    useCases: ['Cross-verification of AI responses', 'Critical business decisions', 'Reducing AI hallucinations'],
    domains: ['general', 'executive'],
    founded: 2026,
    headquarters: 'Boston, MA',
    verified: false,
    added: new Date('2026-03-09')
  }
];

async function addTools() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    const collection = db.collection('ai_tools');
    
    console.log(`\n📊 Weekly Tools Scouting - March 9, 2026\n`);
    console.log(`Attempting to add ${newTools.length} new tools...\n`);
    
    let addedCount = 0;
    let skippedCount = 0;
    const addedTools = [];
    
    for (const tool of newTools) {
      const exists = await collection.findOne({ slug: tool.slug });
      if (exists) {
        console.log(`⏭️  Skipping ${tool.productName} (already exists)`);
        skippedCount++;
        continue;
      }
      
      await collection.insertOne(tool);
      console.log(`✅ Added ${tool.productName}`);
      addedCount++;
      addedTools.push(tool);
    }
    
    const total = await collection.countDocuments();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 WEEKLY TOOLS SCOUTING SUMMARY');
    console.log('='.repeat(60));
    console.log(`\nEvaluated: ${newTools.length} tools`);
    console.log(`Added: ${addedCount} tools`);
    console.log(`Skipped: ${skippedCount} tools (already in database)`);
    console.log(`Total in directory: ${total}\n`);
    
    if (addedTools.length > 0) {
      console.log('New tools added:');
      addedTools.forEach((t, i) => {
        console.log(`${i + 1}. ${t.productName} - ${t.category} - ${t.description.substring(0, 80)}...`);
      });
    }
    
    console.log('\n' + '='.repeat(60));
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

addTools();
