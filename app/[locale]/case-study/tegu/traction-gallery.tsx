"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

type Item = { src: string; caption: string }

export function TractionGallery({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <figure key={it.caption} className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={it.caption}
              className="relative block aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#3D3935]/60 bg-[#0C0A09] cursor-zoom-in group"
            >
              <Image
                src={it.src}
                alt={it.caption}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:opacity-90 transition-opacity"
              />
            </button>
            <figcaption className="font-mono text-micro text-[#57534E]">{it.caption}</figcaption>
          </figure>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[#A8A29E] hover:text-white hover:bg-[#3D3935]/40 transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <figure className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={items[open].src}
              alt={items[open].caption}
              className="max-w-[92vw] max-h-[84vh] w-auto h-auto object-contain rounded-lg border border-[#3D3935]/60"
            />
            <figcaption className="font-mono text-caption text-[#A8A29E]">{items[open].caption}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
