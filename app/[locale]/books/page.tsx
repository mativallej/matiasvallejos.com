import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BooksClient } from "./books-client"
import { JsonLd } from "@/components/json-ld"
import { booksItemListSchema, breadcrumbSchema } from "@/lib/schema"
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
    title: isEs ? "Biblioteca" : "Books",
    description: isEs
      ? "Los libros que leí — con veredicto honesto: must-read, worth-it, skim o skip. Lo que aprendí y dónde lo apliqué."
      : "Books I've read — with honest verdicts: must-read, worth-it, skim or skip. What I took from each and where I applied it.",
    alternates: buildAlternates("/books", locale as Locale),
  }
}

export default async function BooksPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const breadcrumbs = breadcrumbSchema(
    buildBreadcrumbs(locale as Locale, [{ key: "books", path: "/books" }]),
  )

  return (
    <main className="min-h-screen bg-[#080706]">
      <JsonLd data={breadcrumbs} />
      <JsonLd data={booksItemListSchema()} />
      <Navbar />
      <BooksClient />
      <div className="pt-24" />
      <Footer />
    </main>
  )
}
