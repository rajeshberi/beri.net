# Design System - THE D*AI*LY BRIEF

## Design Philosophy

**Content-First · Minimal · AI-Centric**

This site embodies the newsletter's ethos: no hype, just signal. The design gets out of the way and lets the message breathe.

---

## Visual Language

### Color Palette

**Foundation:**
- `#000000` - Pure black background
- `#FFFFFF` - White text and CTAs

**Accents:**
- Blue (`blue-400`, `blue-500`, `blue-900`) - AI, trust, tech
- Purple (`purple-400`, `purple-500`, `purple-950`) - Innovation, premium
- Green (`green-400`, `green-500`) - Action, growth

**Opacity System:**
- `/5` (5%) - Subtle backgrounds
- `/10` (10%) - Card borders, UI elements
- `/20` - `/60` - Text hierarchy
- `/90` - Hover states

### Typography

**Font Stack:**
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif
```

**Scale:**
- Hero: `text-6xl` / `text-7xl` (60-72px)
- Section titles: `text-4xl` / `text-5xl` (36-48px)
- Body: `text-xl` / `text-2xl` (20-24px)
- Small: `text-sm` (14px)
- Micro: `text-xs` (12px)

**Hierarchy:**
- Headlines: `font-light` (300) - elegant, spacious
- Body: `font-normal` (400) - readable
- CTAs: `font-medium` (500) - confident
- Labels: `font-mono` - technical, precise

### Spacing

**Vertical Rhythm:**
- Section padding: `py-24` (96px) or `py-32` (128px)
- Card padding: `p-8` (32px)
- Element gaps: `gap-4`, `gap-6`, `gap-8` (16-32px)

**Max Widths:**
- Content: `max-w-4xl` (896px)
- Forms: `max-w-xl` (576px)
- Narrow: `max-w-2xl` (672px)

---

## Components

### Cards

**Bento Grid Style:**
```tsx
className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] 
           border border-white/10 hover:border-white/20 transition-all"
```

**Features:**
- Subtle gradient backgrounds
- Thin borders that strengthen on hover
- Icon badges with color-coded backgrounds
- Generous padding

### Buttons

**Primary CTA:**
```tsx
className="px-8 py-4 bg-white text-black font-medium rounded-full 
           hover:bg-white/90 transition-all"
```

**Style:**
- Pill shape (`rounded-full`)
- High contrast (white on black)
- Medium font weight
- Arrow animation on hover

### Form Inputs

```tsx
className="px-6 py-4 rounded-full bg-white/5 border border-white/10 
           text-white placeholder-white/30 
           focus:outline-none focus:ring-2 focus:ring-white/20"
```

**Features:**
- Pill shape (consistent with buttons)
- Subtle background
- Refined focus states
- Low-opacity placeholders

---

## Layout Structure

### Header
- Minimal, transparent with backdrop blur
- Two-column: Logo + Nav
- Small, understated

### Hero
- Massive headline (6xl/7xl)
- Short divider line (accent)
- Large body copy (xl/2xl)
- Single prominent CTA
- Small metadata labels (mono)

### Feature Sections
- "What You Get" label (mono, low opacity)
- Section title (4xl, light)
- Bento grid layout (2 columns on desktop)
- Icons in colored badge containers

### Footer
- Single border separator
- Minimal metadata
- Low-contrast text

---

## Interactions

### Hover States
- Cards: Border brightens (`border-white/10` → `border-white/20`)
- Links: Opacity increases (`text-white/40` → `text-white`)
- Buttons: Slight background fade (`bg-white` → `bg-white/90`)
- CTAs: Gap animation (arrow moves right)

### Transitions
```css
transition-all
transition-colors
```

All interactions are smooth but fast (default duration).

---

## Responsiveness

### Breakpoints
- Mobile: Default
- Tablet: `md:` (768px+)
- Desktop: Implicit via `md:`

### Mobile Adjustments
- Text scales down (`text-6xl` → `text-5xl`)
- Grid collapses (2 cols → 1 col)
- Padding reduces slightly
- Flexbox changes to column layout

---

## Accessibility

- Semantic HTML (`header`, `main`, `section`, `footer`)
- Proper heading hierarchy (`h1`, `h2`, `h3`)
- ARIA labels where needed (forms)
- High contrast (white on black)
- Focus states visible (`focus:ring-2`)
- Smooth scrolling for anchor links

---

## SEO Optimizations

- Descriptive meta tags
- OpenGraph + Twitter cards
- Semantic HTML structure
- Fast static generation (Next.js)
- Proper heading hierarchy
- Alt text on icons/images

---

## Performance

- Static site generation (no server-side rendering)
- Minimal JavaScript (102KB total)
- No external fonts (system fonts only)
- No images (SVG icons only)
- CSS-only animations
- Lazy loading built-in (Next.js)

**Build Output:**
```
Route (app)              Size    First Load JS
┌ ○ /                   123 B   102 kB
└ ○ /_not-found         989 B   103 kB
```

---

## Design Inspirations

- **Linear** - Clean, dark, minimal
- **Substack** - Content-first, reading experience
- **OpenAI** - Modern AI aesthetic
- **Apple** - Typography, spacing, restraint
- **Vercel** - Dark mode, subtle gradients

---

## Future Enhancements

- [ ] Add blog/archive page for past newsletters
- [ ] Implement real-time subscriber count
- [ ] Add testimonials section
- [ ] Create sample newsletter preview modal
- [ ] Add subtle scroll-triggered animations
- [ ] Implement dark/light mode toggle (currently dark-only)
