import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"
import { products } from "@/data/products"
import { SITE_URL } from "@/lib/seo"

const STATIC_ROUTES: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/books", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/press", changeFrequency: "monthly", priority: 0.8 },
]

function localized(path: string): { en: string; es: string } {
  if (path === "/") {
    return { en: `${SITE_URL}/`, es: `${SITE_URL}/es` }
  }
  return { en: `${SITE_URL}${path}`, es: `${SITE_URL}/es${path}` }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const route of STATIC_ROUTES) {
    const urls = localized(route.path)
    entries.push({
      url: urls.en,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          "en-US": urls.en,
          "es-AR": urls.es,
          "x-default": urls.en,
        },
      },
    })
  }

  const posts = getAllPosts()
  for (const post of posts) {
    const urls = localized(`/${post.slug}`)
    entries.push({
      url: urls.en,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "en-US": urls.en,
          "es-AR": urls.es,
          "x-default": urls.en,
        },
      },
    })
  }

  for (const product of products) {
    const urls = localized(`/projects/${product.slug}`)
    entries.push({
      url: urls.en,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "en-US": urls.en,
          "es-AR": urls.es,
          "x-default": urls.en,
        },
      },
    })
  }

  return entries
}
