"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { articles, articleCategories } from "@/data/articles"

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.06 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export default function WritingPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const sorted = [...articles].sort((a, b) => (a.destacado === b.destacado ? 0 : a.destacado ? -1 : 1))

  const filtered =
    activeCategory === "all"
      ? sorted
      : sorted.filter((a) => a.category === activeCategory)

  return (
    <main className="min-h-screen bg-[#080706]">
      <Navbar />
      <PageHeader
        label="Writing"
        title="Thinking out loud."
        titleAccent="In public."
        description="Essays on product building, design craft, and life as an independent maker in Argentina. No filler, no thought leadership -- just honest reflections from the work."
      />

      {/* Filters */}
      <section className="px-6 lg:px-10 max-w-[1080px] mx-auto">
        <div className="flex items-center gap-2 pb-8 border-b border-[#3D3935]">
          {articleCategories.filter((cat) => cat.key === "all" || articles.some((a) => a.category === cat.key)).map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`font-mono text-caption uppercase px-3 py-1.5 rounded-md transition-all duration-200 ${
                activeCategory === cat.key
                  ? "bg-[#E8742A]/15 text-[#FB923C]"
                  : "text-[#57534E] hover:text-[#A8A29E]"
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="font-mono text-caption text-[#3D3935] ml-auto">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          </span>
        </div>
      </section>

      {/* Article list */}
      <section className="px-6 lg:px-10 py-4 max-w-[1080px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col"
          >
            {filtered.map((article, i) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="group flex items-start md:items-center justify-between py-5 border-b border-[#3D3935] cursor-pointer gap-4"
              >
                <div className="flex flex-col gap-2 min-w-0 flex-1">
                  <div className="flex items-start md:items-center gap-3 flex-col md:flex-row">
                    <span className="text-body font-semibold text-white group-hover:text-[#FB923C] transition-colors duration-200">
                      {article.title}
                    </span>
                  </div>
                  <p className="text-body-sm text-[#57534E] line-clamp-2 md:line-clamp-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 font-mono text-caption">
                    <span className="text-[#57534E]">{article.date}</span>
                    <span className="text-[#3D3935]">{"/"}</span>
                    <span className="text-[#57534E]">{article.readTime}</span>
                    <span className="text-[#3D3935]">{"/"}</span>
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-[#FB923C]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-[#57534E] text-body group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0 mt-1 md:mt-0">
                  {"->"}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <div className="pt-24" />
      <Footer />
    </main>
  )
}
