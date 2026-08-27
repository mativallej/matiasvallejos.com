"use client"

import { useState } from "react"
import { press, type PressItem } from "@/data/press"

function formatDate(iso: string, locale: string) {
  const d = new Date(iso)
  return new Intl.DateTimeFormat(locale === "es" ? "es-AR" : "en-US", {
    month: "short",
    year: "numeric",
  }).format(d)
}

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/)
  return m ? m[1] : null
}

function VideoPlayer({ item }: { item: PressItem }) {
  const videoId = getYouTubeId(item.url)
  const [playing, setPlaying] = useState(false)
  if (!videoId) return null
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video rounded-xl overflow-hidden border border-[#3D3935] bg-[#0C0A09]">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${item.title}`}
            className="group absolute inset-0 w-full h-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-200">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/95 text-[#080706] shadow-lg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-mono text-micro text-[#A8A29E] uppercase tracking-[0.08em]">
          Video · {item.outlet}
        </span>
        <h3 className="text-body font-semibold text-white leading-snug">{item.title}</h3>
      </div>
    </div>
  )
}

const TYPE_LABELS: Record<string, Record<PressItem["type"], string>> = {
  en: { article: "Article", radio: "Radio", video: "Video", podcast: "Podcast" },
  es: { article: "Artículo", radio: "Radio", video: "Video", podcast: "Podcast" },
}

function PressRow({ item, locale }: { item: PressItem; locale: string }) {
  const labels = TYPE_LABELS[locale] ?? TYPE_LABELS.en
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between py-4 border-b border-[#3D3935] cursor-pointer gap-4"
    >
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span className="font-mono text-micro text-[#A8A29E] uppercase tracking-[0.08em]">
          {labels[item.type]}
        </span>
        <span className="text-body font-semibold text-white group-hover:text-[#FB923C] transition-colors duration-200 line-clamp-2">
          {item.title}
        </span>
        <div className="flex flex-wrap items-center gap-3 font-mono text-caption">
          <span className="text-[#A8A29E]">{item.outlet}</span>
          {item.program && <span className="text-[#A8A29E]">· {item.program}</span>}
          <span className="text-[#A8A29E]">{formatDate(item.date, locale)}</span>
        </div>
      </div>
      <span className="text-[#A8A29E] group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0 ml-4 inline-flex">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </span>
    </a>
  )
}

/**
 * Case-study press: same design as the homepage (playable video + list), but
 * scoped to Tegu and WITHOUT the "see all press" link to matiasvallejos.com/press
 * — this is a case study, not a section of the personal site. Shows all mentions.
 */
export function CasePress({ locale, heading }: { locale: string; heading: string }) {
  const visible = press.filter((p) => !p.logoOnly && p.product === "Tegu")
  const featuredVideo = visible.find((p) => p.type === "video")
  const articles = visible.filter((p) => p.id !== featuredVideo?.id)

  return (
    <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full py-14 border-t border-[#3D3935]/40">
      <h2 className="font-mono text-caption uppercase tracking-[0.08em] text-[#A8A29E] mb-6">{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
        {featuredVideo && <VideoPlayer item={featuredVideo} />}
        <div className="flex flex-col">
          {articles.map((item) => (
            <PressRow key={item.id} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
