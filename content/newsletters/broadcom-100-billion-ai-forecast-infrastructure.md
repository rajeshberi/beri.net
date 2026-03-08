---
title: "Broadcom Just Said '$100 Billion' and I Nearly Spit Out My Coffee"
date: "2026-02-24"
published: true
excerpt: "Broadcom raised its AI infrastructure forecast to $100B. I've been in enterprise tech long enough to know what that number actually means for your budget — and it's not what the headlines say."
tags: ["Infrastructure", "AI Hardware", "Enterprise", "Budget", "Cost Analysis", "IT", "Finance", "Operations", "Engineering", "Product Management"]
type: "curated"
originalUrl: "https://www.reuters.com/technology/"
originalAuthor: "Reuters"
originalSource: "Reuters"
originalPublishDate: "2026-02-24"
---

*Original: [Reuters Technology Coverage](https://www.reuters.com/technology/)*

I was on a budget planning call last Tuesday when someone dropped the Broadcom number: **$100 billion in AI infrastructure demand.**

The CFO on the call literally said, "So... should we be worried?"

Short answer: not worried. But definitely paying attention.

![Data center with rows of servers illuminated by blue LED lights](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80)
*The $100B question: Where does all this infrastructure actually go?*

> **⚡ TL;DR:** The $100B number is a TAM forecast, not revenue. Networking (not GPUs) is the real bottleneck — budget 40% on it. Don't expect cloud price drops in 2026. On-prem breaks even at 10K+ daily inference requests. Below that, stay on cloud. Negotiate 2027 price-adjustment clauses into every contract.

## What Actually Happened

Broadcom raised its AI-related revenue forecast to $100 billion. Not revenue — *forecast of total addressable market.* Important distinction that every headline conveniently skipped. The stock surged because Wall Street loves big round numbers, and $100B is as round as they come.

The real story isn't the headline number. It's *what's driving it*: custom AI chips (ASICs), networking silicon, and data center connectivity. Translation? The companies building AI aren't just buying GPUs anymore. They're building entire custom silicon ecosystems. And that changes the cost equation for everyone.

## What This Actually Means For Your Budget

Look, everyone in tech media is debating which AI model is best. Meanwhile, the real 2026 story is happening in the basement — literally. Infrastructure costs are what will determine whether your AI projects survive past the pilot phase.

**Here's what I've been telling every CFO who asks:**

### The Next 12 Months: Don't Expect Price Drops

Cloud AI pricing isn't coming down in 2026. I know, I know — everyone assumes compute gets cheaper over time. And it does... eventually. But right now, demand is outstripping supply builds by a factor I haven't seen since the early cloud days. If you're budgeting for major price drops this year, you're going to have a bad time.

![Close-up of a modern GPU chip with circuitry](https://images.unsplash.com/photo-1591799265444-d66432b91588?w=1200&q=80)
*GPUs get all the attention. But networking is where budgets actually blow up.*

### The Networking Surprise Nobody Talks About

Here's the thing that caught me off guard when I first dug into on-prem AI deployments: **the networking layer — not GPUs — is becoming the bottleneck.**

Broadcom's forecast is driven heavily by networking ASICs and switch silicon. If you're planning on-premises AI deployment, your network architecture matters as much as your GPU selection. I watched a team at a Fortune 500 spend $2M on an impressive GPU cluster that sat 40% idle because their network couldn't feed data fast enough.

My rule of thumb: **budget 40% of your AI hardware spend on networking, not 15%.** Yes, 40%. I know it sounds insane. The first time I said that number in a planning meeting, the infrastructure lead laughed. Three months later, he was requesting exactly that allocation.

### The 2027 Silver Lining

Custom silicon — Google TPUs, AWS Trainium, Broadcom-designed ASICs — will bend the inference cost curve downward starting in 2027. So here's my actual advice: **plan your 2026 budgets at current pricing, but negotiate contracts with price-adjustment clauses for 2027.** Any vendor who won't give you that clause knows their pricing isn't competitive long-term.

## The Talent Problem That Won't Go Away

The infrastructure buildout has 3-5 years left. Three to five *years.* That means continued hiring pressure in ML infrastructure, platform engineering, and systems architecture.

If you're struggling to hire AI talent today — and let's be honest, who isn't — it's not getting easier. I've watched job postings for ML infrastructure engineers sit open for 6+ months at companies offering well above market rate.

My honest advice: stop trying to build everything in-house. Consider partnerships with cloud providers and managed AI services as a bridge. Your pride isn't worth burning $500K on a 9-month recruiting cycle.

## The Break-Even Math

I ran these numbers for three different companies last month. Here's the pattern:

**On-prem AI deployments that handle 10,000+ daily inference requests break even vs. cloud pricing in 9-14 months** (depending on model size and hardware choices). Below that volume, cloud-first is still the better financial decision for most organizations.

If you're doing less than 10K requests/day, please don't buy hardware. I'm begging you. I've seen too many server rooms become expensive space heaters.

> **Rajesh's take:** The $100B number is real, but it's a market opportunity number, not your budget number. Your budget number is whatever it costs to keep your AI workloads running without your CFO having a coronary. Focus on that.

---

*Next up: I'm doing a deep dive on [which AI model actually saves you money](/newsletter/gpt-5-4-vs-claude-opus-4-6-enterprise-guide) — GPT-5.4 vs Claude Opus 4.6. Spoiler: the answer is "both, but differently."*

## Related Reading

- [GPT-5.4 vs Claude Opus 4.6: The Enterprise Decision Framework](/newsletter/gpt-5-4-vs-claude-opus-4-6-enterprise-guide) — Understanding the models that drive infrastructure demand, with cost analysis.
- [AI Agents Are Coming For Every Department](/newsletter/ai-agents-enterprise-adoption-2026) — The agent adoption wave driving Broadcom's infrastructure forecast.
- [The Anthropic-Pentagon Clash: AI Vendor Risk](/newsletter/us-ai-guidelines-anthropic-pentagon-clash) — Why multi-vendor infrastructure strategy matters more than ever.
