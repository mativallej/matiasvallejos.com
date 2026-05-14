"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { books, bookCategories } from "@/data/books"

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.06 },
  }),
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={n <= rating ? "#FB923C" : "#3D3935"}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function BooksPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const sorted = [...books].sort((a, b) => (a.destacado === b.destacado ? 0 : a.destacado ? -1 : 1))

  const filtered =
    activeCategory === "all"
      ? sorted
      : sorted.filter((b) => b.category === activeCategory)

  return (
    <main className="min-h-screen bg-[#080706]">
      <Navbar />
      <PageHeader
        label="Books"
        title="What shaped my thinking."
        titleAccent="And still does."
        description="Books that changed how I build products, design interfaces, and think about work. Each one left a mark -- these are the ones I keep coming back to."
      />

      {/* Filters */}
      <section className="px-6 lg:px-10 max-w-[1080px] mx-auto">
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-[#3D3935]">
          {bookCategories.filter((cat) => cat.key === "all" || books.some((b) => b.category === cat.key)).map((cat) => (
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
            {filtered.length} {filtered.length === 1 ? "book" : "books"}
          </span>
        </div>
      </section>

      {/* Book grid */}
      <section className="px-6 lg:px-10 py-8 max-w-[1080px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {filtered.map((book, i) => (
              <motion.article
                key={book.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-[#0C0A09] border border-[#3D3935] rounded-lg p-5 group hover:border-[#57534E] transition-colors duration-200"
              >
                <div className="flex flex-col gap-2 min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-body font-semibold text-white">
                        {book.title}
                      </h3>
                      <span className="font-mono text-caption text-[#57534E]">
                        {book.author}
                      </span>
                    </div>
                    <RatingStars rating={book.rating} />
                  </div>
                  <p className="text-body-sm text-[#78716C] leading-relaxed">
                    {book.note}
                  </p>
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
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <div className="pt-24" />
      <Footer />
    </main>
  )
}
