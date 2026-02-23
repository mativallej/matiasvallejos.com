"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const navLinks = [
  { label: "about", href: "/about", scroll: false },
  { label: "products", href: "#products", scroll: true },
  { label: "writing", href: "#writing", scroll: true },
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
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
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
