"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import {
  books,
  bookCategories,
  getVerdict,
  verdictLabels,
  verdictColors,
  type Verdict,
} from "@/data/books"

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.04 },
  }),
}

function VerdictPill({ verdict }: { verdict: Verdict }) {
  const colors = verdictColors[verdict]
  return (
    <span
      className="font-mono text-micro uppercase tracking-[0.08em] px-2 py-0.5 rounded-sm"
      style={{ color: colors.fg, backgroundColor: colors.bg }}
    >
      {verdictLabels[verdict]}
    </span>
  )
}

type VerdictFilter = "all" | Verdict

export default function BooksPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeVerdict, setActiveVerdict] = useState<VerdictFilter>("must-read")

  const verdictStats = useMemo(() => {
    const counts: Record<Verdict, number> = {
      "must-read": 0,
      "worth-it": 0,
      "skim": 0,
      "skip": 0,
    }
    for (const b of books) counts[getVerdict(b)]++
    return counts
  }, [])

  const filtered = useMemo(() => {
    return books
      .filter((b) => (activeCategory === "all" ? true : b.category === activeCategory))
      .filter((b) => (activeVerdict === "all" ? true : getVerdict(b) === activeVerdict))
      .sort((a, b) => {
        const va = getVerdict(a)
        const vb = getVerdict(b)
        const order: Record<Verdict, number> = {
          "must-read": 0,
          "worth-it": 1,
          "skim": 2,
          "skip": 3,
        }
        if (order[va] !== order[vb]) return order[va] - order[vb]
        if (a.rating !== b.rating) return b.rating - a.rating
        return parseInt(b.year) - parseInt(a.year)
      })
  }, [activeCategory, activeVerdict])

  const allFilters: { key: VerdictFilter; label: string; count: number }[] = [
    { key: "all", label: "All", count: books.length },
    { key: "must-read", label: verdictLabels["must-read"], count: verdictStats["must-read"] },
    { key: "worth-it", label: verdictLabels["worth-it"], count: verdictStats["worth-it"] },
    { key: "skim", label: verdictLabels["skim"], count: verdictStats["skim"] },
    { key: "skip", label: verdictLabels["skip"], count: verdictStats["skip"] },
  ]
  const verdictFilters = allFilters.filter((f) => f.count > 0 || f.key === "all")

  return (
    <main className="min-h-screen bg-[#080706]">
      <Navbar />
      <PageHeader
        label="Books"
        title={`${books.length} books.`}
        titleAccent="Most won't change your life. These might."
        description="What I read and what I actually kept. Verdicts are honest — if a book wasn't worth your time, I say so. Sorted by how much they shaped my thinking, not by when I read them."
      />

      {/* Filters */}
      <section className="px-6 lg:px-10 max-w-[1080px] mx-auto">
        {/* Verdict filter */}
        <div className="flex flex-wrap items-center gap-2 pb-4">
          {verdictFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveVerdict(f.key)}
              className={`font-mono text-caption uppercase px-3 py-1.5 rounded-md transition-all duration-200 ${
                activeVerdict === f.key
                  ? "bg-[#E8742A]/15 text-[#FB923C]"
                  : "text-[#57534E] hover:text-[#A8A29E]"
              }`}
            >
              {f.label} <span className="text-[#3D3935] ml-1">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-[#3D3935]">
          {bookCategories
            .filter((cat) => cat.key === "all" || books.some((b) => b.category === cat.key))
            .map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`font-mono text-caption uppercase px-3 py-1.5 rounded-md transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-[#A3B86C]/15 text-[#A3B86C]"
                    : "text-[#57534E] hover:text-[#A8A29E]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          <span className="font-mono text-caption text-[#3D3935] ml-auto">
            {filtered.length} {filtered.length === 1 ? "book" : "books"}
          </span>
        </div>
      </section>

      {/* Book grid */}
      <section className="px-6 lg:px-10 py-8 max-w-[1080px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeVerdict}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {filtered.map((book, i) => {
              const verdict = getVerdict(book)
              const isSkip = verdict === "skip"
              return (
                <motion.article
                  key={book.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className={`bg-[#0C0A09] border border-[#3D3935]/60 rounded-2xl p-5 group hover:border-[#57534E] transition-colors duration-200 ${
                    isSkip ? "opacity-70" : ""
                  }`}
                >
                  <div className="flex flex-col gap-2 min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-0.5">
                        <h3
                          className={`text-body font-semibold text-white ${
                            isSkip ? "line-through decoration-[#57534E]" : ""
                          }`}
                        >
                          {book.title}
                        </h3>
                        <span className="font-mono text-caption text-[#57534E]">
                          {book.author}
                        </span>
                      </div>
                      <VerdictPill verdict={verdict} />
                    </div>
                    <p className="text-body-sm text-[#78716C] leading-relaxed">
                      {book.takeaway ?? book.note}
                    </p>
                    {book.quote && (
                      <p className="text-body-sm italic text-[#A8A29E] leading-relaxed border-l-2 border-[#3D3935] pl-3 mt-1">
                        “{book.quote}”
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-micro text-[#3D3935]">
                        read {book.year}
                      </span>
                      <span
                        className="font-mono text-micro px-1.5 py-0.5 rounded-sm"
                        style={{
                          color:
                            book.category === "product"
                              ? "#E8742A"
                              : book.category === "design"
                                ? "#A3B86C"
                                : book.category === "business"
                                  ? "#D4A76A"
                                  : "#7CA5C4",
                          backgroundColor:
                            book.category === "product"
                              ? "rgba(232,116,42,0.15)"
                              : book.category === "design"
                                ? "rgba(163,184,108,0.15)"
                                : book.category === "business"
                                  ? "rgba(212,167,106,0.15)"
                                  : "rgba(124,165,196,0.15)",
                        }}
                      >
                        {book.category.toUpperCase()}
                      </span>
                      {book.appliedTo && (
                        <span className="font-mono text-micro text-[#A3B86C] ml-auto">
                          → {book.appliedTo}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-body-sm text-[#57534E] py-12">
            No books match this filter.
          </p>
        )}
      </section>

      <div className="pt-24" />
      <Footer />
    </main>
  )
}
