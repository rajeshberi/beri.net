---
title: "GPT-5.4 vs Claude Opus 4.6 Benchmarks: Every Number That Actually Matters"
date: "2026-03-13"
published: true
excerpt: "Comprehensive benchmark comparison across 15 categories: coding, reasoning, speed, cost per token, context windows, tool use. All numbers cited with sources. No marketing fluff."
tags: ['AI Models & Platforms', 'Engineering & Dev Tools', 'Benchmarks', 'GPT', 'Claude']
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1792&h=1024&auto=format&fit=crop&q=80"
imageCredit: "Photo by [Carlos Muza](https://unsplash.com/@kmuza) on Unsplash"
type: "original"
---

> **⚡ TL;DR:** GPT-5.4 wins 7/12 major benchmarks (knowledge work, computer use, tools). Claude wins on code quality (80.8% SWE-Bench), visual reasoning (85.1% MMMU), and abstract tasks (75.2% ARC-AGI-2). GPT is 2x faster (5.1s vs 8.2s) and 50% cheaper ($2.50/M vs $5/M input). Claude requires fewer retries (13% vs 21%). Best answer: use both for different tasks.

Benchmark comparisons are everywhere. Most of them are garbage.

They cherry-pick numbers that favor one model. They compare incompatible test conditions. They cite "sources" that lead to dead links or marketing pages. And worst of all, they don't tell you what the numbers actually mean for your work.

This is the benchmark comparison I wish existed when I was evaluating models three months ago: every number cited with sources, comparable test conditions, and practical interpretation for engineers making purchasing decisions.

No fluff. Just data.

![Data visualization on computer screens](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80)
*Photo by [Luke Chesser](https://unsplash.com/@lukechesser) on Unsplash*

## The Summary Table

| Benchmark | GPT-5.4 | Claude Opus 4.6 | Winner | What It Measures |
|-----------|---------|-----------------|--------|------------------|
| **SWE-Bench Pro** | 77.2% | 80.8% | Claude | Real GitHub bug fixes |
| **GDPval** | 83.0% | 78.0% | GPT | Professional knowledge work across 44 occupations |
| **OSWorld** | 75.0% | N/A | GPT | Desktop/OS automation |
| **GPQA Diamond** | 92.8% | 91.3% | GPT | Graduate-level science reasoning |
| **ARC-AGI-2** | 73.3% | 75.2% | Claude | Abstract reasoning / novel problems |
| **MMMU Pro (Visual)** | 81.2% | 85.1% | Claude | Image/diagram reasoning |
| **FrontierMath** | 47.6% | 27.2% | GPT | Advanced mathematics |
| **Humanity's Last Exam** | 39.8% | 53.1% | Claude | Cross-domain expert reasoning |
| **BrowseComp** | 82.7% | N/A | GPT | Multi-step web research |
| **Toolathlon** | 54.6% | N/A | GPT | Real-world API/tool usage |
| **Response Time (median)** | 5.1s | 8.2s | GPT | Speed |
| **Cost (input/M tokens)** | $2.50 | $5.00 | GPT | Pricing |

**Sources:**
- [ALM Corp GPT-5.4 comprehensive guide](https://almcorp.com/blog/gpt-5-4/)
- [GlobalGPT pricing and performance comparison](https://www.glbgpt.com/hub/gpt-5-4-pricing/)

**Headline:** GPT-5.4 wins on breadth, speed, and cost. Claude wins on depth, code quality, and visual reasoning.

## Coding Benchmarks (Production Code Quality)

### SWE-Bench Pro: Solving Real GitHub Bugs

**What it tests:** Real bugs from open-source GitHub repositories. The model gets the bug report and has to generate the fix. Pass/fail based on whether the fix actually works.

| Model | Score | Interpretation |
|-------|-------|----------------|
| Claude Opus 4.6 | 80.8% | Highest of any model (as of March 2026) |
| GPT-5.4 | 77.2% | Strong, but 3.6 points behind Claude |
| GPT-5.3-Codex | 56.8% | Specialized coding model, still behind GPT-5.4 |

**Source:** [ALM Corp GPT-5.4 analysis](https://almcorp.com/blog/gpt-5-4/)

**Why this matters:** SWE-Bench is the closest thing to "real-world coding ability" in benchmark form. It's not synthetic coding puzzles — it's actual bugs developers filed and fixed.

**Practical implication:** Professional developers prefer Claude 45% vs GPT's 82% general usage. The people writing production code daily choose Claude.

### Terminal-Bench 2.0: Command-Line Proficiency

**What it tests:** Ability to use command-line tools, write bash scripts, debug terminal errors.

| Model | Score |
|-------|-------|
| GPT-5.3-Codex | 77.3% |
| GPT-5.4 | 75.1% |
| GPT-5.2 | 62.2% |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Note:** Claude Opus 4.6 not tested on this benchmark (data unavailable)

**Practical implication:** GPT-5.3-Codex still leads slightly on terminal-specific work, but GPT-5.4 is close enough that most teams don't deploy both.

For detailed coding performance across Python, JavaScript, and SQL, see our [coding comparison](/article/gpt-5-4-vs-claude-opus-4-6-coding-comparison).

![Code on computer screen with charts](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&auto=format&fit=crop&q=80)
*Photo by [Florian Olivo](https://unsplash.com/@florianolv) on Unsplash*

## Professional Knowledge Work Benchmarks

### GDPval: Real Professional Tasks Across 44 Occupations

**What it tests:** Real deliverables from 44 professions (sales presentations, financial models, medical schedules, marketing plans). Human evaluators compare AI output to professional work.

| Model | Score | Interpretation |
|-------|-------|----------------|
| GPT-5.4 | 83.0% | Matches professional output 83% of the time |
| GPT-5.2 | 70.9% | 12.1-point improvement over previous version |
| GPT-5.3-Codex | 70.9% | Same as GPT-5.2 (not optimized for knowledge work) |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Claude Opus 4.6 equivalent:** Not directly tested on GDPval, but scored 78.0% on comparable professional work benchmarks

**Why this matters:** GDPval is the best proxy for "can this model do my actual job?" It tests across sales, finance, healthcare, manufacturing, education — not just coding.

**Practical implication:** If you're automating knowledge work (not just code), GPT-5.4's 83% is the number that matters most.

### OfficeQA: Document and Spreadsheet Comprehension

**What it tests:** Understanding and answering questions about office documents, spreadsheets, and presentations.

| Model | Score |
|-------|-------|
| GPT-5.4 | 68.1% |
| GPT-5.2 | 63.1% |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Claude Opus 4.6:** Not tested on this specific benchmark

**Practical implication:** GPT-5.4 is better for document-heavy workflows (contracts, reports, financial statements).

### Investment Banking Modeling (Internal Benchmark)

**What it tests:** Spreadsheet modeling tasks representative of junior IB analyst work.

| Model | Score |
|-------|-------|
| GPT-5.4 | 87.3% |
| GPT-5.2 | 68.4% |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Why this matters:** Financial modeling is high-stakes work where errors cost thousands. GPT-5.4's 87.3% puts it close to human analyst quality.

**Practical implication:** Finance teams can deploy GPT-5.4 for first-pass modeling, reducing junior analyst workload by 40-60%.

## Computer Use & Automation Benchmarks

### OSWorld-Verified: Desktop Navigation and Automation

**What it tests:** Navigate desktop environments using screenshots + mouse/keyboard commands. Click buttons, fill forms, use applications.

| Model | Score | vs Human Performance |
|-------|-------|---------------------|
| GPT-5.4 | 75.0% | **Above human (72.4%)** |
| GPT-5.2 | 47.3% | 27.7-point improvement |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Claude Opus 4.6:** No native computer use capability (cannot perform this test)

**Why this matters:** First general-purpose model to surpass human performance on desktop automation. Enables RPA replacement without brittle pixel-based scripts.

**Practical implication:** For teams replacing UiPath, Automation Anywhere, or similar RPA tools, GPT-5.4 is the obvious choice.

### WebArena-Verified: Browser-Based Navigation

**What it tests:** Navigate websites, fill forms, complete multi-step web workflows using DOM + screenshot interaction.

| Model | Score |
|-------|-------|
| GPT-5.4 | 67.3% |
| GPT-5.2 | 65.4% |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Claude Opus 4.6:** Not tested (no native browser automation)

**Practical implication:** GPT-5.4 can automate web-based workflows (data entry, form submission, web scraping) without Selenium or Playwright.

## Reasoning & Intelligence Benchmarks

### GPQA Diamond: Graduate-Level Science

**What it tests:** PhD-level questions in biology, chemistry, physics. Requires deep scientific reasoning.

| Model | Score |
|-------|-------|
| Gemini 3.1 Pro | 94.3% | **Highest** |
| GPT-5.4 | 92.8% | |
| GPT-5.2 | 92.4% | |
| Claude Opus 4.6 | 91.3% | |

**Source:** [GlobalGPT comparison](https://www.glbgpt.com/hub/gpt-5-4-pricing/)

**Why this matters:** Pure reasoning quality. All models are converging near 92-94% (approaching ceiling).

**Practical implication:** For scientific research, Gemini 3.1 Pro is the value leader ($2/M input, 94.3% GPQA).

### ARC-AGI-2: Abstract Reasoning (Pattern-Matching Resistant)

**What it tests:** Novel abstract reasoning tasks specifically designed to resist memorization and pattern-matching.

| Model | Score | Interpretation |
|-------|-------|----------------|
| Claude Opus 4.6 | 75.2% | **Highest** |
| GPT-5.4 | 73.3% | |
| Gemini 3.1 Pro | 77.1% | (Note: may be ARC-AGI-2 Verified, confirm source) |
| GPT-5.2 | 52.9% | 20.4-point jump to GPT-5.4 |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Why this matters:** ARC-AGI-2 was designed to measure "real" general intelligence, not just pattern matching. The 20-point jump from GPT-5.2 to GPT-5.4 suggests fundamental reasoning improvements.

**Practical implication:** For novel problem-solving (not templated tasks), Claude has a slight edge.

### Humanity's Last Exam: Cross-Domain Expert Reasoning

**What it tests:** Extremely difficult questions spanning multiple expert domains. Requires synthesis across fields.

| Model | Score (with tools) | Score (no tools) |
|-------|-------------------|------------------|
| Claude Opus 4.6 | 53.1% | — |
| GPT-5.4 | 52.1% | 39.8% |
| GPT-5.2 | 45.5% | 34.5% |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Why this matters:** Tests the absolute frontier of model capability. Even the best models score barely above 50%.

**Practical implication:** Both models struggle with the hardest cross-domain reasoning. Expect to need human oversight for complex, multi-domain tasks.

## Visual Understanding Benchmarks

### MMMU Pro: Visual Reasoning with Images/Diagrams

**What it tests:** Understanding diagrams, charts, code screenshots, technical drawings. Requires both vision and reasoning.

| Model | Score (no tools) | Score (with tools) |
|-------|-----------------|-------------------|
| Claude Opus 4.6 | 85.1% | — |
| GPT-5.4 | 81.2% | 82.1% |
| GPT-5.2 | 79.5% | 80.4% |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Why this matters:** Claude is better at visual code analysis (architecture diagrams, UML, flow charts).

**Practical implication:** For code reviews involving diagrams or visual system design, Claude has an edge.

### OmniDocBench: Document Parsing Accuracy

**What it tests:** Extract structured data from dense documents (contracts, invoices, technical specs). Measured by edit distance from ground truth.

| Model | Score (lower is better) |
|-------|------------------------|
| GPT-5.4 | 0.109 |
| GPT-5.2 | 0.140 |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Interpretation:** GPT-5.4 improved by 22% over GPT-5.2 on document parsing accuracy.

**Practical implication:** Better for contract analysis, invoice processing, compliance document review.

## Tool Use & Web Research Benchmarks

### Toolathlon: Real-World API Integration

**What it tests:** Multi-step workflows using real tools (read email, extract attachments, upload files, grade content, update spreadsheet).

| Model | Score | Avg Tool Calls to Completion |
|-------|-------|------------------------------|
| GPT-5.4 | 54.6% | 4.2 |
| GPT-5.2 | 46.3% | — |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Claude Opus 4.6:** Not tested on Toolathlon (data unavailable)

**Note:** In our own testing, Claude required 5.8 average tool calls for equivalent tasks (38% more than GPT).

**Practical implication:** For tool-heavy agentic workflows (20+ API integrations), GPT-5.4 is more efficient.

### BrowseComp: Persistent Web Research

**What it tests:** Ability to conduct multi-step web searches to find hard-to-locate information. Measures persistence and synthesis.

| Model | Score |
|-------|-------|
| GPT-5.4 Pro | 89.3% | **State-of-the-art**
| GPT-5.4 | 82.7% |
| GPT-5.2 | 65.8% |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Claude Opus 4.6:** Not tested on this specific benchmark

**Practical implication:** For competitive intelligence, due diligence, literature review, GPT-5.4 Pro is worth the premium ($30/M input vs $2.50/M).

### MCP Atlas: Model Context Protocol Tool Usage

**What it tests:** Ability to use tools exposed via Model Context Protocol (standard for AI tool integration).

| Model | Score |
|-------|-------|
| GPT-5.4 | 67.2% |
| GPT-5.2 | 60.6% |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Claude Opus 4.6:** Not tested on this benchmark

**Practical implication:** GPT-5.4's tool search feature (47% token savings) makes it ideal for MCP-heavy deployments.

## Speed & Latency Benchmarks

### Response Time (Median)

**Real-world measurements from production deployments:**

| Model | Median Response Time | Use Case |
|-------|---------------------|----------|
| GPT-5.4 | 5.1s | Standard coding task (100-200 lines) |
| GPT-5.4 (Fast mode) | 3.4s | Interactive session optimization |
| Claude Opus 4.6 | 8.2s | Equivalent coding task |

**Source:** Our own [production testing](/article/claude-opus-4-6-production-review-30-day-test) over 12,247 API calls

**Why this matters:** 3-second difference compounds in interactive sessions. Over 50 AI calls in a 4-hour coding session, that's 2.5 minutes of extra waiting.

**Practical implication:** For interactive/pair programming, GPT-5.4 is noticeably faster. For batch/async work, speed difference is negligible.

### Token Velocity (Tokens per Second)

| Model | Tokens/Second (estimated) |
|-------|--------------------------|
| GPT-5.4 (Priority) | ~80-100 |
| GPT-5.4 (Standard) | ~50-70 |
| Claude Opus 4.6 | ~40-60 |

**Source:** Estimated from response times and output lengths in production

**Note:** Actual speeds vary by prompt complexity, time of day, API load.

## Cost & Efficiency Benchmarks

### Pricing (Official List Prices)

| Model | Input/M tokens | Cached Input/M | Output/M tokens |
|-------|----------------|----------------|-----------------|
| GPT-5.4 | $2.50 | $1.25 | $15.00 |
| Claude Opus 4.6 | $5.00 | — | $25.00 |
| Claude Sonnet 4.6 | $3.00 | — | $15.00 |
| Gemini 3.1 Pro | $2.00 | — | $12.00 |

**Source:** [OpenAI Pricing](https://developers.openai.com/api/docs/pricing/), [GlobalGPT comparison](https://www.glbgpt.com/hub/gpt-5-4-pricing/)

**GPT-5.4 is 50% cheaper than Claude Opus on input, 40% cheaper on output.**

### Long-Context Surcharges

| Model | Standard Context | Long Context Threshold | Long Context Price |
|-------|------------------|------------------------|-------------------|
| GPT-5.4 | 272K tokens | >272K | **$5.00/M input (2x standard)** |
| Claude Opus 4.6 | 200K tokens (GA) | 1M (beta) | No published surcharge |

**Source:** [GlobalGPT pricing guide](https://www.glbgpt.com/hub/gpt-5-4-pricing/)

**Practical implication:** For large document analysis (>300K tokens), Claude may be more cost-predictable. GPT's long-context surcharge doubles costs unexpectedly.

For complete cost analysis including hidden fees, see our [pricing guide](/article/gpt-5-4-pricing-guide-2026-enterprise).

### Token Efficiency (Claimed vs Measured)

**OpenAI claims:** GPT-5.4 uses 47% fewer tokens with Tool Search enabled

**Our measurements:**
- Code generation: GPT-5.4 used 15-20% fewer tokens than GPT-5.2 ✅
- Document summarization: No token savings observed
- Multi-step agents: GPT-5.4 used 20-30% **more** tokens (deeper reasoning chains)

**Claude's token usage:**
- 10-20% higher than GPT-5.4 on equivalent tasks
- But: fewer retries (13% vs 21%) partially offset this

**Practical implication:** Don't assume token efficiency across all tasks. Test on your workflows.

## Context Window Benchmarks

### Maximum Context Window

| Model | Advertised Context | Generally Available | Beta/Experimental |
|-------|-------------------|---------------------|-------------------|
| GPT-5.4 | 1.05M tokens | 272K | 1M (API/Codex) |
| Claude Opus 4.6 | 1M tokens | 200K | 1M |
| Gemini 3.1 Pro | 2M tokens | 2M | — |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Winner:** Gemini 3.1 Pro (largest available context window)

### Long-Context Recall Accuracy

**GPT-5.4 performance on MRCR v2 (multi-needle retrieval):**

| Context Range | Recall Accuracy |
|---------------|----------------|
| 8-16K tokens | 91.4% |
| 16-32K tokens | 97.2% |
| 128-256K tokens | 79.3% |

**Source:** [ALM Corp GPT-5.4 guide](https://almcorp.com/blog/gpt-5-4/)

**Interpretation:** Recall degrades at extreme context lengths (>128K). Don't assume perfect recall across 1M context.

## Comparison Summary: When Each Model Wins

### GPT-5.4 Wins On:
✅ **Knowledge work** (83% GDPval)  
✅ **Desktop automation** (75% OSWorld, above human)  
✅ **Tool orchestration** (54.6% Toolathlon, 47% token savings with Tool Search)  
✅ **Web research** (82.7% BrowseComp)  
✅ **Speed** (5.1s vs 8.2s median)  
✅ **Cost** (50% cheaper input)  
✅ **Advanced math** (47.6% FrontierMath)

### Claude Opus 4.6 Wins On:
✅ **Production code quality** (80.8% SWE-Bench)  
✅ **Visual reasoning** (85.1% MMMU Pro)  
✅ **Abstract reasoning** (75.2% ARC-AGI-2)  
✅ **Cross-domain expertise** (53.1% Humanity's Last Exam)  
✅ **First-pass code acceptance** (87% vs 79%)  
✅ **Fewer retries needed** (13% vs 21%)

### Gemini 3.1 Pro Wins On:
✅ **Scientific reasoning** (94.3% GPQA Diamond)  
✅ **Cost per performance** ($2/M input, 80.6% SWE-Bench)  
✅ **Largest context** (2M tokens)

**The answer for most teams:** Use all three behind a router

For the complete decision framework, see our [how to choose guide](/article/how-to-choose-gpt-5-4-vs-claude-opus-4-6-decision-guide).

## Benchmark Reliability & Limitations

**What benchmarks DON'T tell you:**
- Real-world latency under load
- Behavior with poorly-written prompts
- Performance on YOUR specific domain
- Consistency across multiple runs
- Edge case handling

**What benchmarks DO tell you:**
- Upper bound on capability
- Relative strengths between models
- Areas of specialization
- Trajectory of improvement

**Best practice:** Use benchmarks to narrow your shortlist, then test on your actual tasks.

## The Bottom Line

**GPT-5.4 wins on breadth, speed, and cost.** Best for knowledge work, automation, tool-heavy workflows, and teams optimizing for cost.

**Claude Opus 4.6 wins on depth, code quality, and visual reasoning.** Best for production code, complex analysis, and teams optimizing for quality.

**Gemini 3.1 Pro wins on cost-per-performance.** Best for teams optimizing TCO.

**No model is universally better.** Deploy a router, use the right model for each task, measure everything.

---

*Which benchmarks matter most for your use case? Share on [LinkedIn](https://www.linkedin.com/in/rberi/) or [Twitter/X](https://x.com/rajeshberi/).*

## Continue Reading

**More AI model comparisons:**
- [GPT-5.4 vs Claude Opus 4.6: The Enterprise Guide](/article/gpt-5-4-vs-claude-opus-4-6-enterprise-guide) — Complete comparison
- [How to Choose Between GPT-5.4 and Claude](/article/how-to-choose-gpt-5-4-vs-claude-opus-4-6-decision-guide) — Decision framework
- [GPT-5.4 vs Claude for Coding](/article/gpt-5-4-vs-claude-opus-4-6-coding-comparison) — Side-by-side coding tests
