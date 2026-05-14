"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { LocaleSwitcher } from "@/components/locale-switcher"

const navLinks = [
  { key: "now", href: "#now", scroll: true },
  { key: "about", href: "/about", scroll: false },
  { key: "products", href: "/products", scroll: false },
  { key: "blog", href: "/blog", scroll: false },
  { key: "books", href: "/books", scroll: false },
] as const

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("Navbar")

  const handleScrollLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    if (pathname === "/") {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/" + href)
    }
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#3D3935] bg-[#080706]/80 backdrop-blur-[12px]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between h-16 px-6 lg:px-10 max-w-[1080px] mx-auto">
        {/* Left: logo + tagline */}
        <div className="flex items-center gap-6">
          <a
            href="/"
            aria-label="Home"
            onClick={(e) => {
              e.preventDefault()
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" })
              } else {
                router.push("/")
              }
            }}
            className="text-[#78716C] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <Image
              src="/images/emoji.png"
              alt="Matias Vallejos"
              width={24}
              height={24}
              className="rounded-full"
            />
          </a>

          <span className="hidden sm:block font-mono text-body-sm italic text-[#FB923C]">
            {t("tagline")}
          </span>
        </div>

        {/* Right: nav links + locale switcher */}
        <div className="flex items-center gap-3 sm:gap-6">
          {navLinks.map((link) =>
            link.scroll ? (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleScrollLink(e, link.href)}
                className="font-mono text-caption uppercase text-[#78716C] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {t(link.key)}
              </a>
            ) : (
              <Link
                key={link.key}
                href={link.href}
                className="font-mono text-caption uppercase text-[#78716C] hover:text-white transition-colors duration-200"
              >
                {t(link.key)}
              </Link>
            )
          )}
          <span className="hidden sm:block w-px h-4 bg-[#3D3935]" />
          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  )
}
