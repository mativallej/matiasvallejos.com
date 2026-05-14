import React from "react"
import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Matias Vallejos - I build products",
  description:
    "Personal portfolio of Matias Vallejos. Product builder from Cordoba, Argentina. Lean, fast, purposeful.",
  icons: {
    icon: "/images/emoji.png",
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
