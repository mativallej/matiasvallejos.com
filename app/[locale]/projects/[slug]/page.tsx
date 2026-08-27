import type { Metadata } from "next"
import Image from "next/image"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Link } from "@/i18n/navigation"
import { JsonLd } from "@/components/json-ld"
import { products } from "@/data/products"
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/schema"
import { buildAlternates, buildBreadcrumbs } from "@/lib/seo"
import { type Locale } from "@/i18n/routing"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const project = products.find((p) => p.slug === slug)
  if (!project) return { title: "Project Not Found" }
  return {
    title: project.title,
    description: project.description,
    alternates: buildAlternates(`/projects/${slug}`, locale as Locale),
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `https://www.matiasvallejos.com/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
  }
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations("ProjectCaseStudy")
  const project = products.find((p) => p.slug === slug)
  if (!project) notFound()

  const breadcrumbs = breadcrumbSchema(
    buildBreadcrumbs(locale as Locale, [
      { key: "projects", path: "/projects" },
      { key: "projects", path: `/projects/${slug}`, nameOverride: project.title },
    ]),
  )

  const gallery = project.images ?? []

  return (
    <main className="min-h-screen bg-[#080706] flex flex-col text-[#FAFAF9]">
      <JsonLd data={creativeWorkSchema(project)} />
      <JsonLd data={breadcrumbs} />
      <Navbar />

      {/* Hero */}
      <header className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full pt-20 pb-10">
        <div className="flex items-center gap-3 mb-6">
          {project.logo ? (
            <span
              className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-[#3D3935]/60"
              style={{ backgroundColor: project.logoBg ?? "#1C1917" }}
            >
              <Image src={project.logo} alt={project.title} width={40} height={40} className="w-full h-full object-cover" />
            </span>
          ) : project.emoji ? (
            <span
              className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 text-[18px]"
              style={{ backgroundColor: project.logoBg ?? "#1C1917" }}
            >
              {project.emoji}
            </span>
          ) : null}
          <span className="font-mono text-caption text-[#57534E] uppercase tracking-[0.12em]">
            {project.subtitle ?? t("title")}
          </span>
        </div>

        <h1 className="font-serif text-[44px] sm:text-[64px] md:text-[76px] leading-[0.98] tracking-tight">
          {project.title}
        </h1>

        <p className="text-body text-[#A8A29E] leading-relaxed mt-5 max-w-[640px]">
          {project.description}
        </p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-x-10 gap-y-4 mt-8">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="font-serif text-[32px] leading-none tracking-tight text-white">{m.value}</span>
                <span className="font-mono text-micro uppercase tracking-[0.06em] text-[#57534E] mt-1">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-micro uppercase tracking-[0.06em] text-[#A8A29E] border border-[#3D3935]/60 rounded-full px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 mt-8">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-caption font-semibold uppercase bg-[#E8742A] text-[#080706] px-5 py-3 rounded-md hover:bg-[#D4622A] transition-colors duration-200"
            >
              {t("visitProject")} →
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-caption uppercase text-[#A8A29E] border border-[#3D3935]/60 px-5 py-3 rounded-md hover:text-white hover:border-[#57534E] transition-colors duration-200"
            >
              GitHub →
            </a>
          )}
        </div>
      </header>

      {/* Gallery — video + images */}
      {(project.video || gallery.length > 0) && (
        <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full pb-16">
          <div className="grid sm:grid-cols-2 gap-4">
            {project.video && (
              <video
                src={project.video}
                controls
                playsInline
                className={`w-full rounded-2xl border border-[#3D3935]/60 bg-[#0C0A09] ${
                  gallery.length > 0 ? "" : "sm:col-span-2"
                } ${project.videoFit === "contain" ? "object-contain" : "object-cover"}`}
              />
            )}
            {gallery.map((src) => (
              <div
                key={src}
                className="relative rounded-2xl overflow-hidden border border-[#3D3935]/60 bg-[#0C0A09]"
              >
                <Image
                  src={src}
                  alt={project.title}
                  width={1280}
                  height={960}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Back */}
      <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full pb-24 border-t border-[#3D3935]/40 pt-8">
        <Link
          href="/"
          className="font-mono text-caption text-[#57534E] hover:text-white transition-colors duration-200"
        >
          ← {t("backHome")}
        </Link>
      </section>

      <Footer />
    </main>
  )
}
