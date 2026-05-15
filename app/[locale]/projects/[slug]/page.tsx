import type { Metadata } from "next"
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

  return (
    <main className="min-h-screen bg-[#080706] flex flex-col">
      <JsonLd data={creativeWorkSchema(project)} />
      <JsonLd data={breadcrumbs} />
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-4 lg:px-8 py-24 max-w-[720px] mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-6">
          <span className="font-mono text-caption text-[#FB923C] uppercase tracking-[0.08em]">
            {project.title}
          </span>

          <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[56px] leading-[1.05] tracking-tight text-white">
            {t("title")}
          </h1>

          <p className="text-body text-[#A8A29E] leading-relaxed max-w-[460px]">
            {t("description")}
          </p>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-caption font-semibold uppercase bg-[#E8742A] text-[#080706] px-5 py-3 rounded-md hover:bg-[#D4622A] hover:shadow-glow transition-all duration-200 mt-2"
            >
              {t("visitProject")} →
            </a>
          )}

          <Link
            href="/"
            className="font-mono text-caption text-[#57534E] hover:text-white transition-colors duration-200 mt-4"
          >
            ← {t("backHome")}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
