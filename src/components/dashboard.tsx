"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

const clocks = [
  { city: "Córdoba", tz: "America/Argentina/Cordoba", offsetLabel: "-3 HRS" },
  { city: "Madrid", tz: "Europe/Madrid", offsetLabel: "+4 HRS" },
  { city: "San Francisco", tz: "America/Los_Angeles", offsetLabel: "-4 HRS" },
  { city: "CDMX", tz: "America/Mexico_City", offsetLabel: "-3 HRS" },
]

function ClockFace({ tz }: { tz: string }) {
  const [now, setNow] = useState<Date>(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now)
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0)
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0)
  const hourAngle = ((hour % 12) + minute / 60) * 30
  const minuteAngle = minute * 6

  return (
    <svg viewBox="0 0 48 48" className="w-11 h-11">
      <circle cx="24" cy="24" r="22" fill="none" stroke="#3D3935" strokeWidth="1.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180
        const x1 = 24 + Math.sin(a) * 18
        const y1 = 24 - Math.cos(a) * 18
        const x2 = 24 + Math.sin(a) * 20
        const y2 = 24 - Math.cos(a) * 20
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#57534E" strokeWidth="1" />
      })}
      <line
        x1="24"
        y1="24"
        x2={24 + Math.sin((hourAngle * Math.PI) / 180) * 10}
        y2={24 - Math.cos((hourAngle * Math.PI) / 180) * 10}
        stroke="#FAFAF9"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="24"
        x2={24 + Math.sin((minuteAngle * Math.PI) / 180) * 15}
        y2={24 - Math.cos((minuteAngle * Math.PI) / 180) * 15}
        stroke="#FB923C"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="1.4" fill="#FB923C" />
    </svg>
  )
}

export function HeroPanelWidgets() {
  const t = useTranslations("Dashboard")
  const card = "rounded-2xl border border-[#3D3935]/60"

  return (
    <div className="flex flex-col gap-3">
      {/* Metric tile */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className={`${card} p-3 flex flex-col gap-2`}
      >
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-[44px] leading-none text-white tracking-tight">
            3
          </span>
          <span className="font-mono text-[12px] text-[#A8A29E] uppercase">
            {t("metricUnit")}
          </span>
        </div>
        <p className="text-[13px] text-[#A8A29E] leading-snug">
          {t("metricLabel")}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-[#3D3935]/50">
          <span className="font-mono text-[10px] text-[#57534E] uppercase">
            {t("metricBadge")}
          </span>
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#A3B86C] text-[#080706] font-serif text-[12px] font-bold">
            M
          </span>
        </div>
      </motion.div>

      {/* Pillars tile */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className={`${card} p-3`}
      >
        <h3 className="font-serif text-[22px] text-white leading-[1.15]">
          {t("pillar1")}
          <br />
          {t("pillar2")}
          <br />
          <span className="text-[#FB923C]">{t("pillar3")}</span>
        </h3>
        <div className="pt-3 mt-3 border-t border-[#3D3935]/50">
          <span className="font-mono text-[10px] text-[#57534E] uppercase">
            {t("pillarBadge")}
          </span>
        </div>
      </motion.div>

      {/* Insight / featured */}
      <motion.a
        href="/blog"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.19 }}
        className={`${card} p-3 block hover:border-[#57534E] transition-colors group`}
      >
        <span className="font-mono text-[10px] text-[#A3B86C] uppercase tracking-wide">
          {t("insightTag")}
        </span>
        <h3 className="font-serif text-[15px] text-white mt-2 leading-snug">
          {t("insightTitle")}
        </h3>
        <p className="font-mono text-[11px] text-[#78716C] mt-2">
          {t("insightBy")}{" "}
          <span className="text-[#FB923C] group-hover:underline">
            {t("insightAuthor")}
          </span>
        </p>
      </motion.a>

      {/* World clocks */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.26 }}
        className={`${card} p-3`}
      >
        <div className="grid grid-cols-4 gap-2">
          {clocks.map((c) => (
            <div key={c.city} className="flex flex-col items-center gap-1.5 text-center">
              <ClockFace tz={c.tz} />
              <span className="font-mono text-[10px] text-white leading-tight">
                {c.city}
              </span>
              <span className="font-mono text-[9px] text-[#57534E] uppercase">
                {c.offsetLabel}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Share CTA */}
      <motion.button
        type="button"
        onClick={() => {
          if (typeof navigator !== "undefined" && navigator.share) {
            navigator.share({ url: window.location.href, title: "Matias Vallejos" }).catch(() => {})
          } else if (typeof navigator !== "undefined") {
            navigator.clipboard?.writeText(window.location.href)
          }
        }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.33 }}
        className="rounded-2xl bg-[#D6F26A] text-[#080706] font-mono text-[12px] font-semibold uppercase tracking-[0.04em] py-3.5 flex items-center justify-center gap-2 hover:bg-[#C7E55B] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        {t("shareCta")}
      </motion.button>
    </div>
  )
}
