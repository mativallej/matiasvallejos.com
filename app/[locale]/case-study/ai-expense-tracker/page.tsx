import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Link } from "@/i18n/navigation"
import { buildAlternates } from "@/lib/seo"
import { type Locale } from "@/i18n/routing"
import { CaseMetrics } from "@/components/case-metrics"

type AELocale = "en" | "es"

const LOGO_BG = "#1C1917"
const GITHUB = "https://github.com/mativallej/ai-expense-tracker-n8n"
const X_POST = "https://x.com/mativallejosdev/status/1979669047622209758"
const VIDEO = "/images/projects/ai-expense-tracker/demo.mp4"

const CONTENT: Record<AELocale, {
  label: string
  tagline: string
  intro: string
  meta: { roleL: string; role: string; yearL: string; year: string; locL: string; loc: string; catL: string; cat: string }
  metrics: { value: string; label: string }[]
  bodyHeading: string
  body: string[]
  videoHeading: string
  cta: { github: string; x: string; back: string }
}> = {
  en: {
    label: "Open-source case study",
    tagline: "AI that turns your bank statements into a finance dashboard — on autopilot.",
    intro:
      "AI Expense Tracker reads your PDF statements and receipts, categorizes every expense with GPT-4o, and fills a Google Sheets dashboard for you. Upload from the web or drop a file in Google Drive — the automation does the rest.",
    meta: { roleL: "Role", role: "Creator", yearL: "Since", year: "2025", locL: "Where", loc: "Open source", catL: "What", cat: "AI finance automation" },
    metrics: [
      { value: "+50", label: "stars" },
      { value: "+8", label: "forks" },
      { value: "+118K", label: "views" },
    ],
    bodyHeading: "What it is",
    body: [
      "Tracking expenses by hand is the reason nobody does it. So I automated the boring part: forward a statement or a receipt and it gets read, categorized and logged — no spreadsheet gymnastics.",
      "Under the hood it's an n8n workflow wired to GPT-4o, a Next.js upload app and Google Sheets. Self-hostable with Docker, open source, and shared publicly so anyone can fork it and run their own.",
    ],
    videoHeading: "The demo",
    cta: { github: "View on GitHub", x: "See the thread on X", back: "Back home" },
  },
  es: {
    label: "Caso de estudio · open source",
    tagline: "IA que convierte tus resúmenes bancarios en un dashboard de finanzas — solo.",
    intro:
      "AI Expense Tracker lee tus PDF de resúmenes y tickets, categoriza cada gasto con GPT-4o y completa un dashboard en Google Sheets por vos. Subís desde la web o dejás el archivo en Google Drive — la automatización hace el resto.",
    meta: { roleL: "Rol", role: "Creador", yearL: "Desde", year: "2025", locL: "Dónde", loc: "Open source", catL: "Qué", cat: "Automatización de finanzas con IA" },
    metrics: [
      { value: "+50", label: "stars" },
      { value: "+8", label: "forks" },
      { value: "+118K", label: "vistas" },
    ],
    bodyHeading: "Qué es",
    body: [
      "Registrar gastos a mano es la razón por la que nadie lo hace. Así que automaticé la parte aburrida: mandás un resumen o un ticket y queda leído, categorizado y cargado — sin pelearte con una planilla.",
      "Por dentro es un workflow de n8n conectado a GPT-4o, una app de subida en Next.js y Google Sheets. Self-hosteable con Docker, open source y publicado para que cualquiera lo forkee y corra el suyo.",
    ],
    videoHeading: "El demo",
    cta: { github: "Ver en GitHub", x: "Ver el hilo en X", back: "Volver al inicio" },
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const c = CONTENT[(locale as AELocale)] ?? CONTENT.en
  const title = `AI Expense Tracker — ${c.label}`
  return {
    title,
    description: c.intro,
    alternates: buildAlternates("/case-study/ai-expense-tracker", locale as Locale),
    openGraph: {
      title,
      description: c.intro,
      type: "article",
      url: "https://www.matiasvallejos.com/case-study/ai-expense-tracker",
    },
    twitter: { card: "summary_large_image", title, description: c.intro },
  }
}

export default async function AiExpenseTrackerCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = CONTENT[(locale as AELocale)] ?? CONTENT.en

  return (
    <main className="min-h-screen bg-[#080706] flex flex-col text-[#FAFAF9]">
      <Navbar />

      {/* Hero */}
      <header className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full pt-20 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <span
            className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-[#3D3935]/60 text-[20px]"
            style={{ backgroundColor: LOGO_BG }}
          >
            💸
          </span>
          <span className="font-mono text-caption text-[#57534E] uppercase tracking-[0.12em]">{c.label}</span>
        </div>
        <div className="flex flex-col gap-4 max-w-[760px]">
          <h1 className="font-serif text-[44px] sm:text-[60px] md:text-[72px] leading-[0.98] tracking-tight">AI Expense Tracker</h1>
          <p className="font-serif text-[21px] sm:text-[26px] leading-[1.2] tracking-tight text-[#E7E5E4]">{c.tagline}</p>
          <p className="text-body text-[#A8A29E] leading-relaxed mt-2 max-w-[620px]">{c.intro}</p>
        </div>
      </header>

      {/* Meta bar */}
      <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-[#3D3935]/60">
          {[
            [c.meta.roleL, c.meta.role],
            [c.meta.yearL, c.meta.year],
            [c.meta.locL, c.meta.loc],
            [c.meta.catL, c.meta.cat],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-mono text-micro uppercase tracking-[0.08em] text-[#57534E]">{label}</span>
              <span className="text-body-sm text-[#FAFAF9] leading-snug">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <CaseMetrics metrics={c.metrics} />

      {/* What it is */}
      <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full py-14 border-t border-[#3D3935]/40">
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 mb-6"
        >
          <h2 className="font-mono text-caption uppercase tracking-[0.08em] text-[#A8A29E] group-hover:text-white transition-colors">
            {c.bodyHeading}
          </h2>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#57534E] group-hover:text-white group-hover:translate-x-0.5 transition-all">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
        <div className="flex flex-col gap-4 max-w-[720px]">
          {c.body.map((p, i) => (
            <p key={i} className="text-body text-[#A8A29E] leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      {/* Demo video */}
      <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full py-14 border-t border-[#3D3935]/40">
        <h2 className="font-mono text-caption uppercase tracking-[0.08em] text-[#A8A29E] mb-6">{c.videoHeading}</h2>
        <div className="relative rounded-2xl overflow-hidden border border-[#3D3935]/60 bg-[#0C0A09]">
          <video
            src={VIDEO}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-auto max-h-[70vh] object-contain block mx-auto"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full py-16 border-t border-[#3D3935]/40">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-caption font-semibold uppercase bg-[#E8742A] text-[#080706] px-5 py-3 rounded-md hover:bg-[#D4622A] transition-colors duration-200"
          >
            {c.cta.github} →
          </a>
          <a
            href={X_POST}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-caption uppercase text-[#A8A29E] border border-[#3D3935]/60 px-5 py-3 rounded-md hover:text-white hover:border-[#57534E] transition-colors duration-200"
          >
            {c.cta.x} →
          </a>
          <Link href="/" className="font-mono text-caption text-[#57534E] hover:text-white transition-colors duration-200 ml-auto">
            ← {c.cta.back}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
