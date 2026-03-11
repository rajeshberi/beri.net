#!/usr/bin/env node
/**
 * MongoDB Tools Query Helper
 * Common queries and aggregations for the tools collection
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'beri-newsletter';
const COLLECTION = 'tools';

class ToolsQuery {
  constructor(collection) {
    this.collection = collection;
  }
  
  // BASIC QUERIES
  
  async getAllTools(projection = {}) {
    return this.collection
      .find({}, { projection: { _id: 0, ...projection } })
      .sort({ name: 1 })
      .toArray();
  }
  
  async getToolBySlug(slug) {
    return this.collection.findOne(
      { slug },
      { projection: { _id: 0 } }
    );
  }
  
  async searchTools(query) {
    return this.collection
      .find(
        { $text: { $search: query } },
        { 
          projection: { _id: 0, score: { $meta: 'textScore' } }
        }
      )
      .sort({ score: { $meta: 'textScore' } })
      .toArray();
  }
  
  // CATEGORY QUERIES
  
  async getByCategory(category) {
    return this.collection
      .find(
        { primary_category: category },
        { projection: { _id: 0 } }
      )
      .sort({ name: 1 })
      .toArray();
  }
  
  async getAllCategories() {
    const categories = await this.collection.distinct('primary_category');
    
    // Get count per category
    const counts = await this.collection.aggregate([
      { $group: { _id: '$primary_category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();
    
    return counts.map(c => ({
      category: c._id,
      count: c.count
    }));
  }
  
  // CAPABILITY QUERIES
  
  async getByCapability(capability, value = true) {
    const query = {};
    query[`capabilities.${capability}`] = value;
    
    return this.collection
      .find(query, { projection: { _id: 0 } })
      .sort({ name: 1 })
      .toArray();
  }
  
  async getWithMultipleCapabilities(capabilities) {
    const query = {};
    capabilities.forEach(cap => {
      query[`capabilities.${cap}`] = true;
    });
    
    return this.collection
      .find(query, { projection: { _id: 0 } })
      .sort({ name: 1 })
      .toArray();
  }
  
  // FILTER QUERIES
  
  async filterTools(filters) {
    const query = {};
    
    if (filters.category) {
      query.primary_category = filters.category;
    }
    
    if (filters.target_market) {
      query.target_market = filters.target_market;
    }
    
    if (filters.pricing_model) {
      query.pricing_model = filters.pricing_model;
    }
    
    if (filters.deployment_model) {
      query.deployment_model = filters.deployment_model;
    }
    
    if (filters.free_trial !== undefined) {
      query['pricing.free_trial'] = filters.free_trial;
    }
    
    if (filters.enterprise_ready) {
      query['snapshot.enterprise_ready'] = filters.enterprise_ready;
    }
    
    if (filters.api_access !== undefined) {
      query['capabilities.api_access'] = filters.api_access;
    }
    
    if (filters.soc2 !== undefined) {
      query['security.soc2_type2'] = filters.soc2;
    }
    
    return this.collection
      .find(query, { projection: { _id: 0 } })
      .sort({ name: 1 })
      .toArray();
  }
  
  // AGGREGATION QUERIES
  
  async getToolsGroupedByCategory() {
    return this.collection.aggregate([
      {
        $group: {
          _id: '$primary_category',
          tools: {
            $push: {
              slug: '$slug',
              name: '$name',
              tagline: '$tagline',
              website: '$website'
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]).toArray();
  }
  
  async getEnterpriseReadyTools() {
    return this.collection.aggregate([
      {
        $match: {
          $or: [
            { 'snapshot.enterprise_ready': 'Yes' },
            { 'security.soc2_type2': true },
            { 'security.iso27001': true }
          ]
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1,
          tagline: 1,
          enterprise_ready: '$snapshot.enterprise_ready',
          soc2: '$security.soc2_type2',
          iso27001: '$security.iso27001',
          gdpr: '$security.gdpr_ccpa'
        }
      },
      { $sort: { name: 1 } }
    ]).toArray();
  }
  
  async getToolsByPricingLevel() {
    return this.collection.aggregate([
      {
        $match: { 'snapshot.pricing_level': { $exists: true } }
      },
      {
        $group: {
          _id: '$snapshot.pricing_level',
          tools: {
            $push: {
              slug: '$slug',
              name: '$name',
              tagline: '$tagline'
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          _id: 1 // Low → Medium → High
        }
      }
    ]).toArray();
  }
  
  async getRecentlyDiscovered(limit = 10) {
    return this.collection
      .find(
        { discovered: { $exists: true } },
        { projection: { _id: 0 } }
      )
      .sort({ discovered: -1 })
      .limit(limit)
      .toArray();
  }
  
  async getRecentlyUpdated(limit = 10) {
    return this.collection
      .find(
        {},
        { projection: { _id: 0 } }
      )
      .sort({ last_updated: -1 })
      .limit(limit)
      .toArray();
  }
  
  async getTopIntegrations() {
    return this.collection.aggregate([
      {
        $project: {
          allIntegrations: {
            $concatArrays: [
              { $ifNull: ['$integrations.creative_design', []] },
              { $ifNull: ['$integrations.marketing_crm', []] },
              { $ifNull: ['$integrations.data_infrastructure', []] },
              { $ifNull: ['$integrations.other', []] }
            ]
          }
        }
      },
      { $unwind: '$allIntegrations' },
      {
        $group: {
          _id: '$allIntegrations',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]).toArray();
  }
  
  async getCapabilityStats() {
    return this.collection.aggregate([
      {
        $project: {
          capabilities: { $objectToArray: '$capabilities' }
        }
      },
      { $unwind: '$capabilities' },
      {
        $match: { 'capabilities.v': true }
      },
      {
        $group: {
          _id: '$capabilities.k',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]).toArray();
  }
  
  async getToolsWithoutPricing() {
    return this.collection
      .find(
        {
          $or: [
            { 'pricing.plans': { $exists: false } },
            { 'pricing.plans': { $size: 0 } }
          ]
        },
        { projection: { _id: 0, slug: 1, name: 1 } }
      )
      .toArray();
  }
  
  async getToolsNeedingEnrichment() {
    return this.collection.aggregate([
      {
        $project: {
          slug: 1,
          name: 1,
          missing: {
            pricing: {
              $cond: [
                { $or: [
                  { $not: ['$pricing.plans'] },
                  { $eq: [{ $size: { $ifNull: ['$pricing.plans', []] } }, 0] }
                ]},
                true,
                false
              ]
            },
            use_cases: {
              $cond: [
                { $or: [
                  { $not: ['$use_cases'] },
                  { $eq: [{ $size: { $ifNull: ['$use_cases', []] } }, 0] }
                ]},
                true,
                false
              ]
            },
            strengths: {
              $cond: [
                { $or: [
                  { $not: ['$strengths'] },
                  { $eq: [{ $size: { $ifNull: ['$strengths', []] } }, 0] }
                ]},
                true,
                false
              ]
            },
            security: {
              $cond: [
                { $not: ['$security'] },
                true,
                false
              ]
            }
          }
        }
      },
      {
        $match: {
          $or: [
            { 'missing.pricing': true },
            { 'missing.use_cases': true },
            { 'missing.strengths': true },
            { 'missing.security': true }
          ]
        }
      },
      { $project: { _id: 0 } }
    ]).toArray();
  }
}

// CLI Interface
async function main() {
  const command = process.argv[2];
  
  if (!command) {
    console.log(`
MongoDB Tools Query Helper

Usage:
  node query-tools-mongodb.js <command> [args]

Commands:
  list                  - List all tools
  categories           - Show categories with counts
  search <query>       - Full-text search
  category <name>      - Get tools by category
  capability <name>    - Get tools by capability
  enterprise           - Get enterprise-ready tools
  recent               - Recently discovered tools
  pricing              - Group by pricing level
  integrations         - Top integrations
  capability-stats     - Capability statistics
  needs-enrichment     - Tools missing data
  
Examples:
  node query-tools-mongodb.js list
  node query-tools-mongodb.js search "agents"
  node query-tools-mongodb.js category "AI Agents & Orchestration"
  node query-tools-mongodb.js capability agent_orchestration
    `);
    process.exit(0);
  }
  
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);
    const query = new ToolsQuery(collection);
    
    let result;
    
    switch (command) {
      case 'list':
        result = await query.getAllTools({ name: 1, slug: 1, primary_category: 1 });
        console.log(`\n📋 All Tools (${result.length}):\n`);
        result.forEach(t => {
          console.log(`  • ${t.name} (${t.primary_category})`);
          console.log(`    ${t.slug}`);
        });
        break;
        
      case 'categories':
        result = await query.getAllCategories();
        console.log('\n📊 Categories:\n');
        result.forEach(c => {
          console.log(`  • ${c.category}: ${c.count} tools`);
        });
        break;
        
      case 'search':
        const searchQuery = process.argv[3];
        if (!searchQuery) {
          console.error('❌ Please provide search query');
          process.exit(1);
        }
        result = await query.searchTools(searchQuery);
        console.log(`\n🔍 Search results for "${searchQuery}" (${result.length}):\n`);
        result.forEach(t => {
          console.log(`  • ${t.name} - ${t.tagline}`);
          console.log(`    Score: ${t.score.toFixed(2)}`);
        });
        break;
        
      case 'category':
        const category = process.argv[3];
        if (!category) {
          console.error('❌ Please provide category name');
          process.exit(1);
        }
        result = await query.getByCategory(category);
        console.log(`\n📁 Tools in "${category}" (${result.length}):\n`);
        result.forEach(t => {
          console.log(`  • ${t.name}`);
        });
        break;
        
      case 'capability':
        const cap = process.argv[3];
        if (!cap) {
          console.error('❌ Please provide capability name');
          process.exit(1);
        }
        result = await query.getByCapability(cap);
        console.log(`\n⚡ Tools with ${cap} (${result.length}):\n`);
        result.forEach(t => {
          console.log(`  • ${t.name}`);
        });
        break;
        
      case 'enterprise':
        result = await query.getEnterpriseReadyTools();
        console.log(`\n🏢 Enterprise-Ready Tools (${result.length}):\n`);
        result.forEach(t => {
          console.log(`  • ${t.name}`);
          console.log(`    Enterprise Ready: ${t.enterprise_ready || 'N/A'}`);
          console.log(`    SOC 2: ${t.soc2 ? '✅' : '—'} | ISO 27001: ${t.iso27001 ? '✅' : '—'} | GDPR: ${t.gdpr ? '✅' : '—'}`);
        });
        break;
        
      case 'recent':
        result = await query.getRecentlyDiscovered(10);
        console.log(`\n🆕 Recently Discovered Tools:\n`);
        result.forEach(t => {
          console.log(`  • ${t.name} - ${t.discovered}`);
        });
        break;
        
      case 'pricing':
        result = await query.getToolsByPricingLevel();
        console.log('\n💰 Tools by Pricing Level:\n');
        result.forEach(level => {
          console.log(`  ${level._id || 'Unknown'} (${level.count} tools)`);
        });
        break;
        
      case 'integrations':
        result = await query.getTopIntegrations();
        console.log('\n🔌 Top Integrations:\n');
        result.forEach(int => {
          console.log(`  • ${int._id}: ${int.count} tools`);
        });
        break;
        
      case 'capability-stats':
        result = await query.getCapabilityStats();
        console.log('\n📈 Capability Statistics:\n');
        result.forEach(stat => {
          console.log(`  • ${stat._id}: ${stat.count} tools`);
        });
        break;
        
      case 'needs-enrichment':
        result = await query.getToolsNeedingEnrichment();
        console.log(`\n📝 Tools Needing Enrichment (${result.length}):\n`);
        result.forEach(t => {
          const missing = [];
          if (t.missing.pricing) missing.push('pricing');
          if (t.missing.use_cases) missing.push('use cases');
          if (t.missing.strengths) missing.push('strengths');
          if (t.missing.security) missing.push('security');
          console.log(`  • ${t.name}`);
          console.log(`    Missing: ${missing.join(', ')}`);
        });
        break;
        
      default:
        console.error(`❌ Unknown command: ${command}`);
        process.exit(1);
    }
    
  } catch (err) {
    console.error('❌ Query failed:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run CLI if called directly
if (require.main === module) {
  main();
}

// Export for programmatic use
module.exports = ToolsQuery;
