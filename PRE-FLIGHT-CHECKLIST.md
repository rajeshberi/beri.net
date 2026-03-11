# Pre-Flight Checklist - Before Claiming Success

## CRITICAL: Never say "done" or "published" without passing ALL checks

### When to Use This

**Before saying:**
- ✅ "Article published"
- ✅ "Tools migrated"
- ✅ "Deployment complete"
- ✅ "Everything is working"

**Run:** `./qa-comprehensive-check.sh`

---

## The Foolproof QA System

### 1. Comprehensive QA (System-Wide)

**When:** After major changes (migrations, deployments, infrastructure)

**Run:**
```bash
./qa-comprehensive-check.sh
```

**What it checks:**
1. ✅ Database integrity (tool count, article count)
2. ✅ Live website accessibility (HTTP 200 on all pages)
3. ✅ Content rendering (actual user experience)
4. ✅ Image URLs (HTTP 200 validation)
5. ✅ SEO preservation (critical slugs exist)
6. ✅ Build status (no uncommitted changes)

**Pass criteria:** Exit code 0 + "ALL CHECKS PASSED"

---

### 2. Article Publishing Checklist

**When:** After creating/importing ANY article

**Run:**
```bash
./run-article-checklist.sh <article-slug>
```

**What it checks:**
1. ✅ Article file exists with valid frontmatter
2. ✅ Required fields present (title, slug, date, image, tags)
3. ✅ MongoDB sync complete with all required fields
4. ✅ **Content length ≥800 chars** (catches empty articles)
5. ✅ **Image URL returns HTTP 200** (catches broken images)
6. ✅ Post-publish workflow completed
7. ✅ Git committed
8. ✅ Live URL accessible

**Pass criteria:** Exit code 0 + "ALL CHECKS PASSED"

---

## Critical Validation Rules

### Rule 1: Test the User Experience

**DON'T:** Check if a script ran
**DO:** Check if the outcome is visible to users

```bash
# ❌ Wrong
if [ $? -eq 0 ]; then echo "Success"; fi

# ✅ Right
curl https://beri.net/article/$SLUG | grep -q "<h1>" || fail
```

### Rule 2: Validate Data, Not Process

**DON'T:** Assume data was imported
**DO:** Query the database and check actual values

```bash
# ❌ Wrong  
node import-article.js && echo "Imported"

# ✅ Right
CONTENT_LEN=$(query_db "content.length")
if [ $CONTENT_LEN -lt 800 ]; then fail; fi
```

### Rule 3: Check Image URLs

**DON'T:** Just check if URL field exists
**DO:** Make HTTP request and verify 200 OK

```bash
# ❌ Wrong
if [ -n "$IMAGE_URL" ]; then success; fi

# ✅ Right
HTTP_CODE=$(curl -I $IMAGE_URL -w '%{http_code}')
if [ "$HTTP_CODE" != "200" ]; then fail; fi
```

### Rule 4: Compare Before/After

**DON'T:** Assume migration preserved data
**DO:** Document baseline and verify post-migration

```bash
# ❌ Wrong
migrate_tools && echo "Migrated"

# ✅ Right
BEFORE=$(count_tools)
migrate_tools
AFTER=$(count_tools)
if [ "$BEFORE" != "$AFTER" ]; then fail; fi
```

---

## When Checks Fail

### If Article Checklist Fails

**DO NOT:**
- ❌ Claim article is published
- ❌ Move on to next task
- ❌ Assume "it'll work later"

**DO:**
- ✅ Fix the specific error shown
- ✅ Re-run checklist until it passes
- ✅ Only then claim success

### If Comprehensive QA Fails

**DO NOT:**
- ❌ Push to production
- ❌ Tell user "everything is working"
- ❌ Ignore errors "for now"

**DO:**
- ✅ Investigate every error
- ✅ Fix root cause
- ✅ Re-run full QA
- ✅ Document what broke and why

---

## Examples of Good vs Bad QA

### Bad QA (What I Did Today)

```bash
# Created article
node create-article.js $SLUG
echo "✅ Article published"  # ❌ WRONG - didn't check content!

# Migrated tools
node migrate-tools.js
echo "✅ Tools migrated"  # ❌ WRONG - lost 37 tools!

# Imported article
node import-article.js article.md
echo "✅ Imported"  # ❌ WRONG - content was empty!
```

**Result:** 3 critical failures, user had to report issues

### Good QA (What Should Happen)

```bash
# Create article
node create-article.js $SLUG

# DON'T claim success yet - run checklist
./run-article-checklist.sh $SLUG

# Checklist catches: empty content, broken image
# Fix issues, re-run

# Only after passing:
echo "✅ Article published with 1,200 chars, working image, live URL"
```

**Result:** Issues caught before user sees them

---

## Mandatory Checks Before Claiming Success

### For Article Publishing

- [ ] Ran `./run-article-checklist.sh <slug>`
- [ ] Exit code was 0 (success)
- [ ] Output showed "ALL CHECKS PASSED"
- [ ] Content length shown ≥800 chars
- [ ] Image HTTP status = 200
- [ ] Live URL accessible

**Template response:**
```
✅ Article published successfully

Verification:
  • Content: 1,234 chars ✅
  • Image: HTTP 200 ✅
  • MongoDB: All fields present ✅
  • Live: https://beri.net/article/slug ✅
  • Checklist: PASSED ✅
```

### For Tool Migration

- [ ] Documented tool count BEFORE migration
- [ ] Ran migration
- [ ] Verified tool count AFTER = BEFORE
- [ ] Checked 3-5 random tools have complete data
- [ ] Verified critical slugs preserved
- [ ] Tested live URLs (chatgpt, claude, cursor)
- [ ] Ran `./qa-comprehensive-check.sh`

**Template response:**
```
✅ Tools migration complete

Verification:
  • Before: 37 tools ✅
  • After: 47 tools (37 + 10 new) ✅
  • Data preserved: website, pricing, social links ✅
  • SEO: All original slugs intact ✅
  • Live: /tools/chatgpt returns 200 ✅
  • QA: PASSED ✅
```

---

## Red Flags (Never Ignore These)

🚩 **Script ran but no output** → Probably failed silently
🚩 **Exit code 0 but warnings in logs** → May have partial failure
🚩 **Count decreased after migration** → Data loss
🚩 **Image field present but HTTP 404** → Broken link
🚩 **Content field present but length = 0** → Empty article
🚩 **Live URL returns 200 but no content** → Cached old version

**If you see any red flag:** STOP, investigate, don't claim success.

---

## Automation Rules

### What to Automate

- ✅ Running checks (scripts)
- ✅ HTTP validation
- ✅ Database queries
- ✅ Content length checks

### What NOT to Automate

- ❌ Deciding if quality is good enough
- ❌ Manually testing critical user paths
- ❌ Visual inspection of pages
- ❌ Judgment calls on edge cases

**Golden rule:** Automate the checks, but YOU verify the results before claiming success.

---

## Emergency Rollback

If you claim success and user reports failure:

1. **Acknowledge immediately:** "I missed that, investigating now"
2. **Run comprehensive QA:** `./qa-comprehensive-check.sh`
3. **Document what broke:** Add to memory/logs
4. **Fix the issue**
5. **Verify fix with same check that failed**
6. **Update checklist** to catch that issue next time

**Never:** Blame caching, deployment delays, or "it works for me"

---

## Summary: The Foolproof Method

```
1. Make change
2. Run appropriate checklist (article OR comprehensive)
3. Check exit code
4. Read ALL output
5. If ANY check failed → fix and re-run
6. Only when "ALL CHECKS PASSED" → claim success
7. Include evidence in response (content length, HTTP codes, counts)
```

**Simple rule:** If you didn't run the checklist and see "ALL CHECKS PASSED", you didn't verify it works.

---

**Created:** 2026-03-11  
**Purpose:** Prevent repeating today's QA failures  
**Severity:** CRITICAL - follow every time
