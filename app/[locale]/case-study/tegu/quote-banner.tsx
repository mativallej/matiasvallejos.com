"use client"

import { useState } from "react"

const CREAR_BASE = "https://app.tegu.ar/crear"
const CID = "72991b85-3ac9-4623-8b4b-33aead696f44"
const UTM_SOURCE = "matiasvallejos.com"
const DEFAULT_QUERY = "Manos útiles"

export function QuoteBanner({
  heading,
  subtitle,
  placeholder,
  cta,
  note,
}: {
  heading: string
  subtitle: string
  placeholder: string
  cta: string
  note: string
}) {
  const [q, setQ] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = q.trim() || DEFAULT_QUERY
    const url = `${CREAR_BASE}?q=${encodeURIComponent(query)}&cid=${CID}&utm_source=${UTM_SOURCE}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full py-8">
      <div className="relative overflow-hidden rounded-2xl border border-[#3D3935]/60 bg-gradient-to-br from-[#15120F] via-[#0C0A09] to-[#0C0A09] p-8 md:p-12">
        {/* warm accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[#E8742A]/10 blur-3xl"
        />

        <div className="relative flex flex-col gap-2 max-w-[560px]">
          <h2 className="font-serif text-[28px] md:text-[38px] leading-[1.1] tracking-tight text-white">
            {heading}
          </h2>
          <p className="text-body text-[#A8A29E] leading-relaxed">{subtitle}</p>
        </div>

        <form
          onSubmit={submit}
          className="relative mt-6 flex flex-col sm:flex-row items-stretch gap-2.5 max-w-[620px]"
        >
          <div className="relative flex-1">
            <svg
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#57534E]"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-[#080706] border border-[#3D3935] rounded-full pl-11 pr-4 py-3.5 text-body text-[#FAFAF9] placeholder:text-[#57534E] outline-none focus:border-[#57534E] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 font-mono text-caption font-semibold uppercase tracking-[0.04em] bg-[#E8742A] text-[#080706] px-6 py-3.5 rounded-full hover:bg-[#D4622A] hover:shadow-[0_0_24px_-6px_#E8742A] transition-all whitespace-nowrap"
          >
            {cta} →
          </button>
        </form>

        <p className="relative mt-3 font-mono text-micro text-[#57534E]">{note}</p>
      </div>
    </section>
  )
}
