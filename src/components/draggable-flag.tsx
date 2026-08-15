"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue } from "framer-motion"

/**
 * Floating Argentina flag. Mounted globally in the locale layout. Spawns at a
 * random position along one of the four viewport edges (never in the middle
 * "dashboard" zone), can be dragged anywhere afterwards, and toggles between
 * a 44px emoji pill and a 77px video disc that expands in place.
 * Enabled on every viewport size, including touch/mobile.
 */
const COLLAPSED_SIZE = 44
const OPEN_SIZE = 77
const EDGE_PADDING = 24 // distance from the actual viewport edge
const EDGE_BAND = 80 // how thick the spawn band is from the edge
// The navbar is sticky at z-50 and 48px tall, so it paints over the flag.
// Keep the spawn point clear of it or the flag lands invisible.
const TOP_RESERVED = 56
// Reserve the bottom band entirely — the ShipStatus widget (bottom-6 right-6,
// ~200×200) lives there and the flag should never sit on top of it.
const BOTTOM_RESERVED = 240

type Edge = "top" | "right" | "left"

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max)

function pickEdgePosition(): { x: number; y: number } {
  const w = window.innerWidth
  const h = window.innerHeight
  const edges: Edge[] = ["top", "right", "left"]
  const edge = edges[Math.floor(Math.random() * edges.length)]

  const innerBandStart = EDGE_PADDING
  const innerBandEnd = EDGE_PADDING + EDGE_BAND
  // Horizontal range for the top edge — never negative on narrow phones.
  const topXRange = Math.max(0, w - COLLAPSED_SIZE - EDGE_PADDING * 2)
  // Vertical range for side edges: below the navbar, above the ShipStatus band.
  const sideYRange = Math.max(
    0,
    h - COLLAPSED_SIZE - TOP_RESERVED - BOTTOM_RESERVED,
  )

  switch (edge) {
    case "top":
      return {
        x: EDGE_PADDING + Math.random() * topXRange,
        y: TOP_RESERVED + Math.random() * EDGE_BAND,
      }
    case "right":
      return {
        x: Math.max(
          EDGE_PADDING,
          w - COLLAPSED_SIZE - innerBandEnd + Math.random() * EDGE_BAND,
        ),
        y: TOP_RESERVED + Math.random() * sideYRange,
      }
    case "left":
      return {
        x: innerBandStart + Math.random() * EDGE_BAND,
        y: TOP_RESERVED + Math.random() * sideYRange,
      }
  }
}

export function DraggableFlag() {
  const [open, setOpen] = useState(false)
  // false during SSR + first paint (no viewport to measure yet), true once the
  // random spawn point is picked on the client.
  const [ready, setReady] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // Distinguish tap from drag: framer's onTap already filters small moves, but
  // a ref survives the synthetic click-after-drag edge case on touch devices.
  const dragged = useRef(false)

  useEffect(() => {
    const pos = pickEdgePosition()
    x.set(pos.x)
    y.set(pos.y)
    setReady(true)

    // Rotating a phone or resizing can leave the flag off-screen; pull it back.
    const onResize = () => {
      const maxX = Math.max(0, window.innerWidth - OPEN_SIZE - EDGE_PADDING)
      const maxY = Math.max(0, window.innerHeight - OPEN_SIZE - EDGE_PADDING)
      x.set(clamp(x.get(), EDGE_PADDING, maxX))
      y.set(clamp(y.get(), TOP_RESERVED, maxY))
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [x, y])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  if (!ready) return null

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
        // Keep it inside the viewport — a flick on a small screen can otherwise
        // park the flag past the edge with no way to drag it back.
        const size = open ? OPEN_SIZE : COLLAPSED_SIZE
        x.set(clamp(x.get(), 0, Math.max(0, window.innerWidth - size)))
        y.set(clamp(y.get(), 0, Math.max(0, window.innerHeight - size)))
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
