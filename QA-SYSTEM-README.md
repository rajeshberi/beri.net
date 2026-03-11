# Foolproof QA System - Complete Guide

## Overview

This QA system prevents the 3 critical failures from 2026-03-11:
1. ❌ Empty article content in MongoDB
2. ❌ Broken featured images (HTTP 404)
3. ❌ Lost data during migration (37 missing tools)

**Philosophy:** Test outcomes, not process. Verify user experience, not script execution.

---

## The Two Checklists

### 1. Article Publishing Checklist
**File:** `run-article-checklist.sh`  
**When:** After creating/importing ANY article  
**Checks:** 6 validation steps + image URL verification

```bash
./run-article-checklist.sh nvidia-nemoclaw-enterprise-ai-agents
```

**Pass criteria:**
- ✅ Content ≥ 800 chars
- ✅ Image returns HTTP 200
- ✅ All MongoDB fields present
- ✅ Live URL accessible

### 2. Comprehensive System Check
**File:** `qa-comprehensive-check.sh`  
**When:** After migrations, deployments, major changes  
**Checks:** 6 categories, 20+ individual tests

```bash
./qa-comprehensive-check.sh
```

**Pass criteria:**
- ✅ Database integrity (counts match expected)
- ✅ Website accessibility (all pages HTTP 200)
- ✅ Content rendering (actual user experience)
- ✅ Image validation (HTTP requests)
- ✅ SEO preservation (critical slugs exist)
- ✅ Build status (clean git state)

---

## Quick Start

### For Daily Content Creation

```bash
# 1. Create article
cd beri.net
node create-article.js my-article --title="My Title" ...

# 2. Run article checklist (MANDATORY)
cd ..
./run-article-checklist.sh my-article

# 3. Only if "ALL CHECKS PASSED":
echo "✅ Article published successfully"

# 4. If checks fail:
# - Fix the specific errors shown
# - Re-run checklist
# - Repeat until passing
```

### For Tool Migrations

```bash
# 1. Document baseline
BEFORE=$(cd beri.net && node -e "/* count tools */")
echo "Baseline: $BEFORE tools"

# 2. Run migration
cd beri.net && node migrate-tools.js

# 3. Verify counts match
AFTER=$(node -e "/* count tools */")
if [ "$BEFORE" != "$AFTER" ]; then
  echo "❌ FAILURE: Tool count mismatch"
  exit 1
fi

# 4. Run comprehensive check (MANDATORY)
cd ..
./qa-comprehensive-check.sh

# 5. Only if "ALL CHECKS PASSED":
echo "✅ Migration complete: $AFTER tools preserved"
```

### For Deployments

```bash
# 1. After git push

# 2. Wait for Vercel deployment (2-3 min)

# 3. Run comprehensive check (MANDATORY)
./qa-comprehensive-check.sh

# 4. Only if "ALL CHECKS PASSED":
echo "✅ Deployment verified live"

# 5. If checks fail:
# - Investigate immediately
# - Don't claim deployment success
# - Fix and redeploy
```

---

## What Each Check Does

### Article Checklist (`run-article-checklist.sh`)

**Step 1: File Validation**
- Article markdown file exists
- Frontmatter parseable

**Step 2: Frontmatter Validation**
- Required fields: title, slug, date, image
- Tag count ≥ 3 (recommends 5-7)

**Step 3: MongoDB Sync Validation**
- Article exists in database
- Has published_date, created_at, published=true
- **NEW:** Content length ≥ 800 chars (catches empty articles)
- **NEW:** Image URL returns HTTP 200 (catches broken images)

**Step 4: Post-Publish Workflow**
- Tools bidirectional linking
- Related articles found
- SEO validation

**Step 5: Git Status**
- No uncommitted changes (all saved)

**Step 6: Live URL**
- Article accessible at public URL

### Comprehensive Check (`qa-comprehensive-check.sh`)

**Category 1: Database Integrity**
- Tools count ≥ 37 (baseline)
- Published articles ≥ 1
- Sample tools have complete data (website, company, description)

**Category 2: Live Website Accessibility**
- Homepage: HTTP 200
- Tools page: HTTP 200
- Tools API: HTTP 200
- API returns ≥ 37 tools

**Category 3: Content Rendering**
- Tools page shows actual tool names
- Individual tool pages accessible
- Tests real user experience (not just API)

**Category 4: Image Validation**
- Latest article image: HTTP 200
- Latest article content ≥ 800 chars

**Category 5: SEO & Slugs**
- No duplicate slugs
- Critical slugs preserved (chatgpt, claude, cursor, github-copilot)

**Category 6: Build Status**
- Clean git state
- Shows latest commit

---

## How to Interpret Results

### Exit Codes

```bash
0 = ALL CHECKS PASSED (success)
1 = ERRORS FOUND (failure - fix before proceeding)
```

### Color Coding

- 🟢 **Green (✅):** Test passed
- 🔴 **Red (❌):** Test FAILED - critical issue
- 🟡 **Yellow (⚠️):** Warning - may need attention

### Example Output

```
✅ ALL CHECKS PASSED

System Status:
  • Database: 47 tools, 23 articles
  • Website: All pages accessible
  • APIs: Returning data correctly
  • Content: Rendering properly
  • Images: Working
  • SEO: Slugs preserved
```

---

## Integration with Daily Workflow

### Morning Content Creation Cron

**Old workflow:**
```bash
create_article.sh
# ❌ Assumes success without validation
```

**New workflow (foolproof):**
```bash
create_article.sh
./run-article-checklist.sh $SLUG

if [ $? -ne 0 ]; then
  # Checklist failed - alert and stop
  notify_error "Article creation failed QA"
  exit 1
fi

# Only reaches here if checks passed
notify_success "Article published: $SLUG"
```

### Newsletter Send Workflow

**Before sending:**
```bash
# Verify latest article is ready
LATEST=$(get_latest_article_slug)
./run-article-checklist.sh $LATEST

if [ $? -eq 0 ]; then
  send_newsletter $LATEST
else
  alert "Cannot send - article failed QA"
fi
```

---

## Failure Response Playbook

### If Article Checklist Fails

**Scenario: Content length = 0**
```
❌ Content too short: 0 chars (need 800+)
```

**Response:**
1. Don't claim article is published
2. Check markdown file has content
3. Re-run import: `node import-markdown-article.js file.md`
4. Verify: `node -e "/* query content.length */"`
5. Re-run checklist
6. Only claim success when passing

**Scenario: Image HTTP 404**
```
❌ Featured image: HTTP 404
   URL: https://images.unsplash.com/photo-xxx
```

**Response:**
1. Find valid replacement image
2. Update markdown file
3. Update MongoDB: `node -e "/* update image */"`
4. Verify: `curl -I <new-url>`
5. Re-run checklist
6. Only claim success when passing

### If Comprehensive Check Fails

**Scenario: Tools count mismatch**
```
❌ Tools count: 10 (expected ≥37)
```

**Response:**
1. DON'T claim migration succeeded
2. Check old collection: `db.ai_tools.count()`
3. Re-run migration: `node migrate-old-tools.js`
4. Verify: `db.tools.count()` matches old count
5. Run comprehensive check
6. Only claim success when passing

**Scenario: Missing critical slug**
```
❌ Missing critical slug: chatgpt
```

**Response:**
1. Check if tool exists: `db.tools.findOne({slug: 'chatgpt'})`
2. If missing, re-migrate that tool
3. If exists with wrong slug, fix slug
4. Run comprehensive check
5. Only claim success when passing

---

## Preventing Today's Failures

### Failure 1: Empty Article Content

**How it happened:**
- Import script ran (exit code 0)
- Assumed content was imported
- Never checked actual content length

**How new checklist catches it:**
```bash
CONTENT_LEN=$(query_content_length)
if [ $CONTENT_LEN -lt 800 ]; then
  ERROR: Content too short
fi
```

**Prevented:** ✅ Will never claim article published without content

### Failure 2: Broken Featured Image

**How it happened:**
- Checked image field exists
- Never made HTTP request
- Assumed Unsplash URLs always work

**How new checklist catches it:**
```bash
IMAGE_STATUS=$(curl -I $IMAGE_URL -w '%{http_code}')
if [ "$IMAGE_STATUS" != "200" ]; then
  ERROR: Image returns $IMAGE_STATUS
fi
```

**Prevented:** ✅ Will never publish article with 404 image

### Failure 3: Lost 37 Tools

**How it happened:**
- Migrated YAML files only (10 tools)
- Never counted old database (37 tools)
- Assumed YAML was complete source

**How new checklist catches it:**
```bash
TOOLS_COUNT=$(query_tools_count)
if [ $TOOLS_COUNT -lt 37 ]; then
  ERROR: Only $TOOLS_COUNT tools (expected 37+)
fi
```

**Prevented:** ✅ Will never claim migration complete with missing data

---

## Advanced Usage

### Custom Baseline Checks

```bash
# Before migration, set baseline
echo "37" > .baseline-tools-count

# After migration, compare
EXPECTED=$(cat .baseline-tools-count)
ACTUAL=$(query_tools_count)
if [ "$ACTUAL" -ne "$EXPECTED" ]; then
  FAIL
fi
```

### Parallel Checks

```bash
# Run both checklists in parallel
./run-article-checklist.sh my-article &
./qa-comprehensive-check.sh &
wait

# Check both passed
if [ $? -eq 0 ]; then
  echo "All checks passed"
fi
```

### CI/CD Integration

```yaml
# .github/workflows/deploy.yml
- name: Run QA Checks
  run: |
    ./qa-comprehensive-check.sh
    if [ $? -ne 0 ]; then
      echo "QA failed - blocking deployment"
      exit 1
    fi
```

---

## Maintenance

### Updating Baselines

When you legitimately add/remove tools:

```bash
# Update expected count in qa-comprehensive-check.sh
if [ "$TOOLS_COUNT" -ge 47 ]; then  # was 37, now 47
```

### Adding New Checks

Template for new validation:

```bash
# Check descriptive name
echo "   Checking [what you're validating]..."

RESULT=$(/* your test command */)

if [ "$RESULT" = "expected" ]; then
    echo -e "   ${GREEN}✅ [Check name passed]${NC}"
else
    echo -e "   ${RED}❌ [Check failed: $RESULT]${NC}"
    ERRORS=$((ERRORS + 1))
fi
```

---

## Summary: The Golden Rule

**Never say "done" or "published" without:**

1. Running the appropriate checklist
2. Seeing "ALL CHECKS PASSED"
3. Exit code = 0
4. Including evidence in your response

**Template response:**
```
✅ [Task] completed successfully

Evidence:
  • [Metric 1]: [Value] ✅
  • [Metric 2]: [Value] ✅
  • Checklist: PASSED ✅
  • URL: [link] ✅
```

**If checks fail:** Fix issues, re-run, don't claim success until passing.

---

## Files in This System

```
qa-comprehensive-check.sh       - System-wide validation (20+ tests)
run-article-checklist.sh         - Article publishing validation (6+ tests)
beri.net/check-article-mongodb.js - Helper: MongoDB field validation
beri.net/fix-article-mongodb.js  - Helper: Auto-fix missing fields
PRE-FLIGHT-CHECKLIST.md          - When/how to use checklists
QA-FAILURE-REPORT-2026-03-11.md  - What went wrong today
QA-SYSTEM-README.md              - This file
```

---

**Created:** 2026-03-11  
**Purpose:** Ensure foolproof quality validation  
**Status:** Production-ready  
**Severity:** CRITICAL - use before every claim of success
