"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import ProjectCard from "@/components/project-card"
import { products } from "@/data/products"

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

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

const PILLAR_KEYS = ["lean", "ship", "iterate"] as const
const PILLAR_COLORS: Record<(typeof PILLAR_KEYS)[number], string> = {
  lean: "#A3B86C",
  ship: "#FB923C",
  iterate: "#7CA5C4",
}

export default function ProjectsPage() {
  const t = useTranslations("ProjectsPage")
  return (
    <main className="min-h-screen bg-[#080706]">
      <Navbar />
      <PageHeader
        label={t("label")}
        title={t("title")}
        titleAccent={t("titleAccent")}
        description={t("description")}
      />

      <section className="px-6 lg:px-10 py-8 max-w-[1080px] mx-auto">
        {/* Bento grid: tall left + 2 stacked right (1 col on mobile) */}
        <div className="grid gap-3 md:grid-cols-2 md:grid-rows-2">
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="md:row-span-2"
          >
            <ProjectCard project={products[0]} variant="tall" />
          </motion.div>

          {products.slice(1).map((product, i) => (
            <motion.div
              key={product.id}
              custom={i + 1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <ProjectCard project={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy callout */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="px-6 lg:px-10 py-16 max-w-[1080px] mx-auto"
      >
        <div className="rounded-2xl border border-[#3D3935]/60 bg-[#0C0A09] p-6 md:p-8 flex flex-col gap-6">
          <h2 className="text-heading text-white">{t("philosophy")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {PILLAR_KEYS.map((key) => (
              <div key={key} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: PILLAR_COLORS[key] }}
                  />
                  <span className="font-mono text-caption text-white uppercase">
                    {t(`pillars.${key}.title`)}
                  </span>
                </div>
                <p className="text-body-sm text-[#78716C] leading-relaxed">
                  {t(`pillars.${key}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="pt-24" />
      <Footer />
    </main>
  )
}
