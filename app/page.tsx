import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { Writing } from "@/components/writing"
import { LatestTweets } from "@/components/latest-tweets"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { getFeaturedPosts } from "@/lib/blog"
import { format, parseISO } from "date-fns"

export default function Page() {
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
      <Products />
      <Writing posts={posts} />
      <LatestTweets />
      <Contact />
      <div className="pt-24" />
      <Footer />
    </main>
  )
}
