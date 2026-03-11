#!/bin/bash
# Article Publishing Checklist - Automated Verification
# Run this after creating any article (manual or automated)

set -e  # Exit on any error

SLUG="$1"

if [ -z "$SLUG" ]; then
    echo "❌ Usage: ./run-article-checklist.sh <article-slug>"
    exit 1
fi

echo "📋 Running Article Publishing Checklist for: $SLUG"
echo "================================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# ============================================================================
# STEP 1: Verify Article File Exists
# ============================================================================
echo "1️⃣  Checking article file..."

ARTICLE_FILE="beri.net/content/newsletters/${SLUG}.md"

if [ -f "$ARTICLE_FILE" ]; then
    echo -e "   ${GREEN}✅ Article file exists${NC}"
else
    echo -e "   ${RED}❌ Article file NOT found: $ARTICLE_FILE${NC}"
    ERRORS=$((ERRORS + 1))
fi

# ============================================================================
# STEP 2: Validate Frontmatter
# ============================================================================
echo ""
echo "2️⃣  Validating frontmatter..."

if [ -f "$ARTICLE_FILE" ]; then
    # Check for required fields
    if grep -q "^title:" "$ARTICLE_FILE"; then
        echo -e "   ${GREEN}✅ Title present${NC}"
    else
        echo -e "   ${RED}❌ Missing title${NC}"
        ERRORS=$((ERRORS + 1))
    fi
    
    if grep -q "^slug:" "$ARTICLE_FILE"; then
        echo -e "   ${GREEN}✅ Slug present${NC}"
    else
        echo -e "   ${YELLOW}⚠️  Missing slug (will use filename)${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
    
    if grep -q "^date:" "$ARTICLE_FILE"; then
        echo -e "   ${GREEN}✅ Date present${NC}"
    else
        echo -e "   ${RED}❌ Missing date${NC}"
        ERRORS=$((ERRORS + 1))
    fi
    
    if grep -q "^image:" "$ARTICLE_FILE"; then
        echo -e "   ${GREEN}✅ Featured image present${NC}"
    else
        echo -e "   ${RED}❌ Missing featured image${NC}"
        ERRORS=$((ERRORS + 1))
    fi
    
    if grep -q "^tags:" "$ARTICLE_FILE"; then
        TAG_COUNT=$(grep "^tags:" "$ARTICLE_FILE" | grep -o "\"" | wc -l)
        TAG_COUNT=$((TAG_COUNT / 2))
        if [ "$TAG_COUNT" -ge 3 ]; then
            echo -e "   ${GREEN}✅ Tags: $TAG_COUNT tags${NC}"
        else
            echo -e "   ${YELLOW}⚠️  Only $TAG_COUNT tags (recommend 5-7)${NC}"
            WARNINGS=$((WARNINGS + 1))
        fi
    else
        echo -e "   ${RED}❌ Missing tags${NC}"
        ERRORS=$((ERRORS + 1))
    fi
fi

# ============================================================================
# STEP 3: Check MongoDB Sync
# ============================================================================
echo ""
echo "3️⃣  Checking MongoDB sync..."

cd beri.net
MONGO_CHECK=$(node check-article-mongodb.js "$SLUG" 2>&1 | grep -v "dotenv" | tail -1)
MONGO_EXIT=$?

# Also check content length
CONTENT_LEN=$(node -e "
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('beri-newsletter');
  const article = await db.collection('newsletters').findOne({ slug: '$SLUG' });
  console.log(article?.content?.length || 0);
  await client.close();
})();
" 2>&1 | grep -v dotenv | tail -1)

cd ..

if [ $MONGO_EXIT -eq 0 ] && [ "$MONGO_CHECK" = "OK" ]; then
    echo -e "   ${GREEN}✅ Article in MongoDB with all required fields${NC}"
    
    # Verify content length
    if [ "$CONTENT_LEN" -lt 800 ]; then
        echo -e "   ${RED}❌ Content too short: $CONTENT_LEN chars (need 800+)${NC}"
        ERRORS=$((ERRORS + 1))
    else
        echo -e "   ${GREEN}✅ Content length: $CONTENT_LEN chars${NC}"
    fi
elif [ $MONGO_EXIT -eq 2 ]; then
    MISSING="${MONGO_CHECK#MISSING_FIELDS:}"
    echo -e "   ${YELLOW}⚠️  Article in MongoDB but missing: $MISSING${NC}"
    echo -e "   ${YELLOW}   Running fix...${NC}"
    
    cd beri.net
    node fix-article-mongodb.js "$SLUG" 2>&1 | grep -E "✅|❌" || true
    cd ..
    
elif [ "$MONGO_CHECK" = "NOT_FOUND" ]; then
    echo -e "   ${RED}❌ Article NOT in MongoDB${NC}"
    echo -e "   ${YELLOW}   Running import...${NC}"
    
    cd beri.net
    node import-markdown-article.js "../$ARTICLE_FILE" 2>&1 | grep -E "✅|❌|⚠️" || true
    cd ..
    ERRORS=$((ERRORS + 1))
else
    echo -e "   ${RED}❌ MongoDB check failed: $MONGO_CHECK${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Verify image URL works (HTTP 200)
echo ""
echo "   Validating featured image URL..."

IMAGE_URL=$(grep "^image:" "$ARTICLE_FILE" | sed 's/image: *"\(.*\)"/\1/' | tr -d '"')

if [ -n "$IMAGE_URL" ]; then
    IMAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$IMAGE_URL" 2>&1 || echo "000")
    
    if [ "$IMAGE_STATUS" = "200" ]; then
        echo -e "   ${GREEN}✅ Featured image: HTTP $IMAGE_STATUS${NC}"
    else
        echo -e "   ${RED}❌ Featured image: HTTP $IMAGE_STATUS${NC}"
        echo -e "   ${RED}   URL: $IMAGE_URL${NC}"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "   ${YELLOW}⚠️  No image URL found${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

# ============================================================================
# STEP 4: Run Post-Publish Workflow
# ============================================================================
echo ""
echo "4️⃣  Running post-publish workflow..."

cd beri.net
POST_PUBLISH_OUTPUT=$(node post-publish.js "$SLUG" 2>&1 || true)

if echo "$POST_PUBLISH_OUTPUT" | grep -q "POST-PUBLISH WORKFLOW COMPLETE"; then
    echo -e "   ${GREEN}✅ Post-publish workflow completed${NC}"
    
    # Extract summary
    TOOLS_LINKED=$(echo "$POST_PUBLISH_OUTPUT" | grep -o "linked to [0-9]* tools" | grep -o "[0-9]*" || echo "0")
    RELATED=$(echo "$POST_PUBLISH_OUTPUT" | grep -o "Found [0-9]* related" | grep -o "[0-9]*" || echo "0")
    
    echo -e "   ${GREEN}   • Tools linked: $TOOLS_LINKED${NC}"
    echo -e "   ${GREEN}   • Related articles: $RELATED${NC}"
else
    echo -e "   ${YELLOW}⚠️  Post-publish workflow had issues${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

cd ..

# ============================================================================
# STEP 5: Verify Git Status
# ============================================================================
echo ""
echo "5️⃣  Checking Git status..."

cd beri.net

if git diff --quiet && git diff --cached --quiet; then
    echo -e "   ${GREEN}✅ No uncommitted changes${NC}"
else
    echo -e "   ${YELLOW}⚠️  Uncommitted changes detected${NC}"
    echo -e "   ${YELLOW}   Run: git add . && git commit && git push${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

cd ..

# ============================================================================
# STEP 6: Verify Deployment
# ============================================================================
echo ""
echo "6️⃣  Checking deployment..."

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://www.beri.net/article/$SLUG" 2>/dev/null || echo "000")

if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "   ${GREEN}✅ Article is live: https://www.beri.net/article/$SLUG${NC}"
elif [ "$HTTP_STATUS" = "404" ]; then
    echo -e "   ${YELLOW}⚠️  Article returns 404 (may need cache refresh)${NC}"
    echo -e "   ${YELLOW}   Wait 60 seconds for deployment, then check again${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "   ${RED}❌ Unexpected HTTP status: $HTTP_STATUS${NC}"
    ERRORS=$((ERRORS + 1))
fi

# ============================================================================
# SUMMARY
# ============================================================================
echo ""
echo "================================================================"
echo "📊 CHECKLIST SUMMARY"
echo "================================================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ ALL CHECKS PASSED${NC}"
    echo ""
    echo "Article is ready:"
    echo "  • Live URL: https://www.beri.net/article/$SLUG"
    echo "  • In MongoDB: Yes"
    echo "  • Post-publish: Complete"
    echo ""
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  PASSED WITH WARNINGS${NC}"
    echo -e "   Warnings: $WARNINGS"
    echo ""
    echo "Article is functional but has minor issues."
    echo "Review warnings above and fix if needed."
    echo ""
    exit 0
else
    echo -e "${RED}❌ CHECKLIST FAILED${NC}"
    echo -e "   Errors: $ERRORS"
    echo -e "   Warnings: $WARNINGS"
    echo ""
    echo "Fix errors above before considering article published."
    echo ""
    exit 1
fi
