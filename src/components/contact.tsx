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
      className="px-4 lg:px-8 pt-16 pb-32 md:pb-40 max-w-[1080px] mx-auto"
    >
      <div className="bg-[#0C0A09] border border-[#3D3935]/60 rounded-2xl p-8 md:p-12 flex flex-col items-center text-center gap-5">
        <h2 className="font-serif text-[22px] md:text-[24px] font-semibold leading-[1.3] tracking-[-0.02em] text-white text-balance">
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
