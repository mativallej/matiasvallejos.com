"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

function RepoCard({ repo, t, index }: { repo: typeof repos[number]; t: ReturnType<typeof useTranslations>; index: number }) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group flex flex-col gap-3 p-4 rounded-2xl border border-[#3D3935]/60 bg-[#0C0A09] hover:border-[#57534E] transition-colors duration-200 h-full"
    >
      {/* Top row: name + status badges */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <span className="font-mono text-body-sm font-semibold text-white group-hover:text-[#FB923C] transition-colors duration-200 inline-flex items-center gap-1.5">
            {repo.name}
            <span className="text-[#57534E] group-hover:translate-x-0.5 transition-transform duration-200 inline-flex">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
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
        <span className="flex items-center gap-3 flex-shrink-0 text-[#78716C]">
          <span className="flex items-center gap-1 font-mono text-caption text-[#FB923C]">
            <StarIcon />
            {repo.stars}
          </span>
          {repo.forks > 0 && (
            <span className="flex items-center gap-1 font-mono text-caption">
              <ForkIcon />
              {repo.forks}
            </span>
          )}
        </span>
      </div>

      {/* Description with optional emoji */}
      <p className="text-body-sm text-[#A8A29E] leading-relaxed flex items-start gap-2">
        {repo.emoji && <span className="flex-shrink-0">{repo.emoji}</span>}
        <span>{repo.description}</span>
      </p>

      {/* Tech tags */}
      {repo.tags && repo.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {repo.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-micro px-2 py-0.5 rounded-sm border border-[#3D3935]/70 text-[#78716C] bg-[#12100E]"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-1.5 font-mono text-micro text-[#78716C]">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: languageColor[repo.language] ?? "#57534E" }}
            />
            {repo.language}
          </span>
        </div>
      )}
    </motion.a>
  )
}

export function OpenSource() {
  const t = useTranslations("OpenSource")
  const [expanded, setExpanded] = useState(false)

  const shown = repos.filter((r) => r.featured)
  const extra = repos.filter((r) => !r.featured)
  const hasMore = extra.length > 0

  return (
    <section id="open-source" className="px-4 lg:px-8 py-20 max-w-[1080px] mx-auto">
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
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-caption text-[#A8A29E] border border-[#3D3935]/60 rounded-full px-3 py-1 hover:text-white hover:border-[#57534E] transition-colors duration-200"
          >
            github
            <span className="text-[#57534E] inline-flex">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </a>
        </div>
      </motion.div>

      <div className="grid gap-3 md:grid-cols-2">
        {shown.map((repo, i) => (
          <RepoCard key={repo.name} repo={repo} t={t} index={i} />
        ))}

        <AnimatePresence>
          {expanded && extra.map((repo, i) => (
            <motion.div
              key={`extra-${repo.name}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut", delay: i * 0.04 }}
              className="overflow-hidden"
            >
              <RepoCard repo={repo} t={t} index={shown.length + i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="flex justify-start mt-6">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center justify-center gap-1.5 font-mono text-caption text-[#A8A29E] border border-[#3D3935]/60 rounded-full px-3 py-1.5 hover:text-white hover:border-[#57534E] transition-colors duration-200"
          >
            {expanded ? t("viewLess") : t("viewMore", { count: extra.length })}
            <span className="text-[#57534E]">{expanded ? "↑" : "↓"}</span>
          </button>
        </div>
      )}
    </section>
  )
}
