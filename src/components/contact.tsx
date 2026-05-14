"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function Contact() {
  const t = useTranslations("Contact")
  return (
    <motion.section
      id="contact"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="px-6 lg:px-10 py-16 max-w-[1080px] mx-auto"
    >
      <div className="bg-[#12100E] border border-[#3D3935] rounded-lg p-8 md:p-12 flex flex-col items-center text-center gap-5">
        <h2 className="text-heading text-white text-balance">
          {t("title")}
        </h2>
        <a
          href="mailto:mativallej@outlook.com"
          className="inline-flex items-center gap-2 font-mono text-body-sm font-semibold bg-[#E8742A] text-[#080706] px-5 py-2.5 rounded-md hover:bg-[#D4622A] hover:shadow-glow transition-all duration-200"
        >
          {t("cta")}
        </a>
        <p className="font-mono text-caption text-[#57534E]">
          {t("openFor")}
        </p>
      </div>
    </motion.section>
  )
}
