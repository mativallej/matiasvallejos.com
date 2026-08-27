"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { useTranslations } from "next-intl"

import { Product } from "@/data/products"

function Video({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true)
            io.disconnect()
            break
          }
        }
      },
      { rootMargin: "200px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={inView ? src : undefined}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
    />
  )
}

function ImageCarousel({ images, title, fit = "cover" }: { images: string[]; title: string; fit?: "cover" | "contain" }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (!emblaApi || images.length <= 1) return
    const interval = setInterval(() => emblaApi.scrollNext(), 4000)
    return () => clearInterval(interval)
  }, [emblaApi, images.length])

  return (
    <div
      ref={emblaRef}
      className="absolute inset-0 overflow-hidden bg-[#0C0A09]"
    >
      <div className="flex h-full">
        {images.map((src, index) => (
          <div key={src} className="relative min-w-0 shrink-0 grow-0 basis-full h-full">
            <Image
              src={src}
              alt={`${title} — ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={fit === "contain" ? "object-contain" : "object-cover"}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProjectCard({
  project,
  variant = "default",
}: {
  project: Product
  variant?: "default" | "tall" | "wide"
}) {
  const t = useTranslations("ProjectCard")
  const { title, subtitle, logo, emoji, logoBg, slug, description, tags, link, github, video, videoFit, imagesFit, image, images, caseStudy, date, metrics, instagram, tiktok, twitter, linkedin } = project

  // Tall variant (used by Tegu — vertical phone video) gets portrait aspect on mobile.
  // Other variants stay square on mobile for visual consistency.
  const aspectClass =
    variant === "tall"
      ? "aspect-[9/16] md:aspect-auto md:h-full"
      : variant === "wide"
        ? "aspect-square sm:aspect-[5/2]"
        : "aspect-square md:aspect-[3/2]"

  const caseStudyHref = caseStudy ?? `/projects/${slug}`

  return (
    <div className="bg-[#0C0A09] border border-[#3D3935]/60 rounded-2xl overflow-hidden transition-colors duration-200 h-full flex flex-col relative">
      {/* Media area — same on mobile and desktop */}
      <div className={`w-full ${aspectClass} p-2 pb-0 flex-1 min-h-0`}>
        <Link
          href={caseStudyHref}
          aria-label={`${title} case study`}
          className="relative flex flex-col w-full h-full rounded-lg overflow-hidden border border-[#3D3935]/60 hover:border-text-muted transition-colors duration-200"
        >
          {/* Media — fills the space above the title bar */}
          <div className="relative flex-1 min-h-0 overflow-hidden bg-[#0C0A09]">
            {video ? (
              <Video src={video} className={`absolute inset-0 h-full w-full ${videoFit === "contain" ? "object-contain" : "object-cover"}`} />
            ) : images && images.length > 0 ? (
              <ImageCarousel images={images} title={title} fit={imagesFit} />
            ) : image ? (
              <Image
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
                width={1280}
                height={720}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/10 via-surface to-[#0C0A09] flex items-center justify-center">
                <span className="font-sans text-display text-accent-text">{title}</span>
              </div>
            )}
          </div>

          {/* Title bar — flush below the media, never overlapping it */}
          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0 bg-[#0C0A09] border-t border-[#3D3935]/60 text-text-body">
            <span
              className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 overflow-hidden font-serif text-[15px] font-bold text-white"
              style={{ backgroundColor: logoBg ?? "#1C1917" }}
            >
              {logo ? (
                <Image src={logo} alt={`${title} logo`} width={36} height={36} className="w-full h-full object-cover" />
              ) : (
                emoji ?? title.charAt(0)
              )}
            </span>
            <div className="flex flex-col min-w-0">
              <h3 className="text-body font-semibold text-white leading-tight truncate">{title}</h3>
              {subtitle && (
                <span className="font-mono text-[11px] text-white/75 truncate">{subtitle}</span>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Explore button */}
      <div className="p-2 flex-shrink-0">
        <Link
          href={link}
          target="_blank"
          className="flex items-center justify-center gap-2 w-full font-mono text-caption uppercase py-2 rounded-md border border-[#3D3935]/60 text-text-muted hover:text-text-body hover:border-text-muted transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" x2="21" y1="14" y2="3" />
          </svg>
          {t("explore")}
        </Link>
      </div>
    </div>
  )
}
