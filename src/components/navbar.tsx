"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
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
  const [menuOpen, setMenuOpen] = useState(false)

  // Inner pages always show the border. Home only shows it after scroll.
  const isInnerPage = pathname !== "/" && pathname !== ""
  const showBorder = isInnerPage || scrolled || menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!menuOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = original }
  }, [menuOpen])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Close on Esc
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  const handleScrollLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    if (pathname === "/") {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/" + href)
    }
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`sticky top-0 z-50 backdrop-blur-[6px] transition-colors duration-200 ${showBorder ? "border-b border-[#3D3935]/60" : "border-b border-transparent"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-12 px-4 lg:px-8 max-w-[1080px] mx-auto">
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
              src="/images/emoji.webp"
              alt="Matias Vallejos"
              width={32}
              height={32}
              className="rounded-full"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) =>
              link.scroll ? (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleScrollLink(e, link.href)}
                  className="font-mono text-[13px] lowercase leading-none text-[#A8A29E] hover:text-white transition-colors duration-200 cursor-pointer py-2"
                >
                  {t(link.key)}
                </a>
              ) : (
                <Link
                  key={link.key}
                  href={link.href}
                  className="font-mono text-[13px] lowercase leading-none text-[#A8A29E] hover:text-white transition-colors duration-200 py-2"
                >
                  {t(link.key)}
                </Link>
              )
            )}
            <LocaleSwitcher />
          </div>

          {/* Mobile menu trigger — text-only, on-brand */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden font-mono text-[13px] lowercase leading-none text-[#A8A29E] hover:text-white transition-colors duration-200 cursor-pointer py-2"
          >
            {menuOpen ? "close" : "menu"}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay — minimalist, design-system-aligned */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="md:hidden fixed inset-0 top-12 z-40 bg-[#080706]/95 backdrop-blur-md flex flex-col"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.04 }}
              className="flex flex-col px-4 pt-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Section label — same pattern as section headers across the site */}
              <span className="font-mono text-caption text-[#A8A29E] uppercase tracking-[0.08em] mb-4">
                Navigate
              </span>

              {/* Nav list — consistent with desktop nav typography (mono lowercase) */}
              <div className="flex flex-col">
                {navLinks.map((link) => {
                  const active = pathname === link.href
                  return link.scroll ? (
                    <a
                      key={link.key}
                      href={link.href}
                      onClick={(e) => handleScrollLink(e, link.href)}
                      className="group flex items-center justify-between py-4 border-b border-[#3D3935]/60 cursor-pointer"
                    >
                      <span
                        className={`font-mono text-[16px] lowercase leading-none transition-colors duration-200 ${active ? "text-[#FB923C]" : "text-[#A8A29E] group-hover:text-white"}`}
                      >
                        {t(link.key)}
                      </span>
                      <span
                        className={`text-body transition-all duration-200 ${active ? "text-[#FB923C]" : "text-[#3D3935] group-hover:text-[#A8A29E] group-hover:translate-x-0.5"}`}
                      >
                        →
                      </span>
                    </a>
                  ) : (
                    <Link
                      key={link.key}
                      href={link.href}
                      className="group flex items-center justify-between py-4 border-b border-[#3D3935]/60"
                    >
                      <span
                        className={`font-mono text-[16px] lowercase leading-none transition-colors duration-200 ${active ? "text-[#FB923C]" : "text-[#A8A29E] group-hover:text-white"}`}
                      >
                        {t(link.key)}
                      </span>
                      <span
                        className={`text-body transition-all duration-200 ${active ? "text-[#FB923C]" : "text-[#3D3935] group-hover:text-[#A8A29E] group-hover:translate-x-0.5"}`}
                      >
                        →
                      </span>
                    </Link>
                  )
                })}
              </div>

              {/* Language switcher — also follows the section pattern */}
              <span className="font-mono text-caption text-[#A8A29E] uppercase tracking-[0.08em] mt-8 mb-4">
                Language
              </span>
              <div className="py-2">
                <LocaleSwitcher />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
