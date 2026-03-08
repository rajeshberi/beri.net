# Subscriber Scouting Strategy

## Target Profile
- **Title:** CTO, VP Engineering, Head of AI/ML, Engineering Director
- **Company:** Enterprise (500+ employees), tech companies, B2B SaaS
- **Industry:** Technology, AI/ML, Cloud Infrastructure, Security
- **Signals:** Active on LinkedIn discussing AI, published articles on AI deployment

---

## Sourcing Channels

### 1. LinkedIn (Primary)
**Search:**
- "CTO" + "AI" + "Enterprise"
- "VP Engineering" + "LLM" + "Production"
- "Head of AI" + company size filter (500+)

**Engagement signals:**
- Posted about AI in last 30 days
- Comments on AI/ML content
- Shares technical articles

**Outreach approach:**
- Connect with personalized note
- After accept, send sample newsletter
- Soft CTA to subscribe

### 2. Twitter/X
**Find:**
- Followers of @karpathy, @sama, @darioamodei
- Uses hashtags: #AI, #MLOps, #LLMOps
- Bio mentions: CTO, VP Eng, AI/ML

**Approach:**
- Reply to their AI tweets with value
- DM sample article + subscribe link
- Follow → engage → invite

### 3. Reddit
**Subreddits:**
- r/MachineLearning (practitioners)
- r/artificial (enterprise AI)
- r/EngineeringManagers (leaders)

**Approach:**
- Find users with thoughtful comments on AI
- Check post history for seniority signals
- DM with sample + invite

### 4. Hacker News
**Target:**
- Users commenting on AI/LLM threads
- Look for "at [Company]" in profile
- Check karma (500+ = engaged)

**Approach:**
- Find contact info (HN profile, LinkedIn, company site)
- Send email with sample

### 5. GitHub
**Find:**
- Contributors to AI/LLM repos
- "@company.com" emails in commits
- Company = enterprise tech firms

**Approach:**
- Public email → send sample
- LinkedIn connection → DM

---

## Outreach Template (Personalized)

**Subject:** {FirstName}, here's what I learned about AI agents this week

**Body:**
Hi {FirstName},

I saw your {recent post/comment/article} on {specific topic}. {Personalized observation about their content}.

I just launched THE D[AI]LY BRIEF — a twice-weekly newsletter on AI deployment for engineering leaders. Since you're working on {their problem}, thought you might find this week's deep dive useful:

"Your AI Agents Can't Actually Do Anything. Here's How to Fix That"
→ https://beri.net/article/rag-skills-executable-capabilities

No fluff, no hype — just what actually works when deploying AI at scale.

Subscribe: https://beri.net/#newsletter

— Rajesh
beri.net

---

## Automation Workflow

### Daily (7 AM PST)
1. **Scout LinkedIn** (10 prospects)
   - Search CTOs posting about AI
   - Add to prospect list with context

2. **Scout Twitter/X** (10 prospects)
   - Check followers of AI leaders
   - Find engaged commenters

3. **Scout Reddit/HN** (5 prospects)
   - Find thoughtful AI discussions
   - Extract contact info

### Weekly (Monday)
1. **Review prospect list** (50-100 accumulated)
2. **Filter by fit** (title, company, engagement)
3. **Send outreach batch** (25-50 emails)
4. **Track opens/clicks** (Postmark dashboard)

### Monthly
1. **Review conversion rate** (sent → subscribed)
2. **A/B test subject lines**
3. **Refine target profile**

---

## Metrics to Track

**Outreach:**
- Prospects scouted/week: Target 100+
- Emails sent/week: Target 50+
- Open rate: Target 30%+
- Click rate: Target 10%+

**Conversion:**
- Email → Subscribe: Target 5%+
- LinkedIn DM → Subscribe: Target 10%+

**Growth:**
- New subscribers/week: Target 10-25
- Month 1: 50 subscribers
- Month 3: 200 subscribers
- Month 6: 500 subscribers

---

## Tools

**Built:**
- `outreach-subscribers.js` - Send sample newsletter emails
- Uses Postmark with open/click tracking

**Usage:**
```bash
# Dry run (test)
node outreach-subscribers.js

# Send for real
node outreach-subscribers.js --live
```

**Next to build:**
- LinkedIn scraper for CTO emails
- Twitter follower extractor
- Reddit/HN user profile scraper

---

## Compliance

**CAN-SPAM:**
- ✅ Real sender address (newsletter@beri.net)
- ✅ Clear unsubscribe mechanism
- ✅ Physical address (optional but should add)
- ✅ No deceptive subject lines
- ✅ Honor unsubscribe within 10 days

**Best practices:**
- Only email people who might care (AI leaders)
- Personalize every outreach
- Provide value upfront (sample article)
- Make unsubscribe easy
- Track bounces, remove bad emails

---

**Status:** Infrastructure built, ready to scout
**Next:** Add prospects to outreach-subscribers.js and start sending
