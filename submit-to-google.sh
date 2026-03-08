#!/bin/bash
# Submit sitemap and new URLs to Google Search Console
# Requires: Google Search Console API credentials

SITE_URL="https://beri.net"
SITEMAP_URL="https://beri.net/sitemap.xml"

echo "🔍 Google Search Console Submission"
echo ""

# Check if sitemap exists
if curl -s -o /dev/null -w "%{http_code}" "$SITEMAP_URL" | grep -q "200"; then
    echo "✅ Sitemap accessible: $SITEMAP_URL"
else
    echo "❌ Sitemap not accessible"
    exit 1
fi

# TODO: Add Google Search Console API integration
# For now, manual instructions:

echo ""
echo "📝 Manual Steps (until API setup):"
echo ""
echo "1. Visit: https://search.google.com/search-console"
echo "2. Select property: $SITE_URL"
echo "3. Go to Sitemaps (left sidebar)"
echo "4. Submit: $SITEMAP_URL"
echo ""
echo "5. For individual URLs:"
echo "   - Go to URL Inspection"
echo "   - Paste article URL"
echo "   - Click 'Request Indexing'"
echo ""
echo "🎯 Priority URLs to submit manually:"

# Get latest 5 articles
cd $(dirname $0)
node << 'NODEJS'
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function getLatest() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    const articles = await db.collection('newsletters')
      .find({})
      .sort({ addedDate: -1 })
      .limit(5)
      .toArray();
    
    articles.forEach((a, i) => {
      console.log(`   ${i + 1}. https://beri.net/article/${a.slug}`);
    });
  } finally {
    await client.close();
  }
}
getLatest();
NODEJS

echo ""
echo "💡 Set up Google Search Console API for automation:"
echo "   https://developers.google.com/webmaster-tools/search-console-api-original/v3/quickstart"
