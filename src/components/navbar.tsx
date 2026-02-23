"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

const navLinks = [
  { label: "about", href: "/about", scroll: false },
  { label: "products", href: "#products", scroll: true },
  { label: "blog", href: "/blog", scroll: false },
  { label: "books", href: "#books", scroll: true },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

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
      {/* Left: X/Twitter icon + home link */}
      <div className="flex items-center gap-6">
        <Link
          href="/"
          aria-label="Home"
          className="text-[#78716C] hover:text-white transition-colors duration-200"
        >
          <Image
            src="/images/emoji.png"
            alt="Matias Vallejos"
            width={24}
            height={24}
            className="rounded-full"
          />
        </Link>

        {/* Tagline */}
        <span className="hidden sm:block font-mono text-body-sm italic text-[#FB923C]">
          building products that matter
        </span>
      </div>

      {/* Right: nav links */}
      <div className="flex items-center gap-6">
        {navLinks.map((link) =>
          link.scroll ? (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollLink(e, link.href)}
              className="font-mono text-caption uppercase text-[#78716C] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className="font-mono text-caption uppercase text-[#78716C] hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          )
        )}
      </div>
      </div>
    </nav>
  )
}
