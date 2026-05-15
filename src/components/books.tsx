"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { books } from "@/data/books"

const featuredBooks = books.filter((b) => b.destacado)

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: i * 0.08,
    },
  }),
}

export function Books() {
  return (
    <section id="books" className="px-4 lg:px-8 py-20 max-w-[1080px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-caption text-[#A8A29E] uppercase">
            Books
          </h2>
          <Link href="/books" className="font-mono text-caption text-[#A8A29E] hover:text-[#FB923C] transition-colors duration-200">
            view all →
          </Link>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {featuredBooks.map((book, i) => (
          <motion.article
            key={book.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-[#0C0A09] border border-[#3D3935] rounded-lg p-4"
          >
            <div className="flex flex-col gap-1.5 min-w-0">
              <h3 className="text-body font-semibold text-white">{book.title}</h3>
              <span className="font-mono text-caption text-[#A8A29E]">
                {book.author}
              </span>
              <p className="text-body-sm text-[#A8A29E]">{book.note}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
