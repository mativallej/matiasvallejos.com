"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

const timeline = [
  {
    year: "2026",
    title: "Building Tegu",
    description:
      "Focused full-time on product development. Creating lean tools for solo builders and small teams.",
  },
  {
    year: "2025",
    title: "Shipped Cosmico",
    description:
      "Designed and released a warm, minimal design system rooted in Argentine aesthetics. Stone neutrals meet purposeful ornamentation.",
  },
  {
    year: "2024",
    title: "First indie product",
    description:
      "Launched my first product as a solo founder. Learned that shipping matters more than perfecting.",
  },
  {
    year: "2023",
    title: "Went independent",
    description:
      "Left agency work to build my own things. Cordoba became the base, the world became the market.",
  },
]

const values = [
  {
    title: "Product over code",
    description:
      "I measure success by the problems I solve, not the lines I write. Technology is a means, never the end.",
    accent: "#E8742A",
  },
  {
    title: "Lean by default",
    description:
      "Every feature earns its place or gets cut. Constraints drive creativity. Small is a superpower.",
    accent: "#A3B86C",
  },
  {
    title: "Craft matters",
    description:
      "Details compound. The border radius, the micro-interaction, the loading state -- they all shape how a product feels.",
    accent: "#D4A76A",
  },
  {
    title: "Ship with purpose",
    description:
      "Velocity without direction is just noise. I ship fast but always toward something meaningful.",
    accent: "#7CA5C4",
  },
]

const stack = [
  { category: "Product", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "Redis", "Vercel"] },
  { category: "Design", items: ["Figma", "Framer Motion", "Custom Design Systems"] },
  { category: "Workflow", items: ["Linear", "GitHub", "Notion", "VS Code"] },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.08 },
  }),
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080706]">
      <Navbar />
      <PageHeader
        label="About"
        title="Builder, not coder."
        titleAccent="Product-minded."
        description="I'm Matias Vallejos, a product builder from Cordoba, Argentina. I create lean digital products that solve real problems, move fast, and ship with purpose. I don't optimize for tech stacks -- I optimize for impact."
      />

      {/* Download CV */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-6 lg:px-10 max-w-[1080px] mx-auto -mt-4 mb-8"
      >
        <a
          href="/matias-vallejos-cv.pdf"
          download
          className="group inline-flex items-center gap-2.5 font-mono text-[12px] font-semibold tracking-[0.04em] uppercase border border-[#3D3935] text-[#A8A29E] px-5 py-3 rounded-lg hover:text-white hover:border-[#57534E] hover:bg-[#12100E] transition-all duration-200"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-y-0.5 transition-transform duration-200"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CV
        </a>
      </motion.div>

      {/* Values */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="px-6 lg:px-10 py-16 max-w-[1080px] mx-auto"
      >
        <h2 className="font-mono text-caption text-[#57534E] uppercase mb-8">
          What I believe
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-[#0C0A09] border border-[#3D3935] rounded-lg p-6 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: value.accent }}
                />
                <h3 className="text-subheading text-white">{value.title}</h3>
              </div>
              <p className="text-body-sm text-[#78716C] leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Timeline */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="px-6 lg:px-10 py-16 max-w-[1080px] mx-auto"
      >
        <h2 className="font-mono text-caption text-[#57534E] uppercase mb-8">
          Timeline
        </h2>
        <div className="flex flex-col">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="flex gap-6 py-6 border-b border-[#3D3935] last:border-b-0"
            >
              <span className="font-mono text-caption text-[#FB923C] w-12 flex-shrink-0 pt-1">
                {item.year}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-body font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-body-sm text-[#78716C]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stack */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="px-6 lg:px-10 py-16 max-w-[1080px] mx-auto"
      >
        <h2 className="font-mono text-caption text-[#57534E] uppercase mb-8">
          Tools I use
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stack.map((group, i) => (
            <motion.div
              key={group.category}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col gap-3"
            >
              <span className="font-mono text-caption text-[#A8A29E] uppercase">
                {group.category}
              </span>
              <div className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-body-sm text-[#78716C]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Contact />

      <div className="pt-24" />
      <Footer />
    </main>
  )
}
