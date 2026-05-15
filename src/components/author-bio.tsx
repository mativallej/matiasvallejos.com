import Image from "next/image"
import { Link } from "@/i18n/navigation"

type Props = {
  locale: string
}

export function AuthorBio({ locale }: Props) {
  const isEs = locale === "es"
  return (
    <aside
      // Mirrors the post body width so the bio sits flush with the article column.
      className="max-w-[720px] mt-12 pt-8 border-t border-[#3D3935]"
      aria-label={isEs ? "Sobre el autor" : "About the author"}
    >
      <div className="flex items-start gap-4">
        <Image
          src="/images/me.webp"
          alt="Matias Vallejos"
          width={56}
          height={56}
          className="rounded-full object-cover border border-[#3D3935]/60 flex-shrink-0"
        />
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-mono text-caption text-[#A3B86C] uppercase tracking-[0.08em]">
              {isEs ? "Escrito por" : "Written by"}
            </span>
            <Link
              href="/about"
              className="text-body font-semibold text-white hover:text-[#FB923C] transition-colors"
            >
              Matias Vallejos
            </Link>
          </div>
          <p className="text-body-sm text-[#A8A29E] leading-relaxed">
            {isEs
              ? "Product Engineer & Co-Founder de Tegu. Construyo productos lean desde Córdoba, Argentina. Co-fundé Docta Valley (+240 builders) y publico open source."
              : "Product Engineer & Co-Founder @ Tegu. Building lean products from Córdoba, Argentina. Co-founded Docta Valley (240+ builders) and ship open source."}
          </p>
          <div className="flex items-center gap-4 mt-1 font-mono text-caption text-[#57534E]">
            <a
              href="https://x.com/mativallej_"
              target="_blank"
              rel="noopener noreferrer me"
              className="hover:text-white transition-colors"
            >
              X / Twitter
            </a>
            <a
              href="https://github.com/mativallej"
              target="_blank"
              rel="noopener noreferrer me"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mativallej/"
              target="_blank"
              rel="noopener noreferrer me"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
