"use client"

import { motion } from "framer-motion"

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function Contact() {
  return (
    <motion.section
      id="contact"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="px-6 lg:px-10 py-16 max-w-[1080px] mx-auto"
    >
      <div className="bg-[#12100E] border border-[#3D3935] rounded-lg p-8 md:p-12 flex flex-col items-center text-center gap-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#A3B86C] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3B86C]" />
          </span>
          <span className="font-mono text-caption text-[#A3B86C] uppercase">
            available for collaborations
          </span>
        </div>
        <h2 className="text-heading text-white text-balance">
          {"Have a product idea? Let's build it together."}
        </h2>
        <p className="text-body-sm text-[#78716C] max-w-[440px]">
          I work best with founders and small teams who care about craft and want to ship something meaningful.
        </p>
        <a
          href="mailto:matiasvallejosdev@outlook.com"
          className="inline-flex items-center gap-2 font-mono text-body-sm font-semibold bg-[#E8742A] text-[#080706] px-5 py-2.5 rounded-md hover:bg-[#D4622A] hover:shadow-glow transition-all duration-200"
        >
          {"get in touch →"}
        </a>
      </div>
    </motion.section>
  )
}
