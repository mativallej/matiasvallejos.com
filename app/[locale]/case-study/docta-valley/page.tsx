import type { Metadata } from "next"
import Image from "next/image"
import { setRequestLocale } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Link } from "@/i18n/navigation"
import { buildAlternates } from "@/lib/seo"
import { type Locale } from "@/i18n/routing"
import { CaseMetrics } from "@/components/case-metrics"

type DVLocale = "en" | "es"

const LOGO_BG = "#F5E6B0"
const IMAGES = {
  logo: "/images/projects/docta-valley/logo.jpg",
  gallery: [
    "/images/projects/docta-valley/event-001.jpeg",
    "/images/projects/docta-valley/event-002.jpeg",
  ],
}

const CONTENT: Record<DVLocale, {
  label: string
  tagline: string
  intro: string
  meta: { roleL: string; role: string; yearL: string; year: string; locL: string; loc: string; catL: string; cat: string }
  metrics: { value: string; label: string }[]
  bodyHeading: string
  body: string[]
  galleryHeading: string
  cta: { visit: string; x: string; back: string }
}> = {
  en: {
    label: "Community case study",
    tagline: "The community building Córdoba's tech scene.",
    intro:
      "Docta Valley connects founders, builders and makers across Córdoba, Argentina — a space to share ideas, make real connections, and launch startups from the interior of the country.",
    meta: { roleL: "Role", role: "Co-Founder", yearL: "Since", year: "2025", locL: "Where", loc: "Córdoba, Argentina", catL: "What", cat: "Tech community" },
    metrics: [
      { value: "+200", label: "builders" },
      { value: "+4", label: "events" },
      { value: "+12", label: "startups" },
    ],
    bodyHeading: "What it is",
    body: [
      "Great startups don't come from a single genius — they come from a scene: people who share what they're building, help each other, and raise the bar.",
      "Docta Valley is that scene for Córdoba. We create the space — events, meetups and connections — so founders and builders can spread ideas and launch companies from here, not from somewhere else.",
    ],
    galleryHeading: "The events",
    cta: { visit: "Visit doctavalley.com.ar", x: "Follow on X", back: "Back home" },
  },
  es: {
    label: "Caso de estudio · comunidad",
    tagline: "La comunidad que está construyendo la escena tech de Córdoba.",
    intro:
      "Docta Valley conecta a founders, builders y makers de Córdoba, Argentina — un espacio para compartir ideas, generar conexiones reales y lanzar startups desde el interior del país.",
    meta: { roleL: "Rol", role: "Co-Founder", yearL: "Desde", year: "2025", locL: "Dónde", loc: "Córdoba, Argentina", catL: "Qué", cat: "Comunidad tech" },
    metrics: [
      { value: "+200", label: "builders" },
      { value: "+4", label: "eventos" },
      { value: "+12", label: "startups" },
    ],
    bodyHeading: "Qué es",
    body: [
      "Las buenas startups no salen de un genio solo — salen de una escena: gente que comparte lo que construye, se ayuda y sube la vara.",
      "Docta Valley es esa escena para Córdoba. Creamos el espacio —eventos, meetups y conexiones— para que founders y builders difundan ideas y lancen empresas desde acá, no desde otro lado.",
    ],
    galleryHeading: "Los eventos",
    cta: { visit: "Visitar doctavalley.com.ar", x: "Seguir en X", back: "Volver al inicio" },
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const c = CONTENT[(locale as DVLocale)] ?? CONTENT.en
  const title = `Docta Valley — ${c.label}`
  return {
    title,
    description: c.intro,
    alternates: buildAlternates("/case-study/docta-valley", locale as Locale),
    openGraph: {
      title,
      description: c.intro,
      type: "article",
      url: "https://www.matiasvallejos.com/case-study/docta-valley",
      images: [`https://www.matiasvallejos.com${IMAGES.gallery[0]}`],
    },
    twitter: { card: "summary_large_image", title, description: c.intro },
  }
}

export default async function DoctaValleyCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = CONTENT[(locale as DVLocale)] ?? CONTENT.en

  return (
    <main className="min-h-screen bg-[#080706] flex flex-col text-[#FAFAF9]">
      <Navbar />

      {/* Hero */}
      <header className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full pt-20 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <span
            className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-[#3D3935]/60"
            style={{ backgroundColor: LOGO_BG }}
          >
            <Image src={IMAGES.logo} alt="Docta Valley" width={40} height={40} className="w-full h-full object-cover" />
          </span>
          <span className="font-mono text-caption text-[#57534E] uppercase tracking-[0.12em]">{c.label}</span>
        </div>
        <div className="flex flex-col gap-4 max-w-[760px]">
          <h1 className="font-serif text-[44px] sm:text-[60px] md:text-[72px] leading-[0.98] tracking-tight">Docta Valley</h1>
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
          href="https://doctavalley.com.ar"
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

      {/* Gallery */}
      <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full py-14 border-t border-[#3D3935]/40">
        <h2 className="font-mono text-caption uppercase tracking-[0.08em] text-[#A8A29E] mb-6">{c.galleryHeading}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {IMAGES.gallery.map((src, i) => (
            <div key={src} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#3D3935]/60 bg-[#0C0A09]">
              <Image src={src} alt={`Docta Valley — evento ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full py-16 border-t border-[#3D3935]/40">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://doctavalley.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-caption font-semibold uppercase bg-[#E8742A] text-[#080706] px-5 py-3 rounded-md hover:bg-[#D4622A] transition-colors duration-200"
          >
            {c.cta.visit} →
          </a>
          <a
            href="https://x.com/DoctaValley"
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
