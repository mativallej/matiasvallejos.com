"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

type Ship = {
  id: string
  shippedAt: string
  link: string
  hasBullets?: boolean
  tagKey?: "tagOpenSource" | "tagMilestone" | "tagPress" | "tagBlog" | "tagUpdate"
}

// Most recent ships first. Bump the list when something new ships.
// Copy (target, description, bullets) lives in messages/{locale}.json under Ship.ships.<id>.
const SHIPS: Ship[] = [
  {
    id: "shipstats",
    shippedAt: "2026-05-13T22:00:00-03:00",
    link: "https://github.com/mativallej/shipstats",
    tagKey: "tagOpenSource",
  },
  {
    id: "tegu-update-2026-05",
    shippedAt: "2026-05-04T10:00:00-03:00",
    link: "https://x.com/mativallej_/status/2053943751014555800",
    hasBullets: true,
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
  const [nearBottom, setNearBottom] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => forceTick((n) => n + 1), 60_000)
    return () => clearInterval(id)
  }, [])

  // Hide trigger when footer is in view to avoid overlap
  useEffect(() => {
    const onScroll = () => {
      const distanceFromBottom =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
      setNearBottom(distanceFromBottom < 240)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const close = useCallback(() => setOpen(false), [])
  const next = useCallback(() => setIndex((i) => (i + 1) % SHIPS.length), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + SHIPS.length) % SHIPS.length), [])
  const draggedRef = useRef(false)
  const [cardHovered, setCardHovered] = useState(false)

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
  const featuredTarget = t(`ships.${featured.id}.target` as const)
  const featuredDescription = t(`ships.${featured.id}.description` as const)
  const current = SHIPS[index]
  const currentAgo = timeAgo(current.shippedAt)
  const currentTarget = t(`ships.${current.id}.target` as const)
  const currentDescription = t(`ships.${current.id}.description` as const)
  const currentBullets = current.hasBullets
    ? (t.raw(`ships.${current.id}.bullets`) as string[])
    : undefined

  return (
    <>
      {/* Floating trigger — bottom-right pile */}
      <div
        className={`fixed bottom-6 right-6 z-30 flex items-end justify-end transition-opacity duration-200 ${
          nearBottom && !open ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ width: 200, height: 200 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.button
          type="button"
          onClick={() => { setIndex(0); setOpen(true) }}
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
              {featuredTarget}
            </span>
            <span className="font-mono text-[8px] text-[#A8A29E] leading-snug line-clamp-3">
              {featuredDescription}
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
                    <span className="text-[#A8A29E]">{t("lastShip")}</span>{" "}
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
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[#A8A29E] hover:text-white hover:bg-[#3D3935]/40 transition-colors duration-200 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Story pile — current card on top, others stacked behind */}
            <div
              className="relative w-[306px] h-[306px]"
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
                key={current.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragStart={() => {
                  draggedRef.current = true
                }}
                onDragEnd={(_, info) => {
                  const threshold = 70
                  if (info.offset.x < -threshold || info.velocity.x < -300) next()
                  else if (info.offset.x > threshold || info.velocity.x > 300) prev()
                  // Keep flag until the synthetic click that follows drag is suppressed
                  setTimeout(() => {
                    draggedRef.current = false
                  }, 50)
                }}
                whileDrag={{ scale: 0.98, cursor: "grabbing" }}
                onHoverStart={() => setCardHovered(true)}
                onHoverEnd={() => setCardHovered(false)}
                initial={{ opacity: 0, scale: 0.92, x: 14, y: 14, rotate: 4 }}
                animate={{ opacity: 1, scale: cardHovered ? 1.03 : 1, x: 0, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.86, y: 24, rotate: -3 }}
                transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => {
                  if (draggedRef.current) return
                  if (current.link.startsWith("http")) {
                    window.open(current.link, "_blank", "noopener,noreferrer")
                  } else {
                    window.location.href = current.link
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    if (current.link.startsWith("http")) {
                      window.open(current.link, "_blank", "noopener,noreferrer")
                    } else {
                      window.location.href = current.link
                    }
                  }
                }}
                role="link"
                tabIndex={0}
                aria-label={`${currentTarget} — ${t("open")}`}
                className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-[#A3B86C]/40 hover:border-[#A3B86C]/80 bg-gradient-to-br from-[#1C1917] via-[#0C0A09] to-[#080706] shadow-2xl shadow-[#080706]/80 flex flex-col p-6 cursor-pointer touch-none select-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#A3B86C]/60"
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
                  {currentTarget}
                </h2>

                {/* Description or bullets */}
                {currentBullets && currentBullets.length > 0 ? (
                  <ul className="flex flex-col gap-1">
                    {currentBullets.map((b, i) => (
                      <li
                        key={i}
                        className="font-mono text-[11px] text-[#A8A29E] leading-snug flex items-baseline gap-2"
                      >
                        <span className="text-[#A8A29E] flex-shrink-0">→</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-mono text-[11px] text-[#A8A29E] leading-relaxed line-clamp-4">
                    {currentDescription}
                  </p>
                )}

                {/* Bottom: time */}
                <div className="mt-auto flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] tracking-tight">
                    <span className="text-[#A8A29E]">{t("shippedAgo")}</span>{" "}
                    <span className="text-white">{currentAgo}</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#E8742A] tracking-tight">
                    {t("open")} →
                  </span>
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
