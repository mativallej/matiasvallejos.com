"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue } from "framer-motion"

/**
 * Floating Argentina flag. Mounted globally in the locale layout. Spawns at a
 * random position along one of the four viewport edges (never in the middle
 * "dashboard" zone), can be dragged anywhere afterwards, and toggles between
 * a 44px emoji pill and a 110px video disc that expands in place.
 * Disabled on mobile (<768px) — no DOM at all.
 */
const COLLAPSED_SIZE = 44
const OPEN_SIZE = 77
const EDGE_PADDING = 24 // distance from the actual viewport edge
const EDGE_BAND = 80 // how thick the spawn band is from the edge
const MOBILE_BREAKPOINT = 768
// Reserve the bottom band entirely — the ShipStatus widget (bottom-6 right-6,
// ~200×200) lives there and the flag should never sit on top of it.
const BOTTOM_RESERVED = 240

type Edge = "top" | "right" | "left"

function pickEdgePosition(): { x: number; y: number } {
  const w = window.innerWidth
  const h = window.innerHeight
  const edges: Edge[] = ["top", "right", "left"]
  const edge = edges[Math.floor(Math.random() * edges.length)]

  const innerBandStart = EDGE_PADDING
  const innerBandEnd = EDGE_PADDING + EDGE_BAND
  // Vertical range for side edges: avoid the bottom band reserved for ShipStatus.
  const sideYRange = Math.max(
    0,
    h - COLLAPSED_SIZE - EDGE_PADDING - BOTTOM_RESERVED,
  )

  switch (edge) {
    case "top":
      return {
        x: EDGE_PADDING + Math.random() * (w - COLLAPSED_SIZE - EDGE_PADDING * 2),
        y: innerBandStart + Math.random() * EDGE_BAND,
      }
    case "right":
      return {
        x: w - COLLAPSED_SIZE - innerBandEnd + Math.random() * EDGE_BAND,
        y: EDGE_PADDING + Math.random() * sideYRange,
      }
    case "left":
      return {
        x: innerBandStart + Math.random() * EDGE_BAND,
        y: EDGE_PADDING + Math.random() * sideYRange,
      }
  }
}

export function DraggableFlag() {
  const [open, setOpen] = useState(false)
  // null = not yet decided (SSR + first paint). false = mobile, skip render.
  // true = desktop, render after random spawn point is picked.
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // Distinguish tap from drag: framer's onTap already filters small moves, but
  // a ref survives the synthetic click-after-drag edge case on touch devices.
  const dragged = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`)
    const apply = (matches: boolean) => {
      if (matches) {
        const pos = pickEdgePosition()
        x.set(pos.x)
        y.set(pos.y)
        setEnabled(true)
      } else {
        setEnabled(false)
      }
    }
    apply(mq.matches)
    const onChange = (e: MediaQueryListEvent) => apply(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [x, y])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  if (!enabled) return null

  return (
    <motion.button
      type="button"
      drag
      dragMomentum={false}
      dragElastic={0}
      style={{ x, y }}
      onDragStart={() => {
        dragged.current = true
      }}
      onDragEnd={() => {
        window.setTimeout(() => {
          dragged.current = false
        }, 50)
      }}
      onTap={() => {
        if (dragged.current) return
        setOpen((v) => !v)
      }}
      animate={{
        width: open ? OPEN_SIZE : COLLAPSED_SIZE,
        height: open ? OPEN_SIZE : COLLAPSED_SIZE,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      aria-label={open ? "Close Argentina flag video" : "Play Argentina flag video"}
      title={open ? "Tap to close" : "Argentina — drag me anywhere"}
      whileHover={open ? undefined : { scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 1.12 }}
      className={`fixed top-0 left-0 z-30 flex items-center justify-center rounded-full overflow-hidden bg-[#080706] leading-none touch-none select-none transition-colors cursor-grab active:cursor-grabbing ${
        open
          ? "border-2 border-[#FB923C] shadow-2xl"
          : "border border-[#3D3935] shadow-lg hover:border-[#FB923C]"
      }`}
    >
      {open ? (
        <video
          src="/argentina.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-[22px]">🇦🇷</span>
      )}
    </motion.button>
  )
}
