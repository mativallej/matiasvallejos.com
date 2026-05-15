# GEO Analysis — matiasvallejos.com

**Analyzed:** 2026-05-14 · **Target:** `https://www.matiasvallejos.com/`
**Site profile:** Personal brand site + bilingual blog (en/es) on Next.js 16, SSR/prerendered

---

## GEO Readiness Score: **34 / 100** 🟠

| Criterion | Weight | Score | Why |
|---|---|---|---|
| Citability (passages) | 25% | 45 | Decent blog passage structure, but homepage answers are vague and not self-contained |
| Structural Readability | 20% | 70 | Strong H1→H2 hierarchy on posts; clean lists; lacks Q&A patterns |
| Multi-Modal Content | 15% | 25 | Minimal images on posts; no videos, infographics, or tables |
| Authority & Brand Signals | 20% | 15 | No author schema, no Wikipedia/credentialed bylines, no entity linking |
| Technical Accessibility | 20% | 20 | SSR ✅ but no llms.txt, no robots.txt, no Person/Article schema |

---

## Platform Breakdown

| Platform | Estimated Visibility | Notes |
|---|---|---|
| **Google AI Overviews** | 🔴 Low | Site likely not in top-10 for any target query; no schema; thin homepage; broken `/projects` & `/es` hurt overall site authority |
| **ChatGPT / OpenAI Search** | 🔴 Very Low | No Wikipedia/Reddit footprint for "Matias Vallejos"; ChatGPT pulls 47.9% from Wikipedia |
| **Perplexity** | 🟠 Low | Reddit-heavy citation pattern; no relevant subreddit presence; blog posts could rank for Spanish-language indie-dev queries |
| **Bing Copilot** | 🟠 Low | No `IndexNow` integration; thin technical SEO foundation |
| **Claude (web)** | 🟠 Low | ClaudeBot allowed by default (no robots.txt block), but no llms.txt to guide it |

---

## AI Crawler Access Status

✅ **All AI crawlers technically allowed** — because there's no `robots.txt` at all (returns 404), all bots including GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, CCBot, Bytespider can crawl freely.

⚠️ This is "allowed by accident," not by design. Once you add `robots.txt` (which you need for the sitemap), make sure these are explicitly allowed:

```txt
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://www.matiasvallejos.com/sitemap.xml
```

## llms.txt Status: ❌ Missing

`/llms.txt` returns 404. Ready-to-paste template:

```txt
# Matias Vallejos
> Product engineer from Córdoba, Argentina. Builds lean digital products — Tegu (home-services marketplace) and Docta Valley (founder community). Writes about product, AI workflows, and indie building.

## About
- [About Matias](https://www.matiasvallejos.com/about): Background, beliefs, timeline
- [Now](https://www.matiasvallejos.com/): Current focus and build logs

## Products
- [Tegu](https://www.matiasvallejos.com/projects/tegu): AI-powered marketplace connecting Argentine homeowners with verified pros
- [Docta Valley](https://www.matiasvallejos.com/projects/docta-valley): Community for tech founders and builders in Córdoba

## Writing
- [Blog](https://www.matiasvallejos.com/blog): Essays on product building, design craft, indie making
- [No le pidas respuestas a la AI, pedile preguntas](https://www.matiasvallejos.com/no-le-pidas-respuestas-a-la-ai): Prompt patterns — Flipped Interaction, Cognitive Verifier, Iterative Refinement

## Key facts
- Based in Córdoba, Argentina
- Building products since 2021
- Co-founded Docta Valley in 2025
- Currently focused full-time on Tegu (2026)
- Writes in English and Spanish
```

## Brand Mention Analysis (manual verification needed)

| Platform | Status | Recommendation |
|---|---|---|
| Wikipedia | 🔴 No article (typical for indie builders) | Not realistic short-term; instead, get cited in articles about Argentine startups / Córdoba tech |
| Reddit | 🔴 No visible footprint | Post Tegu launch / Docta Valley updates in r/argentina, r/SideProject, r/startups |
| YouTube | ❓ Unknown | YouTube mentions correlate ~0.737 with AI citations — strongest single signal |
| LinkedIn | ❓ Likely present | Add LinkedIn URL to `sameAs` in Person schema |
| GitHub | ❓ Likely present | Same — add to `sameAs` |
| Twitter/X | ✅ Referenced ("read on twitter →" on posts) | Add `twitter:creator`, link in `sameAs` |

## Passage-Level Citability

**Blog post `/no-le-pidas-respuestas-a-la-ai`** (1305 words, well-structured):
- ✅ Clean H1 + 12 H2s ("Patron 1: Flipped Interaction", etc.)
- ✅ Date visible ("January 15, 2026 / 7 min read")
- ❌ No 134-167 word self-contained answer blocks under each pattern heading — sections read as narrative, not as quotable definitions
- ❌ No "What is Flipped Interaction?" definition leads — AI engines extract definitions far more readily than stories

**Homepage** (417 words):
- ❌ Tagline "Product Engineer 🇦🇷" gives no structured entity facts
- ❌ No quotable "Matias Vallejos is a product engineer who..." sentence
- ❌ "Location: Córdoba, Argentina / Focus: Product Engineering / Since 2021" is the only fact block — good, but needs to be schema-backed

## SSR Check: ✅ Pass

Server-rendered HTML contains all visible text (`x-nextjs-prerender: 1`). AI crawlers see the full content without executing JS.

---

## Top 5 Highest-Impact Changes

1. **Add Person + WebSite JSON-LD to root layout** — names you as the entity, with `sameAs` linking GitHub, Twitter, LinkedIn, YouTube. Single most impactful change for AI entity recognition.
2. **Add BlogPosting schema per post** — `author`, `datePublished`, `dateModified`, `headline`, `inLanguage`. Posts already have dates in the visible UI; just expose them as structured data.
3. **Create `/llms.txt`** (template above) — explicit guidance for AI crawlers; trivial effort.
4. **Rewrite blog post intros as 134-167 word answer blocks.** Each H2 (e.g. "Patron 1: Flipped Interaction") should be followed by: *"Flipped Interaction is a prompt pattern where [definition in one sentence]. It works by [mechanism]. Use it when [scenario]. Example: [40 words]."* AI engines will lift this verbatim.
5. **Fix `/projects` and `/es` 404s** (deploy current `main`) — entity-rich case-study pages are the most citable content you have, and they're currently unreachable.

---

## Schema Recommendations (paste into root layout)

```tsx
// Person + WebSite JSON-LD
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.matiasvallejos.com/#matias",
      "name": "Matias Vallejos",
      "url": "https://www.matiasvallejos.com/",
      "image": "https://www.matiasvallejos.com/images/me.png",
      "jobTitle": "Product Engineer",
      "description": "Product builder from Córdoba, Argentina. Lean, fast, purposeful.",
      "homeLocation": { "@type": "Place", "name": "Córdoba, Argentina" },
      "knowsAbout": ["Product Engineering","Indie Hacking","AI","Marketplaces"],
      "sameAs": [
        "https://twitter.com/<handle>",
        "https://github.com/<handle>",
        "https://www.linkedin.com/in/<handle>",
        "https://www.youtube.com/@<handle>"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.matiasvallejos.com/#site",
      "url": "https://www.matiasvallejos.com/",
      "name": "Matias Vallejos",
      "inLanguage": ["en","es"],
      "publisher": { "@id": "https://www.matiasvallejos.com/#matias" }
    }
  ]
}
```

Per blog post (`app/[locale]/[slug]/page.tsx`):
```json
{
  "@type": "BlogPosting",
  "headline": "...",
  "datePublished": "2026-01-15",
  "dateModified": "2026-01-15",
  "author": { "@id": "https://www.matiasvallejos.com/#matias" },
  "inLanguage": "es",
  "mainEntityOfPage": "https://www.matiasvallejos.com/<slug>",
  "image": "https://www.matiasvallejos.com/images/blog/<slug>.png"
}
```

---

## Content Reformatting Suggestions

**On `/about`** — add a 60-word definition lead AI engines can lift:

> "Matias Vallejos is a product engineer based in Córdoba, Argentina. Since 2021, he has built lean digital products focused on shipping speed over architectural complexity. He co-founded Docta Valley (2025), a community for tech founders in Córdoba, and is currently building Tegu (2026), an AI-powered marketplace connecting homeowners with verified home-service professionals in Argentina."

**On `/projects/tegu` (once deployed)** — open with a quotable summary:

> "Tegu is a marketplace connecting Argentine homeowners with verified home-service professionals. Launched in 2026, it combines AI matching, WhatsApp integration, and a hybrid pay-per-lead / subscription model for providers."

**Add a single FAQ section to `/about`** (don't add FAQPage schema — Aug 2023 Google restriction means it won't show as rich results for personal sites, but the H3 Q&A pattern still helps AI extraction):
- "Where is Matias Vallejos based?"
- "What does Matias Vallejos build?"
- "What is Docta Valley?"
- "What is Tegu?"

---

## Quick Wins Checklist

- [ ] Add `/llms.txt` (template provided)
- [ ] Add Person + WebSite JSON-LD in `app/[locale]/layout.tsx`
- [ ] Add BlogPosting JSON-LD in `app/[locale]/[slug]/page.tsx`
- [ ] Add 60-word definition lead on `/about`
- [ ] Add `sameAs` entity links (GitHub, Twitter, LinkedIn, YouTube)
- [ ] Reformat each blog-post H2 intro as a self-contained 134-167 word answer
- [ ] Deploy current `main` to restore `/projects` and `/es`
- [ ] Once `robots.txt` exists, explicitly allow GPTBot/OAI-SearchBot/ClaudeBot/PerplexityBot
