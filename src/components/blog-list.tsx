"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { format, parseISO } from "date-fns"

type BlogPostMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readTime: string
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.06 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export function BlogList({
  posts,
  tags,
}: {
  posts: BlogPostMeta[]
  tags: string[]
}) {
  const [activeTag, setActiveTag] = useState("all")

  const filtered =
    activeTag === "all"
      ? posts
      : posts.filter((p) => p.tags.includes(activeTag))

  return (
    <>
      {/* Filters */}
      <section className="px-6 lg:px-10 max-w-[1080px] mx-auto">
        <div className="flex items-center gap-2 pb-8 border-b border-[#3D3935]">
          <button
            type="button"
            onClick={() => setActiveTag("all")}
            className={`font-mono text-caption uppercase px-3 py-1.5 rounded-md transition-all duration-200 ${
              activeTag === "all"
                ? "bg-[#E8742A]/15 text-[#FB923C]"
                : "text-[#57534E] hover:text-[#A8A29E]"
            }`}
          >
            all
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`font-mono text-caption uppercase px-3 py-1.5 rounded-md transition-all duration-200 ${
                activeTag === tag
                  ? "bg-[#E8742A]/15 text-[#FB923C]"
                  : "text-[#57534E] hover:text-[#A8A29E]"
              }`}
            >
              {tag}
            </button>
          ))}
          <span className="font-mono text-caption text-[#3D3935] ml-auto">
            {filtered.length} {filtered.length === 1 ? "post" : "posts"}
          </span>
        </div>
      </section>

      {/* Post list */}
      <section className="px-6 lg:px-10 py-4 max-w-[1080px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col"
          >
            {filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={`/${post.slug}`}
                  className="group flex items-start md:items-center justify-between py-5 border-b border-[#3D3935] cursor-pointer gap-4"
                >
                  <div className="flex flex-col gap-2 min-w-0 flex-1">
                    <div className="flex items-start md:items-center gap-3 flex-col md:flex-row">
                      <span className="text-body font-semibold text-white group-hover:text-[#FB923C] transition-colors duration-200">
                        {post.title}
                      </span>
                    </div>
                    <p className="text-body-sm text-[#57534E] line-clamp-2 md:line-clamp-1">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-3 font-mono text-caption">
                      <span className="text-[#57534E]">
                        {format(parseISO(post.date), "MMM yyyy")}
                      </span>
                      <span className="text-[#3D3935]">{"/"}</span>
                      <span className="text-[#57534E]">{post.readTime}</span>
                      <span className="text-[#3D3935]">{"/"}</span>
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[#FB923C]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[#57534E] text-body group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0 mt-1 md:mt-0">
                    {"->"}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  )
}
