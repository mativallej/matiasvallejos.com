import React from "react"
import type { Metadata, Viewport } from "next"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-[#080706] text-white">
        {children}
      </body>
    </html>
  )
}
