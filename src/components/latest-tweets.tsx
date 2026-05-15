"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Tweet } from "react-tweet"

const tweetIds = [
  "1962691134297383207",
  "2020838831512051787",
  "1978987396210294988",
  "1923836376723681783",
]

export function LatestTweets() {
  const t = useTranslations("LatestTweets")
  return (
    <section className="px-4 lg:px-8 py-20 max-w-[1080px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-caption text-[#A8A29E] uppercase">
            {t("title")}
          </h2>
          <a
            href="https://x.com/mativallej_"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-caption text-[#A8A29E] hover:text-[#FB923C] transition-colors duration-200"
          >
            {t("follow")}
          </a>
        </div>
      </motion.div>

      <div className="columns-1 md:columns-2 gap-4 space-y-4" data-theme="dark">
        {tweetIds.map((id) => (
          <div key={id} className="tweet-embed break-inside-avoid">
            <Tweet id={id} />
          </div>
        ))}
      </div>
    </section>
  )
}
