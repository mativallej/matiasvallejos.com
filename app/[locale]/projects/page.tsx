import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectsClient } from "./projects-client"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, projectsItemListSchema } from "@/lib/schema"
import { buildAlternates, buildBreadcrumbs } from "@/lib/seo"
import { type Locale } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === "es"
  return {
    title: isEs ? "Proyectos" : "Projects",
    description: isEs
      ? "Productos que construyo: Tegu (marketplace AI de servicios para el hogar), Docta Valley (comunidad de +240 builders en Córdoba) y AI Expense Tracker."
      : "Products I build: Tegu (AI marketplace for home services in Argentina), Docta Valley (240+ builder community in Córdoba), and AI Expense Tracker.",
    alternates: buildAlternates("/projects", locale as Locale),
  }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const breadcrumbs = breadcrumbSchema(
    buildBreadcrumbs(locale as Locale, [{ key: "projects", path: "/projects" }]),
  )

  return (
    <main className="min-h-screen bg-[#080706]">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={projectsItemListSchema()} />
      <Navbar />
      <ProjectsClient />
      <div className="pt-24" />
      <Footer />
    </main>
  )
}
