import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { LatestTweets } from "@/components/latest-tweets"
import { Products } from "@/components/products"
import { Writing } from "@/components/writing"
import { Books } from "@/components/books"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#080706]">
      <Navbar />
      <Hero />
      <Products />
      <Writing />
      <Books />
      <LatestTweets />
      <Contact />
      <div className="pt-24" />
      <Footer />
    </main>
  )
}
