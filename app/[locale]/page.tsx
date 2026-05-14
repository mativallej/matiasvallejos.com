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
import { getFeaturedPosts } from "@/lib/blog"
import { format, parseISO } from "date-fns"

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
