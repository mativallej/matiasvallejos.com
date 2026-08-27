import type { Metadata } from "next"
import Image from "next/image"
import { setRequestLocale } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Link } from "@/i18n/navigation"
import { buildAlternates } from "@/lib/seo"
import { type Locale } from "@/i18n/routing"
import { teguCase, caseImages, type CaseLocale } from "@/data/tegu-case-study"
import { QuoteBanner } from "./quote-banner"
import { CasePress } from "./case-press"
import { CaseMetrics } from "@/components/case-metrics"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const c = teguCase[(locale as CaseLocale)] ?? teguCase.en
  const title = `Tegu — ${c.label}`
  return {
    title,
    description: c.intro,
    alternates: buildAlternates("/case-study/tegu", locale as Locale),
    openGraph: {
      title,
      description: c.intro,
      type: "article",
      url: "https://www.matiasvallejos.com/case-study/tegu",
      images: ["https://www.matiasvallejos.com/images/case-study/tegu/recap.jpg"],
    },
    twitter: { card: "summary_large_image", title, description: c.intro },
  }
}

const GREEN = "#4F9A69"

export default async function TeguCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = teguCase[(locale as CaseLocale)] ?? teguCase.en

  return (
    <main className="min-h-screen bg-[#080706] flex flex-col text-[#FAFAF9]">
      <Navbar />

      {/* Hero */}
      <header className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full pt-20 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-[#3D3935]/60" style={{ backgroundColor: GREEN }}>
            <Image src="/images/projects/tegu/logo-green.webp" alt="Tegu" width={40} height={40} className="w-full h-full object-cover" />
          </span>
          <span className="font-mono text-caption text-[#57534E] uppercase tracking-[0.12em]">{c.label}</span>
        </div>
        <div className="flex flex-col gap-4 max-w-[760px]">
          <h1 className="font-serif text-[48px] sm:text-[68px] md:text-[84px] leading-[0.95] tracking-tight">Tegu</h1>
          <p className="font-serif text-[21px] sm:text-[26px] leading-[1.2] tracking-tight text-[#E7E5E4]">
            {c.tagline}
          </p>
          <p className="text-body text-[#A8A29E] leading-relaxed mt-2 max-w-[620px]">{c.intro}</p>
        </div>
      </header>

      {/* Meta bar */}
      <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-[#3D3935]/60">
          {[
            [c.meta.roleLabel, c.meta.role],
            [c.meta.yearLabel, c.meta.year],
            [c.meta.locationLabel, c.meta.location],
            [c.meta.categoryLabel, c.meta.category],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-mono text-micro uppercase tracking-[0.08em] text-[#57534E]">{label}</span>
              <span className="text-body-sm text-[#FAFAF9] leading-snug">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quote-request banner — top CTA, right after the hero */}
      <QuoteBanner
        heading={c.banner.heading}
        subtitle={c.banner.subtitle}
        placeholder={c.banner.placeholder}
        cta={c.banner.cta}
        note={c.banner.note}
      />

      {/* Outcomes */}
      <CaseMetrics metrics={c.outcomes} note={c.outcomesNote} />

      {/* Problem — two columns: text + verified-pro card */}
      <Section heading={c.problem.heading} href="https://tegu.ar">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div className="flex flex-col gap-4">
            {c.problem.paragraphs.map((p, i) => (
              <p key={i} className="text-body text-[#A8A29E] leading-relaxed">{p}</p>
            ))}
          </div>
          <div className="relative aspect-[4/5] max-w-[400px] w-full mx-auto rounded-2xl overflow-hidden border border-[#3D3935]/60 bg-[#0C0A09]">
            <Image
              src={caseImages.problemWorker}
              alt="David G. — profesional verificado de Tegu"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-contain"
            />
          </div>
        </div>
      </Section>

      {/* Approach + manifesto */}
      <Section heading={c.approach.heading} href="https://tegu.ar/building-in-public">
        <div className="flex flex-col gap-4 max-w-[720px]">
          {c.approach.paragraphs.map((p, i) => (
            <p key={i} className="text-body text-[#A8A29E] leading-relaxed">{p}</p>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {c.approach.rules.map((r) => (
            <div key={r.title} className="rounded-2xl border border-[#3D3935]/60 bg-[#0C0A09] p-5">
              <h3 className="text-body font-semibold text-white mb-1.5">{r.title}</h3>
              <p className="text-body-sm text-[#78716C] leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Product — alternating image/text */}
      <Section heading={c.product.heading} href="https://tegu.ar/descargar">
        <p className="text-body text-[#A8A29E] leading-relaxed max-w-[720px] mb-10">{c.product.intro}</p>
        <div className="flex flex-col gap-12">
          {c.product.items.map((item, i) => {
            const img = caseImages.product[i]
            return (
              <div
                key={item.title}
                className={`grid gap-8 items-center ${img ? "md:grid-cols-2" : ""} ${
                  img && i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {img && (
                  <div className="relative aspect-[3/4] max-w-[320px] w-full mx-auto rounded-2xl overflow-hidden border border-[#3D3935]/60 bg-[#0C0A09]">
                    <Image src={img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 320px" className="object-contain" />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-micro uppercase tracking-[0.08em] text-[#E8742A]">0{i + 1}</span>
                  <h3 className="font-serif text-[24px] leading-tight tracking-tight text-white">{item.title}</h3>
                  <p className="text-body text-[#A8A29E] leading-relaxed">{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>
        {/* VIDEO SLOT — see docs/tegu-case-study-TODO.md to embed the demo video */}
        <p className="font-mono text-micro text-[#57534E] mt-8">{c.product.videoNote}</p>
      </Section>

      {/* Identity */}
      <Section heading={c.identity.heading} href="https://tegu.ar/building-in-public/rediseno-minimalismo">
        <div className="flex flex-col gap-4 max-w-[720px] mb-8">
          {c.identity.paragraphs.map((p, i) => (
            <p key={i} className="text-body text-[#A8A29E] leading-relaxed">{p}</p>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { img: caseImages.identityBefore, label: c.identity.beforeLabel },
            { img: caseImages.identityAfter, label: c.identity.afterLabel },
          ].map((it) => (
            <figure key={it.label} className="flex flex-col gap-2">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#3D3935]/60 bg-[#0C0A09]">
                <Image src={it.img} alt={it.label} fill sizes="(max-width: 768px) 50vw, 300px" className="object-contain p-4" />
              </div>
              <figcaption className="font-mono text-micro text-[#57534E]">{it.label}</figcaption>
            </figure>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {c.identity.galleryCaptions.map((cap, i) => (
            <figure key={cap} className="flex flex-col gap-2">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#3D3935]/60 bg-[#0C0A09]">
                <Image src={caseImages.identityGallery[i]} alt={cap} fill sizes="(max-width: 768px) 50vw, 240px" className="object-contain" />
              </div>
              <figcaption className="font-mono text-micro text-[#57534E]">{cap}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section heading={c.timeline.heading} href="https://tegu.ar/building-in-public">
        <div className="flex flex-col">
          {c.timeline.items.map((it, i) => (
            <div key={i} className="grid grid-cols-[100px_1fr] sm:grid-cols-[160px_1fr] gap-4 py-5 border-t border-[#3D3935]/40 first:border-t-0">
              <span className="font-mono text-caption uppercase tracking-[0.06em] text-[#57534E] pt-1">{it.period}</span>
              <div className="flex flex-col gap-1">
                <h3 className="text-body font-semibold text-white">{it.title}</h3>
                <p className="text-body-sm text-[#A8A29E] leading-relaxed">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Business model */}
      <Section heading={c.model.heading} href="https://tegu.ar/soy-profesional">
        <p className="text-body text-[#A8A29E] leading-relaxed max-w-[720px] mb-6">{c.model.intro}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.model.rows.map((row) => (
            <div key={row.label} className="rounded-2xl border border-[#3D3935]/60 bg-[#0C0A09] p-5 flex flex-col gap-1">
              <span className="font-mono text-micro uppercase tracking-[0.08em] text-[#57534E]">{row.label}</span>
              <span className="font-serif text-[32px] leading-none tracking-tight text-white">{row.value}</span>
              <p className="text-body-sm text-[#78716C] leading-relaxed mt-1">{row.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Trust — institutional pages */}
      <Section heading={c.trust.heading} href="https://tegu.ar/nosotros">
        <p className="text-body text-[#A8A29E] leading-relaxed max-w-[720px] mb-6">{c.trust.intro}</p>
        <div className="flex flex-col">
          {c.trust.items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative z-0 flex items-center gap-4 px-4 py-4 bg-[#0C0A09] border border-[#3D3935]/60 -mt-px first:mt-0 first:rounded-t-xl last:rounded-b-xl hover:z-10 hover:border-[#57534E] hover:bg-[#12100E] transition-colors"
            >
              <span className="text-body font-semibold text-white w-[120px] flex-shrink-0">{it.label}</span>
              <span className="hidden sm:block text-body-sm text-[#78716C] leading-snug flex-1 min-w-0">{it.description}</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="ml-auto flex-shrink-0 text-[#57534E] group-hover:text-white group-hover:translate-x-0.5 transition-all"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          ))}
        </div>
      </Section>

      {/* Press — dedicated case-study component (video + full list, no /press link) */}
      <CasePress locale={locale} heading={c.press.heading} />

      {/* Team — photo left, member cards right */}
      <Section heading={c.team.heading} href="https://tegu.ar/nosotros">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <figure className="flex flex-col gap-2">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-[#3D3935]/60">
              <Image src={caseImages.teamGroup} alt={c.team.groupCaption} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
            <figcaption className="font-mono text-micro text-[#57534E]">{c.team.groupCaption}</figcaption>
          </figure>
          <div className="flex flex-col gap-4">
            {caseImages.team.map((m, i) => (
              <div key={m.name} className="rounded-2xl border border-[#3D3935]/60 bg-[#0C0A09] p-5 flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#3D3935]/60 flex-shrink-0">
                  <Image src={m.photo} alt={m.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-body font-semibold text-white">{m.name}</span>
                  <span className="font-mono text-micro uppercase tracking-[0.06em] text-[#E8742A]">{m.role}</span>
                  <p className="text-body-sm text-[#78716C] leading-relaxed mt-1">{c.team.bios[i]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What's next */}
      <Section heading={c.next.heading} href="https://tegu.ar/building-in-public">
        <div className="grid md:grid-cols-3 gap-4">
          {c.next.items.map((it) => (
            <div key={it.title} className="rounded-2xl border border-[#3D3935]/60 bg-[#0C0A09] p-5">
              <h3 className="text-body font-semibold text-white mb-1.5">{it.title}</h3>
              <p className="text-body-sm text-[#78716C] leading-relaxed">{it.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Quote — emotional close */}
      <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full py-16 border-t border-[#3D3935]/40">
        <blockquote className="max-w-[820px]">
          <p className="font-serif text-[28px] sm:text-[36px] leading-[1.15] tracking-tight text-white">
            “{c.quote.text}”
          </p>
          <footer className="mt-4 font-mono text-caption text-[#A8A29E]">
            {c.quote.author} · <span className="text-[#57534E]">{c.quote.role}</span>
          </footer>
        </blockquote>
      </section>

      {/* CTA */}
      <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full py-16 border-t border-[#3D3935]/40">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://tegu.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-caption font-semibold uppercase bg-[#E8742A] text-[#080706] px-5 py-3 rounded-md hover:bg-[#D4622A] transition-colors duration-200"
          >
            {c.cta.visit} →
          </a>
          <a
            href="https://tegu.ar/building-in-public"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-caption uppercase text-[#A8A29E] border border-[#3D3935]/60 px-5 py-3 rounded-md hover:text-white hover:border-[#57534E] transition-colors duration-200"
          >
            {c.cta.bip} →
          </a>
          <Link
            href="/"
            className="font-mono text-caption text-[#57534E] hover:text-white transition-colors duration-200 ml-auto"
          >
            ← {c.cta.back}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Section({ heading, href, children }: { heading: string; href?: string; children: React.ReactNode }) {
  return (
    <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full py-14 border-t border-[#3D3935]/40">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 mb-6"
        >
          <h2 className="font-mono text-caption uppercase tracking-[0.08em] text-[#A8A29E] group-hover:text-white transition-colors">
            {heading}
          </h2>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-[#57534E] group-hover:text-white group-hover:translate-x-0.5 transition-all"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      ) : (
        <h2 className="font-mono text-caption uppercase tracking-[0.08em] text-[#A8A29E] mb-6">{heading}</h2>
      )}
      {children}
    </section>
  )
}
