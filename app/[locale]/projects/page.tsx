"use client"

import { motion } from "framer-motion"
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

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#080706]">
      <Navbar />
      <PageHeader
        label="Products"
        title="Things I'm building."
        titleAccent="And have built."
        description="I create lean digital products that solve real problems. Every product starts with a clear purpose and ships when it's ready to make an impact -- not a moment sooner, not a moment later."
      />

      <section className="px-6 lg:px-10 py-8 max-w-[1080px] mx-auto">
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
        <div className="bg-[#12100E] border border-[#3D3935] rounded-lg p-8 md:p-12 flex flex-col gap-6">
          <h2 className="text-heading text-white">How I build</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Start lean",
                text: "Every product begins with the smallest version that delivers real value. No feature creep.",
                color: "#A3B86C",
              },
              {
                title: "Ship fast",
                text: "Velocity matters. I aim for weekly shipping cycles, even if it's small iterations.",
                color: "#E8742A",
              },
              {
                title: "Iterate with purpose",
                text: "Feedback drives direction. Every change is a response to something real, not a guess.",
                color: "#7CA5C4",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-mono text-caption text-white uppercase">
                    {item.title}
                  </span>
                </div>
                <p className="text-body-sm text-[#78716C]">{item.text}</p>
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
