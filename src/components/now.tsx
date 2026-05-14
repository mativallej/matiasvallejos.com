"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { now } from "@/data/now"

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

export function Now() {
  const t = useTranslations("Now")
  return (
    <section id="now" className="px-6 lg:px-10 py-20 max-w-[1080px] mx-auto">
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
          <span className="font-mono text-caption text-[#57534E]">
            {t("updated", { date: now.updatedAt })}
          </span>
        </div>
      </motion.div>

      <div className="flex flex-col">
        {now.items.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex items-baseline gap-3 py-4 border-b border-[#3D3935]"
          >
            <span className="font-mono text-body text-[#57534E] flex-shrink-0">
              --
            </span>
            <span className="text-body text-white">
              {item.text}
              {item.link && (
                <>
                  {" "}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FB923C] hover:underline transition-colors duration-200"
                  >
                    {item.linkLabel} →
                  </a>
                </>
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
