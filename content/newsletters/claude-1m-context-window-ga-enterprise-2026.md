---
title: "Claude 1M Context Now GA: No Premium, 6X More Media"
date: "2026-03-14"
published: true
excerpt: "Anthropic just made 1M context windows standard pricing across Claude Opus 4.6 and Sonnet 4.6. No multiplier: a 900K-token request costs the same per-token rate as a 9K one. Plus 6x more images/PDFs per request. Here's what enterprises are building with it — and why compactions just dropped 15%."
description: "Anthropic made 1M context windows standard pricing. No multiplier, 6x more images/PDFs per request. Enterprises report 15% fewer compactions and simpler agent architectures."
tags: ['Claude', 'Anthropic', 'LLMs', 'Enterprise AI', 'Cost Analysis', 'AI Infrastructure', 'Production', 'Developer Tools']
image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1792&h=1024&auto=format&fit=crop&q=80"
imageCredit: "Photo by [Markus Spiske](https://unsplash.com/@markusspiske) on Unsplash"
type: "curated"
originalUrl: "https://claude.com/blog/1m-context-ga"
originalAuthor: "Anthropic"
originalSource: "Anthropic"
originalPublishDate: "2026-03-13"
---

*Original announcement: [1M context is now generally available for Opus 4.6 and Sonnet 4.6](https://claude.com/blog/1m-context-ga) — Anthropic, March 13, 2026*

Anthropic just removed one of the biggest operational headaches in enterprise AI: **long-context pricing premiums.**

As of yesterday, **Claude Opus 4.6 and Sonnet 4.6** include the full **1 million token context window** at standard pricing. No multiplier. No tiers. A 900K-token request is billed at the same per-token rate as a 9K-token request.

For Opus 4.6, that's **$5/$25 per million tokens** (input/output). For Sonnet 4.6, it's **$3/$15**. Flat rate across the entire window.

Oh, and they also increased media limits **6x**: from 100 images or PDF pages per request to **600**.

This isn't just a pricing change. It's a fundamental shift in how you architect enterprise AI systems. Teams that have been engineering around context limits — chunking documents, building summarization pipelines, implementing aggressive compaction strategies — can now rethink those architectures.

Let me show you what early enterprise users are building with it, why this matters more than the latest benchmark war, and what it means for your AI stack.

![Code on laptop screen](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80)
*Photo by [Clément Hélardot](https://unsplash.com/@clemhlrdt) on Unsplash*

> **⚡ TL;DR:** Claude's 1M context window is now generally available at standard pricing with no long-context premium. Opus 4.6 ($5/$25/M tokens) and Sonnet 4.6 ($3/$15/M) apply flat rates across the full window. Media limits increased 6x to 600 images/PDFs per request. Enterprises report 15% fewer compaction events, simpler agent architectures, and better code review quality. This changes how you design AI workflows: stop chunking, stop summarizing, stop compacting. Just load everything.

## What Changed: One Price, Full Window

Here's what "generally available" means in practice:

**1. One price, full context window**  
No long-context premium. The standard per-token rate applies whether you're using 10K tokens or 1M tokens.

**2. Full rate limits at every context length**  
Your account throughput applies across the entire window. No throttling for long requests.

**3. 6x more media per request**  
Up to **600 images or PDF pages**, up from 100. Available today on Claude Platform, Microsoft Azure Foundry, and Google Cloud Vertex AI.

**4. No beta header required**  
Requests over 200K tokens work automatically. If you're already sending the beta header, it's ignored — no code changes needed.

For **Claude Code users** (Max, Team, and Enterprise), 1M context is included with Opus 4.6. Sessions can use the full window automatically, meaning **fewer compactions and more conversation history preserved.**

![Data center server racks](https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80)
*Photo by [Liyue Qian](https://unsplash.com/@liyueqian) on Unsplash*

## Why 1M Context Matters: Accuracy Across the Full Window

A million tokens of context only matters if the model can recall the right details and reason across them.

Opus 4.6 scores **78.3% on MRCR v2** (Multi-hop Retrieval with Context Reasoning), the highest among frontier models at 1M context length. That means Claude can find a specific clause buried on page 387 of a contract and reason about how it conflicts with language on page 12.

This isn't just about size — it's about **maintained accuracy** across the full window. Long-context retrieval has improved with each model generation.

According to Anthropic's benchmarks, Claude Opus 4.6 and Sonnet 4.6 maintain accuracy across the full 1M window. You can load:
- An entire codebase  
- Thousands of pages of contracts  
- The full trace of a long-running agent (tool calls, observations, intermediate reasoning)

And use it **directly**. No lossy summarization. No context clearing. The full conversation stays intact.

## What Enterprises Are Building: Real Use Cases

Anthropic published testimonials from enterprise users who've been testing 1M context in beta. Here's what they're building:

### Code Review at Scale (Cognition AI - Devin)

Adhyyan Sekhsaria, Founding Engineer at Cognition:

> "Opus 4.6 with 1M context window made our Devin Review agent significantly more effective. Large diffs didn't fit in a 200K context window, so the agent had to chunk context, leading to more passes and loss of cross-file dependencies. With 1M context, we feed the full diff and get higher-quality reviews out of a simpler, more token-efficient harness."

**Translation:** Code review agents can now see the entire pull request — all changed files, dependencies, test coverage — in one pass. No chunking. No missing cross-file logic.

### Debugging Without Context Loss (Datadog/Braintrust Users)

Anton Biryukov, Software Engineer:

> "Claude Code can burn 100K+ tokens searching Datadog, Braintrust, databases, and source code. Then compaction kicks in. Details vanish. You're debugging in circles. With 1M context, I search, re-search, aggregate edge cases, and propose fixes — all in one window."

**Translation:** Long debugging sessions no longer hit compaction walls. You can keep the full investigation history — logs, stack traces, queries, hypotheses — in context without losing details.

### Agent Workflows That Don't Forget (Ellipsis)

Jon Bell, CPO at Ellipsis:

> "Before Opus 4.6's 1M context window, we had to compact context as soon as users loaded large PDFs, datasets, or images — losing fidelity on exactly the work that mattered most. We've seen a **15% decrease in compaction events**. Now our agents hold it all and run for hours without forgetting what they read on page one."

**Translation:** AI agents can handle multi-hour workflows without memory loss. Load the full dataset, process it, iterate — all in one session.

![Legal documents and contracts](https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80)
*Photo by [Scott Graham](https://unsplash.com/@homajob) on Unsplash*

### Legal Case Analysis (Eve - Litigation Support)

Mauricio Wulfovich, ML Engineer at Eve:

> "Eve defaults to 1M context because plaintiff attorneys' hardest problems demand it. Whether it's cross-referencing a 400-page deposition transcript or surfacing key connections across an entire case file, the expanded context window lets us deliver materially higher-quality answers than before."

**Translation:** Legal AI can hold the entire case file — depositions, filings, evidence, correspondence — and find connections across documents without manual chunking.

### Contract Negotiation (Legal Tech)

Bardia Pourvakil, Co-founder and CTO:

> "With Claude's 1M context, an in-house lawyer can bring five turns of a 100-page partnership agreement into one session and finally see the full arc of a negotiation. No more toggling between versions or losing track of what changed three rounds ago."

**Translation:** Track the full revision history of complex contracts in one conversation. See how terms evolved across five redlines without losing context.

### Scientific Research (Future House)

Dr. Alex Wissner-Gross, Co-Founder:

> "Scientific discovery requires reasoning across research literature, mathematical frameworks, databases, and simulation code simultaneously. Claude Opus 4.6's 1M context and expanded media limits let our agentic systems synthesize hundreds of papers, proofs, and codebases in a single pass, helping us dramatically accelerate fundamental and applied physics research."

**Translation:** AI research assistants can hold hundreds of academic papers and codebases in memory simultaneously, finding connections across disciplines without context switching.

## What This Changes for Enterprise AI Architecture

If you've been building enterprise AI systems over the last two years, you've been working around context limits:

- **Chunking documents** into segments and processing separately
- **Summarizing aggressively** to fit into context windows
- **Building retrieval pipelines** to fetch only relevant chunks
- **Implementing compaction strategies** to drop old conversation turns
- **Managing state across multiple API calls** to preserve continuity

With 1M context at flat pricing, many of those workarounds become unnecessary — or at least optional.

**New architecture pattern:**
1. Load everything into context upfront
2. Let the model reason across the full dataset
3. Skip the chunking/summarization/retrieval pipeline

Izzy Miller, AI Research Lead at Graft:

> "We raised our Opus context window from 200k to 500k and the agent runs **more efficiently** — it actually uses **fewer tokens overall**. Less overhead, more focus on the goal at hand."

That's counterintuitive but important: **larger context windows can reduce total token usage** by eliminating the overhead of chunking, retrieval, and re-stating context across multiple turns.

## The Competitive Landscape: How Claude Compares

Let's put this in context against other frontier models (as of March 2026):

| Model | Max Context | Input Price | Output Price | Media Limit |
|-------|-------------|-------------|--------------|-------------|
| **Claude Opus 4.6** | **1M tokens** | **$5/M** | **$25/M** | **600 images/PDFs** |
| **Claude Sonnet 4.6** | **1M tokens** | **$3/M** | **$15/M** | **600 images/PDFs** |
| GPT-5.4 | 256K tokens | $8/M | $40/M | 100 images |
| GPT-5.4-mini | 128K tokens | $0.50/M | $2/M | 50 images |
| Gemini 2.0 Pro | 1M tokens | $3.50/M | $14/M | 500 images |

Claude and Gemini lead on context length. Claude wins on media limits (600 vs. 500). GPT-5.4 lags significantly on both context size and pricing efficiency for long-context work.

If your workload involves large documents, multi-file code review, or long agent traces, Claude's flat pricing makes it the most cost-effective option at scale.

We covered the broader model comparison in our [GPT-5.4 vs. Claude Opus 4.6 enterprise decision guide](/article/gpt-5-4-vs-claude-opus-4-6-enterprise-guide). The context window advantage solidifies Claude's position for document-heavy enterprise use cases.

## What to Do Next: Rethink Your AI Stack

If you're building enterprise AI systems, here's what to evaluate:

**1. Audit your context management complexity**  
How much engineering effort goes into chunking, summarization, and retrieval? Could you simplify by loading full documents into context?

**2. Test long-context workloads with flat pricing**  
Load your largest contracts, codebases, or case files into Claude 1M context. Measure token usage vs. your current chunked approach. You might use fewer tokens overall.

**3. Redesign agent workflows**  
Stop compacting aggressively. Let agents hold their full working memory across multi-hour sessions. Measure quality improvement from preserved context.

**4. Evaluate media-heavy use cases**  
With 600 images/PDFs per request, applications like multi-document compliance review, visual QA across slide decks, and image-heavy research become viable without batching.

**5. Compare pricing across workloads**  
For long-context work, Claude's flat pricing beats GPT-5.4's per-token costs. For short bursts, GPT-5.4-mini might still win. Model your actual usage patterns.

If you're already using Claude, the 1M window is live today. No beta header. No pricing changes. Just more capacity at the same cost.

---

## Continue Reading

**LLM Platform Comparisons:**
- [GPT-5.4 vs. Claude Opus 4.6: Enterprise Decision Guide](/article/gpt-5-4-vs-claude-opus-4-6-enterprise-guide) — Detailed comparison of capabilities, pricing, and use cases
- [How to Choose GPT-5.4 vs. Claude Opus 4.6](/article/how-to-choose-gpt-5-4-vs-claude-opus-4-6-decision-guide) — Decision framework for model selection
- [AI Agents in Enterprise Adoption](/article/ai-agents-enterprise-adoption-2026) — Building production agent systems with long-running context

---

## Good AI analysis is hard to find.

If you found this useful, your peers probably will too. Forward it — they can subscribe at **beri.net/#newsletter**.

If you were forwarded this, [click here to subscribe](https://beri.net/#newsletter).

---

— Rajesh

*Connect with me on [LinkedIn](https://www.linkedin.com/in/rberi/) or [Twitter/X](https://x.com/rajeshberi)*
