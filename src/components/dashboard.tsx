"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { press } from "@/data/press"

function PressMarquee() {
  const logos = press
    .filter((p) => p.logo)
    .filter((p, i, arr) => arr.findIndex((x) => x.outlet === p.outlet) === i)

  const loop = [...logos, ...logos]

  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
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
              className="max-h-10 max-w-full w-auto h-auto object-contain opacity-75 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#080706] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#080706] to-transparent" />
    </div>
  )
}

type Impact = {
  key: string
  value: string
  label: string
  accent: string
  href: string
}

const ROTATE_MS = 3500

export function HeroPanelWidgets() {
  const t = useTranslations("Impact")

  const impacts: Impact[] = [
    { key: "tegu", value: "+2200", label: t("tegu.label"), accent: "#A78BFA", href: "https://tegu.ar" },
    { key: "community", value: "+240", label: t("community.label"), accent: "#F5E6B0", href: "https://doctavalley.com.ar" },
    { key: "openSource", value: "166", label: t("openSource.label"), accent: "#E8742A", href: "https://github.com/mativallej" },
    { key: "reach", value: "118K", label: t("reach.label"), accent: "#7CA5C4", href: "https://x.com/mativallejosdev/status/1979669047622209758" },
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
    <div className="flex flex-col gap-3">
      {/* Row: Resultados (rotating) + Experiencia */}
      <div className="grid grid-cols-2 gap-3">
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
        className="relative rounded-2xl border p-4 min-h-[170px] overflow-hidden transition-colors duration-300 block cursor-pointer"
        style={{
          backgroundColor: paused ? current.accent : "transparent",
          borderColor: paused ? current.accent : "rgba(61,57,53,0.6)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            <span
              className="font-serif text-[44px] leading-none tracking-tight transition-colors duration-300"
              style={{ color: paused ? "#080706" : current.accent }}
            >
              {current.value}
            </span>
            <p
              className="text-[13px] leading-snug font-medium transition-colors duration-300"
              style={{ color: paused ? "#080706" : "#FAFAF9" }}
            >
              {current.label}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-3 left-4 right-4">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.08em] transition-colors duration-300"
            style={{ color: paused ? "rgba(8,7,6,0.7)" : "#57534E" }}
          >
            {t("title")}
          </span>
        </div>
      </motion.a>

      {/* Experiencia — pillars */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="rounded-2xl border border-[#3D3935]/60 p-4 min-h-[170px] flex flex-col justify-between"
      >
        <h3 className="font-serif text-[20px] text-white leading-[1.2]">
          {t("experience.line1")}
          <br />
          {t("experience.line2")}
          <br />
          <span className="text-[#FB923C]">{t("experience.line3")}</span>
        </h3>
        <div className="pt-3 border-t border-[#3D3935]/50">
          <span className="font-mono text-[10px] text-[#57534E] uppercase tracking-[0.08em]">
            {t("experience.label")}
          </span>
        </div>
      </motion.div>
      </div>

      {/* Insights — featured post (full width) */}
      <motion.a
        href="/blog"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.19 }}
        className="rounded-2xl border border-[#3D3935]/60 p-4 block hover:border-[#57534E] transition-colors group"
      >
        <span className="font-mono text-[10px] text-[#A3B86C] uppercase tracking-wide">
          {t("insight.tag")}
        </span>
        <h3 className="font-serif text-[15px] text-white mt-2 leading-snug">
          {t("insight.title")}
        </h3>
        <p className="font-mono text-[11px] text-[#78716C] mt-2">
          {t("insight.by")}{" "}
          <span className="text-[#FB923C] group-hover:underline">
            {t("insight.author")}
          </span>
        </p>
      </motion.a>

      {/* Press strip — "As featured in" marquee */}
      <motion.a
        href="#press"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.26 }}
        className="rounded-2xl border border-[#3D3935]/60 p-4 block hover:border-[#57534E] transition-colors group overflow-hidden"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] text-[#D4A76A] uppercase tracking-wide">
            {t("pressStrip.tag")}
          </span>
          <span className="font-mono text-[10px] text-[#57534E] uppercase tracking-[0.08em] group-hover:text-[#A8A29E] transition-colors">
            {press.length} {t("pressStrip.features")} →
          </span>
        </div>
        <PressMarquee />
      </motion.a>
    </div>
  )
}
