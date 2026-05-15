"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import type { PressItem, PressType } from "@/data/press"

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.06 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

function formatMonthYear(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-AR" : "en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

type Filter = "all" | PressType

export function PressList({ items }: { items: PressItem[] }) {
  const t = useTranslations("PressPage")
  const locale = useLocale()
  const [active, setActive] = useState<Filter>("all")

  const typeLabel: Record<PressType, string> = {
    article: t("typeArticle"),
    radio: t("typeRadio"),
    video: t("typeVideo"),
    podcast: t("typePodcast"),
  }

  const types: PressType[] = Array.from(
    new Set(items.map((i) => i.type)),
  ) as PressType[]

  const filtered = active === "all" ? items : items.filter((i) => i.type === active)

  return (
    <>
      {/* Filters */}
      <section className="px-4 lg:px-8 max-w-[1080px] mx-auto">
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-[#3D3935]">
          <button
            type="button"
            onClick={() => setActive("all")}
            className={`font-mono text-caption uppercase px-3 py-1.5 rounded-md transition-all duration-200 ${
              active === "all"
                ? "bg-[#FB923C]/15 text-[#FB923C]"
                : "text-[#A8A29E] hover:text-[#A8A29E]"
            }`}
          >
            {t("filterAll")}
          </button>
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActive(type)}
              className={`font-mono text-caption uppercase px-3 py-1.5 rounded-md transition-all duration-200 ${
                active === type
                  ? "bg-[#FB923C]/15 text-[#FB923C]"
                  : "text-[#A8A29E] hover:text-[#A8A29E]"
              }`}
            >
              {typeLabel[type]}
            </button>
          ))}
          <span className="font-mono text-caption text-[#3D3935] ml-auto">
            {filtered.length} {filtered.length === 1 ? t("item") : t("items")}
          </span>
        </div>
      </section>

      {/* Press row list */}
      <section className="px-4 lg:px-8 py-4 max-w-[1080px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start md:items-center justify-between py-5 border-b border-[#3D3935] cursor-pointer gap-4"
                >
                  <div className="flex flex-col gap-2 min-w-0 flex-1">
                    <div className="flex items-start md:items-center gap-3 flex-col md:flex-row">
                      <span className="text-body font-semibold text-white group-hover:text-[#FB923C] transition-colors duration-200">
                        {item.title}
                      </span>
                    </div>
                    {item.quote && (
                      <p className="text-body-sm text-[#A8A29E] line-clamp-2 md:line-clamp-1">
                        “{item.quote}”
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 font-mono text-caption">
                      <span className="text-[#FB923C]">{typeLabel[item.type]}</span>
                      <span className="text-[#3D3935]">{"/"}</span>
                      <span className="text-[#A8A29E]">{item.outlet}</span>
                      {item.program && (
                        <>
                          <span className="text-[#3D3935]">{"/"}</span>
                          <span className="text-[#A8A29E]">{item.program}</span>
                        </>
                      )}
                      <span className="text-[#3D3935]">{"/"}</span>
                      <span className="text-[#A8A29E]">
                        {formatMonthYear(item.date, locale)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[#A8A29E] text-body group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0 mt-1 md:mt-0">
                    {"→"}
                  </span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  )
}
