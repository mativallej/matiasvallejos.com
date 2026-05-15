import React from "react"
import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { Analytics } from "@vercel/analytics/next"
import { routing, type Locale } from "@/i18n/routing"
import { SITE_URL, LOCALE_HTML_LANG } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { DraggableFlag } from "@/components/draggable-flag"
import { rootGraph } from "@/lib/schema"
import "@/styles/globals.css"

const SITE_TITLE = "Matias Vallejos — Product Engineer & Co-Founder @ Tegu"
const SITE_DESCRIPTION =
  "Product Engineer in LatAm. Building Tegu (2,200 users), co-founded Docta Valley (240+ builders), shipping open source. I treat product and engineering as one discipline."
const SITE_OG_IMAGE = `${SITE_URL}/og-1200x630.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Matias Vallejos",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Matias Vallejos",
    "Product Engineer",
    "Co-Founder",
    "Tegu",
    "Docta Valley",
    "LatAm",
    "Córdoba",
    "Argentina",
    "Next.js",
    "TypeScript",
    "indie hacker",
  ],
  authors: [{ name: "Matias Vallejos", url: SITE_URL }],
  creator: "Matias Vallejos",
  icons: {
    icon: [
      { url: "/images/emoji.webp", type: "image/webp" },
    ],
    shortcut: "/images/emoji.webp",
    apple: "/images/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "es-AR": "/es",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Matias Vallejos",
    locale: "en_US",
    alternateLocale: ["es_AR"],
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Matias Vallejos — Co-Founder @ Tegu, Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@mativallej_",
    images: [SITE_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: "#080706",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const htmlLang = LOCALE_HTML_LANG[locale as Locale]

  return (
    <html lang={htmlLang} className="dark">
      <body className="font-sans antialiased bg-[#080706] text-white">
        <JsonLd data={rootGraph()} />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <DraggableFlag />
        <Analytics />
      </body>
    </html>
  )
}
