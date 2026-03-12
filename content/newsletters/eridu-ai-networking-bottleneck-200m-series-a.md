---
title: "The $200M Bet That Your AI Data Center Is Fundamentally Broken"
description: "Eridu emerges from stealth with $200M to rebuild AI networking from the ground up. When GPUs scale 10x/year but switches only 2x every 2-3 years, billions in infrastructure spend is being wasted. Here's why networking just became AI's biggest bottleneck."
date: 2026-03-11
tags: ['AI Funding', 'AI Infrastructure', 'Data Centers', 'Enterprise AI', 'Networking']
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1792&h=1024&auto=format&fit=crop&q=80"
imageCredit: "Photo by [Taylor Vick](https://unsplash.com/@tvick) on Unsplash"
---

Billions of dollars are being poured into AI data centers right now. Nvidia GPUs, custom chips, massive power infrastructure — the build-out is unprecedented.

But according to Drew Perkins, most of that investment is hitting a wall you can't solve by buying more GPUs.

The wall is your network.

[Eridu](https://eridu.ai/), the AI networking startup Perkins founded, [emerged from stealth today with $200 million in Series A funding](https://techcrunch.com/2026/03/10/ai-network-startup-eridu-emerges-from-stealth-with-hefty-200m-series-a/) to rebuild data center networking from scratch. The round was led by Socratic Partners, legendary VC John Doerr, Hudson River Trading, and Capricorn Investment Group, with strategic backing from chipmaker TSMC (via its VentureTech Alliance investment arm) and MediaTek.

Total raised: $230 million. Investors include some of the biggest names in chips and infrastructure. And their bet is simple: **the networking architecture we've been using for 20 years cannot scale to the millions of GPUs AI requires.**

## The Problem: GPUs Are Scaling 10x Faster Than Networks

Here's the math that's driving this investment:

- **GPU compute and memory bandwidth:** Improving ~10x per year
- **Data center network switches (Broadcom, Cisco, Arista, Marvell):** Improving 2-3x every 2-3 years

That gap isn't sustainable. And it's getting worse.

"Billions of dollars of investment in AI data centers are being wasted because of the network wall," Perkins [told SiliconANGLE](https://siliconangle.com/2026/03/10/200m-funding-eridu-wants-break-network-wall-holding-back-ai/). "The plodding pace of improvement promised by the existing industry vendors is simply inadequate."

The scale difference is stark. A typical cloud data center runs about 100,000 servers, each using tens of gigabits per second of bandwidth. AI data centers are being built around **millions of GPUs**, each requiring massive bandwidth for training and inference workloads.

Traditional networking was designed for the cloud era. AI is a different problem entirely.

![Network cables in a data center](https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80)
*Photo by [Lars Kienle](https://unsplash.com/@larskienle) on Unsplash*

## Why This Matters: Latency, Jitter, and Scale

When you're training a large language model across thousands of GPUs, every millisecond of network latency matters. Every bit of "jitter" (inconsistent latency) slows down synchronization. Every hop through a tiered network architecture adds delay.

Current network switches are hitting architectural limits:

1. **Bandwidth:** Can't move data fast enough between GPUs
2. **Latency:** Too many hops, too much delay
3. **Radix:** Not enough ports per switch (requires more tiers, more hops)
4. **Power consumption:** Inefficient for AI workloads
5. **Optics reliability:** Optical connections are the least reliable part of the network

The result? You can't scale GPU clusters beyond a certain size without hitting diminishing returns. Training runs slow down. Inference latency increases. Your $10 million GPU cluster can't reach its theoretical performance because the network can't keep up.

And as AI architectures evolve — mixture-of-experts models, disaggregated inference (separate prefill and decode stages) — they're making the problem **harder**, not easier. More data movement, not less.

## Eridu's Solution: Clean-Sheet Silicon Architecture

Eridu isn't trying to incrementally improve existing switches. They're redesigning networking from the silicon up.

The approach, according to Perkins and co-founder Omar Hassen (who has deep chip design experience from Broadcom and Marvell), is built on:

- **Custom silicon:** Not off-the-shelf networking chips, but a "clean-sheet" design optimized for AI workloads
- **Advanced packaging:** Chiplet-based architecture leveraging the most advanced silicon and packaging technologies (partnering with TSMC for process tech)
- **High-radix switches:** One Eridu switch can replace **up to 30 lower-radix switches** from traditional vendors
- **Flatter networks:** Fewer tiers, fewer hops, lower latency, less jitter
- **Power efficiency:** Better tokens-per-watt and tokens-per-dollar metrics

The result, Perkins claims, is an "order-of-magnitude" improvement in performance and efficiency — not 2x, not 3x, but **10x**.

And critically: the ability to scale GPU domains to **millions of GPUs** instead of tens of thousands.

![Computer chips and silicon](https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80)
*Photo by [Alexandre Debiève](https://unsplash.com/@alexkixa) on Unsplash*

## Who Drew Perkins Is (And Why This Isn't Vaporware)

Unlike many AI infrastructure startups founded by college dropouts with big promises, Eridu's pedigree is deep.

Drew Perkins has been building networking companies since the 1980s. He co-created the **Point-to-Point Protocol (PPP)**, a key part of TCP/IP that the internet still relies on today.

His track record:

- **Lightera Networks** (optical switching): Sold to Ciena for over $500 million (1999)
- **Infinera** (optical transport): IPO'd, later sold to Nokia for **$2.3 billion** (2025)
- **Gainspeed** (cable infrastructure): Also sold to Nokia

His co-founder, Omar Hassen, spent years designing networking chips at Broadcom and Marvell — the very companies Eridu is now competing against.

This is not a team making speculative bets. They've built and sold networking infrastructure companies before. And this time, they're backed by TSMC — which sees the networking bottleneck as directly tied to its own business (selling chips for AI).

## The Competitive Landscape: Taking On Broadcom, Cisco, Arista, Nvidia

Eridu is targeting some of the biggest names in networking:

- **Broadcom** (dominant in data center switches)
- **Cisco** (enterprise networking giant)
- **Arista Networks** (cloud networking leader)
- **Nvidia** (which also sells networking gear alongside GPUs)

The incumbents are delivering incremental roadmap improvements — 2x every couple of years. Eridu's argument is that incremental won't cut it. AI demands a **different architecture**, not a faster version of the old one.

And they're already working with hyperscalers. Perkins [told Network World](https://www.networkworld.com/article/4143119/eridu-exits-stealth-with-200m-to-rebuild-ai-networking.html) they have "leading hyperscalers" deeply engaged (under NDAs) who have validated the product definition and helped shape the design. Translation: Google, Microsoft, Amazon, Meta, or similar players are already involved.

Stated targets: hyperscalers, neoclouds (CoreWeave, Lambda Labs), and sovereign cloud operators.

![Server racks in a data center](https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=1200&auto=format&fit=crop&q=80)
*Photo by [Manuel Geissinger](https://unsplash.com/@artcorgi) on Unsplash*

## What This Means for Enterprise AI Leaders

If you're building or planning AI infrastructure, here's what this tells you:

1. **Networking is now a first-class infrastructure problem** — not an afterthought. Budget accordingly.
2. **The gap between GPU scaling and network scaling is real** — and it's costing you performance (and money).
3. **Watch for new networking vendors** — the incumbents are being challenged by startups with clean-sheet designs.
4. **TSMC is betting on this problem** — when the world's leading chip fab invests in networking, they see a bottleneck that affects their entire business.
5. **AI data centers ≠ cloud data centers** — don't assume cloud-era networking will work for AI-era workloads.

Eridu hasn't announced a general availability date yet. Product specs and partnership details are expected later in 2026. But the $200M Series A (with participation from TSMC, John Doerr, and multiple hyperscaler-adjacent investors) signals that this is a problem the industry knows it has to solve.

## The Bigger Pattern: AI Infrastructure Is Entering Phase 2

We've seen this before:

- **Phase 1 (2023-2025):** Rush to buy GPUs, build AI clusters, train models
- **Phase 2 (2026+):** Realize the infrastructure around the GPUs is the bottleneck

[We wrote about this shift in AI infrastructure funding earlier this year](/article/ai-operational-infrastructure-funding-shift-2026) — the money is moving from "build bigger models" to "make the infrastructure actually work at scale."

Networking is the latest example. We've already seen similar patterns in:

- **AI code safety** ([Amazon's production outages from AI-generated code](/article/amazon-ai-code-outages-blast-radius))
- **Model architecture** ([Yann LeCun's $1B bet on world models vs. LLMs](/article/yann-lecun-ami-labs-billion-dollar-bet-world-models))
- **Operational risk** (vendor lock-in, compliance, certification)

Eridu is betting that networking is next. And $200 million says they're right.

---

## Continue Reading

**AI Infrastructure at Scale:**
- [When AI Code Goes to Production: Amazon's 'High Blast Radius' Wake-Up Call](/article/amazon-ai-code-outages-blast-radius) — What happens when AI-generated code hits production without proper safeguards
- [Yann LeCun's $1 Billion Bet Against LLMs](/article/yann-lecun-ami-labs-billion-dollar-bet-world-models) — AMI Labs raises $1.03B for world models (alternative AI architecture)
- [Where AI Infrastructure Money Is Actually Going in 2026](/article/ai-operational-infrastructure-funding-shift-2026) — The shift from model training to operational infrastructure

---

## Know someone building AI infrastructure?

Forward this to a CTO, VP Engineering, or infrastructure leader navigating the AI build-out. They can subscribe at **beri.net/#newsletter** — it's free, twice a week, and I read every reply.

If you were forwarded this, [click here to subscribe](https://beri.net/#newsletter).

---

— Rajesh

Share your thoughts on [LinkedIn](https://www.linkedin.com/in/rberi/) or [Twitter/X](https://x.com/rajeshberi).
