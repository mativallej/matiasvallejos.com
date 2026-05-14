# Next go — content & consistency rhythm

> The site is done at the design layer. From here, what moves the needle is content cadence — keeping the proofs fresh, the build log honest, and the ship status truthful.

---

## What comes next is no longer DESIGN, it's CONTENT and CONSISTENCY

- **Bumps a las métricas de Tegu cada semana**
  - Update `src/data/now.ts` → `teguMetrics` values
  - Update Hero Results card value (`+2200` → real current)
  - Cadence: weekly Sunday review

- **Build log mensual nuevo**
  - Add new entry to `src/data/now.ts` → `buildLogs[0]` (most recent first)
  - 3 highlight bullets per month, terminal-style
  - Cadence: end of each month

- **Ship status update por release**
  - Edit `src/components/ship-status.tsx` → bump the SHIPS array (most recent first)
  - Each ship: `shippedAt`, `target`, `link`, `description`, `tagKey`
  - Triggers: tag a release, ship a feature, hit a milestone, get press, publish a blog post
  - Cadence: per-event (ad-hoc)

- **Eventualmente: Manifesto + How I work cuando estés listo**
  - Both have full copy + acceptance criteria in `docs/next_steps.md` (#1 and #2)
  - Implement when you have the headspace to write the manifesto in your own voice

- **Testimonios cuando se acumulen**
  - 3+ real quotes minimum
  - Spec in `docs/next_steps.md` (#4)
  - Strategy: ask people who've worked with you (clients, collaborators, Docta Valley founders) for a 1-2 sentence quote — async via DM

---

## Why this matters

The site already competes at top-tier of personal sites for LatAm founders. The structure is there. The polish is there. The brand comes through clearly.

Diminishing returns on more design iteration. Compounding returns on content cadence.

The site goes stale fast if metrics aren't updated. A `+2200 users` from 2 months ago when you actually have `+3500` undermines the whole "build-in-public" signal.

**Treat the site as a living dashboard, not a portfolio.**
