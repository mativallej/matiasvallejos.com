"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

type FeaturedPost = {
  slug: string
  title: string
  date: string
  tags: string[]
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: i * 0.08,
    },
  }),
}

export function Writing({ posts }: { posts: FeaturedPost[] }) {
  const t = useTranslations("Writing")
  return (
    <section id="writing" className="px-6 lg:px-10 py-20 max-w-[1080px] mx-auto">
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
          <Link href="/blog" className="font-mono text-caption text-[#57534E] hover:text-[#FB923C] transition-colors duration-200">
            {t("viewAll")}
          </Link>
        </div>
      </motion.div>

      <div className="flex flex-col">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            custom={i}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <Link
              href={`/${post.slug}`}
              className="group flex items-center justify-between py-4 border-b border-[#3D3935] cursor-pointer gap-4"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-body font-semibold text-white group-hover:text-[#FB923C] transition-colors duration-200 truncate">
                  {post.title}
                </span>
                <div className="flex flex-wrap items-center gap-3 font-mono text-caption">
                  <span className="text-[#57534E]">{post.date}</span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[#FB923C]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-[#57534E] text-body group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0 ml-4">
                {"→"}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
