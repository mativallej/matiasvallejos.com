---
title: "Building in Public: Why I Share Everything"
description: "The uncomfortable truth about building in public -- what works, what doesn't, and why I keep doing it anyway."
date: "2025-06-15"
tags: ["building-in-public", "indie-maker"]
category: "life"
featured: true
---

## The beginning

I started sharing my work online almost by accident. A screenshot of a half-finished dashboard, a quick thread about a bug that took me three hours to fix. Nothing groundbreaking. But something happened that I didn't expect -- people started paying attention.

Not because what I was building was revolutionary. Because **it was real**.

> The best marketing is showing your work. Not the polished version. The messy, honest, in-progress version.

## Why most people quit

Building in public sounds great in theory. In practice, it's uncomfortable. You're exposing:

- Half-baked ideas that might not work
- Revenue numbers that might be embarrassing
- Technical decisions that might be wrong
- Design choices that might look amateur

Most people post for two weeks, get discouraged by the silence, and stop. The ones who stick around? They're the ones who realize the audience isn't the point.

## The real benefit

The real benefit of building in public isn't followers or engagement. It's **clarity**. When you force yourself to explain what you're doing and why, you think better.

Here's my process:

1. Build something small
2. Write about what I learned
3. Share it without overthinking
4. Repeat

That's it. No content calendar, no engagement strategy. Just honest work, shared consistently.

## What I've learned

### Consistency beats quality

A mediocre post every week beats a perfect post every quarter. Your audience (even if it's just five people) wants to see the journey, not the highlight reel.

### Show the process, not just the result

Nobody cares about your landing page. They care about *how you decided what to put on it*. The decisions, the tradeoffs, the things you cut -- that's the interesting part.

### Code speaks louder than words

When I share a technical decision, I try to include the actual code:

```typescript
// Before: fetching all posts on every request
const posts = await db.query('SELECT * FROM posts ORDER BY date DESC')

// After: static generation with ISR
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}
```

Real examples > abstract advice.

### Engage with the people who show up

The person who leaves a thoughtful comment on your post is worth more than 10,000 passive followers. Reply to them. Learn from them. Build with them.

## The uncomfortable parts

I'm not going to pretend it's all upside. Building in public means:

- People will copy your ideas (let them)
- People will criticize your approach (listen, then decide)
- You'll feel exposed on bad days (that's okay)
- Some posts will get zero engagement (most of them, actually)

But the alternative -- building in silence, hoping someone notices -- is worse.

## My stack for sharing

For anyone curious, here's what I use:

| Tool | Purpose |
|------|---------|
| Twitter/X | Daily updates, quick thoughts |
| Personal site | Long-form essays, portfolio |
| GitHub | Open source, code examples |

Keep it simple. The tool matters less than the consistency.

## Final thoughts

Building in public isn't a growth hack. It's a practice. Like journaling, but with an audience. The audience might be small at first (mine was literally three people for months), but that's not the point.

The point is: **you become a better builder when you build in public**. You think more clearly, make better decisions, and connect with people who actually care about what you're making.

Start today. Share something imperfect. See what happens.
