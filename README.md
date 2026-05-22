# 🌐 matiasvallejos.com — Personal Brand Website

[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/mativallej_?style=social)](https://x.com/mativallej_)
[![GitHub top language](https://img.shields.io/github/languages/top/mativallej/matiasvallejos.com?color=1081c2)](https://github.com/mativallej/matiasvallejos.com/search?l=typescript)
![License](https://img.shields.io/github/license/mativallej/matiasvallejos.com?label=license&logo=github&color=f80&logoColor=fff)
![Forks](https://img.shields.io/github/forks/mativallej/matiasvallejos.com.svg)
![Stars](https://img.shields.io/github/stars/mativallej/matiasvallejos.com.svg)
![Watchers](https://img.shields.io/github/watchers/mativallej/matiasvallejos.com.svg)

> Personal brand and portfolio site for Matías Vallejos — Product Engineer, Co-Founder @ Tegu. Built with Next.js 16, React 19, Tailwind, and next-intl. Multilingual (EN/ES) by design.

🚀 Live site: **[matiasvallejos.com](https://matiasvallejos.com/)**

## 📘 Introduction

**matiasvallejos.com** is my digital home — a curated portfolio that doubles as a writing platform and a public log of what I'm shipping. It treats product and engineering as one discipline, and uses the site itself as a working example of the principles I write about.

**What lives here:**
- 🧠 **Writing** – Long-form essays and notes on product, engineering, and building in LatAm.
- 🛠️ **Projects** – Case studies of what I've built (Tegu, Docta Valley, open source).
- 📚 **Books & Reading List** – What I'm reading and what I've taken away from it.
- 🚀 **Ship Log** – A live feed of the latest things I've shipped, with story-style cards.
- 🌎 **Bilingual (EN/ES)** – Full i18n via `next-intl` with locale-aware routing.

## ✨ Key Features

- **⚡ Next.js 16 + React 19** – App Router, server components, modern rendering pipeline.
- **🌍 Internationalization** – `next-intl` with `en` / `es` locales, locale-aware routing (`/`, `/es/...`), and full message catalogs.
- **🎨 Tailwind + shadcn/ui** – Radix-powered primitives with a hand-tuned design system, dark by default.
- **🖱️ Custom Cursor Dot** – Brand-orange follower with `mix-blend-difference` contrast and morph-on-hover for interactive elements.
- **📝 Markdown Blog** – Posts authored in Markdown under `content/blog/`, rendered through a `unified` + `remark` + `rehype` pipeline with autolinked headings.
- **📊 Live Ship Status** – Floating story-mode card with swipe nav, drag-aware click handling, and full-card linking.
- **🎞️ Framer Motion** – Smooth, opinionated motion across hero, cards, and overlays.
- **🌗 Theming** – `next-themes` integration; sensible defaults.
- **📈 Analytics** – `@vercel/analytics` wired up for production deploys.

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+ recommended
- **npm** (both `package-lock.json` and `pnpm-lock.yaml` exist — `npm` is the canonical one)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/mativallej/matiasvallejos.com.git
   cd matiasvallejos.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the dev server**
   ```bash
   npm run dev
   ```
   The site is available at [http://localhost:3000](http://localhost:3000).

4. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

### Available Scripts

| Command            | Description                                        |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Start the Next.js dev server                       |
| `npm run build`    | Production build                                   |
| `npm run start`    | Serve the production build                         |
| `npm run lint`     | Run ESLint                                         |
| `npx tsc --noEmit` | Type-check (the build itself ignores type errors)  |

## 🧩 Detailed Setup (Developers)

### Tech Stack

**Framework & Rendering**
- Next.js 16 (App Router)
- React 19
- TypeScript

**Styling & UI**
- Tailwind CSS + `tailwindcss-animate` + `@tailwindcss/typography`
- shadcn/ui (Radix primitives) — `src/components/ui/`
- Framer Motion for animation
- `next-themes` for theming

**Internationalization**
- `next-intl` with `localePrefix: "as-needed"` (default `en` has no prefix, `/es/...` for Spanish)
- Messages in `messages/en.json` and `messages/es.json`
- Routing middleware lives in `proxy.ts` at the repo root (Next.js 16 renamed `middleware.ts` → `proxy.ts`)

**Content Layer**
- **Blog posts**: Markdown files in `content/blog/` with gray-matter frontmatter. Source of truth: `src/lib/blog.ts` (unified + remark + rehype).
- **Other content**: Plain TS modules in `src/data/` (products, books, articles, `now`).

### Project Structure

```
.
├── app/
│   └── [locale]/              # All user-facing routes (locale-scoped)
│       ├── layout.tsx         # Root layout (loads CursorDot, DraggableFlag, Analytics)
│       ├── page.tsx
│       ├── about/, blog/, books/, products/, writing/, design-system/, [slug]/
│       └── ...
├── content/
│   └── blog/                  # Markdown blog posts
├── messages/
│   ├── en.json                # English copy
│   └── es.json                # Spanish copy
├── public/                    # Static assets (images served as-is — image optimizer is disabled)
├── src/
│   ├── components/            # Section components (hero, products, writing, ship-status, ...)
│   ├── components/ui/         # shadcn/ui primitives
│   ├── data/                  # Static content modules (products, books, articles, now)
│   ├── i18n/                  # Routing, request, and navigation helpers
│   ├── lib/                   # blog.ts, schema, seo, utils
│   └── styles/
├── proxy.ts                   # next-intl middleware (renamed from middleware.ts in Next 16)
├── next.config.mjs            # Wires next-intl plugin, disables image optimizer
├── tailwind.config.ts
└── components.json            # shadcn/ui config
```

### Adding Content

**Add a blog post**

1. Create `content/blog/your-slug.md`:
   ```md
   ---
   title: "Your post title"
   description: "One-line summary"
   date: "2026-05-22"
   tags: ["product", "engineering"]
   category: "engineering"
   featured: false
   ---

   Markdown body…
   ```
2. Posts are picked up automatically via `src/lib/blog.ts` (`getAllPosts`, `getAllPostSlugs`, `getPostBySlug`).
3. `readTime` is auto-computed at 200 wpm.

**Add a product / book / now entry**

Edit the corresponding TS module under `src/data/` directly. Each module exports a typed array consumed by the matching section component.

**Add a translation key**

1. Add the key under the relevant namespace in `messages/en.json`.
2. Mirror it in `messages/es.json`.
3. Consume it with `useTranslations("Namespace")` in a client component or `getTranslations("Namespace")` in a server component.

### Navigation & Routing

Use the wrapped helpers from `src/i18n/navigation.ts` for locale-aware navigation:

```ts
import { Link, redirect, usePathname, useRouter } from "@/i18n/navigation";
```

Do **not** import directly from `next/link` or `next/navigation` for routes that need to respect the active locale.

## 🤖 Architecture Overview

### Routing Pipeline

1. Request hits `proxy.ts` → `createMiddleware(routing)` (next-intl).
2. The middleware resolves the active locale based on URL prefix (`/`, `/es/...`) or Accept-Language fallback.
3. The locale is passed into `app/[locale]/layout.tsx` via the `params` promise and pinned with `setRequestLocale`.
4. `NextIntlClientProvider` makes translations available to client components.

### Blog Rendering Pipeline

1. `src/lib/blog.ts` reads `.md` files from `content/blog/`.
2. `gray-matter` extracts frontmatter and content.
3. Content is piped through:
   `unified()` → `remark-parse` → `remark-gfm` → `remark-rehype` → `rehype-slug` → `rehype-autolink-headings` → `rehype-stringify`.
4. The page component renders the resulting HTML and metadata.

### Build & Deploy

- Hosted on **Vercel** (production deploys via the `main` branch).
- `next.config.mjs` sets `images.unoptimized: true` — the Next image optimizer is disabled and `public/` files are served as-is.
- `typescript.ignoreBuildErrors: true` in `next.config.mjs` — type errors don't fail the build. Run `npx tsc --noEmit` locally for type safety.
- `@vercel/analytics` is mounted only in production (`process.env.VERCEL`).

## 💡 Usage Notes

- **Locales are first-class.** Anything user-facing should live under `app/[locale]/`. The top-level `app/page.tsx` / `app/layout.tsx` are intentionally removed — do not recreate them.
- **`proxy.ts` is the middleware.** Next.js 16 renamed `middleware.ts` → `proxy.ts`. Don't rename it back.
- **Edit content, not components, when possible.** Blog posts, products, books, and `now` updates should be edits to `content/` or `src/data/`, not new component code.
- **No test runner.** There is no configured test framework in this repo. Type-check + lint is the safety net.

## 🤝 Contributing

Contributions and ideas are welcome — especially around accessibility, copy, and translations.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes:
   - **Copy / translations** → `messages/{en,es}.json`
   - **Blog posts** → `content/blog/*.md`
   - **Static content** → `src/data/*.ts`
   - **UI / sections** → `src/components/`
4. Run locally:
   ```bash
   npm run dev
   npm run lint
   npx tsc --noEmit
   ```
5. Commit and push your changes.
6. Open a Pull Request.

**Guidelines:**
- Keep both locales in sync when adding or editing user-facing copy.
- Don't reintroduce locale-less top-level routes (`app/page.tsx`, etc.).
- Use the wrapped navigation helpers from `src/i18n/navigation.ts`.

## 📞 Contact

If you have questions, suggestions, or want to collaborate:

- **Name:** Matías Vallejos
- 🌐 [matiasvallejos.com](https://matiasvallejos.com)
- 𝕏 [@mativallej_](https://x.com/mativallej_)
- 💼 [LinkedIn](https://www.linkedin.com/in/mativallej/)
- 💻 [GitHub](https://github.com/mativallej)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
