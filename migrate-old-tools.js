#!/usr/bin/env node
/**
 * Migrate tools from old ai_tools collection to new tools collection
 * Preserves original slugs for SEO
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function migrateTools() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    
    console.log('🔄 Migrating tools from ai_tools to tools collection\n');
    
    // Get all old tools
    const oldTools = await db.collection('ai_tools').find({}).toArray();
    console.log(`Found ${oldTools.length} tools in ai_tools collection\n`);
    
    let migrated = 0;
    let updated = 0;
    let errors = 0;
    
    for (const oldTool of oldTools) {
      try {
        // Convert old schema to new V2 schema
        const newTool = {
          // Core fields - preserve exact slugs for SEO!
          slug: oldTool.slug,
          name: oldTool.productName || oldTool.name,
          company: oldTool.vendorName || null,
          website: oldTool.url || oldTool.website || null,
          last_updated: new Date().toISOString().split('T')[0],
          
          // Description fields
          tagline: oldTool.tagline || oldTool.shortDescription || null,
          short_description: oldTool.description || oldTool.detailedDescription || null,
          
          // Classification
          primary_category: oldTool.category || 'Uncategorized',
          secondary_categories: oldTool.secondaryCategories || [],
          target_market: oldTool.targetAudience || [],
          deployment_model: oldTool.deploymentType ? [oldTool.deploymentType] : [],
          pricing_model: oldTool.pricingType ? [oldTool.pricingType] : [],
          
          // Use cases
          best_for: oldTool.useCases || [],
          use_cases: oldTool.useCases ? oldTool.useCases.map(uc => ({ title: uc })) : [],
          
          // Features
          key_features: oldTool.features ? oldTool.features.map(f => ({ name: f })) : [],
          
          // Capabilities - infer from old data
          capabilities: {
            text_generation: oldTool.category?.includes('Content') || oldTool.category?.includes('Writing'),
            code_generation: oldTool.category?.includes('Code') || oldTool.category?.includes('Developer'),
            workflow_automation: oldTool.category?.includes('Automation') || oldTool.category?.includes('Workflow'),
            api_access: oldTool.hasAPI || false,
          },
          
          // Integrations
          integrations: {
            sdk_available: oldTool.hasSDK || false,
            sdk_languages: oldTool.sdkLanguages || [],
          },
          
          // Pricing
          pricing: {
            free_trial: oldTool.freeTrial || false,
            plans: oldTool.pricingPlans || [],
          },
          
          // Metadata
          source: oldTool.source || 'Legacy migration',
          discovered: oldTool.dateAdded || new Date().toISOString().split('T')[0],
          synced_at: new Date(),
          
          // Preserve original data for reference
          _legacy_data: {
            original_id: oldTool._id,
            migrated_at: new Date()
          }
        };
        
        // Upsert (preserve existing if already migrated)
        const result = await db.collection('tools').updateOne(
          { slug: newTool.slug },
          { $set: newTool },
          { upsert: true }
        );
        
        if (result.upsertedCount > 0) {
          console.log(`  ✅ Migrated: ${newTool.name} (${newTool.slug})`);
          migrated++;
        } else {
          console.log(`  ♻️  Updated: ${newTool.name} (${newTool.slug})`);
          updated++;
        }
        
      } catch (err) {
        console.error(`  ❌ Error migrating ${oldTool.productName}: ${err.message}`);
        errors++;
      }
    }
    
    console.log(`\n📊 Migration Complete:`);
    console.log(`   ✅ Migrated: ${migrated} tools`);
    console.log(`   ♻️  Updated: ${updated} tools`);
    console.log(`   ❌ Errors: ${errors} tools`);
    
    // Show final count
    const finalCount = await db.collection('tools').countDocuments();
    console.log(`\n📦 Total tools in collection: ${finalCount}`);
    
    // List all slugs to verify
    console.log(`\n🔍 Verifying slugs preserved:`);
    const tools = await db.collection('tools')
      .find({})
      .project({ name: 1, slug: 1 })
      .sort({ name: 1 })
      .toArray();
    
    tools.forEach(t => {
      console.log(`   ${t.name} → ${t.slug}`);
    });
    
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrateTools();
