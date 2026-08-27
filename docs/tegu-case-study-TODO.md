# Tegu case study — open TODOs

Live page: `/case-study/tegu` (route: `app/[locale]/case-study/tegu/page.tsx`).
Content: `src/data/tegu-case-study.ts` (bilingual, en + es).
Images: `public/images/case-study/tegu/` (+ reused mockups in `public/images/projects/tegu/`).

## 1. Demo video (deferred)

The case study has a placeholder slot for a Tegu demo/promo video that is **not embedded yet** — we don't have the asset. To add it later:

1. Get the video URL (YouTube preferred) or an `.mp4` file.
2. If YouTube: reuse the `YouTubeFacade` pattern from `tegu-landing` (lazy iframe), or add a simple `<iframe>`/`<video>` in the "Product" section of `app/[locale]/case-study/tegu/page.tsx`.
   - If it's a file, drop it in `public/images/case-study/tegu/demo.mp4` and use a `<video controls>` tag.
3. Set `hasVideo` / `videoUrl` in `src/data/tegu-case-study.ts` and render it where the `{/* VIDEO SLOT */}` comment is in the page.

Guardrail: keep it public-safe (no internal dashboards, targets, or user data on screen).

## 2. Other follow-ups

- Consider a real OG/social image for the case study (currently falls back to the Tegu logo).
- Optional: pull deeper narrative color from tegu-docs **without** publishing internal numbers/targets/unlaunched features/user names (per the building-in-public manifesto rule).
