"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { LocaleSwitcher } from "@/components/locale-switcher"

const navLinks = [
  { key: "about", href: "/about", scroll: false },
  { key: "products", href: "/projects", scroll: false },
  { key: "blog", href: "/blog", scroll: false },
  { key: "books", href: "/books", scroll: false },
] as const

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("Navbar")
  const [scrolled, setScrolled] = useState(false)

  // Inner pages always show the border. Home only shows it after scroll.
  const isInnerPage = pathname !== "/" && pathname !== ""
  const showBorder = isInnerPage || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
      className={`sticky top-0 z-50 backdrop-blur-[6px] transition-colors duration-200 ${showBorder ? "border-b border-[#3D3935]/60" : "border-b border-transparent"}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between h-12 px-6 lg:px-10 max-w-[1080px] mx-auto">
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
          className="hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Image
            src="/images/emoji.png"
            alt="Matias Vallejos"
            width={32}
            height={32}
            className="rounded-full"
          />
        </a>

        <div className="flex items-center gap-4 sm:gap-5">
          {navLinks.map((link) =>
            link.scroll ? (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleScrollLink(e, link.href)}
                className="font-mono text-[13px] lowercase leading-none text-[#78716C] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {t(link.key)}
              </a>
            ) : (
              <Link
                key={link.key}
                href={link.href}
                className="font-mono text-[13px] lowercase leading-none text-[#78716C] hover:text-white transition-colors duration-200"
              >
                {t(link.key)}
              </Link>
            )
          )}
          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  )
}
