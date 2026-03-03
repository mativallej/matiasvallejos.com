"use client"

import Link from "next/link"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"

import { Product } from "@/data/products"

function Video({ src, className }: { src: string; className?: string }) {
  return (
    <video
      src={src}
      className={className}
      autoPlay
      loop
      muted
      playsInline
    />
  )
}

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (!emblaApi || images.length <= 1) return
    const interval = setInterval(() => emblaApi.scrollNext(), 4000)
    return () => clearInterval(interval)
  }, [emblaApi, images.length])

  return (
    <div ref={emblaRef} className="overflow-hidden w-full h-full">
      <div className="flex h-full">
        {images.map((src, index) => (
          <div key={src} className="min-w-0 shrink-0 grow-0 basis-full h-full">
            <Image
              src={src}
              alt={`${title} — ${index + 1}`}
              className="w-full h-full object-cover"
              width={1280}
              height={720}
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
  const { title, slug, description, tags, link, github, video, image, images, caseStudy, date, metrics, instagram, tiktok, twitter, linkedin } = project

  const [isHovered, setIsHovered] = useState(false)

  const aspectClass =
    variant === "tall"
      ? "aspect-[3/2] md:aspect-auto md:h-full"
      : variant === "wide"
        ? "aspect-[5/2] sm:aspect-[5/2]"
        : "aspect-[3/2]"

  return (
    <div className="bg-[#0C0A09] border border-neutral-400 rounded-lg overflow-hidden hover:border-text-muted transition-colors duration-200 h-full flex flex-col">
      {/* Media area — desktop only */}
      <div className={`hidden md:block w-full ${aspectClass} p-2 pb-0 flex-1 min-h-0`}>
        <div className="relative w-full h-full rounded-md overflow-hidden">
          {/* Hover zone — only the media + overlays */}
          <div
            className="w-full h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href={link} target="_blank" aria-label={title}>
              {video ? (
                <Video src={video} className="w-full h-full object-contain bg-[#0C0A09]" />
              ) : images && images.length > 0 ? (
                <ImageCarousel images={images} title={title} />
              ) : image ? (
                <Image
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  width={1280}
                  height={720}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-brand-orange/10 via-surface to-[#0C0A09] flex items-center justify-center">
                  <span className="font-sans text-display text-accent-text">{title}</span>
                </div>
              )}
            </Link>

            {/* Title overlay — desktop only */}
            <div className={`hidden md:block absolute bottom-0 left-0 w-full px-4 py-3 pointer-events-none bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-200 ${isHovered ? "opacity-0" : ""}`}>
              <h3 className="text-body font-semibold text-white">{title}</h3>
            </div>

            {/* Hover overlay — desktop only */}
            <div className={`hidden md:flex absolute inset-0 bg-[#0C0A09]/90 rounded-md flex-col justify-start p-4 gap-3 transition-opacity duration-200 ${isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
              <h3 className="text-body font-semibold text-white">{title}</h3>
              <p className="text-body-sm text-text-body leading-relaxed line-clamp-3">{description}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-micro px-2 py-0.5 rounded-sm text-text-body bg-text-body/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="font-mono text-micro text-text-muted">{date}</span>
              {caseStudy ? (
                <Link
                  href={caseStudy}
                  className="inline-flex items-center gap-2 font-mono text-caption uppercase text-[#FB923C] hover:text-white transition-colors duration-200"
                >
                  Case of study
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 font-mono text-caption uppercase text-text-muted/40 cursor-not-allowed">
                  Case of study
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              )}
              {(github || instagram || tiktok || twitter || linkedin) && (
                <div className="flex items-center gap-2 mt-1">
                  {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#57534E] hover:text-white transition-colors duration-200">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  )}
                  {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#57534E] hover:text-white transition-colors duration-200">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  )}
                  {instagram && (
                    <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#57534E] hover:text-white transition-colors duration-200">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  )}
                  {tiktok && (
                    <a href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-[#57534E] hover:text-white transition-colors duration-200">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.78a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.21z"/></svg>
                    </a>
                  )}
                  {twitter && (
                    <a href={twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-[#57534E] hover:text-white transition-colors duration-200">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  )}
                </div>
              )}
              {metrics && metrics.length > 0 && (
                <div className="mt-auto -mx-4 -mb-4 border-t border-white/10">
                  <div className="grid" style={{ gridTemplateColumns: `repeat(${metrics.length}, 1fr)` }}>
                    {metrics.map((m, i) => (
                      <div key={m.label} className={`flex flex-col items-center py-2 ${i > 0 ? "border-l border-white/10" : ""}`}>
                        <span className="font-mono text-caption font-semibold text-[#FB923C]">{m.value}</span>
                        <span className="font-mono text-micro text-white/40">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile info — visible only on small screens */}
      <div className="md:hidden px-4 pt-4 pb-3 flex flex-col gap-3">
        <h3 className="text-body font-semibold text-white">{title}</h3>
        <p className="text-body-sm text-text-body leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-micro px-2 py-0.5 rounded-sm text-text-body bg-text-body/10"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-micro text-text-muted">{date}</span>
          {(github || instagram || tiktok || twitter || linkedin) && (
            <div className="flex items-center gap-2">
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#57534E] hover:text-white transition-colors duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#57534E] hover:text-white transition-colors duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#57534E] hover:text-white transition-colors duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {tiktok && (
                <a href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-[#57534E] hover:text-white transition-colors duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.78a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.21z"/></svg>
                </a>
              )}
              {twitter && (
                <a href={twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-[#57534E] hover:text-white transition-colors duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Metrics — mobile */}
      {metrics && metrics.length > 0 && (
        <div className="md:hidden border-t border-white/10 mx-4">
          <div className="grid py-3" style={{ gridTemplateColumns: `repeat(${metrics.length}, 1fr)` }}>
            {metrics.map((m, i) => (
              <div key={m.label} className={`flex flex-col items-center ${i > 0 ? "border-l border-white/10" : ""}`}>
                <span className="font-mono text-caption font-semibold text-[#FB923C]">{m.value}</span>
                <span className="font-mono text-micro text-white/40">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Button */}
      <div className="p-2 flex-shrink-0">
        <Link
          href={link}
          target="_blank"
          className="flex items-center justify-center gap-2 w-full font-mono text-caption uppercase py-2 rounded-md border border-neutral-400 text-text-muted hover:text-text-body hover:border-text-muted transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" x2="21" y1="14" y2="3" />
          </svg>
          Explore
        </Link>
      </div>
    </div>
  )
}
