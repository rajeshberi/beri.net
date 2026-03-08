# Newsletter Workflow with Tool Recommendations

## Overview
Every newsletter should include **related tools** mentioned in the articles. This creates:
- **SEO value:** Internal links between articles and tools
- **Reader value:** Actionable resources to explore
- **Discovery:** Drives traffic to Tools Directory

---

## Workflow

### 1. Write/Select Articles
Choose 2-3 articles for the newsletter digest.

**Example:**
```bash
# Articles chosen for Tuesday newsletter
- anthropic-pentagon-vendor-risk
- claude-cowork-scheduled-tasks-loop
```

### 2. Generate Tool Recommendations
Run the suggestion script with article slugs:

```bash
cd beri.net
node suggest-tools-for-newsletter.js \
  anthropic-pentagon-vendor-risk \
  claude-cowork-scheduled-tasks-loop
```

**Output:**
```
📧 Tool Recommendations for Newsletter

Articles: Anthropic vs. Pentagon..., Claude Just Learned to Loop...

🔧 Recommended Tools (5):

1. Claude (Anthropic) - Freemium
   Advanced AI assistant for complex reasoning, coding...
   🔗 https://beri.net/tools/claude

2. ChatGPT (OpenAI) - Freemium
   World's most popular AI chatbot...
   🔗 https://beri.net/tools/chatgpt

...

📝 Newsletter Footer Text:

---

## Tools Mentioned

**1. [Claude](https://beri.net/tools/claude)** - Advanced AI assistant... Freemium.
**2. [ChatGPT](https://beri.net/tools/chatgpt)** - World's most popular... Freemium.
...

Explore our full [AI Tools Directory](https://beri.net/tools) for 30+ tools.

---
```

### 3. Add Tools Section to Newsletter
Copy the generated footer text and add it to your newsletter digest **before** the Forward-to-Friends CTA.

**Placement:**
```markdown
[Article 1 content...]

[Article 2 content...]

## Tools Mentioned

**1. [Claude](https://beri.net/tools/claude)** - Advanced AI assistant...
**2. [ChatGPT](https://beri.net/tools/chatgpt)** - World's most popular...
...

Explore our full [AI Tools Directory](https://beri.net/tools) for 30+ tools.

---

## Share This Newsletter

[Forward-to-friends CTA...]
```

### 4. Build & Send Newsletter
```bash
# Build digest with tools section included
./build-digest.py "This Week in Enterprise AI" \
  anthropic-pentagon-vendor-risk \
  claude-cowork-scheduled-tasks-loop

# Test send
./send-digest-db --test

# Send to all
./send-digest-db
```

---

## Benefits

### For SEO
- **Internal linking:** Articles ↔ Tools bidirectional links
- **PageRank flow:** Authority passes from articles to tools
- **Discovery:** Tools get organic traffic from newsletter archives
- **Keyword targeting:** "Claude alternative", "AI tools", etc.

### For Readers
- **Actionable:** Links to tools they can try immediately
- **Curated:** Only tools mentioned in articles (relevant)
- **Transparent:** Pricing model visible (helps decision-making)
- **No affiliate spam:** Pure recommendations based on content

### For Growth
- **Tools Directory traffic:** Newsletter → Tools page visits
- **Newsletter subscriptions:** Tools page → Newsletter signups
- **Engagement:** Readers click through to explore tools
- **Shareability:** "Check out these AI tools" is shareable

---

## Auto-Linking System

Tools are automatically linked to articles through:

### 1. Linking Script (Run Weekly)
```bash
cd beri.net
node link-tools-to-articles.js
```

**What it does:**
- Scans all newsletter articles
- Finds tool mentions (product name, vendor, slug)
- Updates tool documents with `relatedArticles` field
- Creates bidirectional relationships

**Example output:**
```
✅ Claude: 9 article(s)
   → Anthropic vs. The Pentagon...
   → Claude Just Learned to Loop...
   ...

✅ Linked 57 tool-article relationships
```

### 2. Tool Detail Pages
Each tool page automatically displays:
- **"Featured In Our Analysis"** section
- Links to all articles that mention the tool
- Excerpt + date for each article
- SEO-rich internal linking

### 3. Homepage Discovery
- **"New Tools" section** shows 6 newest tools
- Auto-updates when new tools added
- Drives discovery from homepage → tools

---

## Automation

### Weekly Tools Scouting (Cron)
- **Schedule:** Every Monday 10 AM PST
- **Job ID:** `f84281a8-4d3c-4a76-9a77-495c7da7413b`
- **Action:** Scout Reddit, HN, Google for new AI tools
- **Output:** 5-10 new tools added weekly

### After New Tools Added
Run linking script to connect to existing articles:
```bash
cd beri.net
node link-tools-to-articles.js
```

---

## Newsletter Template

```markdown
# THE D[AI]LY BRIEF
## This Week in Enterprise AI

Hi {FirstName},

[Introduction paragraph...]

---

### 1. [Article Title]

[Content...]

Read more: [Article URL]

---

### 2. [Article Title]

[Content...]

Read more: [Article URL]

---

## Tools Mentioned

**1. [Tool Name](https://beri.net/tools/slug)** - Description. Pricing.
**2. [Tool Name](https://beri.net/tools/slug)** - Description. Pricing.
**3. [Tool Name](https://beri.net/tools/slug)** - Description. Pricing.

Explore our full [AI Tools Directory](https://beri.net/tools) for 30+ curated tools.

---

## Share This Newsletter

If you found this useful, **forward it to a colleague**. They can subscribe here:
👉 https://beri.net/#newsletter

---

Best,
Rajesh Beri

*THE D[AI]LY BRIEF*
AI insights for engineering leaders
```

---

## SEO Impact

### Before (No Tool Links)
- Articles: standalone content
- Tools: separate directory
- No cross-linking
- Limited PageRank flow

### After (With Tool Links)
- **57 tool-article relationships**
- Tools get traffic from article readers
- Articles boost tool page authority
- Search engines see topic clusters
- **Expected traffic increase: +20-30% over 3 months**

---

## Metrics to Track

### Newsletter Performance
- Click-through rate on tool links (track in Postmark)
- Most-clicked tools (identifies popular tools)
- Newsletter → Tools page visits (Google Analytics)

### Tools Directory
- Organic traffic (Google Search Console)
- Entry pages (which tools bring traffic)
- Related article clicks (tool page → article)

### SEO
- Internal link count per tool
- PageRank distribution (via SEO tools)
- Keyword rankings for "[tool name] review"

---

## Best Practices

1. **Always run suggestion script** - Don't manually pick tools
2. **Include 3-5 tools maximum** - Too many = overwhelming
3. **Link to tool detail page** - Not direct to vendor site
4. **Show pricing** - Readers want to know upfront
5. **Update weekly** - Run linking script after new tools/articles

---

**Questions?** Check COPY-GUIDE.md for full newsletter workflow.
