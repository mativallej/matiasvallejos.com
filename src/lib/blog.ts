import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeStringify from "rehype-stringify"

const BLOG_DIR = path.join(process.cwd(), "content/blog")
const WORDS_PER_MINUTE = 200

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  category: string
  featured: boolean
  twitterUrl: string | null
  content: string
}

export type BlogPostWithHtml = BlogPost & {
  html: string
  readTime: string
}

function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
  return `${minutes} min read`
}

export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(BLOG_DIR)
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs()
  const posts = slugs.map((slug) => {
    const filePath = path.join(BLOG_DIR, `${slug}.md`)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      category: data.category || "general",
      featured: data.featured || false,
      twitterUrl: data.twitterUrl || null,
      content,
    }
  })

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => post.featured)
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}

export async function getPostBySlug(slug: string): Promise<BlogPostWithHtml> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify)
    .process(content)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    category: data.category || "general",
    featured: data.featured || false,
    twitterUrl: data.twitterUrl || null,
    content,
    html: String(result),
    readTime: calculateReadTime(content),
  }
}
