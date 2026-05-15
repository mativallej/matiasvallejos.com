# SEO Audit Report — matiasvallejos.com

**Audited:** 2026-05-14 · **Final URL:** `https://www.matiasvallejos.com/` (apex 307→www)
**Site type:** Personal portfolio / publisher hybrid (bilingual en/es) on Next.js 16 + Vercel

**Status legend:** ~~strikethrough~~ = shipped in Sprint 1 + 2 (this branch, not yet deployed). 🟢 = still to do.

---

## SEO Health Score: **49 / 100** 🟠 → projected ~80 once this branch deploys

| Category | Was | Projected after deploy |
|---|---|---|
| Technical SEO | 50 | 85 |
| Content Quality | 60 | 60 (unchanged; content work deferred) |
| On-Page SEO | 45 | 90 |
| Schema / Structured Data | **0** | 95 |
| Performance (CWV) | 80 | 90 (image optimizer back on, hero `next/image`) |
| AI Search Readiness | 30 | 75 |
| Images | 80 | 90 |

---

## 🔴 Critical (fix immediately)

1. ~~**`/projects` returns 404 in production.** Local repo has `app/[locale]/projects/page.tsx`, but the deployed build is stale.~~ **Resolved by deploying current `main`** (this branch).
2. ~~**`/es` and `/es/about` return 404.**~~ **Resolved by deploying current `main`.** Build now prerenders both locales × every route.
3. ~~**No `robots.txt`** — `https://www.matiasvallejos.com/robots.txt` → 404.~~ Shipped `app/robots.ts` (allows GPTBot/OAI-SearchBot/ChatGPT-User/ClaudeBot/anthropic-ai/PerplexityBot/Google-Extended/Applebot-Extended/Bingbot; references sitemap).
4. ~~**No `sitemap.xml`** — 404.~~ Shipped `app/sitemap.ts` — emits every route × en/es with `xhtml:link` hreflang alternates + all blog post slugs + all project detail slugs + `/press`.

> ~~Root cause for #1 & #2: production build pre-dates your large in-progress refactor.~~ Deploying this branch fixes both.

## 🟠 High (within 1 week)

5. ~~**No canonical tags anywhere.**~~ Per-route `generateMetadata` shipped on `/`, `/about`, `/projects`, `/projects/[slug]`, `/books`, `/blog`, `/[slug]`, `/press` — each with `alternates.canonical` via `buildAlternates()` helper in `src/lib/seo.ts`.
6. ~~**No Open Graph tags.**~~ Dynamic 1200×630 OG image at `app/[locale]/opengraph-image.tsx` (Edge runtime). Root layout + every route exports `openGraph` block.
7. ~~**No Twitter Card tags.**~~ `twitter:card=summary_large_image`, `twitter:creator=@mativallej_`, `twitter:images` rendered globally + per blog post.
8. ~~**No JSON-LD structured data (score 0/10).**~~ Shipped via `src/lib/schema.ts` + `<JsonLd>` component:
   - ~~`Person` + `WebSite` + `Organization` `@graph` in root layout~~ (stable `@id`s for cross-referencing).
   - ~~`BlogPosting` per blog post~~ (linked to Person `@id` via `author` + `publisher`).
   - ~~`CreativeWork` per project detail page~~ at `/projects/[slug]`.
   - ~~`ItemList`~~ on homepage (press), `/projects` (CreativeWork), `/books` (Book), `/press` (NewsArticle).
   - ~~`BreadcrumbList`~~ on every inner page.
9. ~~**Duplicate metadata across routes.**~~ Every route now has unique `title` + `description` (en/es) via `generateMetadata`.
10. ~~**No `hreflang` annotations.**~~ Every page renders `<link rel="alternate" hrefLang="en-US">`, `hrefLang="es-AR"`, `hrefLang="x-default"` via `buildAlternates()`.

## 🟡 Medium (within 1 month)

11. ~~**No `favicon.ico`** at root — only `/images/emoji.png`.~~ Shipped `app/icon.tsx` (Edge dynamic) + `app/manifest.ts` (webmanifest with theme color, icons, name).
12. ~~**No `llms.txt`**~~. Shipped `public/llms.txt` with curated map of site sections + key facts + sameAs links.
13. ~~**Missing security headers:** only `Strict-Transport-Security` is set.~~ Shipped via `headers()` in `next.config.mjs`: HSTS preload, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geo/topics disabled), `X-Frame-Options: SAMEORIGIN`. 🟢 **CSP report-only** still to do (deliberately deferred — needs analytics endpoint allowlist).
14. **Apex → www uses 307** instead of 301 permanent. 🟢 **Still to do** — Vercel config / `vercel.json`, not Next code. Switch in Vercel dashboard: Project → Settings → Domains → set `matiasvallejos.com` to permanent redirect to `www`.
15. **Thin homepage** (~417 visible words). 🟢 **Still to do** — content work, out of scope for engineering sprints.

## 🟢 Low

16. ~~`images.unoptimized: true` in `next.config.mjs`.~~ Removed. Hero now uses `next/image` with `priority` + `fetchPriority="high"` + `sizes` + AVIF/WebP srcset.

---

## What's still on the list (engineering)

- 🟢 **Real `/about` content** — biggest content lever, currently a WIP placeholder. Out of scope until you write copy.
- 🟢 **`/now` standalone route** (Derek Sivers convention) — needs content. The homepage `Now` section exists but isn't a canonical URL.
- 🟢 **Visible "Updated:" date** on `/about`, `/now`, every blog post — Perplexity recency boost. Schema has `dateModified` already; this is about visible UI.
- 🟢 **Lighthouse CI in GitHub Actions** — gate PRs on LCP/INP/CLS.
- 🟢 **Pay down framer-motion `ease: string` type debt**, then flip `typescript.ignoreBuildErrors: false`.
- 🟢 **CSP report-only header.**

---

## Manual next steps (not code — you do these in your browser)

In order. Skip a row only if the previous one is unverified.

### 1. Deploy this branch
- `git add . && git commit -m "..."` → push to `main`.
- Wait for Vercel preview/prod build. Confirm green.

### 2. Verify production responses
Run against `https://www.matiasvallejos.com` (not localhost):
```bash
curl -sI https://www.matiasvallejos.com/robots.txt | head -3        # 200
curl -s  https://www.matiasvallejos.com/sitemap.xml | head -20      # valid XML
curl -sI https://www.matiasvallejos.com/llms.txt | head -3          # 200
curl -sI https://www.matiasvallejos.com/manifest.webmanifest        # 200
curl -sI https://www.matiasvallejos.com/es | head -3                # 200 (not 404)
curl -sI https://www.matiasvallejos.com/projects | head -3          # 200
curl -sI https://www.matiasvallejos.com/projects/tegu | head -3     # 200
curl -sI https://www.matiasvallejos.com/press | head -3             # 200
curl -sI https://www.matiasvallejos.com/writing | head -3           # 308 → /blog
curl -sI https://www.matiasvallejos.com/ | grep -i 'strict-transport\|x-content\|referrer-policy\|permissions-policy'
```

### 3. Google Search Console (15 min)
1. https://search.google.com/search-console → **Add property** → **URL prefix** → `https://www.matiasvallejos.com`.
2. Verify via HTML meta tag method. Copy the token. Add to `app/[locale]/layout.tsx` metadata:
   ```ts
   verification: { google: "<token>" }
   ```
3. Redeploy, hit "Verify" in GSC.
4. **Sitemaps** → submit `sitemap.xml`.
5. **URL Inspection** → request indexing for: `/`, `/about`, `/blog`, `/projects`, `/press`, both blog post slugs, `/projects/tegu`. Forces priority crawl.

### 4. Bing Webmaster Tools + IndexNow (10 min)
1. https://www.bing.com/webmasters → sign in (Microsoft account).
2. **Add a site** → choose **Import from Google Search Console** → grants auto-verification + auto-imports the sitemap.
3. If not importing: verify with another meta tag (`msvalidate.01`), add it next to the Google one:
   ```ts
   verification: { google: "<token>", other: { "msvalidate.01": "<bing-token>" } }
   ```
4. **Settings → IndexNow** → toggle on. Bing will now auto-crawl whenever your sitemap updates. (Yandex also consumes IndexNow.)
5. **Submit Sitemap** → `https://www.matiasvallejos.com/sitemap.xml`.

> Why Bing matters: **ChatGPT web search uses the Bing index.** Bing registration is your fastest path to ChatGPT citation visibility.

### 5. Vercel — apex → www permanent redirect (5 min)
Vercel dashboard → Project → **Settings → Domains** → ensure `matiasvallejos.com` points to `www.matiasvallejos.com` with **Permanent (308)** redirect (not Temporary 307). This consolidates link equity.

### 6. Rich Results Test (5 min)
- https://search.google.com/test/rich-results
- Test `https://www.matiasvallejos.com/` — expect **Person + WebSite + Organization + ItemList + BreadcrumbList** detected, zero errors.
- Test `https://www.matiasvallejos.com/no-le-pidas-respuestas-a-la-ai` — expect **BlogPosting + BreadcrumbList**.
- Test `https://www.matiasvallejos.com/projects/tegu` — expect **CreativeWork + BreadcrumbList**.

### 7. Social preview validators (5 min)
- https://cards-dev.twitter.com/validator → enter homepage URL → confirm 1200×630 card renders.
- https://www.linkedin.com/post-inspector/ → same.
- Optional: paste URL in a Slack/iMessage/WhatsApp chat → preview should match.

### 8. Lighthouse mobile (5 min)
- Chrome DevTools → Lighthouse → Mobile → Performance + SEO categories.
- Targets: **LCP < 2.5s · INP < 200ms · CLS < 0.1 · SEO 100**.

### 9. Verify the `/images/me.webp` asset exists in production
The Person schema and hero now both point to `/images/me.webp`. After deploy:
```bash
curl -sI https://www.matiasvallejos.com/images/me.webp | head -3   # 200
```
If 404, regenerate the webp from `me.png` (e.g. `cwebp -q 85 public/images/me.png -o public/images/me.webp`) and redeploy.

### 10. Add Press to navbar (optional polish — code, not manual)
The `/press` route is now in the sitemap but the top navbar doesn't link to it yet. Tell me if you want it added — small Edit to `src/components/navbar.tsx` + 2 i18n strings.

---

## What to watch (weekly, 10 min)

| Console | Metric | Healthy signal |
|---|---|---|
| GSC → Page indexing | Indexed pages | Rising toward ~30 (sitemap total) within 30 days |
| GSC → Performance | Impressions for "Matias Vallejos", "Tegu" | First impressions visible 14–21 days post-deploy |
| Bing Webmaster → Page Reports | Indexed pages | Should track GSC ±10% |
| Bing → Search Performance | Same brand queries | Bing usually indexes faster than Google |
| Rich Results Test (monthly) | Schema errors | Zero across all page types |

---

## Prioritized Action Plan (original, with status)

| # | Action | Effort | Impact | Status |
|---|---|---|---|---|
| 1 | Deploy current `main` to fix `/projects` and `/es` 404s | XS | 🔴🔴🔴 | 🟢 **Ready to deploy** |
| 2 | Add `app/robots.ts` and `app/sitemap.ts` (Next.js native) | S | 🔴🔴🔴 | ~~✅ Done~~ |
| 3 | Add per-route `generateMetadata` | M | 🟠🟠🟠 | ~~✅ Done~~ |
| 4 | Add `Person` + `WebSite` JSON-LD; `BlogPosting` in blog posts | M | 🟠🟠🟠 | ~~✅ Done~~ (+ Organization, CreativeWork, ItemList, BreadcrumbList) |
| 5 | Add `hreflang` alternates via next-intl helpers | S | 🟠🟠 | ~~✅ Done~~ |
| 6 | Create `public/llms.txt` | XS | 🟡🟡 | ~~✅ Done~~ |
| 7 | Add security headers + favicon.ico + 301 (vs 307) apex redirect | S | 🟡 | ~~✅ Done~~ for headers + favicon. 🟢 Apex 308 still to do (Vercel dashboard). |
