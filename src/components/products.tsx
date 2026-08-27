"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import ProjectCard from "@/components/project-card"
import { products, moreProjects } from "@/data/products"

const featuredProducts = products.slice(0, 3)

// Spine colors for the stacked "also shipped" list — evokes book spines.
const SPINE_COLORS = ["#A3B86C", "#E8742A", "#7CA5C4", "#D4A76A"]

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

export function Products() {
  const t = useTranslations("Products")
  return (
    <section id="products" className="px-4 lg:px-8 py-20 max-w-[1080px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-caption text-[#A8A29E] uppercase">
            {t("title")}
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-caption text-[#A8A29E] border border-[#3D3935]/60 rounded-full px-3 py-1 hover:text-white hover:border-[#57534E] transition-colors duration-200"
          >
            {t("viewAll")}
          </Link>
        </div>
      </motion.div>

      {/* Bento grid: tall left + 2 stacked right */}
      <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2">
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="md:row-span-2"
        >
          <ProjectCard project={featuredProducts[0]} variant="tall" />
        </motion.div>

        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <ProjectCard project={featuredProducts[1]} />
        </motion.div>

        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <ProjectCard project={featuredProducts[2]} />
        </motion.div>
      </div>

      {/* Also shipped — compact, title-only, stacked like book spines */}
      {moreProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <h3 className="font-mono text-caption text-[#57534E] uppercase mb-3">
            {t("also")}
          </h3>
          <div className="flex flex-col">
            {moreProjects.map((p, i) => (
              <a
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative z-0 flex items-center gap-3 px-4 py-3 bg-[#0C0A09] border border-[#3D3935]/60 -mt-px first:mt-0 first:rounded-t-xl last:rounded-b-xl hover:z-10 hover:border-[#57534E] hover:bg-[#12100E] transition-colors"
              >
                <span
                  className="h-6 w-1.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: SPINE_COLORS[i % SPINE_COLORS.length] }}
                />
                <span className="text-body font-semibold text-white truncate">{p.title}</span>
                {p.subtitle && (
                  <span className="hidden sm:block font-mono text-[11px] text-[#57534E] truncate">
                    {p.subtitle}
                  </span>
                )}
                <svg
                  className="ml-auto flex-shrink-0 text-[#57534E] group-hover:text-white transition-colors"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}
