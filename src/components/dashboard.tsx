"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { press } from "@/data/press"
import { FALLBACK_GITHUB_STATS, type GitHubStats } from "@/lib/github"

type SeriesPoint = { label: string; value: number }
type SeriesScale = "monthly" | "weekly" | "historical"

type Impact = {
  key: string
  value: string
  label: string
  tagline?: string
  /** 3 scannable headline stats shown at the top of the Updates tab. */
  tldr?: string[]
  /** Pages of narrative paragraphs after the TL;DR. Each page is rendered separately with prev/next controls. */
  pages?: string[][]
  accent: string
  href: string
  delta?: { month: string; week: string }
  /** Growth points by scale for sparkline visualization. Most recent last. */
  series?: Partial<Record<SeriesScale, SeriesPoint[]>>
}

function formatTick(v: number): string {
  if (v >= 1000) {
    const k = v / 1000
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`
  }
  return Math.round(v).toString()
}

function Sparkline({
  data,
  color,
  height = 60,
  showAxes = false,
}: {
  data: { label: string; value: number }[]
  color: string
  /** Rendered SVG height in px. ViewBox aspect is preserved via non-scaling stretch. */
  height?: number
  /** Show Y/X axis ticks + gridlines for a more readable chart. */
  showAxes?: boolean
}) {
  // Use fixed viewBox dimensions; SVG scales via CSS to fill container.
  const VBW = 300
  const VBH = 60
  const TOOLTIP_H = 22
  const Y_AXIS_W = showAxes ? 44 : 0
  const X_AXIS_H = showAxes ? 22 : 0
  const renderH = height

  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  if (data.length < 2) return null

  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const stepX = VBW / (data.length - 1)

  const points = data.map((d, i) => ({
    x: i * stepX,
    y: VBH - ((d.value - min) / range) * VBH,
    label: d.label,
    value: d.value,
  }))

  const lineD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ")
  const areaD = `${lineD} L ${VBW.toFixed(1)} ${VBH} L 0 ${VBH} Z`
  const fillId = `spark-fill-${color.replace("#", "")}`

  const safeHoverIdx =
    hoverIdx !== null ? Math.max(0, Math.min(hoverIdx, points.length - 1)) : null
  const active = safeHoverIdx !== null ? points[safeHoverIdx] : points[points.length - 1]

  // Y-axis ticks: 3 evenly spaced values (max, mid, min).
  const yTicks = showAxes
    ? [
        { value: max, yFrac: 0 },
        { value: min + range / 2, yFrac: 0.5 },
        { value: min, yFrac: 1 },
      ]
    : []

  // X-axis ticks: 3 evenly spaced points (start, middle, end) — keeps long labels from overflowing.
  const xTickIndices: number[] = []
  if (showAxes) {
    const maxTicks = Math.min(3, data.length)
    if (maxTicks === 1) xTickIndices.push(0)
    else {
      for (let i = 0; i < maxTicks; i++) {
        xTickIndices.push(Math.round((i * (data.length - 1)) / (maxTicks - 1)))
      }
    }
  }

  const updateHoverFromX = (clientX: number, rect: DOMRect) => {
    // Account for the y-axis gutter on the left when computing hover index.
    const localX = clientX - rect.left - Y_AXIS_W
    const chartW = rect.width - Y_AXIS_W
    if (chartW <= 0) return
    const idx = Math.round((localX / chartW) * (data.length - 1))
    setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)))
  }

  return (
    <div
      className="relative w-full select-none cursor-crosshair"
      style={{ height: renderH + TOOLTIP_H + X_AXIS_H }}
      onMouseMove={(e) => updateHoverFromX(e.clientX, e.currentTarget.getBoundingClientRect())}
      onMouseLeave={() => setHoverIdx(null)}
      onTouchStart={(e) => updateHoverFromX(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
      onTouchMove={(e) => updateHoverFromX(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
    >
      {/* Y axis labels */}
      {showAxes && (
        <div className="absolute left-0 top-0" style={{ width: Y_AXIS_W, height: renderH }}>
          {yTicks.map((tick, i) => (
            <span
              key={i}
              className="absolute right-2 font-mono text-[10px] text-[#A8A29E] tabular-nums"
              style={{
                top: `calc(${tick.yFrac * 100}% - 6px)`,
              }}
            >
              {formatTick(tick.value)}
            </span>
          ))}
        </div>
      )}

      <svg
        viewBox={`0 0 ${VBW} ${VBH}`}
        preserveAspectRatio="none"
        aria-hidden
        className="block"
        style={{ height: renderH, width: `calc(100% - ${Y_AXIS_W}px)`, marginLeft: Y_AXIS_W }}
      >
        <defs>
          <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Gridlines */}
        {showAxes &&
          yTicks.map((tick, i) => (
            <line
              key={`grid-${i}`}
              x1={0}
              y1={tick.yFrac * VBH}
              x2={VBW}
              y2={tick.yFrac * VBH}
              stroke="#3D3935"
              strokeOpacity="0.5"
              strokeWidth="1"
              strokeDasharray={i === yTicks.length - 1 ? "0" : "2 3"}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        <path d={areaD} fill={`url(#${fillId})`} />
        <path
          d={lineD}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {hoverIdx !== null && (
          <line
            x1={active.x}
            y1={0}
            x2={active.x}
            y2={VBH}
            stroke={color}
            strokeOpacity="0.4"
            strokeWidth="1"
            strokeDasharray="2 2"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {/* Chart-area overlay: hover dot + tooltip use percent positioning relative to this box. */}
      <div
        className="pointer-events-none absolute"
        style={{ left: Y_AXIS_W, right: 0, top: 0, height: renderH }}
      >
        <div
          className="absolute rounded-full"
          style={{
            left: `${(active.x / VBW) * 100}%`,
            top: `${(active.y / VBH) * 100}%`,
            transform: "translate(-50%, -50%)",
            width: 14,
            height: 14,
            backgroundColor: color,
            opacity: 0.25,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: `${(active.x / VBW) * 100}%`,
            top: `${(active.y / VBH) * 100}%`,
            transform: "translate(-50%, -50%)",
            width: 7,
            height: 7,
            backgroundColor: color,
          }}
        />
      </div>

      {/* X axis labels */}
      {showAxes && (
        <div
          className="absolute"
          style={{ left: Y_AXIS_W, right: 0, top: renderH, height: X_AXIS_H }}
        >
          {xTickIndices.map((idx) => {
            const xFrac = data.length > 1 ? idx / (data.length - 1) : 0.5
            return (
              <span
                key={idx}
                className="absolute font-mono text-[10px] text-[#A8A29E] whitespace-nowrap"
                style={{
                  left: `${xFrac * 100}%`,
                  top: 4,
                  transform: `translateX(${xFrac === 0 ? "0" : xFrac === 1 ? "-100%" : "-50%"})`,
                }}
              >
                {data[idx].label}
              </span>
            )
          })}
        </div>
      )}

      {/* Hover tooltip — inside chart-area overlay so percent positioning stays in bounds */}
      <div
        className="pointer-events-none absolute"
        style={{ left: Y_AXIS_W, right: 0, top: renderH + X_AXIS_H + 4, height: TOOLTIP_H }}
      >
        <div
          className="absolute font-mono text-[10px] whitespace-nowrap transition-all duration-100"
          style={{
            left: `${(active.x / VBW) * 100}%`,
            transform: `translateX(${active.x < 40 ? "0" : active.x > VBW - 40 ? "-100%" : "-50%"})`,
          }}
        >
          <span className="text-[#A8A29E]">{active.label}</span>{" "}
          <span style={{ color }} className="font-semibold">
            {active.value.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

const ROTATE_MS = 3500

export function ResultsCard() {
  const t = useTranslations("Impact")

  const impacts: Impact[] = [
    {
      key: "tegu",
      value: "+2200",
      label: t("tegu.label"),
      tagline: t("tegu.tagline"),
      tldr: t.raw("tegu.tldr") as string[],
      pages: t.raw("tegu.pages") as string[][],
      accent: "#A78BFA",
      href: "https://x.com/mativallej_/status/2053943751014555800",
      delta: { month: t("tegu.deltaMonth"), week: t("tegu.deltaWeek") },
      series: {
        // Source-of-truth checkpoints across ~3 months.
        monthly: [
          { label: "Mar start", value: 0 },
          { label: "Mar mid", value: 100 },
          { label: "Mar end", value: 600 },
          { label: "Apr start", value: 843 },
          { label: "Apr mid", value: 1500 },
          { label: "Apr end", value: 2110 },
          { label: "May", value: 2200 },
        ],
        // Weekly view: linearly interpolated between adjacent monthly checkpoints.
        weekly: [
          { label: "W1 Mar", value: 0 },
          { label: "W2 Mar", value: 50 },
          { label: "W3 Mar", value: 100 },
          { label: "W4 Mar", value: 350 },
          { label: "W5 Mar", value: 600 },
          { label: "W1 Apr", value: 843 },
          { label: "W2 Apr", value: 1170 },
          { label: "W3 Apr", value: 1500 },
          { label: "W4 Apr", value: 1805 },
          { label: "W5 Apr", value: 2110 },
          { label: "W1 May", value: 2155 },
          { label: "W2 May", value: 2200 },
        ],
        // Historical view: month-end snapshots, including pre-launch zero.
        historical: [
          { label: "Feb", value: 0 },
          { label: "Mar", value: 600 },
          { label: "Apr", value: 2110 },
          { label: "May", value: 2200 },
        ],
      },
    },
  ]

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [scale, setScale] = useState<SeriesScale>("monthly")
  const [view, setView] = useState<"updates" | "metrics">("updates")
  const [pageIndex, setPageIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (paused || modalOpen) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % impacts.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [paused, modalOpen, impacts.length])

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false)
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [modalOpen])

  const current = impacts[index]
  const previewSeries = current.series?.monthly ?? current.series?.weekly ?? current.series?.historical
  const activeSeries = current.series?.[scale]
  const availableScales: SeriesScale[] = (["monthly", "weekly", "historical"] as SeriesScale[]).filter(
    (s) => current.series?.[s] && current.series[s]!.length > 1,
  )

  const triggerDownload = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownload = () => {
    if (!activeSeries) return
    const csv = "label,value\n" + activeSeries.map((p) => `${p.label},${p.value}`).join("\n")
    triggerDownload(`${current.key}-${scale}.csv`, csv, "text/csv;charset=utf-8")
  }


  const canOpen = !!previewSeries

  return (
    <>
      <motion.button
        type="button"
        onClick={() => {
          if (!canOpen) {
            window.open(current.href, "_blank", "noopener,noreferrer")
            return
          }
          setScale(availableScales[0] ?? "monthly")
          setView("updates")
          setPageIndex(0)
          setModalOpen(true)
        }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative h-full w-full text-left rounded-2xl border border-[#3D3935]/60 hover:border-[#57534E] p-4 min-h-[170px] overflow-hidden transition-colors duration-300 block cursor-pointer"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            <span
              className="font-serif text-[34px] md:text-[44px] leading-none tracking-tight"
              style={{ color: current.accent }}
            >
              {current.value}
            </span>
            {current.delta && (
              <div className="flex items-center gap-3 font-mono text-[10px] text-[#A3B86C] tracking-tight leading-tight">
                <span>↑ {current.delta.month}</span>
                <span>↑ {current.delta.week}</span>
              </div>
            )}
            <p className="text-[13px] leading-snug font-medium text-[#FAFAF9]">
              {current.label}
            </p>
            {previewSeries && previewSeries.length > 1 && (
              <div className="mt-1 -mx-1">
                <Sparkline data={previewSeries} color={current.accent} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {!previewSeries && current.key === "tegu" && (
          <Image
            src="/images/projects/tegu/logo.webp"
            alt="Tegu"
            width={128}
            height={40}
            className="absolute bottom-3 right-4 h-9 w-auto object-contain opacity-90"
          />
        )}
        {current.key === "community" && (
          <Image
            src="/images/projects/docta-valley/logo.jpg"
            alt="Docta Valley"
            width={32}
            height={32}
            className="absolute bottom-3 right-4 h-7 w-7 object-cover rounded-full opacity-90"
          />
        )}
        {!previewSeries && (
          <div className="absolute bottom-3 left-4 right-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#A8A29E]">
              {t("title")}
            </span>
          </div>
        )}
      </motion.button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {modalOpen && (
          <motion.div
            key="results-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label={current.label}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[720px] max-h-[90vh] overflow-y-auto rounded-2xl border border-[#3D3935] bg-[#0C0A09] p-5 md:p-7 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-[#A8A29E] hover:text-white hover:bg-[#3D3935]/40 transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Header */}
              <div className="flex flex-col gap-1 mb-5">
                <span
                  className="font-serif text-[40px] md:text-[56px] leading-none tracking-tight"
                  style={{ color: current.accent }}
                >
                  {current.value}
                </span>
                <p className="text-[14px] text-[#FAFAF9] font-medium">{current.label}</p>
                {current.tagline && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#A8A29E] mt-0.5">
                    {current.tagline}
                  </p>
                )}
                {current.delta && (
                  <div className="flex items-center gap-3 font-mono text-[11px] text-[#A3B86C] mt-1">
                    <span>↑ {current.delta.month}</span>
                    <span>↑ {current.delta.week}</span>
                  </div>
                )}
              </div>

              {/* Tabs: Updates vs Growth */}
              <div className="flex items-center gap-1 mb-4 border-b border-[#3D3935]/60">
                {(["updates", "metrics"] as const).map((v) => {
                  const active = view === v
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setView(v)}
                      className={`relative font-mono text-[11px] uppercase tracking-[0.08em] px-3 py-2 transition-colors cursor-pointer ${
                        active ? "text-white" : "text-[#A8A29E] hover:text-[#A8A29E]"
                      }`}
                    >
                      {t(`views.${v}`)}
                      {active && (
                        <motion.span
                          layoutId="view-underline"
                          className="absolute left-0 right-0 -bottom-px h-px"
                          style={{ backgroundColor: current.accent }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              <AnimatePresence mode="wait">
                {view === "updates" ? (
                  <motion.section
                    key="updates"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="h-[240px] flex flex-col"
                  >
                    {(() => {
                      const hasTldr = !!current.tldr && current.tldr.length > 0
                      const narrativePages = current.pages ?? []
                      const totalPages = (hasTldr ? 1 : 0) + narrativePages.length
                      if (totalPages === 0) {
                        return (
                          <div className="h-[200px] flex items-center justify-center font-mono text-[12px] text-[#A8A29E]">
                            {t("noData")}
                          </div>
                        )
                      }
                      const safePage = Math.max(0, Math.min(pageIndex, totalPages - 1))
                      const isTldrPage = hasTldr && safePage === 0
                      const narrativeIdx = safePage - (hasTldr ? 1 : 0)
                      const currentParagraphs = isTldrPage ? [] : narrativePages[narrativeIdx] ?? []
                      return (
                        <div className="flex flex-col h-full">
                          <div
                            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 [&::-webkit-scrollbar]:hidden"
                            style={{ scrollbarWidth: "none" }}
                          >
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={safePage}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -12 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col gap-3"
                              >
                                {isTldrPage ? (
                                  <ul className="flex flex-col gap-2.5">
                                    {current.tldr!.map((b, i) => (
                                      <li
                                        key={i}
                                        className="font-mono text-[13px] text-[#FAFAF9] leading-snug flex items-baseline gap-3"
                                      >
                                        <span className="text-[#A3B86C] flex-shrink-0">✓</span>
                                        <span>{b}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  currentParagraphs.map((p, i) => (
                                    <p
                                      key={i}
                                      className="text-[13px] text-[#A8A29E] leading-relaxed"
                                    >
                                      {p}
                                    </p>
                                  ))
                                )}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                          {totalPages > 1 && (
                            <div className="flex items-center justify-between gap-3 pt-3">
                              <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
                                disabled={safePage === 0}
                                aria-label="Previous page"
                                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] px-2 py-1 rounded text-[#A8A29E] hover:text-white disabled:text-[#3D3935] disabled:cursor-not-allowed transition-colors cursor-pointer"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <polyline points="15 18 9 12 15 6" />
                                </svg>
                                prev
                              </button>
                              <div className="flex items-center gap-1.5">
                                {Array.from({ length: totalPages }).map((_, i) => {
                                  const active = i === safePage
                                  return (
                                    <button
                                      key={i}
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => setPageIndex(i)}
                                      aria-label={`Page ${i + 1}`}
                                      className="cursor-pointer"
                                    >
                                      <span
                                        className="block rounded-full transition-all"
                                        style={{
                                          width: active ? 18 : 6,
                                          height: 6,
                                          backgroundColor: active ? current.accent : "#3D3935",
                                        }}
                                      />
                                    </button>
                                  )
                                })}
                              </div>
                              <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setPageIndex((i) => Math.min(totalPages - 1, i + 1))}
                                disabled={safePage === totalPages - 1}
                                aria-label="Next page"
                                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] px-2 py-1 rounded text-[#A8A29E] hover:text-white disabled:text-[#3D3935] disabled:cursor-not-allowed transition-colors cursor-pointer"
                              >
                                next
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <polyline points="9 18 15 12 9 6" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })()}
                  </motion.section>
                ) : (
                  <motion.section
                    key="metrics"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="h-[240px] flex flex-col"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#A8A29E]">
                        {current.key === "tegu" ? t("tegu.chartLabel") : current.label}
                      </p>
                      <div className="flex items-center gap-1 flex-wrap">
                        {(["monthly", "weekly", "historical"] as SeriesScale[]).map((s) => {
                          const has = !!current.series?.[s] && current.series[s]!.length > 1
                          if (!has) return null
                          const isActive = scale === s
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setScale(s)}
                              className={`font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-1 rounded transition-colors cursor-pointer whitespace-nowrap ${
                                isActive ? "text-white bg-[#12100E]" : "text-[#A8A29E] hover:text-[#A8A29E]"
                              }`}
                            >
                              {t(`scales.${s}`)}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    {activeSeries && activeSeries.length > 1 ? (
                      <Sparkline
                        key={scale}
                        data={activeSeries}
                        color={
                          scale === "weekly"
                            ? "#C4B5FD"
                            : scale === "historical"
                              ? "#8B5CF6"
                              : current.accent
                        }
                        height={160}
                        showAxes
                      />
                    ) : (
                      <div className="h-[200px] flex items-center justify-center font-mono text-[12px] text-[#A8A29E]">
                        {t("noData")}
                      </div>
                    )}
                  </motion.section>
                )}
              </AnimatePresence>

              {/* Actions — single row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-[#3D3935]/60">
                <div className="flex items-center gap-2">
                  {view === "metrics" && activeSeries && (
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] px-3 py-2 rounded-md text-[#A8A29E] hover:text-white transition-colors cursor-pointer"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {t("download")}
                    </button>
                  )}
                  {view === "updates" && (current.tldr || current.pages) && (
                    <a
                      href="/tegu-updates/tegu-updates-008.md"
                      download
                      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] px-3 py-2 rounded-md text-[#A8A29E] hover:text-white transition-colors cursor-pointer"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {t("downloadReport")}
                    </a>
                  )}
                </div>
                <a
                  href={current.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.04em] px-4 py-2.5 rounded-md transition-colors duration-200"
                  style={{ backgroundColor: current.accent, color: "#080706" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  {t("visit")}
                </a>
              </div>
            </motion.div>
          </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}

export function MakeItCard() {
  const [stats, setStats] = useState<GitHubStats>(FALLBACK_GITHUB_STATS)

  useEffect(() => {
    let cancelled = false
    fetch("/api/github-stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: GitHubStats | null) => {
        if (!cancelled && data) setStats(data)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const { totalStars, totalForks, totalRepos } = stats

  return (
    <motion.a
      href="#open-source"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.12 }}
      className="relative h-full rounded-2xl border border-[#3D3935]/60 p-4 pb-9 min-h-[170px] flex flex-col items-start gap-1 overflow-hidden hover:border-[#57534E] transition-colors group"
    >
      <span className="font-serif text-[34px] md:text-[44px] leading-none tracking-tight text-[#FAFAF9]">
        +{totalStars}
      </span>
      <p className="text-[13px] text-[#FAFAF9] leading-snug font-medium">
        Stars on GitHub
      </p>
      <p className="text-[12px] text-[#A8A29E] leading-snug">
        {totalForks} forks · {totalRepos} repos
      </p>
      <span className="absolute bottom-3 right-4 font-mono text-[10px] text-[#A8A29E] inline-flex items-center gap-1">
        @mativallej <span className="text-[#A8A29E] group-hover:translate-x-0.5 transition-transform inline-flex">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </span>
      </span>
      <span className="absolute bottom-3 left-4 font-mono text-[10px] text-[#A8A29E] uppercase tracking-[0.08em]">
        GitHub
      </span>
    </motion.a>
  )
}

// Intrinsic dimensions of each WebP (height 56 across the board, widths from sips).
const PRESS_LOGO_DIMS: Record<string, { w: number; h: number }> = {
  "cadena-3": { w: 241, h: 56 },
  "canal-10": { w: 51, h: 56 },
  "continental-cordoba": { w: 182, h: 56 },
  "el-canciller": { w: 398, h: 56 },
  "iproup": { w: 172, h: 56 },
  "perfil": { w: 245, h: 56 },
}

function logoDims(src: string) {
  const key = src.split("/").pop()?.replace(".webp", "") ?? ""
  return PRESS_LOGO_DIMS[key] ?? { w: 240, h: 56 }
}

function PressMarquee() {

  const logos = press
    .filter((p) => p.logo)
    .filter((p, i, arr) => arr.findIndex((x) => x.outlet === p.outlet) === i)

  const loop = [...logos, ...logos, ...logos]

  return (
    <div className="relative overflow-hidden w-full h-10 flex items-center">
      <div className="flex items-center gap-12 animate-marquee [animation-duration:30s] md:[animation-duration:12s] whitespace-nowrap">
        {loop.map((p, i) => {
          const { w, h } = logoDims(p.logo!)
          return (
          <div
            key={`${p.outlet}-${i}`}
            className="flex items-center justify-center shrink-0 w-[120px] h-10"
          >
            <Image
              src={p.logo!}
              alt={p.outlet}
              title={p.outlet}
              width={w}
              height={h}
              loading="lazy"
              className="max-h-7 max-w-full w-auto object-contain grayscale brightness-200 opacity-60 hover:grayscale-0 hover:brightness-100 hover:opacity-100 transition-all"
            />
          </div>
          )
        })}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#080706] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#080706] to-transparent" />
    </div>
  )
}

export function PressStripCard() {
  const t = useTranslations("Impact")

  return (
    <motion.a
      href="#press"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.26 }}
      className="relative rounded-2xl border border-[#3D3935]/60 p-4 pb-9 hover:border-[#57534E] transition-colors group overflow-hidden flex flex-col"
    >
      <div className="flex-1 flex items-center">
        <PressMarquee />
      </div>
      <span className="absolute bottom-3 left-4 font-mono text-[10px] text-[#A8A29E] uppercase tracking-[0.08em]">
        {t("pressStrip.tag")}
      </span>
    </motion.a>
  )
}
