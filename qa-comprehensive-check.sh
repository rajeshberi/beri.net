#!/bin/bash
# Comprehensive QA Check - Foolproof Validation
# Tests ACTUAL OUTCOMES, not just process completion

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

echo -e "${BLUE}🔍 COMPREHENSIVE QA CHECK${NC}"
echo "================================================================"
echo ""

# ============================================================================
# 1. DATABASE INTEGRITY
# ============================================================================
echo -e "${BLUE}1️⃣  DATABASE INTEGRITY CHECK${NC}"

cd beri.net

# Check tools count
TOOLS_COUNT=$(node -e "
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('beri-newsletter');
  const count = await db.collection('tools').countDocuments();
  console.log(count);
  await client.close();
})();
" 2>&1 | grep -v dotenv | tail -1)

if [ "$TOOLS_COUNT" -ge 37 ]; then
    echo -e "   ${GREEN}✅ Tools count: $TOOLS_COUNT (expected ≥37)${NC}"
else
    echo -e "   ${RED}❌ Tools count: $TOOLS_COUNT (expected ≥37)${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check articles count
ARTICLES_COUNT=$(node -e "
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('beri-newsletter');
  const count = await db.collection('newsletters').countDocuments({ published: true });
  console.log(count);
  await client.close();
})();
" 2>&1 | grep -v dotenv | tail -1)

if [ "$ARTICLES_COUNT" -ge 1 ]; then
    echo -e "   ${GREEN}✅ Published articles: $ARTICLES_COUNT${NC}"
else
    echo -e "   ${RED}❌ No published articles found${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Verify key tools exist with data
echo ""
echo "   Checking critical tools have complete data..."

CHATGPT_CHECK=$(node -e "
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('beri-newsletter');
  const tool = await db.collection('tools').findOne({ slug: 'chatgpt' });
  if (!tool) { console.log('MISSING'); process.exit(1); }
  const missing = [];
  if (!tool.website) missing.push('website');
  if (!tool.company) missing.push('company');
  if (!tool.tagline && !tool.short_description) missing.push('description');
  if (missing.length > 0) {
    console.log('INCOMPLETE:' + missing.join(','));
    process.exit(1);
  }
  console.log('OK');
  await client.close();
})();
" 2>&1 | grep -v dotenv | tail -1)

if [ "$CHATGPT_CHECK" = "OK" ]; then
    echo -e "   ${GREEN}✅ ChatGPT tool data complete${NC}"
else
    echo -e "   ${RED}❌ ChatGPT tool: $CHATGPT_CHECK${NC}"
    ERRORS=$((ERRORS + 1))
fi

cd ..

# ============================================================================
# 2. WEBSITE ACCESSIBILITY (LIVE TESTS)
# ============================================================================
echo ""
echo -e "${BLUE}2️⃣  LIVE WEBSITE ACCESSIBILITY${NC}"

# Test homepage
HOMEPAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://www.beri.net/" 2>&1)
if [ "$HOMEPAGE_STATUS" = "200" ]; then
    echo -e "   ${GREEN}✅ Homepage: HTTP $HOMEPAGE_STATUS${NC}"
else
    echo -e "   ${RED}❌ Homepage: HTTP $HOMEPAGE_STATUS (expected 200)${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Test tools page
TOOLS_PAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://www.beri.net/tools" 2>&1)
if [ "$TOOLS_PAGE_STATUS" = "200" ]; then
    echo -e "   ${GREEN}✅ Tools page: HTTP $TOOLS_PAGE_STATUS${NC}"
else
    echo -e "   ${RED}❌ Tools page: HTTP $TOOLS_PAGE_STATUS (expected 200)${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Test API endpoints
TOOLS_API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://www.beri.net/api/tools" 2>&1)
if [ "$TOOLS_API_STATUS" = "200" ]; then
    echo -e "   ${GREEN}✅ Tools API: HTTP $TOOLS_API_STATUS${NC}"
else
    echo -e "   ${RED}❌ Tools API: HTTP $TOOLS_API_STATUS (expected 200)${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Verify API returns data
TOOLS_API_COUNT=$(curl -s "https://www.beri.net/api/tools" 2>&1 | python3 -c "import sys, json; data=json.load(sys.stdin); print(len(data.get('tools', [])))" 2>/dev/null || echo "0")
if [ "$TOOLS_API_COUNT" -ge 37 ]; then
    echo -e "   ${GREEN}✅ Tools API returns: $TOOLS_API_COUNT tools${NC}"
else
    echo -e "   ${YELLOW}⚠️  Tools API returns: $TOOLS_API_COUNT tools (expected ≥37)${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# ============================================================================
# 3. CONTENT RENDERING (ACTUAL USER EXPERIENCE)
# ============================================================================
echo ""
echo -e "${BLUE}3️⃣  CONTENT RENDERING VALIDATION${NC}"

# Fetch tools page and check if it has actual content
TOOLS_PAGE_CONTENT=$(curl -s "https://www.beri.net/tools" 2>&1 | grep -o "ChatGPT\|Claude\|Cursor" | head -1)
if [ -n "$TOOLS_PAGE_CONTENT" ]; then
    echo -e "   ${GREEN}✅ Tools page renders tool names${NC}"
else
    echo -e "   ${YELLOW}⚠️  Tools page may not be rendering tools (cache?)${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# Check if individual tool page works
CHATGPT_PAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://www.beri.net/tools/chatgpt" 2>&1)
if [ "$CHATGPT_PAGE_STATUS" = "200" ]; then
    echo -e "   ${GREEN}✅ Individual tool page: HTTP $CHATGPT_PAGE_STATUS${NC}"
else
    echo -e "   ${RED}❌ Individual tool page: HTTP $CHATGPT_PAGE_STATUS${NC}"
    ERRORS=$((ERRORS + 1))
fi

# ============================================================================
# 4. IMAGE VALIDATION
# ============================================================================
echo ""
echo -e "${BLUE}4️⃣  IMAGE URL VALIDATION${NC}"

cd beri.net

# Get latest article image
LATEST_IMAGE=$(node -e "
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('beri-newsletter');
  const article = await db.collection('newsletters')
    .findOne({ published: true }, { sort: { published_date: -1 } });
  console.log(article?.image || '');
  await client.close();
})();
" 2>&1 | grep -v dotenv | tail -1)

if [ -n "$LATEST_IMAGE" ]; then
    IMAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$LATEST_IMAGE" 2>&1)
    if [ "$IMAGE_STATUS" = "200" ]; then
        echo -e "   ${GREEN}✅ Latest article image: HTTP $IMAGE_STATUS${NC}"
    else
        echo -e "   ${RED}❌ Latest article image: HTTP $IMAGE_STATUS (URL: $LATEST_IMAGE)${NC}"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "   ${YELLOW}⚠️  No article image found${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# Verify latest article has content
LATEST_CONTENT_LEN=$(node -e "
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('beri-newsletter');
  const article = await db.collection('newsletters')
    .findOne({ published: true }, { sort: { published_date: -1 } });
  console.log(article?.content?.length || 0);
  await client.close();
})();
" 2>&1 | grep -v dotenv | tail -1)

if [ "$LATEST_CONTENT_LEN" -ge 800 ]; then
    echo -e "   ${GREEN}✅ Latest article content: $LATEST_CONTENT_LEN chars${NC}"
else
    echo -e "   ${RED}❌ Latest article content: $LATEST_CONTENT_LEN chars (need 800+)${NC}"
    ERRORS=$((ERRORS + 1))
fi

cd ..

# ============================================================================
# 5. SEO & SLUGS VALIDATION
# ============================================================================
echo ""
echo -e "${BLUE}5️⃣  SEO & SLUG INTEGRITY${NC}"

cd beri.net

# Check for duplicate slugs
DUPLICATE_SLUGS=$(node -e "
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('beri-newsletter');
  const slugs = await db.collection('tools').aggregate([
    { \$group: { _id: '\$slug', count: { \$sum: 1 } } },
    { \$match: { count: { \$gt: 1 } } }
  ]).toArray();
  console.log(slugs.length);
  await client.close();
})();
" 2>&1 | grep -v dotenv | tail -1)

if [ "$DUPLICATE_SLUGS" = "0" ]; then
    echo -e "   ${GREEN}✅ No duplicate tool slugs${NC}"
else
    echo -e "   ${RED}❌ Found $DUPLICATE_SLUGS duplicate slugs${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Verify critical SEO slugs exist
CRITICAL_SLUGS=("chatgpt" "claude" "cursor" "github-copilot")
for slug in "${CRITICAL_SLUGS[@]}"; do
    EXISTS=$(node -e "
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('beri-newsletter');
  const tool = await db.collection('tools').findOne({ slug: '$slug' });
  console.log(tool ? 'YES' : 'NO');
  await client.close();
})();
" 2>&1 | grep -v dotenv | tail -1)
    
    if [ "$EXISTS" = "YES" ]; then
        echo -e "   ${GREEN}✅ Critical slug preserved: $slug${NC}"
    else
        echo -e "   ${RED}❌ Missing critical slug: $slug${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done

cd ..

# ============================================================================
# 6. BUILD & DEPLOYMENT STATUS
# ============================================================================
echo ""
echo -e "${BLUE}6️⃣  BUILD & DEPLOYMENT STATUS${NC}"

cd beri.net

# Check if there are uncommitted changes
if git diff --quiet && git diff --cached --quiet; then
    echo -e "   ${GREEN}✅ No uncommitted changes${NC}"
else
    echo -e "   ${YELLOW}⚠️  Uncommitted changes detected${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# Check latest commit
LATEST_COMMIT=$(git log -1 --oneline 2>/dev/null || echo "unknown")
echo -e "   ${BLUE}ℹ️  Latest commit: $LATEST_COMMIT${NC}"

cd ..

# ============================================================================
# SUMMARY
# ============================================================================
echo ""
echo "================================================================"
echo -e "${BLUE}📊 COMPREHENSIVE QA SUMMARY${NC}"
echo "================================================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ ALL CHECKS PASSED${NC}"
    echo ""
    echo "System Status:"
    echo "  • Database: $TOOLS_COUNT tools, $ARTICLES_COUNT articles"
    echo "  • Website: All pages accessible"
    echo "  • APIs: Returning data correctly"
    echo "  • Content: Rendering properly"
    echo "  • Images: Working"
    echo "  • SEO: Slugs preserved"
    echo ""
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  PASSED WITH WARNINGS${NC}"
    echo -e "   Warnings: $WARNINGS"
    echo ""
    echo "System is functional but has minor issues."
    echo "Review warnings above."
    echo ""
    exit 0
else
    echo -e "${RED}❌ QA FAILED${NC}"
    echo -e "   Errors: $ERRORS"
    echo -e "   Warnings: $WARNINGS"
    echo ""
    echo "CRITICAL ISSUES FOUND - DO NOT CLAIM SUCCESS"
    echo "Fix errors above before proceeding."
    echo ""
    exit 1
fi
