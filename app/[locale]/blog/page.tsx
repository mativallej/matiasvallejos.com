import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { BlogList } from "@/components/blog-list"
import { getAllPosts, getAllTags } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog - Matias Vallejos",
  description:
    "Essays on product building, design craft, and life as an independent maker. Honest reflections from the work.",
  openGraph: {
    title: "Blog - Matias Vallejos",
    description:
      "Essays on product building, design craft, and life as an independent maker.",
    type: "website",
  },
}

function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("BlogPage")

  const posts = getAllPosts()
  const tags = getAllTags()

  const serializedPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    readTime: calculateReadTime(post.content),
  }))

  return (
    <main className="min-h-screen bg-[#080706]">
      <Navbar />
      <PageHeader
        label={t("label")}
        title={t("title")}
        titleAccent={t("titleAccent")}
        description={t("description")}
      />
      <BlogList posts={serializedPosts} tags={tags} />
      <div className="pt-24" />
      <Footer />
    </main>
  )
}
