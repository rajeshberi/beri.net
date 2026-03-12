---
title: "I Let Claude Run My Desktop For a Week. Here's What Happened."
date: "2026-03-01"
published: true
excerpt: "Anthropic launched 'coworker' plugins for finance, HR, legal, and engineering. I tested them on real workflows and tracked every minute. The ROI numbers are absurd — but there's a catch."
tags: ['Anthropic', 'Claude', 'Developer Tools', 'Engineering', 'Enterprise', 'Finance', 'HR', 'IT', 'Legal', 'Marketing', 'Operations', 'Product Management', 'ROI', 'Sales']
image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1792&h=1024&auto=format&fit=crop&q=80"
imageCredit: "Photo by [Ales Nesetril](https://unsplash.com/@alesnesetril) on Unsplash"
type: "original"
---

Three things I wish someone had told me before I gave Claude access to my desktop:

1. It's faster than I expected
2. It's weirder than I expected
3. It tried to reorganize my Downloads folder without asking (we had words)

Anthropic just launched a wave of "coworker" plugins that embed Claude directly into the business tools your teams use every day — Google Workspace, DocuSign, FactSet, MSCI, LegalZoom, Slack, S&P Global, LSEG. Claude Cowork — the computer-use interface that lets Claude operate your desktop autonomously — is now available on macOS for $20/month.

![Person working at a desk with multiple monitors showing data dashboards](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)
*Claude Cowork in action: it controls your desktop like a slightly overeager intern who never sleeps.*

> **⚡ TL;DR:** Claude Cowork at $20/mo delivers 42-217x ROI depending on department. Finance: 22-min M&A analysis (vs 5 hours). Legal: 12 contracts in 35 minutes (vs 20 hours). Marketing: 62-83x ROI on content ops. The math works even at a quarter of these numbers. But human review isn't optional — it's the whole point.

This isn't a chatbot upgrade. This is Anthropic saying, "We're done being a developer tool company. We want to be inside every department."

So I did what any reasonable person would do: I tested it on real work, tracked the time savings, and calculated whether the ROI justifies adding another $20/seat/month to the software budget. Spoiler: the math is kind of insane.

## Finance: Where I Almost Felt Bad For Analysts

**The test:** I had Claude analyze a 47-page M&A term sheet against comparable transactions data from S&P Global. Find non-standard provisions, benchmark valuation multiples, draft a summary memo.

A senior analyst estimated this would normally take 4-6 hours.

**Claude did it in 22 minutes.**

I'm going to let that sink in for a second.

The analysis caught 3 out of 4 non-standard provisions (missing one unusual earn-out structure), the benchmarking was accurate against published data, and the memo needed light editing for tone. The analyst rated it "85% done — I spent 45 minutes refining versus 5 hours building from scratch."

![Financial charts and data on a screen](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80)
*47-page M&A term sheet → 22-minute analysis. I checked the output three times because I didn't believe it.*

**The ROI math that made my spreadsheet blush:**
- Financial analyst at $120K/year ($62/hour fully loaded)
- Saving 4 hours on a task that happens 3-4 times/week
- Annual recaptured time: $40,000-52,000
- Claude Pro cost: $240/year
- **ROI: 167-217x per analyst**

Before you start drafting headcount reduction memos — stop. Claude flagged its own uncertainty on the earn-out analysis, which is exactly the right behavior. But a junior analyst might miss the flag and submit the work as complete. **Human review isn't optional. It's the whole point.** Claude accelerates; it doesn't replace.

> **The moment I knew this was real:** I watched Claude pull FactSet data, cross-reference it with the term sheet, and generate a comparison table — all while I was getting coffee. When I came back, it had also drafted three follow-up questions for the deal team that I hadn't thought to ask. One of them was genuinely insightful.

## Legal: 12 Contracts in 35 Minutes (With Receipts)

**The test:** 12 vendor contracts, average 30 pages each. Find provisions that deviate from standard terms across data privacy, liability caps, IP ownership, and termination rights.

A paralegal would need 15-20 hours for this.

**Claude: 35 minutes.** It identified 34 deviations. Our legal team confirmed 31 were genuine issues. 3 were false positives (acceptable variations flagged as deviations). It missed 2 subtle deviations in indemnification language buried in amendment schedules.

**ROI:** Paralegal at $75K/year, quarterly vendor reviews plus weekly contract drafting = $20,000-25,000/year recaptured. At $240/year for Claude Pro, that's **83-104x return.**

The miss on the amendment schedules bugs me, though. Those are exactly the kind of buried provisions that cause problems 18 months later. Claude is excellent at the 90% case. That last 10% still needs human eyes.

**Forrester's Charlie Dai nailed it:** "Enterprises should measure whether the plug-ins reduce cycle time, manual effort, or error rates in specific workflow steps rather than simply generating similar outputs." He also warned about "broad permissions, opaque agent actions, and unintended data blending across finance, HR, and collaboration systems." He's right. More on that in the governance section below.

## HR: Good, With One Uncomfortable Asterisk

**The test:** Draft job descriptions for 5 roles, screen 50 resumes, generate a ranked shortlist with rationale.

Job descriptions were solid — minimal editing needed. Resume screening correctly identified top candidates in 4 out of 5 roles. The miss? A career-changer whose relevant experience was described in non-standard terms. Claude weighted keyword matching too heavily over transferable skills.

**ROI: 42-54x per HR seat** ($10,000-13,000/year recaptured vs. $240/year).

**The asterisk that keeps me up at night:** AI resume screening carries real legal risk. The EEOC has made it clear that AI-driven hiring tools must comply with Title VII. If Claude's screening systematically disadvantages protected classes, **your organization is liable — not Anthropic.** Always audit AI screening results for disparate impact. Use Claude to accelerate human review, not replace it.

I know I keep saying "don't replace humans." It's because I've watched three companies try to fully automate hiring screening, and all three ended up in conversations with their legal teams that nobody enjoyed.

## Marketing: The Results That Surprised Me

![Person writing content on a laptop with coffee nearby](https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80)
*Content creation at 3x speed. But the human touch still matters more than you think.*

**The test:** Generate a complete monthly content calendar — 4 blog posts (outlines), 20 LinkedIn posts, 8 email sequences, and a competitive analysis.

The content calendar was strategically sound. LinkedIn posts were strong with clear brand guidelines in the prompt. Blog outlines needed SEO refinement. Email sequences needed the most human touch — personalization felt generic without deeper CRM integration.

**ROI: 62-83x** ($15,000-20,000/year recaptured vs. $240/year).

Here's what surprised me: the competitive analysis was genuinely useful. Not just "Company X launched Feature Y" but actual strategic pattern recognition across competitors. Claude connected dots I hadn't considered.

## The Comparison Table You Actually Need

| Feature | Claude Cowork ($20/mo) | Microsoft Copilot ($30/mo) | Google Gemini ($20/mo) | ChatGPT Team ($30/mo) |
|---------|----------------------|---------------------------|----------------------|----------------------|
| Desktop control | ✅ Native (macOS) | ❌ | ❌ | ✅ (75% OSWorld) |
| Financial data plugins | ✅ FactSet, MSCI, S&P | ⚠️ Custom setup | ❌ | ✅ Moody's, MSCI |
| Legal (DocuSign) | ✅ Native | ⚠️ Limited | ❌ | ⚠️ Limited |
| Google Workspace | ✅ Full | ⚠️ Teams-first | ✅ Native | ⚠️ Partial |
| Microsoft 365 | ⚠️ Partial | ✅ Full native | ⚠️ Partial | ⚠️ Partial |
| Coding (SWE-Bench) | 80.8% (Best) | ~72% | 80.6% | 77.2% |
| Autonomous tasks | ✅ | ❌ | ❌ | ⚠️ Limited |

> **📌 Claude Cowork ROI by Department (screenshot this):**
> - Finance: **167-217x** (22-min M&A analysis vs 5 hours)
> - Legal: **83-104x** (12 contracts in 35 minutes vs 15-20 hours)
> - Marketing: **62-83x** (full content calendar generation)
> - HR: **42-54x** (resume screening + job descriptions)
> - Even at half these numbers, the math works.

**Translation:** Claude Cowork wins on business integration depth and coding. Copilot wins if you're all-Microsoft. Gemini wins on cost for Google Workspace shops. ChatGPT wins on computer use and general knowledge work.

## The Governance Section You'll Want to Skip But Shouldn't

I know. Governance isn't sexy. Neither is getting breached because your AI agent had admin access to your document management system.

Five things you need to do before scaling Claude Cowork:

1. **Audit every plugin's permissions.** Each connector is an attack surface. Review quarterly. Disable what you're not using.
2. **Create dedicated AI service accounts.** Don't let Claude piggyback on human credentials. Clean audit trail or nothing.
3. **Log everything.** Every action Claude takes should be reviewable. Most enterprises don't have this infrastructure yet. Build it first.
4. **Draw the autonomy line.** Drafting a contract? Fine. Sending it for signature? Human approval. Where's your line?
5. **Have a backup plan.** This week, the US government [terminated Anthropic's federal contracts](/newsletter/us-ai-guidelines-anthropic-pentagon-clash). If your workflows depend on Claude, what's your contingency?

## The Bottom Line

At $20/month per seat, Claude Cowork delivers 40-200x ROI across every department I tested. Even if you cut my estimates in half and then half again, the math still works.

**But ROI isn't the real question. Readiness is.**

Claude Cowork delivers the most value to teams that:
- Have clear, repeatable workflows
- Can define quality standards explicitly
- Have someone who can configure plugins and set guardrails
- Are willing to invest 2-3 weeks in setup before expecting magic

**Where to start:** Find your team's most repetitive, highest-volume workflow. The one where people say "I can't believe I'm doing this manually." Deploy Claude there. Measure for 30 days. Then decide.

The AI coworker era isn't coming. It showed up Monday and already reorganized the shared drive.

---

*I'm tracking Claude Cowork performance metrics over the next 90 days. If you're running a similar evaluation, I'd love to compare notes. What department are you testing first?*

---

## Continue Reading

**More on Claude and enterprise AI:**
- [Claude Scheduled Tasks: Automation Breakthrough](/article/claude-cowork-scheduled-tasks-loop) — The latest feature that makes Claude even more powerful
- [GPT-5.4 vs Claude Opus 4.6: Model Comparison](/article/gpt-5-4-vs-claude-opus-4-6-enterprise-guide) — How Claude stacks up against GPT-5.4
- [Anthropic vs Pentagon: Vendor Risk](/article/anthropic-pentagon-vendor-risk) — Why the government clash matters for Claude users
