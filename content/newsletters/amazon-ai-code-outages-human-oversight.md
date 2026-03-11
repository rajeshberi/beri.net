---
title: "Amazon's AI Code Created Outages. Now Humans Must Sign Off."
date: 2026-03-11T13:00:00Z
description: "After four high-severity incidents in a week, Amazon mandates human review of AI-generated code. The real cost of moving fast and breaking things—when 'things' is your production infrastructure."
author: "Rajesh Beri"
categories: ["AI", "Enterprise", "DevOps"]
tags: ["Amazon", "AWS", "AI-Coding", "Site-Reliability", "Kiro", "DevOps", "Production-Incidents", "Code-Review"]
featured_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
featured_image_credit: "Photo by Markus Spiske on Unsplash"
draft: false
---

Amazon experienced four high-severity outages in a single week. Internal documents pointed to "GenAI-assisted changes" as a contributing factor. Then those references mysteriously disappeared from the briefing notes.

Now the company is implementing "temporary safety practices"—corporate speak for "humans must review AI code before it touches production."

## What Actually Happened

According to [CNBC](https://www.cnbc.com/2026/03/10/amazon-plans-deep-dive-internal-meeting-address-ai-related-outages.html) and [The Register](https://www.theregister.com/2026/03/10/amazon_ai_coding_outages/), Dave Treadwell, Amazon's SVP of eCommerce Foundation, convened a mandatory "deep dive" meeting Tuesday to address what he called a concerning trend: multiple Severity 1 incidents affecting the retail website and app.

The smoking gun? An internal briefing document viewed by [The Financial Times](https://www.ft.com/content/7cab4ec7-4712-4137-b602-119a44f771de) referenced a "trend of incidents" characterized by "high blast radius" and "Gen-AI assisted changes."

That bullet point was deleted before the meeting.

Amazon's public response has been swift and emphatic: these outages weren't AI's fault. One spokesperson told The Register, "This brief event was the result of user error – specifically misconfigured access controls – not AI."

The Register noted Amazon's response time to their inquiry: five minutes. For context, that's faster than most companies respond to active security incidents.

## The Pattern Is Clear

This isn't Amazon's first rodeo with AI-assisted code problems:

- **Last Thursday**: Amazon's website went down for six hours. The company attributed it to "a software code deployment" without elaborating.
- **December 2025**: AWS Cost Explorer went offline after [Kiro](https://www.cnbc.com/2025/07/14/aws-launches-kiro-ai-coding-program.html), Amazon's AI coding tool, made system changes. Amazon again blamed "user error."
- **October 2025**: Major AWS outage that James Gosling (yes, *that* James Gosling—Java's creator and former AWS distinguished engineer) attributed to layoffs of infrastructure teams.

Notice the pattern? Every incident has a plausible non-AI explanation. Yet Amazon is now requiring additional human review specifically for "GenAI-assisted production changes."

If AI wasn't the problem, why the new guardrails?

![Developer reviewing code on multiple monitors](https://images.unsplash.com/photo-1461749280684-dccba630e2f6)
*Photo by Ilya Pavlov on Unsplash*

## The Real Cost: Humans and Infrastructure

Here's what makes this story particularly pointed: Amazon has cut 30,000+ corporate jobs since late 2022, with 16,000 eliminated just this January. Meanwhile, the company is planning $200 billion in capital expenditures this year for AI infrastructure—more than any tech peer.

Corey Quinn, chief cloud economist at Duckbill, put it bluntly in [The Register](https://www.theregister.com/2026/02/24/amazon_blame_human_not_ai/): "AWS would rather have the world believe their engineers are incompetent than admit their artificial intelligence made a mistake."

James Gosling went further in a LinkedIn post, saying Amazon's layoffs demolished teams that didn't directly generate revenue but were critical for infrastructure stability:

> "Back when the AI hype explosion happened and I was still at AWS I was astonished by how the structure of the business got torqued around, and how teams got demolished. The ROI analysis was disastrously shortsighted."

Translation: Amazon bet that AI could replace human expertise in maintaining complex distributed systems. That bet is now causing Severity 1 incidents.

## What "Controlled Friction" Actually Means

Treadwell's memo to employees is corporate-speak poetry:

> "We are implementing temporary safety practices which will introduce controlled friction to changes in the most important parts of the Retail experience, in parallel we will invest in more durable solutions including both deterministic and agentic safeguards."

Let me translate: "We're making humans sign off on AI code because we can't trust it yet. Also, we're going to build AI to watch the AI."

The irony is thick. Amazon is:
1. Cutting engineering headcount
2. Increasing AI-generated code
3. Experiencing more incidents
4. Adding human review as a "temporary" fix
5. Planning to automate that review with... more AI

![Warning signs and barriers](https://images.unsplash.com/photo-1621905251189-08b45d6a269e)
*Photo by Erik Mclean on Unsplash*

## The Enterprise Reality Check

I've talked to a dozen CTOs in the past month. Every one of them is piloting AI coding tools—GitHub Copilot, Cursor, Amazon's own Kiro. And every one of them has the same question: "How do we prevent our junior engineers from committing AI-generated garbage to production?"

Amazon's answer, apparently, is to learn the hard way.

The real lesson here isn't that AI coding tools are bad. It's that **AI coding tools are immature, and treating them as production-ready is expensive**.

Here's what mature AI code deployment looks like:
- Human review for all AI-generated changes (not "temporary," permanent)
- Comprehensive test coverage before AI touches production
- Incremental rollouts with automated rollback
- Clear attribution so you know *what* code was AI-generated
- Senior engineering oversight, not junior devs copy-pasting suggestions

Amazon is implementing some of this now. After four Severity 1 incidents.

## The $200 Billion Question

Amazon's massive AI infrastructure spend makes sense if you believe AI will replace human labor at scale. But what if it doesn't? What if AI coding tools—like most emerging technologies—are productivity multipliers for skilled engineers rather than replacements?

Then you've created a resource allocation disaster: fewer experienced engineers to catch AI mistakes, more AI-generated code that needs review, and a culture that prioritizes speed over stability.

The tech industry has a saying: "Move fast and break things." That works when you're a startup with nothing to lose. When you're Amazon—running a website that processes billions in daily transactions—"breaking things" means revenue loss, customer trust damage, and emergency meetings with very unhappy executives.

![Infrastructure and pipes representing complex systems](https://images.unsplash.com/photo-1581094271901-8022df4466f9)
*Photo by Marek Piwnicki on Unsplash*

## What This Means for Your Organization

If Amazon—with infinite resources and some of the world's best engineers—is struggling with AI-generated code in production, what does that mean for your team?

Three takeaways:

**1. Don't trust AI code blindly.** Even if it passes tests. Even if senior engineers are using it. Implement mandatory review processes *before* you have incidents, not after.

**2. Preserve institutional knowledge.** The engineers who understand your infrastructure's edge cases and failure modes are more valuable than ever. Don't cut them to fund AI experiments.

**3. Watch the quiet changes.** Amazon deleted references to AI in their internal docs. Your engineers might be shipping AI-generated code without proper review right now, and you won't know until something breaks.

The hype cycle says AI will automate software engineering. The reality says we're adding a powerful but error-prone tool to an already complex workflow—and most organizations aren't ready for the consequences.

## The Bottom Line

Amazon is now requiring human oversight for AI-generated code changes. That's the headline.

The subtext? Even Amazon—the company that *sells* AI coding tools—doesn't trust them enough to run without human supervision.

If you're a CTO or engineering leader, that should tell you everything you need to know about the current state of AI coding tools. They're useful. They're powerful. They're not ready to replace human judgment in production environments.

And if you're betting your infrastructure stability on them, you're about to learn that lesson the expensive way—just like Amazon did.

---

*What's your organization's policy on AI-generated code? Have you had incidents tied to AI coding tools? I'd love to hear from engineering leaders navigating this. You can find me on [LinkedIn](https://linkedin.com/in/rajeshberi).*
