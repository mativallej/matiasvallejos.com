"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import ProjectCard from "@/components/project-card"
import { products } from "@/data/products"

const featuredProducts = products.slice(0, 3)

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
  return (
    <section id="products" className="px-6 lg:px-10 py-20 max-w-[1080px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-caption text-[#57534E] uppercase">
            Products
          </h2>
          <Link href="/products" className="font-mono text-caption text-[#57534E] hover:text-[#FB923C] transition-colors duration-200">
            view all →
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
    </section>
  )
}
