"use client"

import { useLocale } from "next-intl"
import { useTransition } from "react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useParams } from "next/navigation"
import { routing } from "@/i18n/routing"

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [isPending, startTransition] = useTransition()

  const switchTo = (next: string) => {
    if (next === locale) return
    startTransition(() => {
      router.replace(
        // @ts-expect-error pathnames remain valid across locales
        { pathname, params },
        { locale: next }
      )
    })
  }

  return (
    <div className="flex items-center gap-1 font-mono text-[13px] lowercase leading-none">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-[#3D3935] mx-1">/</span>}
          <button
            type="button"
            onClick={() => switchTo(l)}
            disabled={isPending}
            aria-label={`Switch language to ${l}`}
            className={
              l === locale
                ? "text-white"
                : "text-[#78716C] hover:text-white transition-colors duration-200 cursor-pointer"
            }
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  )
}
