import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Now } from "@/components/now"
import { Products } from "@/components/products"
import { Writing } from "@/components/writing"
import { Press } from "@/components/press"
import { OpenSource } from "@/components/open-source"
import { ShipStatus } from "@/components/ship-status"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { pressItemListSchema } from "@/lib/schema"
import { buildAlternates } from "@/lib/seo"
import { type Locale } from "@/i18n/routing"
import { getFeaturedPosts } from "@/lib/blog"
import { format, parseISO } from "date-fns"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    alternates: buildAlternates("/", locale as Locale),
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const featured = getFeaturedPosts()
  const posts = featured.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: format(parseISO(post.date), "MMM yyyy"),
    tags: post.tags,
  }))

  return (
    <main className="min-h-screen bg-[#080706]">
      <JsonLd data={pressItemListSchema()} />
      <Navbar />
      <Hero />
      <Now />
      <Products />
      <Writing posts={posts} />
      <OpenSource />
      <Press locale={locale} />
      <Contact />
      <Footer />
      <ShipStatus />
    </main>
  )
}
