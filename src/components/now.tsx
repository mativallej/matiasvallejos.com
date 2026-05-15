"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { now } from "@/data/now"

const MONTH_MAP: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
}

function monthTag(label: string): string {
  // "May 2026" → "2026-05"
  const parts = label.trim().split(/\s+/)
  if (parts.length !== 2) return label
  const [m, y] = parts
  const mm = MONTH_MAP[m.toLowerCase()] ?? m.slice(0, 3).toUpperCase()
  return `${y}-${mm}`
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: i * 0.06,
    },
  }),
}

function nowTag(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

type LocalEntry = { id: number; tag: string; text: string }

export function Now() {
  const t = useTranslations("Now")
  const [input, setInput] = useState("")
  const [localEntries, setLocalEntries] = useState<LocalEntry[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setLocalEntries((prev) => [
      ...prev,
      { id: Date.now(), tag: nowTag(), text: trimmed },
    ])
    setInput("")
  }

  return (
    <section id="now" className="px-4 lg:px-8 py-20 max-w-[1080px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-caption text-[#57534E] uppercase">
            {t("title")}
          </h2>
          <span className="font-mono text-caption text-[#57534E]">
            {t("updated", { date: now.updatedAt })}
          </span>
        </div>
      </motion.div>

      {/* Build logs — monthly */}
      <div className="mb-12">
        <h3 className="font-serif italic text-caption text-[#A8A29E] mb-4">
          {t("buildLogs")}
        </h3>
        <div className="rounded-2xl border border-[#3D3935]/60 bg-[#0C0A09] p-4 overflow-x-auto">
          <pre className="font-mono text-[12px] leading-[1.7] whitespace-pre">
            {now.buildLogs.flatMap((log, i) => {
              const monthOnly = monthTag(log.month)
              const translated = t.raw(`buildLog.${monthOnly}`)
              const highlights = Array.isArray(translated) ? (translated as string[]) : log.highlights
              return highlights.map((h, j) => {
                const idx = i * 100 + j
                const day = log.days?.[j]
                const tag = day ? `${monthOnly}-${String(day).padStart(2, "0")}` : monthOnly
                return (
                  <motion.span
                    key={`${log.month}-${j}`}
                    custom={idx}
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px" }}
                    className="block"
                  >
                    <span className="text-[#57534E]">[{tag}]</span>
                    <span className="text-[#A3B86C]"> ✓ </span>
                    <span className="text-[#FAFAF9]">{h}</span>
                  </motion.span>
                )
              })
            })}
            {localEntries.map((entry) => (
              <span key={entry.id} className="block">
                <span className="text-[#57534E]">[{entry.tag}]</span>
                <span className="text-[#7CA5C4]"> » </span>
                <span className="text-[#FAFAF9]">{entry.text}</span>
              </span>
            ))}
          </pre>

          {/* Interactive console input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 mt-2 font-mono text-[12px]"
            onClick={() => inputRef.current?.focus()}
          >
            <span className="text-[#A3B86C] flex-shrink-0">{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("consolePlaceholder")}
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent border-none outline-none text-[#FAFAF9] font-mono placeholder:text-[#3D3935] caret-[#A3B86C]"
            />
          </form>
        </div>
      </div>

      {/* Now items — what I'm doing */}
      <h3 className="font-serif italic text-caption text-[#A8A29E] mb-4">
        {t("whatNow")}
      </h3>
      <div className="flex flex-col">
        {now.items.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="flex items-baseline gap-3 py-4 border-b border-[#3D3935]"
          >
            <span className="font-mono text-body text-[#57534E] flex-shrink-0">
              --
            </span>
            <span className="text-body text-white">
              {item.text}
              {item.link && (
                <>
                  {" "}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FB923C] hover:underline transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    {item.linkLabel}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </>
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
