import React from "react"
import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import "@/styles/globals.css"

const SITE_URL = "https://matiasvallejos.com"
const SITE_TITLE = "Matias Vallejos — Product Engineer & Co-Founder @ Tegu"
const SITE_DESCRIPTION =
  "Product Engineer in LatAm. Building Tegu (2,200 users), co-founded Docta Valley (240+ builders), shipping open source. I treat product and engineering as one discipline."
const SITE_IMAGE = `${SITE_URL}/me.png`

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
    icon: "/images/emoji.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
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
        url: SITE_IMAGE,
        width: 1086,
        height: 1448,
        alt: "Matias Vallejos — Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@mativallej_",
    images: [SITE_IMAGE],
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

  return (
    <html lang={locale} className="dark">
      <body className="font-sans antialiased bg-[#080706] text-white">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
