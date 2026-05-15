"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { press } from "@/data/press"
import { repos, githubUrl } from "@/data/opensource"
import { FALLBACK_GITHUB_STATS, type GitHubStats } from "@/lib/github"

type Impact = {
  key: string
  value: string
  label: string
  accent: string
  href: string
  delta?: { month: string; week: string }
  /** Growth points for sparkline visualization. Most recent last. */
  series?: { label: string; value: number }[]
}

function Sparkline({
  data,
  color,
}: {
  data: { label: string; value: number }[]
  color: string
}) {
  // Use fixed viewBox dimensions; SVG scales via CSS to fill container width.
  const VBW = 300
  const VBH = 60
  const TOOLTIP_H = 22

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

  const active = hoverIdx !== null ? points[hoverIdx] : points[points.length - 1]

  const updateHoverFromX = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left
    const idx = Math.round((x / rect.width) * (data.length - 1))
    setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)))
  }

  return (
    <div
      className="relative w-full select-none cursor-crosshair"
      style={{ height: VBH + TOOLTIP_H }}
      onMouseMove={(e) => updateHoverFromX(e.clientX, e.currentTarget.getBoundingClientRect())}
      onMouseLeave={() => setHoverIdx(null)}
      onTouchStart={(e) => updateHoverFromX(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
      onTouchMove={(e) => updateHoverFromX(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
    >
      <svg
        viewBox={`0 0 ${VBW} ${VBH}`}
        preserveAspectRatio="none"
        aria-hidden
        className="block w-full"
        style={{ height: VBH }}
      >
        <defs>
          <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
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
        <circle cx={active.x} cy={active.y} r="3" fill={color} vectorEffect="non-scaling-stroke" />
        <circle cx={active.x} cy={active.y} r="6" fill={color} fillOpacity="0.25" vectorEffect="non-scaling-stroke" />
      </svg>
      <div
        className="absolute font-mono text-[10px] whitespace-nowrap pointer-events-none transition-all duration-100"
        style={{
          left: `${(active.x / VBW) * 100}%`,
          top: VBH + 4,
          transform: `translateX(${active.x < 40 ? "0" : active.x > VBW - 40 ? "-100%" : "-50%"})`,
        }}
      >
        <span className="text-[#A8A29E]">{active.label}</span>{" "}
        <span style={{ color }} className="font-semibold">
          {active.value.toLocaleString()}
        </span>
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
      accent: "#A78BFA",
      href: "https://tegu.ar",
      delta: { month: "+800 mes", week: "+65 semana" },
      series: [
        { label: "Mar", value: 100 },
        { label: "Mar end", value: 600 },
        { label: "Apr start", value: 843 },
        { label: "Apr mid", value: 1500 },
        { label: "Apr end", value: 2110 },
        { label: "May", value: 2200 },
      ],
    },
  ]

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % impacts.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [paused, impacts.length])

  const current = impacts[index]

  return (
    <motion.a
      href={current.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={current.label}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-full rounded-2xl border border-[#3D3935]/60 hover:border-[#57534E] p-4 min-h-[170px] overflow-hidden transition-colors duration-300 block cursor-pointer"
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
          {current.series && current.series.length > 1 && (
            <div className="mt-1 -mx-1">
              <Sparkline data={current.series} color={current.accent} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {!current.series && current.key === "tegu" && (
        <Image
          src="/images/projects/tegu/logo.png"
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
      {!current.series && (
        <div className="absolute bottom-3 left-4 right-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#57534E]">
            {t("title")}
          </span>
        </div>
      )}
    </motion.a>
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
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
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
      <p className="text-[12px] text-[#78716C] leading-snug">
        {totalForks} forks · {totalRepos} repos
      </p>
      <span className="absolute bottom-3 right-4 font-mono text-[10px] text-[#A8A29E] inline-flex items-center gap-1">
        @mativallej <span className="text-[#57534E] group-hover:translate-x-0.5 transition-transform">↗</span>
      </span>
      <span className="absolute bottom-3 left-4 font-mono text-[10px] text-[#57534E] uppercase tracking-[0.08em]">
        GitHub
      </span>
    </motion.a>
  )
}

function PressMarquee() {
  const logos = press
    .filter((p) => p.logo)
    .filter((p, i, arr) => arr.findIndex((x) => x.outlet === p.outlet) === i)

  const loop = [...logos, ...logos, ...logos]

  return (
    <div className="relative overflow-hidden w-full h-10 flex items-center">
      <div className="flex items-center gap-12 animate-marquee [animation-duration:30s] md:[animation-duration:12s] whitespace-nowrap">
        {loop.map((p, i) => (
          <div
            key={`${p.outlet}-${i}`}
            className="flex items-center justify-center shrink-0 w-[120px] h-10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.logo}
              alt={p.outlet}
              title={p.outlet}
              className="max-h-7 max-w-full w-auto object-contain grayscale brightness-200 opacity-60 hover:grayscale-0 hover:brightness-100 hover:opacity-100 transition-all"
            />
          </div>
        ))}
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
      <span className="absolute bottom-3 left-4 font-mono text-[10px] text-[#57534E] uppercase tracking-[0.08em]">
        {t("pressStrip.tag")}
      </span>
    </motion.a>
  )
}
