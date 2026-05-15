"use client"

import { motion } from "framer-motion"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

interface PageHeaderProps {
  label: string
  title: string
  titleAccent?: string
  description: string
}

export function PageHeader({ label, title, titleAccent, description }: PageHeaderProps) {
  const t = useTranslations("PageHeader")
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-4 lg:px-8 pt-6 pb-6 md:pt-12 md:pb-10 max-w-[1080px] mx-auto"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-caption text-[#A8A29E] border border-[#3D3935]/60 rounded-full px-3 py-1 hover:text-white hover:border-[#57534E] transition-colors duration-200 mb-8"
      >
        <span className="text-[#A8A29E]">←</span>
        <span>{t("backHome")}</span>
      </Link>
      <div className="flex flex-col gap-4">
        <span className="font-mono text-caption text-[#A8A29E] uppercase">
          {label}
        </span>
        <h1 className="font-serif text-[36px] sm:text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.02em] font-bold text-balance">
          <span className="text-white">{title}</span>
          {titleAccent && (
            <>
              <br />
              <span className="text-[#FB923C]">{titleAccent}</span>
            </>
          )}
        </h1>
        <p className="text-body text-[#A8A29E] max-w-[560px] leading-relaxed">
          {description}
        </p>
      </div>
    </motion.header>
  )
}
