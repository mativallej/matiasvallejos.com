# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build (note: `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `tsc --noEmit` is the only way to catch type errors)
- `npm run start` — serve the production build
- `npm run lint` — ESLint over the repo
- No test runner is configured.

Package manager: both `package-lock.json` and `pnpm-lock.yaml` exist; `package-lock.json` is the recently regenerated one, so prefer `npm`.

## Architecture

Personal-brand site built on **Next.js 16 (App Router) + React 19 + Tailwind + shadcn/ui (Radix) + next-intl**.

### Internationalization is the dominant architectural concern

- Locales `en` and `es` are defined in `src/i18n/routing.ts` with `localePrefix: "as-needed"` (default `en` has no prefix, `/es/...` for Spanish).
- All user-facing routes live under `app/[locale]/` — `page.tsx`, `about/`, `blog/`, `books/`, `products/`, `writing/`, `design-system/`, `[slug]/`, plus the root `layout.tsx`. The top-level `app/page.tsx`, `app/layout.tsx`, etc. shown as deleted in `git status` are intentionally removed in favor of the locale-scoped tree — do not recreate them.
- Translation messages live in `messages/en.json` and `messages/es.json`, loaded by `src/i18n/request.ts`.
- Routing middleware is in `proxy.ts` at the repo root. Next.js 16 renamed `middleware.ts` to `proxy.ts`; do not rename it back. It uses `createMiddleware(routing)` from `next-intl/middleware` and matches `/((?!api|_next|_vercel|.*\\..*).*)`.
- Use the wrapped navigation helpers from `src/i18n/navigation.ts` (`Link`, `redirect`, `usePathname`, `useRouter`, `getPathname`) for any locale-aware navigation rather than `next/link` / `next/navigation` directly.
- `next.config.mjs` wires next-intl via `createNextIntlPlugin("./src/i18n/request.ts")`.

### Content layer

- **Blog posts** are Markdown files in `content/blog/` with gray-matter frontmatter (`title`, `description`, `date`, `tags`, `category`, `featured`, `twitterUrl`). `src/lib/blog.ts` is the single source of truth for reading/rendering them — it composes `unified` + `remark-parse` + `remark-gfm` + `remark-rehype` + `rehype-slug` + `rehype-autolink-headings` + `rehype-stringify`, and computes `readTime` at 200 wpm. Pages should call `getAllPosts`, `getFeaturedPosts`, `getAllPostSlugs`, or `getPostBySlug` rather than re-reading the filesystem.
- **Other content** (products, books, articles, `now`) is in plain TS modules under `src/data/` — edit those files directly to update site content.

### Component layout

- `src/components/` holds page-section components (`hero`, `products`, `writing`, `books`, `latest-tweets`, `now`, `contact`, `navbar`, `footer`, `locale-switcher`, `dashboard`, `project-card`, etc.) consumed by route pages in `app/[locale]/`.
- shadcn/ui is configured via `components.json`; primitives live under `src/components/ui/` (Radix-based). Use `cn` from `src/lib/utils.ts` for class composition.
- Styling: Tailwind CSS, `tailwindcss-animate`, `@tailwindcss/typography`, plus `framer-motion` for motion. `next-themes` provides theming.

### Build/runtime notes

- `images.unoptimized: true` — the Next.js image optimizer is disabled, so `<Image>` src files are served as-is from `public/`.
- TypeScript build errors are ignored at `next build`; rely on the editor / `tsc --noEmit` for type safety.
- `@vercel/analytics` is wired in; production deploys are on Vercel.
