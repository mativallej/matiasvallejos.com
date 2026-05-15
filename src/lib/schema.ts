import { SITE_URL, absoluteUrl } from "@/lib/seo"
import type { BlogPostWithHtml } from "@/lib/blog"
import { press } from "@/data/press"
import { products, type Product } from "@/data/products"
import { books, type Book } from "@/data/books"

export const PERSON_ID = `${SITE_URL}/#person`
export const ORG_ID = `${SITE_URL}/#org`
export const WEBSITE_ID = `${SITE_URL}/#website`

const SAME_AS = [
  "https://x.com/mativallej_",
  "https://github.com/mativallej",
  "https://www.linkedin.com/in/mativallej/",
  "https://instagram.com/mativallej_",
  "https://tegu.ar",
  "https://doctavalley.com.ar",
]

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Matias Vallejos",
    url: SITE_URL,
    image: absoluteUrl("/images/me.webp"),
    jobTitle: "Product Engineer & Co-Founder",
    worksFor: { "@id": ORG_ID },
    homeLocation: {
      "@type": "Place",
      name: "Córdoba, Argentina",
    },
    nationality: { "@type": "Country", name: "Argentina" },
    knowsAbout: [
      "Product Engineering",
      "Next.js",
      "TypeScript",
      "Marketplaces",
      "AI",
      "Indie Hacking",
      "LatAm SaaS",
    ],
    sameAs: SAME_AS,
  }
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Tegu",
    url: "https://tegu.ar",
    founder: { "@id": PERSON_ID },
    sameAs: [
      "https://tegu.ar",
      "https://x.com/tegu_app",
      "https://instagram.com/tegu_app",
      "https://linkedin.com/company/teguapp",
    ],
  }
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Matias Vallejos",
    inLanguage: ["en-US", "es-AR"],
    publisher: { "@id": PERSON_ID },
  }
}

/**
 * Root graph rendered in the locale layout — single JSON-LD payload with
 * stable `@id`s so other pages can reference Person/Organization/WebSite by id.
 */
export function rootGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personSchema(), organizationSchema(), websiteSchema()],
  }
}

export function blogPostingSchema(
  post: BlogPostWithHtml,
  locale: string,
): Record<string, unknown> {
  const url = absoluteUrl(`/${post.slug}`)
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    mainEntityOfPage: url,
    url,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale === "es" ? "es-AR" : "en-US",
    keywords: post.tags.join(", "),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    image: absoluteUrl(`/og-1536x1024.jpg`),
  }
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

export function creativeWorkSchema(product: Product): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": absoluteUrl(`/projects/${product.slug}`),
    name: product.title,
    headline: product.title,
    description: product.description,
    url: absoluteUrl(`/projects/${product.slug}`),
    sameAs: product.link,
    dateCreated: product.date,
    creator: { "@id": PERSON_ID },
    keywords: product.tags.join(", "),
    image: product.logo ? absoluteUrl(product.logo) : undefined,
  }
}

export function projectsItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Products built by Matias Vallejos",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        "@id": absoluteUrl(`/projects/${p.slug}`),
        name: p.title,
        description: p.description,
        url: absoluteUrl(`/projects/${p.slug}`),
        sameAs: p.link,
        dateCreated: p.date,
        creator: { "@id": PERSON_ID },
      },
    })),
  }
}

export function booksItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Books read by Matias Vallejos with honest verdicts",
    itemListElement: books.map((b: Book, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Book",
        name: b.title,
        author: { "@type": "Person", name: b.author },
        about: b.category,
        reviewedBy: { "@id": PERSON_ID },
      },
    })),
  }
}

/**
 * ItemList of Matias's press hits — surfaces the off-page entity moat
 * (Cadena 3, Perfil, iProUP, etc.) as machine-readable NewsArticle refs.
 */
export function pressItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Press coverage of Matias Vallejos",
    itemListElement: press.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "NewsArticle",
        headline: item.title,
        url: item.url,
        datePublished: item.date,
        inLanguage: item.language === "es" ? "es-AR" : "en-US",
        publisher: {
          "@type": "Organization",
          name: item.outlet,
        },
        about: { "@id": PERSON_ID },
      },
    })),
  }
}
