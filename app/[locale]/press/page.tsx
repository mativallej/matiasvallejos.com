import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { PressList } from "@/components/press-list"
import { JsonLd } from "@/components/json-ld"
import { press } from "@/data/press"
import { breadcrumbSchema, pressItemListSchema } from "@/lib/schema"
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
    title: isEs ? "Prensa" : "Press",
    description: isEs
      ? "Cobertura de prensa de Matías Vallejos y Tegu en Cadena 3, Perfil, iProUP, El Canciller, Canal 10, Continental Córdoba y más."
      : "Press coverage of Matias Vallejos and Tegu in Cadena 3, Perfil, iProUP, El Canciller, Canal 10, Continental Córdoba and more.",
    alternates: buildAlternates("/press", locale as Locale),
  }
}

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("PressPage")

  const items = press.filter((p) => !p.logoOnly)
  const breadcrumbs = breadcrumbSchema(
    buildBreadcrumbs(locale as Locale, [{ key: "press", path: "/press" }]),
  )

  return (
    <main className="min-h-screen bg-[#080706]">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={pressItemListSchema()} />
      <Navbar />
      <PageHeader
        label={t("label")}
        title={t("title")}
        titleAccent={t("titleAccent")}
        description={t("description")}
      />
      <PressList items={items} />
      <div className="pt-24" />
      <Footer />
    </main>
  )
}
