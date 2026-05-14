"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { repos, githubUrl } from "@/data/opensource"

const languageColor: Record<string, string> = {
  TypeScript: "#7CA5C4",
  Python: "#D4A76A",
  "C#": "#A3B86C",
  Markdown: "#A8A29E",
  JavaScript: "#F0DB4F",
}

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.06 },
  }),
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function ForkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  )
}

export function OpenSource() {
  const t = useTranslations("OpenSource")
  const totalStars = repos.reduce((sum, r) => sum + r.stars, 0)

  return (
    <section id="open-source" className="px-6 lg:px-10 py-20 max-w-[1080px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-baseline gap-3">
            <h2 className="font-mono text-caption text-[#57534E] uppercase">
              {t("title")}
            </h2>
            <span className="font-mono text-caption text-[#FB923C]">
              {totalStars}★
            </span>
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-caption text-[#57534E] hover:text-[#FB923C] transition-colors duration-200"
          >
            {t("viewAll")}
          </a>
        </div>
      </motion.div>

      <div className="grid gap-3 md:grid-cols-2">
        {repos.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="group flex flex-col gap-3 p-5 rounded-lg border border-[#3D3935] bg-[#0C0A09] hover:border-[#57534E] transition-colors duration-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-body-sm font-semibold text-white group-hover:text-[#FB923C] transition-colors duration-200">
                    {repo.name}
                  </span>
                  {repo.featured && (
                    <span className="font-mono text-micro text-[#FB923C] uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-sm bg-[#FB923C]/15">
                      {t("featured")}
                    </span>
                  )}
                  {repo.archived && (
                    <span className="font-mono text-micro text-[#78716C] uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-sm bg-[#3D3935]/50">
                      {t("archived")}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[#57534E] text-body group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0">
                {"↗"}
              </span>
            </div>
            <p className="text-body-sm text-[#A8A29E] leading-relaxed flex-1">
              {repo.description}
            </p>
            <div className="flex items-center gap-4 font-mono text-caption text-[#78716C] pt-2 border-t border-[#3D3935]/50">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: languageColor[repo.language] ?? "#57534E" }}
                />
                {repo.language}
              </span>
              <span className="flex items-center gap-1 text-[#FB923C]">
                <StarIcon />
                {repo.stars}
              </span>
              {repo.forks > 0 && (
                <span className="flex items-center gap-1">
                  <ForkIcon />
                  {repo.forks}
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
