"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface PageHeaderProps {
  label: string
  title: string
  titleAccent?: string
  description: string
}

export function PageHeader({ label, title, titleAccent, description }: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-6 lg:px-10 pt-20 pb-12 max-w-[1080px] mx-auto"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-caption text-[#57534E] hover:text-[#A8A29E] transition-colors duration-200 mb-8"
      >
        <span>{"<-"}</span>
        <span>back home</span>
      </Link>
      <div className="flex flex-col gap-4">
        <span className="font-mono text-caption text-[#57534E] uppercase">
          {label}
        </span>
        <h1 className="text-display-lg text-balance">
          <span className="text-white">{title}</span>
          {titleAccent && (
            <>
              <br />
              <span className="text-[#E8742A]">{titleAccent}</span>
            </>
          )}
        </h1>
        <p className="text-body text-[#A8A29E] max-w-[560px]">
          {description}
        </p>
      </div>
    </motion.header>
  )
}
