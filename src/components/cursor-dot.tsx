"use client"

import { useEffect, useRef, useState } from "react"

export function CursorDot() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(hover: none)").matches) return

    const target = { x: -100, y: -100 }
    const current = { x: -100, y: -100 }
    let raf = 0
    let started = false

    const tick = () => {
      const ease = 0.12
      current.x += (target.x - current.x) * ease
      current.y += (target.y - current.y) * ease
      const dot = dotRef.current
      if (dot) {
        dot.style.transform = `translate3d(${current.x - 22}px, ${current.y - 22}px, 0)`
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
      className={`pointer-events-none fixed top-0 left-0 z-[9999] hidden dark:block h-4 w-4 rounded-full bg-brand-orange mix-blend-difference transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  )
}
