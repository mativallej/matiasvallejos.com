"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

type Ship = {
  shippedAt: string
  target: string
  link: string
  description: string
  bullets?: string[]
  tagKey?: "tagOpenSource" | "tagMilestone" | "tagPress" | "tagBlog" | "tagUpdate"
}

// Most recent ships first. Bump the list when something new ships.
const SHIPS: Ship[] = [
  {
    shippedAt: "2026-05-13T22:00:00-03:00",
    target: "shipstats",
    link: "https://github.com/mativallej/shipstats",
    description: "Weekly metrics → brand poster for X. JSON in, screenshot-ready HTML out.",
    tagKey: "tagOpenSource",
  },
  {
    shippedAt: "2026-05-04T10:00:00-03:00",
    target: "Tegu updates",
    link: "https://x.com/mativallej_/status/2053943751014555800",
    description: "Mensual de Tegu — milestones del último mes.",
    bullets: [
      "2.110 usuarios · 1.000 activos esta semana",
      "8 pros pagaron en 4 días",
      "Pico de 21 tareas en un solo día",
      "13K visitas SEO",
      "1 mes monetizando · sólo Córdoba",
    ],
    tagKey: "tagUpdate",
  },
]

function makeTimeAgo(t: ReturnType<typeof useTranslations>) {
  return (iso: string): string => {
    const ms = Date.now() - new Date(iso).getTime()
    if (ms < 0) return t("justNow")
    const min = Math.floor(ms / 60_000)
    if (min < 1) return t("justNow")
    const ago = t("ago")
    if (min < 60) return `${min}m ${ago}`
    const hrs = Math.floor(min / 60)
    if (hrs < 48) return `${hrs}h ${ago}`
    const days = Math.floor(hrs / 24)
    if (days < 30) return `${days}d ${ago}`
    const months = Math.floor(days / 30)
    return `${months}mo ${ago}`
  }
}

export function ShipStatus() {
  const t = useTranslations("Ship")
  const timeAgo = makeTimeAgo(t)
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [, forceTick] = useState(0)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => forceTick((n) => n + 1), 60_000)
    return () => clearInterval(id)
  }, [])

  const close = useCallback(() => setOpen(false), [])
  const next = useCallback(() => setIndex((i) => (i + 1) % SHIPS.length), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + SHIPS.length) % SHIPS.length), [])

  // Keyboard nav when story open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close, next, prev])

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = original }
  }, [open])

  if (!mounted) return null

  const featured = SHIPS[0]
  const featuredAgo = timeAgo(featured.shippedAt)
  const current = SHIPS[index]
  const currentAgo = timeAgo(current.shippedAt)

  return (
    <>
      {/* Floating trigger — bottom-right pile */}
      <div
        className="fixed bottom-6 right-6 z-40 flex items-end justify-end"
        style={{ width: 200, height: 200 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.button
          type="button"
          onClick={() => { setIndex(0); setOpen(true) }}
          aria-label={`${t("lastShip")} ${featuredAgo} → ${featured.target}`}
          animate={{
            width: hovered ? 200 : 112,
            height: hovered ? 200 : 112,
            rotate: hovered ? -2 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative block cursor-pointer p-0 border-0 bg-transparent text-left"
        >
          {/* Back card 2 */}
          <span aria-hidden className="absolute inset-0 rounded-2xl bg-[#3D3935]/60 border border-[#3D3935] -rotate-[8deg] translate-x-1.5 translate-y-1.5 shadow-xl" />
          {/* Back card 1 */}
          <span aria-hidden className="absolute inset-0 rounded-2xl bg-[#12100E] border border-[#3D3935] -rotate-[4deg] translate-x-0.5 translate-y-0.5 shadow-xl" />

          {/* Front card */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-[#A3B86C]/70 hover:border-[#A3B86C] bg-gradient-to-br from-[#1C1917] via-[#0C0A09] to-[#080706] shadow-2xl shadow-[#080706]/80 transition-colors duration-200 flex flex-col p-3 gap-1.5">
            <span className="font-mono text-[9px] text-[#FB923C] uppercase tracking-[0.08em]">
              {t("shipped")}
            </span>
            <span className="font-mono text-[12px] text-white font-semibold truncate">
              {featured.target}
            </span>
            <span className="font-mono text-[8px] text-[#78716C] leading-snug line-clamp-3">
              {featured.description}
            </span>

            <AnimatePresence>
              {hovered && (
                <motion.div
                  key="last-ship-info"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="mt-auto pt-2 border-t border-[#3D3935]/60"
                >
                  <span className="font-mono text-[10px] tracking-tight whitespace-nowrap">
                    <span className="text-[#57534E]">{t("lastShip")}</span>{" "}
                    <span className="text-white">{featuredAgo}</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pulsing dot */}
          <span className="absolute -top-1 -left-1 flex w-3 h-3 z-10">
            <span className="absolute inline-flex w-full h-full rounded-full bg-[#A3B86C] opacity-70 animate-ping" />
            <span className="relative inline-flex w-3 h-3 rounded-full bg-[#A3B86C] border-2 border-[#080706]" />
          </span>
        </motion.button>
      </div>

      {/* Story mode — fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="ship-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#080706]/85 backdrop-blur-md p-6"
            onClick={close}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[#78716C] hover:text-white hover:bg-[#3D3935]/40 transition-colors duration-200 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Story pile — current card on top, others stacked behind */}
            <div
              className="relative w-[340px] h-[340px]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Single back card — the next ship, peeking from behind */}
              {SHIPS.length > 1 && (
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-3xl border border-[#3D3935] bg-[#12100E] shadow-xl pointer-events-none"
                  style={{
                    transform: "translate(14px, 14px) rotate(4deg)",
                    zIndex: 1,
                  }}
                />
              )}
            <AnimatePresence mode="wait" custom={1}>
              <motion.div
                key={current.target}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  const threshold = 70
                  if (info.offset.x < -threshold || info.velocity.x < -300) next()
                  else if (info.offset.x > threshold || info.velocity.x > 300) prev()
                }}
                whileDrag={{ scale: 0.98, cursor: "grabbing" }}
                initial={{ opacity: 0, scale: 0.92, x: 14, y: 14, rotate: 4 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.86, y: 24, rotate: -3 }}
                transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-[#A3B86C]/40 bg-gradient-to-br from-[#1C1917] via-[#0C0A09] to-[#080706] shadow-2xl shadow-[#080706]/80 flex flex-col p-6 cursor-grab touch-none select-none"
                style={{ zIndex: SHIPS.length + 1 }}
              >
                {/* Tag */}
                {current.tagKey && (
                  <span className="font-mono text-[10px] text-[#FB923C] uppercase tracking-[0.08em] mb-2">
                    {t(current.tagKey)}
                  </span>
                )}

                {/* Title */}
                <h2 className="font-serif text-[20px] text-white leading-[1.2] tracking-tight mb-3">
                  {current.target}
                </h2>

                {/* Description or bullets */}
                {current.bullets && current.bullets.length > 0 ? (
                  <ul className="flex flex-col gap-1">
                    {current.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="font-mono text-[11px] text-[#A8A29E] leading-snug flex items-baseline gap-2"
                      >
                        <span className="text-[#57534E] flex-shrink-0">→</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-mono text-[11px] text-[#A8A29E] leading-relaxed line-clamp-4">
                    {current.description}
                  </p>
                )}

                {/* Bottom: time + CTA */}
                <div className="mt-auto flex flex-col gap-4">
                  <span className="font-mono text-[11px] tracking-tight">
                    <span className="text-[#57534E]">{t("shippedAgo")}</span>{" "}
                    <span className="text-white">{currentAgo}</span>
                  </span>
                  <a
                    href={current.link}
                    target={current.link.startsWith("http") ? "_blank" : undefined}
                    rel={current.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center justify-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.04em] bg-[#E8742A] text-[#080706] px-4 py-2.5 rounded-md hover:bg-[#D4622A] transition-colors duration-200 self-start"
                  >
                    {t("open")} →
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
