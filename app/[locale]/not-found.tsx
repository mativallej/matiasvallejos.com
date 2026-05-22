"use client"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NotFound() {
  const locale = useLocale()
  const isEs = locale === "es"
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 120)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-[640px] w-full mx-auto text-center">
          {/* 404 display */}
          <div className="relative inline-block mb-8">
            <span
              aria-hidden
              className={`absolute inset-0 font-serif text-[120px] md:text-[180px] leading-none font-bold text-brand-orange/30 transition-transform duration-100 ${
                glitch ? "translate-x-1 -translate-y-0.5" : ""
              }`}
            >
              404
            </span>
            <span
              aria-hidden
              className={`absolute inset-0 font-serif text-[120px] md:text-[180px] leading-none font-bold text-[#A3B86C]/40 mix-blend-screen transition-transform duration-100 ${
                glitch ? "-translate-x-1 translate-y-0.5" : ""
              }`}
            >
              404
            </span>
            <h1 className="relative font-serif text-[120px] md:text-[180px] leading-none font-bold text-white tracking-tight">
              404
            </h1>
          </div>

          {/* Tag */}
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-orange mb-3">
            {isEs ? "Pagina no encontrada" : "Page not found"}
          </div>

          {/* Headline */}
          <h2 className="font-serif text-[24px] md:text-[32px] text-white leading-tight tracking-tight mb-4">
            {isEs
              ? "Esta ruta no existe — o ya no."
              : "This route does not exist — or no longer does."}
          </h2>

          {/* Description */}
          <p className="font-mono text-[13px] text-text-muted leading-relaxed max-w-[420px] mx-auto mb-10">
            {isEs
              ? "Quizas el link esta roto, el contenido se movio, o estas escribiendo a mano. Cualquiera de esas es una buena historia."
              : "Maybe the link is broken, the content moved, or you're typing it by hand. Any of those makes for a good story."}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.04em] bg-brand-orange text-[#080706] px-4 py-2.5 rounded-md hover:bg-[#D4622A] transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12 12 3l9 9" />
                <path d="M5 10v10h14V10" />
              </svg>
              {isEs ? "Volver al inicio" : "Back home"}
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.04em] text-text-muted border border-[#3D3935] px-4 py-2.5 rounded-md hover:text-white hover:border-[#57534E] transition-colors duration-200"
            >
              {isEs ? "Leer el blog" : "Read the blog"}
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.04em] text-text-muted border border-[#3D3935] px-4 py-2.5 rounded-md hover:text-white hover:border-[#57534E] transition-colors duration-200"
            >
              {isEs ? "Ver proyectos" : "See projects"}
            </Link>
          </div>

          {/* Mono signature */}
          <div className="mt-12 font-mono text-[10px] uppercase tracking-[0.12em] text-[#57534E]">
            <span>error_code: ROUTE_NOT_FOUND</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
