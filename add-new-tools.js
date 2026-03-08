// Add new AI tools discovered from research
// Run with: MONGODB_URI=... node add-new-tools.js

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const newTools = [
  {
    slug: 'cursor',
    productName: 'Cursor',
    vendorName: 'Cursor',
    description: 'Agent-powered AI code editor built on VS Code with advanced context understanding and multi-file editing',
    websiteUrl: 'https://cursor.com',
    category: 'Developer Tools',
    subcategory: 'Code Editor',
    pricingModel: 'Freemium',
    pricingDetails: 'Free tier available. Pro: $20/month. Business: Custom pricing',
    apiAvailable: false,
    targetAudience: ['Software Engineers', 'Product Teams', 'Startups'],
    useCases: ['AI-assisted coding', 'Codebase navigation', 'Multi-file refactoring', 'Code generation'],
    domains: ['engineering'],
    verified: true,
    added: new Date()
  },
  {
    slug: 'lovable',
    productName: 'Lovable',
    vendorName: 'Lovable',
    description: 'No-code AI app builder that lets users create full-stack applications using natural language prompts',
    websiteUrl: 'https://lovable.ai',
    category: 'Developer Tools',
    subcategory: 'No-Code Platform',
    pricingModel: 'Subscription',
    targetAudience: ['Non-technical Founders', 'Product Managers', 'Designers'],
    useCases: ['Rapid prototyping', 'MVP development', 'Internal tools', 'Landing pages'],
    domains: ['general', 'engineering'],
    verified: false,
    added: new Date()
  },
  {
    slug: 'replit',
    productName: 'Replit',
    vendorName: 'Replit',
    description: 'AI-powered cloud development platform with instant collaboration and deployment',
    websiteUrl: 'https://replit.com',
    category: 'Developer Tools',
    subcategory: 'Cloud IDE',
    pricingModel: 'Freemium',
    pricingDetails: 'Free tier available. Core: $25/month. Teams: Custom pricing',
    apiAvailable: true,
    targetAudience: ['Software Engineers', 'Students', 'Educators'],
    useCases: ['Learning to code', 'Rapid prototyping', 'Collaborative coding', 'Deployment'],
    domains: ['engineering', 'general'],
    verified: true,
    added: new Date()
  },
  {
    slug: 'openai-frontier',
    productName: 'OpenAI Frontier',
    vendorName: 'OpenAI',
    description: 'Enterprise AI agent platform for building and managing autonomous agents at scale',
    websiteUrl: 'https://openai.com/frontier',
    category: 'Enterprise AI',
    subcategory: 'Agent Platform',
    pricingModel: 'Enterprise',
    apiAvailable: true,
    targetAudience: ['Enterprise IT Teams', 'AI Engineers', 'CTOs'],
    useCases: ['Agent orchestration', 'Workflow automation', 'Enterprise AI deployment'],
    domains: ['general', 'it-security', 'operations'],
    founded: 2015,
    headquarters: 'San Francisco, CA',
    verified: true,
    added: new Date()
  },
  {
    slug: 'codex-openai',
    productName: 'Codex',
    vendorName: 'OpenAI',
    description: 'OpenAI\'s AI coding agent with advanced reasoning and multi-step problem solving for complex software tasks',
    websiteUrl: 'https://openai.com/codex',
    category: 'Developer Tools',
    subcategory: 'AI Coding Agent',
    pricingModel: 'Subscription',
    apiAvailable: true,
    targetAudience: ['Software Engineers', 'DevOps Teams'],
    useCases: ['Complex refactoring', 'Bug investigation', 'Code review', 'Architecture planning'],
    domains: ['engineering'],
    founded: 2015,
    headquarters: 'San Francisco, CA',
    verified: true,
    added: new Date()
  },
  {
    slug: 'gemini-cli',
    productName: 'Gemini CLI',
    vendorName: 'Google',
    description: 'Google\'s command-line AI agent for terminal-based development workflows',
    websiteUrl: 'https://github.com/google-gemini/gemini-cli',
    category: 'Developer Tools',
    subcategory: 'CLI Tool',
    pricingModel: 'Free',
    apiAvailable: true,
    targetAudience: ['Software Engineers', 'DevOps Engineers'],
    useCases: ['Terminal automation', 'Script generation', 'System administration', 'DevOps workflows'],
    domains: ['engineering', 'operations'],
    founded: 1998,
    headquarters: 'Mountain View, CA',
    verified: true,
    added: new Date()
  },
  {
    slug: 'opencode',
    productName: 'OpenCode',
    vendorName: 'OpenCode Community',
    description: 'Open-source AI coding agent with model swapping to avoid vendor lock-in',
    websiteUrl: 'https://opencode.ai',
    category: 'Developer Tools',
    subcategory: 'Open Source Agent',
    pricingModel: 'Open Source',
    apiAvailable: true,
    targetAudience: ['Software Engineers', 'Open Source Contributors'],
    useCases: ['Coding with any LLM', 'Self-hosted development', 'Custom model integration'],
    domains: ['engineering'],
    verified: true,
    added: new Date()
  },
  {
    slug: 'antigravity',
    productName: 'Antigravity',
    vendorName: 'Google',
    description: 'Google\'s agentic IDE built after acquiring the Windsurf team',
    websiteUrl: 'https://antigravity.google',
    category: 'Developer Tools',
    subcategory: 'Agentic IDE',
    pricingModel: 'Subscription',
    targetAudience: ['Software Engineers', 'Product Teams'],
    useCases: ['AI-assisted development', 'Code generation', 'Pair programming with AI'],
    domains: ['engineering'],
    founded: 1998,
    headquarters: 'Mountain View, CA',
    verified: true,
    added: new Date()
  },
  {
    slug: 'jetbrains-junie',
    productName: 'Junie',
    vendorName: 'JetBrains',
    description: 'JetBrains\' AI coding agent integrated into IntelliJ IDEA and other IDEs',
    websiteUrl: 'https://www.jetbrains.com/junie',
    category: 'Developer Tools',
    subcategory: 'AI Agent',
    pricingModel: 'Subscription',
    pricingDetails: 'Included with JetBrains IDE subscriptions',
    apiAvailable: false,
    targetAudience: ['Software Engineers', 'Enterprise Development Teams'],
    useCases: ['Code completion', 'Refactoring', 'Bug detection', 'Code generation'],
    domains: ['engineering'],
    founded: 2000,
    headquarters: 'Prague, Czech Republic',
    verified: true,
    added: new Date()
  },
  {
    slug: 'zed',
    productName: 'Zed',
    vendorName: 'Zed Industries',
    description: 'Blazing-fast collaborative code editor with built-in AI agentic workflows',
    websiteUrl: 'https://zed.dev',
    category: 'Developer Tools',
    subcategory: 'Code Editor',
    pricingModel: 'Freemium',
    apiAvailable: false,
    targetAudience: ['Software Engineers', 'Remote Teams'],
    useCases: ['Real-time collaboration', 'AI-assisted coding', 'Performance-critical development'],
    domains: ['engineering'],
    verified: true,
    added: new Date()
  },
  {
    slug: 'windsurf',
    productName: 'Windsurf',
    vendorName: 'Cognition',
    description: 'AI-powered IDE with agentic workflows, now owned by Cognition after Google acquihire',
    websiteUrl: 'https://windsurf.com',
    category: 'Developer Tools',
    subcategory: 'AI IDE',
    pricingModel: 'Subscription',
    targetAudience: ['Software Engineers'],
    useCases: ['AI pair programming', 'Code generation', 'Automated refactoring'],
    domains: ['engineering'],
    verified: false,
    added: new Date()
  },
  {
    slug: 'amp-code',
    productName: 'Amp',
    vendorName: 'Amp',
    description: 'Model-agnostic AI coding agent with free ad-supported tier',
    websiteUrl: 'https://ampcode.com',
    category: 'Developer Tools',
    subcategory: 'AI Agent',
    pricingModel: 'Freemium',
    pricingDetails: 'Free (ad-supported). Premium: Remove ads',
    apiAvailable: false,
    targetAudience: ['Software Engineers', 'Indie Developers'],
    useCases: ['Multi-model coding', 'Cost-effective development', 'Learning AI tools'],
    domains: ['engineering'],
    verified: false,
    added: new Date()
  },
  {
    slug: 'augment-code',
    productName: 'Augment Code',
    vendorName: 'Augment',
    description: 'Enterprise-focused AI coding agent with advanced security and compliance features',
    websiteUrl: 'https://www.augmentcode.com',
    category: 'Developer Tools',
    subcategory: 'Enterprise AI Agent',
    pricingModel: 'Enterprise',
    apiAvailable: true,
    targetAudience: ['Enterprise Development Teams', 'CTOs', 'Engineering Leaders'],
    useCases: ['Enterprise coding', 'Compliance-aware development', 'Secure AI assistance'],
    domains: ['engineering'],
    verified: false,
    added: new Date()
  },
  {
    slug: 'factory-ai',
    productName: 'Factory',
    vendorName: 'Factory',
    description: 'Agent-native software development platform with autonomous "droids" for coding tasks',
    websiteUrl: 'https://factory.ai',
    category: 'Developer Tools',
    subcategory: 'Agent Platform',
    pricingModel: 'Subscription',
    apiAvailable: true,
    targetAudience: ['Software Teams', 'Product Teams'],
    useCases: ['Autonomous coding', 'Multi-agent workflows', 'Complex refactoring'],
    domains: ['engineering'],
    verified: false,
    added: new Date()
  },
  {
    slug: 'warp-terminal',
    productName: 'Warp',
    vendorName: 'Warp',
    description: 'Modern terminal reimagined with AI agents and collaborative features',
    websiteUrl: 'https://www.warp.dev',
    category: 'Developer Tools',
    subcategory: 'Terminal',
    pricingModel: 'Freemium',
    apiAvailable: false,
    targetAudience: ['Software Engineers', 'DevOps Engineers', 'SREs'],
    useCases: ['AI command generation', 'Terminal collaboration', 'Workflow automation'],
    domains: ['engineering', 'operations'],
    verified: true,
    added: new Date()
  },
  {
    slug: 'cline',
    productName: 'Cline',
    vendorName: 'Cline Community',
    description: 'Open-source AI coding agent for autonomous software development',
    websiteUrl: 'https://cline.bot',
    category: 'Developer Tools',
    subcategory: 'Open Source Agent',
    pricingModel: 'Open Source',
    apiAvailable: true,
    targetAudience: ['Software Engineers', 'Open Source Contributors'],
    useCases: ['Self-hosted coding', 'Custom AI workflows', 'Community-driven development'],
    domains: ['engineering'],
    verified: false,
    added: new Date()
  },
  {
    slug: 'roocode',
    productName: 'RooCode',
    vendorName: 'RooCode',
    description: 'Open-source AI-powered coding assistant running in VS Code',
    websiteUrl: 'https://roocode.com',
    category: 'Developer Tools',
    subcategory: 'VS Code Extension',
    pricingModel: 'Open Source',
    apiAvailable: false,
    targetAudience: ['VS Code Users', 'Software Engineers'],
    useCases: ['In-editor AI assistance', 'Code completion', 'Refactoring'],
    domains: ['engineering'],
    verified: false,
    added: new Date()
  },
  {
    slug: 'continue-dev',
    productName: 'Continue.dev',
    vendorName: 'Continue',
    description: 'AI-powered code review platform that checks every pull request automatically',
    websiteUrl: 'https://www.continue.dev',
    category: 'Developer Tools',
    subcategory: 'Code Review',
    pricingModel: 'Freemium',
    apiAvailable: true,
    targetAudience: ['Engineering Teams', 'Tech Leads'],
    useCases: ['Automated code review', 'PR quality checks', 'Security scanning'],
    domains: ['engineering'],
    verified: false,
    added: new Date()
  },
  {
    slug: 'synthesia',
    productName: 'Synthesia',
    vendorName: 'Synthesia',
    description: 'AI video generation platform with translation, dubbing, and lip-sync capabilities',
    websiteUrl: 'https://www.synthesia.io',
    category: 'Generative AI',
    subcategory: 'Video Generation',
    pricingModel: 'Subscription',
    pricingDetails: 'Personal: $29/month. Enterprise: Custom pricing',
    apiAvailable: true,
    targetAudience: ['Marketing Teams', 'Content Creators', 'L&D Teams'],
    useCases: ['Video translation', 'Training videos', 'Marketing content', 'Product demos'],
    domains: ['marketing', 'hr', 'customer-success'],
    founded: 2017,
    headquarters: 'London, UK',
    verified: true,
    added: new Date()
  },
  {
    slug: 'new-relic-agentic',
    productName: 'New Relic Agentic Platform',
    vendorName: 'New Relic',
    description: 'No-code platform for building and deploying data observability AI agents to monitor systems',
    websiteUrl: 'https://newrelic.com',
    category: 'Enterprise AI',
    subcategory: 'Observability',
    pricingModel: 'Enterprise',
    apiAvailable: true,
    targetAudience: ['DevOps Teams', 'SREs', 'Platform Engineers'],
    useCases: ['System monitoring', 'Bug detection', 'Performance analysis', 'Incident response'],
    domains: ['it-security', 'operations'],
    founded: 2008,
    headquarters: 'San Francisco, CA',
    verified: true,
    added: new Date()
  }
];

async function addTools() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    const collection = db.collection('ai_tools');
    
    console.log(`Adding ${newTools.length} new tools...`);
    
    for (const tool of newTools) {
      const exists = await collection.findOne({ slug: tool.slug });
      if (exists) {
        console.log(`⏭️  Skipping ${tool.productName} (already exists)`);
        continue;
      }
      
      await collection.insertOne(tool);
      console.log(`✅ Added ${tool.productName}`);
    }
    
    console.log('\n✅ All tools added successfully!');
    
    const total = await collection.countDocuments();
    console.log(`📊 Total tools in directory: ${total}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

addTools();
