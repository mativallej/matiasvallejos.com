"use client"

import Link from "next/link"
import Image from "next/image"

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

export default function ProjectCard({
  project,
  variant = "default",
}: {
  project: Product
  variant?: "default" | "tall" | "wide"
}) {
  const { title, description, tags, link, github, video, image, date } = project

  const aspectClass =
    variant === "tall"
      ? "aspect-auto h-full"
      : variant === "wide"
        ? "aspect-[5/2]"
        : "aspect-[3/2]"

  return (
    <div className="bg-[#0C0A09] border border-neutral-400 rounded-lg overflow-hidden hover:border-text-muted transition-colors duration-200 h-full flex flex-col">
      {/* Media area */}
      <div className={`w-full ${aspectClass} p-2 pb-0 flex-1 min-h-0`}>
        <div className="group relative w-full h-full rounded-md overflow-hidden">
          <Link href={link} target="_blank" aria-label={title}>
            {video ? (
              <Video src={video} className="w-full h-full object-cover" />
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

          {/* Title overlay (always visible) */}
          <div className="absolute bottom-0 left-0 w-full px-4 py-3 pointer-events-none bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-0 transition-opacity duration-200">
            <h3 className="text-body font-semibold text-white">{title}</h3>
          </div>

          {/* Hover overlay — covers only the image */}
          <div className="absolute inset-0 bg-[#0C0A09]/90 rounded-md flex flex-col justify-start p-4 gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
            <span className="font-mono text-micro text-text-muted">{date}</span>
          </div>
        </div>
      </div>

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
