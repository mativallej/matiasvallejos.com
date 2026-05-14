# Next steps

Sections / improvements pending implementation. Each one has a clear acceptance criteria and BE rationale.

---

## 1. Manifesto block (between Hero and Products)

**BE lens**: Identity-based persuasion + Unity + Curiosity gap + SUCCESs Stories.

**Why**: site is dense with proofs but has no narrative thread. A short manifesto in your voice ties the proofs together and reinforces tribe ("nosotros los founders técnicos").

**Acceptance**:
- New section component (e.g. `src/components/manifesto.tsx`) wired between `<Now />` and `<Products />` in `app/[locale]/page.tsx`.
- 3–4 short sentences in serif, large type. Last line in orange (anchor).
- Same section header pattern as the rest (mono caption, label "What I believe" / "En qué creo").
- Bilingual (en/es) under `Manifesto.*` translation keys.

**Draft copy (refine before shipping):**

EN:
- Title: "What I believe"
- Line 1: "The best product is the one that ships. The best architecture is the one that fits in a conversation."
- Line 2: "Most founders treat engineering like a service. I treat it like a strategy lever — every shipped feature is a bet on the user, not on the stack."
- Line 3 (orange): "Talk to users. Ship faster. Cut features. Repeat."

ES:
- Title: "En qué creo"
- Line 1: "El mejor producto es el que se envía. La mejor arquitectura es la que entra en una conversación."
- Line 2: "La mayoría de los founders tratan al engineering como un servicio. Yo lo trato como palanca estratégica — cada feature shippeada es una apuesta al usuario, no al stack."
- Line 3 (orange): "Hablá con usuarios. Enviá rápido. Cortá features. Repetí."

---

## 2. "How I work" section (between Products and Open Source)

**BE lens**: Choice architecture (Thaler/Sunstein) + Authority demostrada + Fogg prompt clarity.

**Why**: visitor knows you're a founder + product engineer but doesn't know what specific work to engage you for. Three concrete modes solve "what do I email Mati about?".

**Acceptance**:
- New section component `src/components/how-i-work.tsx` wired between `<Products />` and `<Writing posts={posts} />`.
- Header: "How I work" / "Cómo trabajo" + right-side pill CTA `talk to me ↗` (mailto link).
- Intro paragraph (serif, ~1 sentence).
- 3 cards in a grid (audit / advisory / embed), each with:
  - Tag (colored, mono uppercase)
  - Duration (mono caption muted, right side)
  - Title (serif, ~20px)
  - Description (1–2 sentences, body-sm muted)
- Cards use the canonical pattern: `rounded-2xl border-[#3D3935]/60 bg-[#0C0A09] p-5 min-h-[200px]`.
- Bilingual under `HowIWork.*`.

**Draft copy (refine before shipping):**

EN:
- Title: "How I work"
- Intro: "When I join a team, I show up as a builder — not as a consultant. Three ways we can work together, depending on how deep you want me in."
- Modes:
  1. **Audit** · 1 day · "Product + engineering review" · "One-shot deep dive into your roadmap, architecture, and shipping cadence. Walk away with the 3 calls that move the needle."
  2. **Advisory** · Monthly · "Founder sparring partner" · "Regular calls to unblock decisions on product strategy, hiring, monetization, and engineering trade-offs. Async on Slack between calls."
  3. **Embed** · 3 months+ · "Co-founder time" · "I step in alongside you to build, ship, and iterate. Best for early-stage teams without a senior product engineer in the founding team."

ES:
- Title: "Cómo trabajo"
- Intro: "Cuando me sumo a un equipo aparezco como builder — no como consultor. Tres maneras en las que podemos trabajar juntos, según qué tan adentro me querés."
- Modes:
  1. **Audit** · 1 día · "Review de producto + engineering" · "Deep dive one-shot a tu roadmap, arquitectura y cadencia de envío. Te llevás las 3 decisiones que mueven la aguja."
  2. **Advisory** · Mensual · "Sparring partner del founder" · "Calls regulares para desbloquear decisiones de estrategia de producto, hiring, monetización y trade-offs de engineering. Async en Slack entre calls."
  3. **Embed** · 3 meses+ · "Tiempo de co-founder" · "Me sumo al equipo para construir, shippear y iterar. Ideal para equipos early-stage sin un product engineer senior en el founding team."

---

## 3. Card system Tailwind utility (`card-base`) — ✅ DONE

`@layer components { .card-base, .card-hover }` shipped in `src/styles/globals.css`.

**Optional follow-up**: sweep components to replace inline `rounded-2xl border border-[#3D3935]/60 bg-[#0C0A09]` with `card-base`. Keep p-* and context classes inline. Document in `CLAUDE.md`. *(Not urgent — works as-is.)*

---

## 4. Testimonials section

**BE lens**: Social proof — peer similarity (one of the most replicated effects per Cialdini + post-replication crisis literature).

**Why**: site has third-party validation (press), peer validation (GitHub stars), customer validation (Tegu user numbers). Missing: human voices saying "I worked with Mati and …". Quote-from-a-real-person beats numbers/press for the "should I email this guy?" decision.

**Status**: previously marked as skip by user. Logged here for future reconsideration — it remains the single highest-leverage missing block per BE lens.

**Acceptance (when ready)**:
- New section component `src/components/testimonials.tsx` placed between `<HowIWork />` and `<Writing />` (or just before Contact).
- 3–5 quotes from founders, collaborators, or community members. Each card:
  - Quote (serif italic, ~16px)
  - Avatar (round, 40px) + name + role/company
  - Same canonical card class.
- Bilingual via `Testimonials.*` translations.

**Data needed from user**:
- 3+ real quotes (no fake "John Doe — Founder" placeholders).
- Names + roles/companies + optional avatar URLs or initials.

---

## 5. Real case studies at `/projects/[slug]`

**BE lens**: SUCCESs framework (Stories + Concrete + Credible) + Narrative transportation (Green & Brock) + Authority demostrada.

**Why**: today the inner card of every project on the homepage links to `/projects/[slug]`, which renders a "We're working on it" placeholder. This is broken-link debt — visitor expressed interest, page punts. A real case study is the highest-leverage page on the site for B2B-style intent (advisory, collaboration, investor conversations).

**Status**: route + placeholder shipped at `app/[locale]/projects/[slug]/page.tsx`. Real content pending.

**Acceptance (per case study)**:

A real case study page should include the standard product engineer arc:

1. **Problem** (1 sentence + who hurts) — what was broken before this project existed?
2. **Hypothesis & approach** — what did you bet on, and why?
3. **What I shipped** — concrete: features, tech, timeline. Bullet list with dates if possible.
4. **Results** — hard numbers with before/after deltas. Revenue, MRR, retention, conversion, leads, latency, % deltas. Visualizable when possible (small inline charts or large numbers).
5. **What I'd do differently** — vulnerability + reflection. Anti-survivorship bias signal.
6. **Optional**: stack used, link to live product, link to Twitter thread, link to repo.

**Visual structure (suggested)**:

- Page header (existing `PageHeader` component): label = project name, title = case study punchline (e.g. "From 0 to 2,200 users in 60 days")
- Hero metrics strip — 3-4 big numbers as cards (`rounded-2xl border-[#3D3935]/60 bg-[#0C0A09]`)
- Long-form body in `prose` style sections (Problem / Approach / What I shipped / Results / What I'd do differently)
- Sticky bottom or floating CTA: "Visit live project" + "Talk to me about this"

**Priority order to ship case studies**:

1. **`/projects/tegu`** (highest leverage — main project, most numbers, most press)
2. **`/projects/docta-valley`** (community proof, different from Tegu)
3. **`/projects/ai-expense-tracker`** (open source proof — already has 59★, 118K views, 10 forks)

**Data needed from user (per project)**:

- Concrete numbers (before/after — exact metrics)
- Timeline of milestones (dates + what shipped)
- Honest "what I'd do differently" reflection (1-2 sentences each)
- Link to live product, repo, X thread, press features

**Tech notes**:

- Reuse existing `Navbar`, `Footer`, `PageHeader` components
- Use `prose` styles from `src/styles/prose.css` for body content
- Localize via `next-intl` — keys under `CaseStudy.{slug}.*` in messages files
- Keep static (no client-side data fetching needed) — `generateStaticParams` already wired to `products` array
- Replace placeholder UI with real layout when content is ready (file: `app/[locale]/projects/[slug]/page.tsx`)

---

## 6. STEPPS Triggers — daily/weekly cue association

**BE lens**: Berger's STEPPS framework — *Triggers*. Things people share or come back to are associated with daily-life cues. The trigger has to be naturally present in the visitor's life and link back to you.

**Why**: site has high *practical value* and *stories* (STEPPS dimensions), but no *trigger* — there's nothing in a founder's daily routine that brings them back to your work. shipstats repo is one trigger artifact (people use it weekly → see your name). That's it.

**Status**: not implemented. Brainstorming.

**Possible trigger plays (ranked by feasibility)**:

1. **Weekly Tegu metric tweet on X** with always-the-same-format (e.g. "Tegu Weekly · Mon AM"). The day-of-week + time-of-day becomes the trigger. Routine.
2. **Monthly build log post** at end of each month — same cadence each time, becomes a calendar event for followers.
3. **Public roadmap dashboard** at a stable URL (e.g. `mativallejos.com/roadmap`) that updates weekly — visitors check before their own planning.
4. **shipstats template expansion** — make shipstats so useful that founders use it weekly. Each use = your name in their workflow.
5. **A signature framework or named concept** — "Make it ship" already exists in the bento. Could be expanded to a downloadable / shareable artifact (zine, PDF, repo template).

**Acceptance**: pick ONE of the 5 above. Implement consistently for 90 days. Measure: whether mentions/shares organically include the trigger keyword.

**Best fit for Mati's brand**: #1 (weekly Tegu metric tweet) — already aligned with build-in-public, low effort, compounds over time.

---

## 7. Hyperbolic discounting — immediate-reward asset

**BE lens**: Hyperbolic discounting (Ainslie/Laibson). People over-value present rewards. Sites with immediate-pickup value beat sites with future-promise value.

**Why**: today the visitor's payoff for visiting is "scroll some proofs". There's no take-home artifact they can use TODAY. Visitor leaves with nothing to act on.

**Status**: not implemented. Need to invent.

**Possible immediate-value artifacts**:

1. **"Tegu launch playbook" PDF** — the literal stack/process you used to launch Tegu (843 → 2,110 in 30 days). Free download. CTA at bottom: "Get the playbook →"
2. **shipstats live demo on the site** — embedded mini version where visitor types in 3 metrics and sees their own poster generated.
3. **"Read the build log of the last 30 days" prominent CTA** — content that exists, currently underexposed.
4. **"Steal my product engineer template"** — a Notion/Linear/GitHub template for product engineering that visitor can clone immediately.
5. **Open Source repo with a "use this in 60 seconds" pitch** — frame an existing repo (e.g. shipstats) as "60-second value" not "stars on a list".

**Best fit**: #5 + #3 combined. Already have the repos and build logs. Reframe with immediate-pickup language ("Read · 30 sec", "Clone · 60 sec").

**Acceptance** (when ready):
- Add a "Read latest log →" pill near the build log section header
- Reframe Open Source heading copy to emphasize "use in X seconds"
- Optional: actual Tegu launch playbook PDF (separate effort)

---

## 8. Hyperbolic discounting — implement on site

**BE lens**: Hyperbolic discounting (Ainslie/Laibson). People over-value present rewards. Sites with immediate-pickup value beat sites with future-promise value.

**Status**: documented in #7 above as concept. **Not yet implemented in the site UI.** Visitor still has no "take this NOW" artifact visible.

**Site-level implementation options (pick one)**:

1. **"Read latest log →" pill** near the Now section header — surfaces immediate consumable content
2. **"Read · 30 sec" / "Clone · 60 sec" badges** on each Open Source repo card — signals immediate-use value
3. **Reframe Open Source heading**: "Free for builders" → "Free for builders · Use in 60 seconds"
4. **"Tegu launch playbook" PDF download** as primary CTA in hero (requires creating PDF first)
5. **Live counter** in Hero Results card: "+65 esta semana" already exists — could be more prominent

**Best fit (lowest effort, highest signal)**: combine **#1 + #3** — surface that the build log + open source are immediately consumable, no signup required.

**Acceptance**:
- Add `Read latest log →` pill near Now section title (anchor scrolls to build log)
- Update Open Source heading: append "Use in 60 seconds" or similar immediate-time framing
- Bilingual via existing `Now.*` and `OpenSource.*` translations

---

## 9. SUCCESs Emotional — strengthen emotional dimension

**BE lens**: SUCCESs framework (Heath — *Made to Stick*). The site is heavy on Concrete + Credible + Stories (partially), but light on Emotional. Heath: emotion is what makes ideas land in memory. High-arousal emotion (awe, indignation, amusement) beats low-arousal (satisfaction, complacency).

**Status**: partial — Bio has identity warmth ("unfair advantage"), Footer has personality ("with mate and side projects"). No dedicated emotional element.

**Why it matters**: data + proof = trust. Emotion = memory + share. Without emotion the site reads as a competent dashboard, not a person you remember.

**Possible implementations (pick one or layer multiple)**:

1. **Origin story line in Hero or `/about`** — 1 sentence about why Tegu exists. Example: *"Empezó porque mi vecina llamó a 5 plomeros y ninguno apareció. Si te pasa esto en Argentina, sabés."* — combines emotion + confirmation bias + identity.

2. **User quote in Now or Hero** — pull from a real Tegu user. From the latest update: *"Está muy buena la app. Suma, estamos agradecidos porque salen más trabajos." — pro con 25 años en oficios* OR *"Natalia consigue 1 trabajo nuevo cada 15 días."* — humanizes the metrics.

3. **Warmer photo** — current photo is neutral expression, t-shirt, formal. A photo with a smile or a behind-the-scenes shot (working, with a notebook, with the Docta Valley community) lifts emotional dimension.

4. **A short, vulnerable line in `/about`** — about something that didn't work / a bet that failed / a moment of doubt. Anti-survivorship bias, builds empathy.

**Best fit**: **#1 + #2 layered** — origin story in Hero (1 line, after the bio), and a real user quote pulled from the Tegu update somewhere prominent (could be a Quote card in Now or Press section).

**Acceptance**:
- Add origin story line to Hero (under bio, italic serif, 1-2 sentences)
- Add a `Testimonial` mini-card in Now section with a real Tegu user quote + name + role
- Bilingual via new translation keys (`Hero.originStory`, `Now.userQuote.*`)

**Note**: this is the closest you can get to "Testimonials" section (#4) without needing to ask people for quotes — the Tegu update already has real, attributed user quotes you can pull from.

---

## 10. SEO infrastructure — sitemap, robots, optimized images

**Why**: OG/Twitter meta tags shipped (`app/[locale]/layout.tsx`), but the rest of the SEO foundation is missing. For a site this dense and content-heavy, missing sitemap + robots = crawlers don't index your work properly.

**Status**: not implemented.

### Sub-tasks

**a) sitemap.xml**

Create `app/sitemap.ts` (Next.js App Router convention):

```ts
import type { MetadataRoute } from "next"
import { products } from "@/data/products"
import { getAllPostSlugs } from "@/lib/blog"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://matiasvallejos.com"
  const staticRoutes = ["", "/about", "/blog", "/books", "/products", "/writing"]
  const projectRoutes = products.map((p) => `/projects/${p.slug}`)
  const blogRoutes = getAllPostSlugs().map((slug) => `/${slug}`)
  return [...staticRoutes, ...projectRoutes, ...blogRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }))
}
```

**b) robots.txt**

Create `app/robots.ts`:

```ts
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: "https://matiasvallejos.com/sitemap.xml",
  }
}
```

**c) Turn off `images.unoptimized`**

Currently `next.config.mjs` has `images.unoptimized: true` (per CLAUDE.md). This means every image is served raw — no resizing, no WebP, no caching at the CDN edge.

- Remove `unoptimized: true`
- Add proper `<Image>` width/height props consistently
- Verify Vercel deploy uses image optimization

**Acceptance**: sitemap + robots accessible at `/sitemap.xml` and `/robots.txt`; Lighthouse shows Image opt enabled; submit sitemap to Google Search Console.

---

## 11. About page polish — timeline outcomes + skills review

**Why**: `/about` is i18n'd ✅ but the timeline entries describe what happened without quantified outcomes.

**Acceptance**:

- Add a metric/result per timeline entry. Example:
  - "2025 — Co-founded Docta Valley" → add: "240+ builders · 4 events · 12 startups launched"
  - "2026 — Building Tegu" → "2,200 users · 8 pros monetizing · press in Cadena 3, Perfil, iProUP"
- Review the Skills component (`src/components/skills.tsx`) — is it still relevant or should it be merged with the Stack section?
- Add metrics to `messages/{en,es}.json` `About.timeline.{year}.metrics`

---

## 12. Books opinions content (data fill)

**Why**: book page rebuilt around verdicts ✅ (must-read / worth-it / skim / skip), but only ~30% of books have real opinions filled (`takeaway`, `quote`, `appliedTo`). Most fall back to the synopsis-style `note`.

**Status**: infrastructure shipped. Content pending.

**Acceptance**:

- For each book in `src/data/books.ts`:
  - Add `takeaway`: 1 sentence about what you actually applied/changed after reading
  - Optionally add `quote`: one line worth pulling
  - Optionally add `appliedTo`: which Tegu / Docta Valley decision this influenced
- Skip if you don't remember — better to have N opinionated entries than M generic ones
- Books without takeaway fall back to `note` automatically (already handled by component)

---

## 13. Favicon + manifest polish

**Why**: site uses `/images/emoji.png` as favicon. Works but unprofessional for shareability and bookmark display.

**Acceptance**:

- Generate favicon set (16, 32, 48, 180, 192, 512 px) — can use realfavicongenerator.net or similar
- Replace icon reference in `app/[locale]/layout.tsx` metadata
- Optionally add `manifest.webmanifest` for PWA-style install prompt on mobile

---

## Playbook E quote — positioning anchor

> "El founder técnico tiene ventaja desproporcionada porque puede mostrar números y procesos reales que el 99% del ecosistema motivacional no puede."
>
> — *Behavioral Economics aplicado a venta, contenido y marca personal — Mapa accionable para founders* (Playbook E — founder técnico marca personal)

**Why this matters for the brand**: this is the explicit thesis that justifies the build-in-public approach used across the entire site (Build logs + Tegu metrics + Open Source + Press + Ship gallery). When in doubt about whether to publish a number, a process, or a postmortem — default to YES. That's the moat.

**Operationalize**:
- Every shipped feature → number in a build log
- Every learning → public reflection
- Every metric → public dashboard (already at `/now` Tegu metrics)
- Every open question → published as a thread or note
- The visible asymmetry between Mati and the average "thought leader" *is* the brand

---

## Score ceiling — what limits each next level

### Lo que limita el score a 9.5+

- **Hero row 2 layout question (1 unknown)** — after the Make It → GitHub stats swap, row 2 of the hero bento went from 4 cols filled to 3 cols filled. Decide: expand one card to col-span-2, OR add a 4th card (featured book / currently exploring), OR rebalance the grid. Documented as quick win in v6 analysis.
- **Falta Manifesto (story arc)** — see #1 above. Without a narrative thread, the site reads as a list of proofs without a why.
- **Falta How I work (funnel clarity)** — see #2 above. Visitor knows you're a Product Engineer + Co-Founder, but doesn't know what specific work to engage you for. "Open for: founder collabs · ideas · investor conversations" is too generic to convert.

### Lo que limita a 10

- **Testimonios reales** — see #4 above. Single highest-leverage missing block per BE lens (peer-similarity social proof). Requires collecting real quotes from people who've worked with you.
- **Cadencia de posting consistente** — this is content, not design. See `docs/next_go.md` for the full rhythm spec. Without weekly metric bumps + monthly build logs + per-release ship status, the site goes stale and the build-in-public signal collapses.

---

## Deferred / explicitly skipped (do not add unless asked)

- Newsletter signup (user opted out)
- Status quo bias copy (user opted out)
- Curiosity gap rewrite of press article titles (user opted out)
- Speaking / Talks section (user opted out)
