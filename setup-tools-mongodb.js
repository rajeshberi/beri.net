#!/usr/bin/env node
/**
 * MongoDB Tools Collection Setup
 * Creates collection with schema validation, indexes, and aggregation helpers
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.mongodb' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'beri-newsletter';
const COLLECTION = 'tools';

// MongoDB JSON Schema Validation
const toolsSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'slug', 'website', 'primary_category', 'last_updated'],
      properties: {
        // Core required fields
        name: {
          bsonType: 'string',
          description: 'Tool name (required)'
        },
        slug: {
          bsonType: 'string',
          pattern: '^[a-z0-9-]+$',
          description: 'URL-safe slug (required, unique)'
        },
        website: {
          bsonType: 'string',
          pattern: '^https?://',
          description: 'Tool website URL (required)'
        },
        primary_category: {
          bsonType: 'string',
          description: 'Primary category (required)'
        },
        last_updated: {
          bsonType: 'string',
          pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
          description: 'Last update date YYYY-MM-DD (required)'
        },
        
        // Overview
        company: { bsonType: ['string', 'null'] },
        founded: { bsonType: ['string', 'null'] },
        headquarters: { bsonType: ['string', 'null'] },
        tagline: { bsonType: ['string', 'null'] },
        short_description: { bsonType: ['string', 'null'] },
        
        // Classification
        secondary_categories: {
          bsonType: ['array', 'null'],
          items: { bsonType: 'string' }
        },
        target_market: {
          bsonType: ['array', 'null'],
          items: { bsonType: 'string' }
        },
        deployment_model: {
          bsonType: ['array', 'null'],
          items: { bsonType: 'string' }
        },
        pricing_model: {
          bsonType: ['array', 'null'],
          items: { bsonType: 'string' }
        },
        
        // Arrays
        best_for: {
          bsonType: ['array', 'null'],
          items: { bsonType: 'string' }
        },
        not_ideal_for: {
          bsonType: ['array', 'null'],
          items: { bsonType: 'string' }
        },
        strengths: {
          bsonType: ['array', 'null'],
          items: { bsonType: 'string' }
        },
        considerations: {
          bsonType: ['array', 'null'],
          items: { bsonType: 'string' }
        },
        
        // Nested objects
        capabilities: { bsonType: ['object', 'null'] },
        integrations: { bsonType: ['object', 'null'] },
        security: { bsonType: ['object', 'null'] },
        deployment: { bsonType: ['object', 'null'] },
        pricing: { bsonType: ['object', 'null'] },
        market: { bsonType: ['object', 'null'] },
        competitive: { bsonType: ['object', 'null'] },
        performance: { bsonType: ['object', 'null'] },
        feedback: { bsonType: ['object', 'null'] },
        maturity: { bsonType: ['object', 'null'] },
        snapshot: { bsonType: ['object', 'null'] },
        
        // Arrays of objects
        key_features: {
          bsonType: ['array', 'null'],
          items: { bsonType: 'object' }
        },
        use_cases: {
          bsonType: ['array', 'null'],
          items: { bsonType: 'object' }
        },
        
        // Metadata
        source: { bsonType: ['string', 'null'] },
        discovered: { bsonType: ['string', 'null'] },
        tech_stack: {
          bsonType: ['array', 'null'],
          items: { bsonType: 'string' }
        },
        newsletter_angle: { bsonType: ['string', 'null'] },
        file_path: { bsonType: ['string', 'null'] },
        synced_at: { bsonType: 'date' }
      }
    }
  },
  validationLevel: 'moderate', // Allow existing docs, validate new ones
  validationAction: 'warn' // Log warnings instead of rejecting
};

async function setupToolsCollection() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected successfully\n');
    
    const db = client.db(DB_NAME);
    
    // Check if collection exists
    const collections = await db.listCollections({ name: COLLECTION }).toArray();
    
    if (collections.length === 0) {
      console.log(`📦 Creating collection: ${COLLECTION}`);
      await db.createCollection(COLLECTION, toolsSchema);
      console.log('✅ Collection created with schema validation\n');
    } else {
      console.log(`📦 Collection exists: ${COLLECTION}`);
      console.log('⚙️  Applying schema validation...');
      await db.command({
        collMod: COLLECTION,
        ...toolsSchema
      });
      console.log('✅ Schema validation applied\n');
    }
    
    const collection = db.collection(COLLECTION);
    
    // Drop existing indexes (except _id)
    console.log('🗑️  Dropping old indexes...');
    const existingIndexes = await collection.indexes();
    for (const index of existingIndexes) {
      if (index.name !== '_id_') {
        await collection.dropIndex(index.name);
        console.log(`   Dropped: ${index.name}`);
      }
    }
    
    // Create comprehensive indexes
    console.log('\n🔍 Creating indexes...\n');
    
    // 1. Unique slug (primary key)
    await collection.createIndex(
      { slug: 1 },
      { unique: true, name: 'slug_unique' }
    );
    console.log('✅ Created: slug_unique (unique)');
    
    // 2. Name (for sorting/filtering)
    await collection.createIndex(
      { name: 1 },
      { name: 'name_asc' }
    );
    console.log('✅ Created: name_asc');
    
    // 3. Primary category (for filtering)
    await collection.createIndex(
      { primary_category: 1 },
      { name: 'category_index' }
    );
    console.log('✅ Created: category_index');
    
    // 4. Compound: category + name (for sorted category pages)
    await collection.createIndex(
      { primary_category: 1, name: 1 },
      { name: 'category_name_sorted' }
    );
    console.log('✅ Created: category_name_sorted');
    
    // 5. Website (for deduplication checks)
    await collection.createIndex(
      { website: 1 },
      { name: 'website_index' }
    );
    console.log('✅ Created: website_index');
    
    // 6. Capabilities (for capability-based filtering)
    await collection.createIndex(
      { 'capabilities.text_generation': 1 },
      { sparse: true, name: 'cap_text_gen' }
    );
    await collection.createIndex(
      { 'capabilities.image_generation': 1 },
      { sparse: true, name: 'cap_image_gen' }
    );
    await collection.createIndex(
      { 'capabilities.code_generation': 1 },
      { sparse: true, name: 'cap_code_gen' }
    );
    await collection.createIndex(
      { 'capabilities.agent_orchestration': 1 },
      { sparse: true, name: 'cap_agents' }
    );
    await collection.createIndex(
      { 'capabilities.workflow_automation': 1 },
      { sparse: true, name: 'cap_workflow' }
    );
    console.log('✅ Created: 5 capability indexes (sparse)');
    
    // 7. Target market (for filtering)
    await collection.createIndex(
      { target_market: 1 },
      { name: 'target_market_index' }
    );
    console.log('✅ Created: target_market_index');
    
    // 8. Pricing model (for filtering)
    await collection.createIndex(
      { pricing_model: 1 },
      { name: 'pricing_model_index' }
    );
    console.log('✅ Created: pricing_model_index');
    
    // 9. Deployment model (for filtering)
    await collection.createIndex(
      { deployment_model: 1 },
      { name: 'deployment_model_index' }
    );
    console.log('✅ Created: deployment_model_index');
    
    // 10. Security compliance (for enterprise filtering)
    await collection.createIndex(
      { 'security.soc2_type2': 1 },
      { sparse: true, name: 'sec_soc2' }
    );
    await collection.createIndex(
      { 'security.gdpr_ccpa': 1 },
      { sparse: true, name: 'sec_gdpr' }
    );
    console.log('✅ Created: 2 security compliance indexes');
    
    // 11. Enterprise ready (snapshot)
    await collection.createIndex(
      { 'snapshot.enterprise_ready': 1 },
      { sparse: true, name: 'enterprise_ready' }
    );
    console.log('✅ Created: enterprise_ready');
    
    // 12. Pricing level (snapshot)
    await collection.createIndex(
      { 'snapshot.pricing_level': 1 },
      { sparse: true, name: 'pricing_level' }
    );
    console.log('✅ Created: pricing_level');
    
    // 13. Free trial availability
    await collection.createIndex(
      { 'pricing.free_trial': 1 },
      { sparse: true, name: 'free_trial' }
    );
    console.log('✅ Created: free_trial');
    
    // 14. API availability
    await collection.createIndex(
      { 'capabilities.api_access': 1 },
      { sparse: true, name: 'api_access' }
    );
    console.log('✅ Created: api_access');
    
    // 15. Last updated (for freshness sorting)
    await collection.createIndex(
      { last_updated: -1 },
      { name: 'last_updated_desc' }
    );
    console.log('✅ Created: last_updated_desc');
    
    // 16. Discovered date (for new tools)
    await collection.createIndex(
      { discovered: -1 },
      { sparse: true, name: 'discovered_desc' }
    );
    console.log('✅ Created: discovered_desc');
    
    // 17. Full-text search (name + tagline + description)
    await collection.createIndex(
      {
        name: 'text',
        tagline: 'text',
        short_description: 'text',
        'key_features.name': 'text',
        'use_cases.title': 'text'
      },
      {
        name: 'tool_search',
        weights: {
          name: 10,
          tagline: 5,
          short_description: 3,
          'key_features.name': 2,
          'use_cases.title': 1
        }
      }
    );
    console.log('✅ Created: tool_search (full-text, weighted)');
    
    // 18. Compound: enterprise filters
    await collection.createIndex(
      {
        'snapshot.enterprise_ready': 1,
        'security.soc2_type2': 1,
        'capabilities.api_access': 1
      },
      { sparse: true, name: 'enterprise_filters' }
    );
    console.log('✅ Created: enterprise_filters (compound)');
    
    // Show final index list
    console.log('\n📊 Final Index List:');
    const finalIndexes = await collection.indexes();
    finalIndexes.forEach(idx => {
      console.log(`   ${idx.name}`);
    });
    
    // Collection stats
    const stats = await db.command({ collStats: COLLECTION });
    console.log(`\n📦 Collection Stats:`);
    console.log(`   Documents: ${stats.count}`);
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`   Indexes: ${stats.nindexes}`);
    console.log(`   Index size: ${(stats.totalIndexSize / 1024).toFixed(2)} KB`);
    
    console.log('\n✅ Tools collection setup complete!');
    
  } catch (err) {
    console.error('❌ Setup failed:', err);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 Connection closed\n');
  }
}

// Run setup
setupToolsCollection();
