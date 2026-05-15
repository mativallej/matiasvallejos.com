"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import ProjectCard from "@/components/project-card"
import { products } from "@/data/products"

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

      <section className="px-4 lg:px-8 py-8 max-w-[1080px] mx-auto">
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

      <div className="pt-24" />
      <Footer />
    </main>
  )
}
