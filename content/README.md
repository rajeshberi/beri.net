# Newsletter Content

This directory contains all newsletter editions in markdown format.

## File Structure

```
content/newsletters/
  ├── example.md
  ├── gpt-4-5-benchmarks.md
  └── vector-db-showdown.md
```

## Newsletter Format

Each newsletter is a markdown file with frontmatter:

```markdown
---
title: "Your Newsletter Title"
slug: "url-friendly-slug"
date: "2026-03-14"
published: true
excerpt: "Brief summary for the archive page and SEO"
tags: ["AI Models", "Benchmarks", "Enterprise"]
---

# Your Newsletter Title

*Published March 14, 2026*

Your content here...
```

## Frontmatter Fields

- **title**: Newsletter title (shown on archive and article page)
- **slug**: URL-friendly identifier (e.g., `gpt-4-5-benchmarks`)
- **date**: Publication date in YYYY-MM-DD format
- **published**: `true` to show on site, `false` to hide
- **excerpt**: Short summary (1-2 sentences)
- **tags**: Array of tags for categorization

## Publishing Workflow

1. **Write newsletter** in markdown
2. **Add to** `content/newsletters/`
3. **Set published** to `true`
4. **Deploy** - site automatically rebuilds with new content
5. **Send via Beehiiv** - use same content for email

## Content Guidelines

### Structure
- Start with headline and date
- Use H2 (`##`) for main sections
- Use H3 (`###`) for subsections
- Keep paragraphs short (3-4 sentences)

### Formatting
- **Bold** for emphasis
- *Italic* for secondary emphasis
- `code` for technical terms
- > Blockquotes for callouts

### Links
- Use `[text](url)` for external links
- Reference other newsletters with `/newsletter/slug`

### Code Blocks
```python
# Use fenced code blocks for snippets
def example():
    return "formatted code"
```

## Example Newsletter

See `example.md` for a complete example with:
- Benchmarks
- Data tables
- Code snippets
- Actionable takeaways
- Call to action

## SEO Optimization

Each newsletter automatically gets:
- Meta title: `{title} | THE D*AI*LY BRIEF`
- Meta description: `{excerpt}`
- OpenGraph tags for social sharing
- Structured data for articles
- Tags for categorization

## Archive Page

Newsletters appear on:
- Homepage (latest 3)
- `/archive` (all published)
- Individual pages at `/newsletter/{slug}`

## Tips

1. **Write conversationally** - like an email to a colleague
2. **Lead with data** - benchmarks, metrics, numbers
3. **End with action** - what should the reader do?
4. **Test locally** - run `pnpm dev` to preview
5. **Deploy when ready** - `git push` triggers auto-deploy
