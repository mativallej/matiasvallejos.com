"use client"

import { useEffect, useRef, useState } from "react"

const INTERACTIVE_SELECTOR = 'a, button, [role="link"], [role="button"], input, textarea, select, summary, label[for], [data-cursor="link"]'

export function CursorDot() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(hover: none)").matches) return

    const target = { x: -100, y: -100 }
    const current = { x: -100, y: -100 }
    const offset = { v: -14 }
    let raf = 0
    let started = false
    let activeNow = false

    const tick = () => {
      const ePos = 0.18
      current.x += (target.x - current.x) * ePos
      current.y += (target.y - current.y) * ePos

      const eOff = 0.18
      const offsetTarget = activeNow ? 0 : -14
      offset.v += (offsetTarget - offset.v) * eOff

      const el = dotRef.current
      if (el) {
        el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) translate(${offset.v}px, ${offset.v}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    const handleMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!started) {
        current.x = e.clientX
        current.y = e.clientY
        started = true
      }
      setVisible(true)
      const el = e.target as Element | null
      const interactive = !!(el && el.closest && el.closest(INTERACTIVE_SELECTOR))
      activeNow = interactive
      setActive(interactive)
    }
    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    window.addEventListener("mousemove", handleMove)
    document.addEventListener("mouseleave", handleLeave)
    document.addEventListener("mouseenter", handleEnter)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", handleMove)
      document.removeEventListener("mouseleave", handleLeave)
      document.removeEventListener("mouseenter", handleEnter)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden
      className={`pointer-events-none fixed top-0 left-0 z-[9999] hidden dark:block rounded-full mix-blend-difference transition-[width,height,background-color,border-width,opacity] duration-300 ease-out will-change-transform ${
        visible ? "opacity-100" : "opacity-0"
      } ${
        active
          ? "h-20 w-20 border-2 border-brand-orange bg-transparent"
          : "h-4 w-4 border-0 bg-brand-orange"
      }`}
    />
  )
}
