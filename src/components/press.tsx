"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { press, type PressItem } from "@/data/press"

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.08 },
  }),
}

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
        <span className="font-mono text-micro text-[#A3B86C] uppercase tracking-[0.08em]">
          Video · {item.outlet}
        </span>
        <h3 className="text-body font-semibold text-white leading-snug">
          {item.title}
        </h3>
      </div>
    </div>
  )
}

function PressRow({ item, locale, index }: { item: PressItem; locale: string; index: number }) {
  const typeLabel: Record<PressItem["type"], string> = {
    article: "Article",
    radio: "Radio",
    video: "Video",
    podcast: "Podcast",
  }
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      custom={index}
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group flex items-center justify-between py-4 border-b border-[#3D3935] cursor-pointer gap-4"
    >
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span className="font-mono text-micro text-[#57534E] uppercase tracking-[0.08em]">
          {typeLabel[item.type]}
        </span>
        <span className="text-body font-semibold text-white group-hover:text-[#FB923C] transition-colors duration-200 line-clamp-2">
          {item.title}
        </span>
        <div className="flex flex-wrap items-center gap-3 font-mono text-caption">
          <span className="text-[#A8A29E]">{item.outlet}</span>
          {item.program && <span className="text-[#57534E]">· {item.program}</span>}
          <span className="text-[#57534E]">{formatDate(item.date, locale)}</span>
          {item.product && <span className="text-[#FB923C]">{item.product}</span>}
        </div>
      </div>
      <span className="text-[#57534E] text-body group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0 ml-4">
        {"↗"}
      </span>
    </motion.a>
  )
}

export function Press({ locale }: { locale: string }) {
  const t = useTranslations("Press")

  const visible = press.filter((p) => !p.logoOnly)
  const featuredVideo = visible.find((p) => p.type === "video")
  const articles = visible.filter((p) => p.id !== featuredVideo?.id)

  return (
    <section id="press" className="px-6 lg:px-10 py-20 max-w-[1080px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-caption text-[#57534E] uppercase">
            {t("title")}
          </h2>
          <span className="inline-flex items-center gap-1.5 font-mono text-caption text-[#A8A29E] border border-[#3D3935]/60 rounded-full px-3 py-1">
            {press.length} {press.length === 1 ? t("feature") : t("features")}
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
        {/* Left: playable video */}
        {featuredVideo && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <VideoPlayer item={featuredVideo} />
          </motion.div>
        )}

        {/* Right: press list */}
        <div className="flex flex-col">
          {articles.map((item, i) => (
            <PressRow key={item.id} item={item} locale={locale} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
