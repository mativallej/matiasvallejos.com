import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format, parseISO } from "date-fns"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog"

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    return {
      title: `${post.title} - Matias Vallejos`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
      },
    }
  } catch {
    return { title: "Post Not Found" }
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#080706]">
      <Navbar />

      <article className="px-6 lg:px-10 pt-20 pb-16 max-w-[1080px] mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-caption text-[#57534E] hover:text-[#A8A29E] transition-colors duration-200 mb-8"
        >
          <span>{"<-"}</span>
          <span>back to blog</span>
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
          <h1 className="text-display-lg text-white">{post.title}</h1>
          <p className="text-body text-[#A8A29E] max-w-[560px]">
            {post.description}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-caption uppercase px-3 py-1.5 rounded-md bg-[#E8742A]/15 text-[#FB923C]"
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
                read on twitter →
              </a>
            )}
          </div>
        </header>

        {/* Post content */}
        <div
          className="prose prose-invert prose-custom max-w-[720px]"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

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
            invitame un cafecito
          </a>
        </div>
      </article>

      <div className="pt-8" />
      <Footer />
    </main>
  )
}
