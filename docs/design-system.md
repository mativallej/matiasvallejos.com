# Design System — matiasvallejos.com

The visual and editorial system behind the personal brand site. Argentine warmth, Vercel precision, product-obsessed thinking — surfaced as tokens, type, principles, and voice.

This file is the authoritative reference. A reusable JSX preview component lives at [`./design-system.jsx`](./design-system.jsx) — drop it into a sandbox or Storybook to render the system in isolation. The system is intentionally **not exposed as a public route** on the site.

---

## Colors

### Primary — Orange

The core accent that runs through every interaction. Inspired by Claude's warmth.

| Token | Hex | Use |
|---|---|---|
| `primary.50` | `#FFF7ED` | Faint orange tint backgrounds (rare) |
| `primary.100` | `#FFEDD5` | |
| `primary.200` | `#FED7AA` | |
| `primary.300` | `#FDBA74` | |
| `primary.400` | `#FB923C` | **Accent (default UI orange)** — `text-[#FB923C]`, name accent, CTAs |
| `primary.500` | `#E8742A` | **Deep accent** — hover states, primary button background |
| `primary.600` | `#D4622A` | Button hover-down |
| `primary.700` | `#B84D1E` | Pressed states |
| `primary.800` | `#93400D` | |
| `primary.900` | `#7C2D12` | Darkest |

### Neutral — Warm Stone

Deep, warm blacks. Not blue-tinted — these have a stone/earth warmth reflecting Argentine *tierra*.

| Token | Hex | Use |
|---|---|---|
| `neutral.0` | `#FFFFFF` | Pure white (rare; logo highlights) |
| `neutral.50` | `#FAFAF9` | **Primary text on dark** |
| `neutral.100` | `#A8A29E` | **Secondary text, muted body copy** |
| `neutral.200` | `#78716C` | Tertiary text, captions |
| `neutral.300` | `#57534E` | Quaternary text, hint labels |
| `neutral.400` | `#3D3935` | **Default border color** (`border-[#3D3935]/60`) |
| `neutral.500` | `#1C1917` | Card background hover |
| `neutral.600` | `#171412` | Sub-card backgrounds |
| `neutral.700` | `#12100E` | Photo-card background |
| `neutral.800` | `#0C0A09` | **Modal / panel background** |
| `neutral.900` | `#080706` | **Page background** (`bg-[#080706]`) |

### Accent — Pampa

Secondary accents drawn from pampa aesthetics. Use sparingly for non-orange categorization (e.g., Docta Valley = pampa gold, GitHub stats = mate green).

| Token | Hex | Used for |
|---|---|---|
| `accent.mate` | `#A3B86C` | Mate green — "design" category, success-adjacent UI |
| `accent.pampa` | `#D4A76A` | Pampa gold — "business" category, Docta Valley brand |
| `accent.sky` | `#7CA5C4` | Córdoba sky — "other" category, info-adjacent UI |

### Semantic

| Token | Hex |
|---|---|
| `success` | `#4ADE80` |
| `warning` | `#FBBF24` |
| `error` | `#F87171` |
| `info` | `#60A5FA` |

---

## Typography

**Display + Body:** `STIX Two Text`, serif — intellectual gravity, academic precision, readability.
**Mono / metadata / code:** `JetBrains Mono`, `SF Mono`, monospace.

### Type scale

| Token | Size | Weight | Letter-spacing | Font |
|---|---|---|---|---|
| `display-lg` | 48px | 700 | -0.03em | display |
| `display` | 36px | 700 | -0.02em | display |
| `heading` | 24px | 600 | -0.01em | display |
| `subheading` | 18px | 600 | 0 | display |
| `body` | 16px | 400 | 0 | body |
| `body-sm` | 14px | 400 | 0 | body |
| `caption` | 12px | 500 | 0.04em | mono |

Use `font-serif` for marketing/page headers, `font-sans` for UI, `font-mono` for metadata / labels / dates / code.

---

## Spacing

4px base grid. Generous whitespace following Vercel's ethos — let content breathe.

```
0 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 160
```

Tailwind tokens map 1:1 (`p-1` = 4px, `p-2` = 8px, etc.).

---

## Radii

| Token | Value | Tailwind | Use |
|---|---|---|---|
| `none` | 0 | `rounded-none` | Sharp utility marks |
| `sm` | 4px | `rounded-sm` | Mono pills, micro labels |
| `md` | 8px | `rounded-md` | Buttons, tag pills |
| `lg` | 12px | `rounded-lg` | Filter pills, internal cards |
| `xl` | 16px | `rounded-xl` | Media frames |
| `2xl` | 16px+ | `rounded-2xl` | **Default card radius** |
| `full` | 9999px | `rounded-full` | Avatars, social icons, flag pill |

---

## Shadows & effects

| Token | Value | Use |
|---|---|---|
| `sm` | `0 1px 2px rgba(0,0,0,0.3)` | Floating chips |
| `md` | `0 4px 12px rgba(0,0,0,0.4)` | Press cards, draggable flag |
| `lg` | `0 8px 32px rgba(0,0,0,0.5)` | Modals, expanded about |
| `glow` | `0 0 24px rgba(232,116,42,0.15)` | Primary button hover |
| `glowStrong` | `0 0 48px rgba(232,116,42,0.25)` | Hero CTA focus |

---

## Design principles

1. **Product Over Code.** The site communicates outcomes, not implementations. Language focuses on impact, not stacks.
2. **Earned Ornamentation.** Decorative elements (guarda pampa motifs, subtle textures) appear sparingly and purposefully — never for decoration alone.
3. **Warm Minimalism.** Dark doesn't mean cold. Stone-toned neutrals and orange accents create a space that feels inviting, not sterile.
4. **Lean Communication.** Every section communicates a single idea clearly. No scroll-jacking, no parallax for its own sake. Content leads.
5. **Argentine Undertone.** The pampa aesthetic lives in the color palette and occasional motifs — never overt, always felt. Like mate in the morning.
6. **Future Oriented.** Typography, layout, and tone project forward — someone building what's next, grounded in fundamentals.

---

## Voice & tone

How the site speaks. The goal is **honest specificity** over polished branding.

### Do

- *"I build products that solve real problems"*
- *"Lean, fast, purposeful"*
- *"Craft matters"*
- *"Córdoba → the world"*
- Concrete numbers (2,200 users, 240+ builders, 118K views)
- First person, present tense for current work, past tense only for shipped outcomes
- Bilingual sentence-case in both en-US and es-AR

### Don't

- *"Full-stack developer with 5 years..."*
- *"Passionate about clean code"*
- *"10x engineer"*
- *"Tech enthusiast"*
- Vague seniority labels, dev clichés, AI buzzword salad
- Title-Case in body copy (only display headings use it)

### Tone modulation

| Context | Tone |
|---|---|
| Hero / homepage | Direct, opinionated, slightly cocky |
| Blog post body | Personal, reflective, specific |
| Press / case studies | Factual, sourced, third-person friendly |
| Microcopy (CTAs, labels) | All lowercase, mono, terse (`about me`, `explore tegu`) |

---

## Component tokens (selected)

These are the precise class compositions used across the site. Copy/paste targets, not Tailwind theme tokens.

```tsx
// Default card
"rounded-2xl border border-[#3D3935]/60 p-5 hover:border-[#57534E] transition-colors"

// Primary button
"font-mono text-[11px] font-semibold uppercase tracking-[0.04em] bg-[#FB923C] text-[#080706] px-3 py-2 rounded-md hover:bg-[#E8742A] transition-colors"

// Outlined button
"font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-[#A8A29E] border border-[#3D3935] px-3 py-2 rounded-md hover:text-white hover:border-[#57534E] transition-colors"

// Tag pill (orange)
"font-mono text-caption uppercase px-3 py-1.5 rounded-md bg-[#FB923C]/15 text-[#FB923C]"

// Bottom-of-card hint label
"absolute bottom-3 left-4 font-mono text-[10px] text-[#A8A29E] uppercase tracking-[0.08em]"

// Hover-arrow trailing CTA pattern
"text-[#A8A29E] text-body group-hover:translate-x-1 transition-transform duration-200"
```

---

## When to ignore the system

- **Press list** — third-party logos render at outlet colors; don't tint them.
- **Project cards** — each product has a `logoBg` brand color (`#FB923C` Tegu, `#F5E6B0` Docta Valley, `#1C1917` AI Expense Tracker). Use those, not neutral.
- **Argentina flag** — always the literal emoji 🇦🇷, not a custom orange/blue treatment.
- **Code blocks in blog posts** — `prose-custom` styles in `src/styles/prose.css` override the mono token to a slightly larger size for readability.

---

## File map

| Layer | Lives in |
|---|---|
| Token reference (this doc) | `docs/design-system.md` |
| JSX preview snippets | `docs/design-system.jsx` |
| Tailwind theme | `tailwind.config.ts` |
| Prose / markdown styles | `src/styles/prose.css` |
| Utility class composition helper | `src/lib/utils.ts` (`cn()`) |
