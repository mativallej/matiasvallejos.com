import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { format, parseISO } from "date-fns"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthorBio } from "@/components/author-bio"
import { JsonLd } from "@/components/json-ld"
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog"
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema"
import { buildAlternates, absoluteUrl, SITE_URL, buildBreadcrumbs } from "@/lib/seo"
import { type Locale } from "@/i18n/routing"

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  try {
    const post = await getPostBySlug(slug)
    const url = absoluteUrl(`/${slug}`)
    const ogImage = `${SITE_URL}/og-1200x630.png`
    return {
      title: post.title,
      description: post.description,
      authors: [{ name: "Matias Vallejos", url: SITE_URL }],
      alternates: buildAlternates(`/${slug}`, locale as Locale),
      openGraph: {
        title: post.title,
        description: post.description,
        url,
        type: "article",
        publishedTime: post.date,
        tags: post.tags,
        authors: ["Matias Vallejos"],
        images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [ogImage],
      },
    }
  } catch {
    return { title: "Post Not Found" }
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations("BlogPost")

  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  const breadcrumbs = breadcrumbSchema(
    buildBreadcrumbs(locale as Locale, [
      { key: "blog", path: "/blog" },
      { key: "blog", path: `/${post.slug}`, nameOverride: post.title },
    ]),
  )

  return (
    <main className="min-h-screen bg-[#080706]">
      <JsonLd data={blogPostingSchema(post, locale)} />
      <JsonLd data={breadcrumbs} />
      <Navbar />

      <article className="px-4 lg:px-8 pt-14 pb-16 md:pt-16 max-w-[1080px] mx-auto">
        {/* Back link — pill style for design system consistency */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-caption text-[#A8A29E] border border-[#3D3935]/60 rounded-full px-3 py-1 hover:text-white hover:border-[#57534E] transition-colors duration-200 mb-8"
        >
          <span className="text-[#57534E]">←</span>
          <span>{t("backToBlog")}</span>
        </Link>

        {/* Post header */}
        <header className="flex flex-col gap-4 mb-12">
          <div className="flex items-center gap-3 font-mono text-caption">
            <span className="text-[#57534E]">
              {format(parseISO(post.date), "MMMM d, yyyy")}
            </span>
            <span className="text-[#3D3935]">{"/"}</span>
            <span className="text-[#57534E]">{post.readTime}</span>
          </div>
          <h1 className="font-serif text-[36px] sm:text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.02em] font-bold text-white">
            {post.title}
          </h1>
          <p className="text-body text-[#A8A29E] max-w-[560px] leading-relaxed">
            {post.description}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-caption uppercase px-3 py-1.5 rounded-md bg-[#FB923C]/15 text-[#FB923C]"
              >
                {tag}
              </span>
            ))}
            {post.twitterUrl && (
              <a
                href={post.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-caption text-[#57534E] hover:text-[#A8A29E] transition-colors duration-200 ml-2"
              >
                {t("readOnTwitter")} →
              </a>
            )}
          </div>
        </header>

        {/* Post content */}
        <div
          className="prose prose-invert prose-custom max-w-[720px]"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <AuthorBio locale={locale} />

        {/* Support link */}
        <div className="max-w-[720px] mt-16 pt-8 border-t border-[#3D3935]">
          <a
            href="https://cafecito.app/mativallej"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-caption text-[#78716C] hover:text-[#FB923C] transition-colors duration-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.5 3H6a4 4 0 0 0-4 4v1a4 4 0 0 0 3 3.87V17a5 5 0 0 0 5 5h4a5 5 0 0 0 5-5v-5.13A4 4 0 0 0 22 8V7a4 4 0 0 0-3.5-4zM6 5h12.5A2 2 0 0 1 20 7v1a2 2 0 0 1-2 2h-1V7a1 1 0 0 0-2 0v3H9V7a1 1 0 0 0-2 0v3H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
            </svg>
            {t("buyCafecito")}
          </a>
        </div>
      </article>

      <div className="pt-8" />
      <Footer />
    </main>
  )
}
