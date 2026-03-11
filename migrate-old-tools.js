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
          founded: oldTool.founded ? oldTool.founded.toString() : null,
          headquarters: oldTool.headquarters || null,
          website: oldTool.websiteUrl || oldTool.url || oldTool.website || null,
          last_updated: new Date().toISOString().split('T')[0],
          
          // Description fields  
          tagline: oldTool.description || oldTool.tagline || oldTool.shortDescription || null,
          short_description: oldTool.detailedAnalysis || oldTool.description || null,
          
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
          
          // Capabilities - infer from category and data
          capabilities: {
            text_generation: oldTool.category?.includes('Generative') || oldTool.category?.includes('Text') || oldTool.subcategory?.includes('Text'),
            image_generation: oldTool.subcategory?.includes('Image'),
            video_generation: oldTool.subcategory?.includes('Video'),
            code_generation: oldTool.category?.includes('Code') || oldTool.category?.includes('Developer') || oldTool.useCases?.some(u => u.toLowerCase().includes('code')),
            workflow_automation: oldTool.category?.includes('Automation') || oldTool.category?.includes('Workflow'),
            api_access: oldTool.apiAvailable || false,
          },
          
          // Integrations
          integrations: {
            sdk_available: oldTool.hasSDK || oldTool.apiAvailable || false,
            sdk_languages: oldTool.sdkLanguages || [],
            other: oldTool.integrations || [],
          },
          
          // Pricing - preserve original details!
          pricing: {
            free_trial: oldTool.pricingModel === 'Freemium' || oldTool.freeTrial || false,
            plans: oldTool.pricingPlans || [],
          },
          pricing_notes: oldTool.pricingDetails || null,
          
          // Market data
          market: {
            estimated_customers: oldTool.metrics?.customers || null,
            funding: oldTool.metrics?.funding ? { total: oldTool.metrics.funding } : {},
          },
          
          // Feedback
          feedback: {
            g2_rating: oldTool.metrics?.rating || null,
          },
          
          // Additional metadata from old schema
          logo_url: oldTool.logoUrl || null,
          social_links: oldTool.socialLinks || {},
          team_size: oldTool.teamSize || null,
          verified: oldTool.verified || false,
          featured: oldTool.featured || false,
          related_articles: oldTool.relatedArticles || [],
          
          // Metadata
          source: oldTool.source || oldTool.addedBy || 'Legacy migration',
          discovered: oldTool.addedDate || oldTool.dateAdded || new Date().toISOString().split('T')[0],
          synced_at: new Date(),
          
          // Preserve original data for reference
          _legacy_data: {
            original_id: oldTool._id,
            migrated_at: new Date(),
            original_schema: {
              category: oldTool.category,
              subcategory: oldTool.subcategory,
              domains: oldTool.domains,
              tags: oldTool.tags
            }
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
