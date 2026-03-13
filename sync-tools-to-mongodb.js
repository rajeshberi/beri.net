#!/usr/bin/env node
/**
 * Sync AI Tools from YAML files to MongoDB
 * Handles comprehensive V2 schema with 17 sections
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'beri-newsletter';
const COLLECTION = 'tools';

const TOOLS_DIR = path.join(__dirname, '..', 'tools-directory');

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function findYamlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip hidden directories and backups
      if (!file.startsWith('.') && !file.startsWith('_')) {
        findYamlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.yaml') && !file.endsWith('.bak')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function loadTool(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(content);
    
    // Generate slug from name
    const slug = generateSlug(data.name);
    
    // Add metadata
    data.slug = slug;
    data.file_path = path.relative(TOOLS_DIR, filePath);
    data.synced_at = new Date();
    
    // CRITICAL: Convert date strings to Date objects for MongoDB sorting
    if (data.discovered && typeof data.discovered === 'string') {
      data.discovered = new Date(data.discovered);
    }
    if (data.last_updated && typeof data.last_updated === 'string') {
      data.last_updated = new Date(data.last_updated);
    }
    if (data.addedDate && typeof data.addedDate === 'string') {
      data.addedDate = new Date(data.addedDate);
    }
    if (data.lastUpdated && typeof data.lastUpdated === 'string') {
      data.lastUpdated = new Date(data.lastUpdated);
    }
    
    // Ensure required fields
    if (!data.name) {
      throw new Error('Missing required field: name');
    }
    
    if (!data.website) {
      throw new Error('Missing required field: website');
    }
    
    return data;
  } catch (err) {
    console.error(`❌ Error loading ${filePath}:`, err.message);
    return null;
  }
}

async function syncTools() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected successfully\n');
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);
    
    // Find all YAML files
    const yamlFiles = findYamlFiles(TOOLS_DIR);
    console.log(`📄 Found ${yamlFiles.length} tool files\n`);
    
    let insertedCount = 0;
    let updatedCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (const filePath of yamlFiles) {
      const relativePath = path.relative(TOOLS_DIR, filePath);
      console.log(`📝 Processing: ${relativePath}`);
      
      const tool = loadTool(filePath);
      
      if (!tool) {
        errorCount++;
        errors.push({ file: relativePath, error: 'Failed to load' });
        continue;
      }
      
      try {
        // Upsert to MongoDB
        const result = await collection.updateOne(
          { slug: tool.slug },
          { $set: tool },
          { upsert: true }
        );
        
        if (result.upsertedCount > 0) {
          console.log(`  ✅ Inserted: ${tool.name} (slug: ${tool.slug})`);
          insertedCount++;
        } else if (result.modifiedCount > 0) {
          console.log(`  ♻️  Updated: ${tool.name} (slug: ${tool.slug})`);
          updatedCount++;
        } else {
          console.log(`  ⏭️  Unchanged: ${tool.name} (slug: ${tool.slug})`);
        }
      } catch (err) {
        console.log(`  ❌ Error: ${err.message}`);
        errorCount++;
        errors.push({ file: relativePath, error: err.message });
      }
    }
    
    console.log(`\n📊 Sync Complete:`);
    console.log(`   ✅ Inserted: ${insertedCount} tools`);
    console.log(`   ♻️  Updated: ${updatedCount} tools`);
    console.log(`   ❌ Errors: ${errorCount} tools`);
    
    if (errors.length > 0) {
      console.log(`\n⚠️  Errors:`);
      errors.forEach(e => {
        console.log(`   ${e.file}: ${e.error}`);
      });
    }
    
    // Show collection stats
    const totalTools = await collection.countDocuments();
    const categories = await collection.distinct('primary_category');
    
    console.log(`\n📦 Collection Stats:`);
    console.log(`   Total tools: ${totalTools}`);
    console.log(`   Categories: ${categories.length}`);
    if (categories.length > 0) {
      console.log(`   Categories: ${categories.join(', ')}`);
    }
    
    // Data quality checks
    console.log(`\n🔍 Data Quality Checks:`);
    
    const withoutPricing = await collection.countDocuments({
      $or: [
        { 'pricing.plans': { $exists: false } },
        { 'pricing.plans': { $size: 0 } }
      ]
    });
    console.log(`   Missing pricing: ${withoutPricing} tools`);
    
    const withoutUseCases = await collection.countDocuments({
      $or: [
        { use_cases: { $exists: false } },
        { use_cases: { $size: 0 } }
      ]
    });
    console.log(`   Missing use cases: ${withoutUseCases} tools`);
    
    const withoutStrengths = await collection.countDocuments({
      $or: [
        { strengths: { $exists: false } },
        { strengths: { $size: 0 } }
      ]
    });
    console.log(`   Missing strengths: ${withoutStrengths} tools`);
    
    const withSecurity = await collection.countDocuments({
      $or: [
        { 'security.soc2_type2': true },
        { 'security.iso27001': true },
        { 'security.gdpr_ccpa': true }
      ]
    });
    console.log(`   With security certs: ${withSecurity} tools`);
    
    const withAPI = await collection.countDocuments({
      'capabilities.api_access': true
    });
    console.log(`   With API access: ${withAPI} tools`);
    
    console.log(`\n💡 Tip: Run setup-tools-mongodb.js to create/update indexes`);
    console.log(`   Run query-tools-mongodb.js for advanced queries`);
    
  } catch (err) {
    console.error('❌ Sync failed:', err);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🔌 Connection closed');
  }
}

// Run sync
syncTools();
