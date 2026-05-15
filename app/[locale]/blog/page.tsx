import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { BlogList } from "@/components/blog-list"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/schema"
import { getAllPosts, getAllTags } from "@/lib/blog"
import { buildAlternates, buildBreadcrumbs } from "@/lib/seo"
import { type Locale } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === "es"
  const title = isEs ? "Blog" : "Blog"
  const description = isEs
    ? "Ensayos sobre product building, craft de diseño y vida como maker independiente. Reflexiones honestas desde el trabajo."
    : "Essays on product building, design craft, and life as an independent maker. Honest reflections from the work."
  return {
    title,
    description,
    alternates: buildAlternates("/blog", locale as Locale),
    openGraph: {
      title,
      description,
      type: "website",
    },
  }
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

  const breadcrumbs = breadcrumbSchema(
    buildBreadcrumbs(locale as Locale, [{ key: "blog", path: "/blog" }]),
  )

  return (
    <main className="min-h-screen bg-[#080706]">
      <JsonLd data={breadcrumbs} />
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
