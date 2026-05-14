import { setRequestLocale, getTranslations } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Link } from "@/i18n/navigation"
import { products } from "@/data/products"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations("ProjectCaseStudy")
  const project = products.find((p) => p.slug === slug)

  return (
    <main className="min-h-screen bg-[#080706] flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-6 lg:px-10 py-24 max-w-[720px] mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-6">
          <span className="font-mono text-caption text-[#FB923C] uppercase tracking-[0.08em]">
            {project?.title ?? slug}
          </span>

          <h1 className="font-serif text-[40px] md:text-[56px] leading-[1.05] tracking-tight text-white">
            {t("title")}
          </h1>

          <p className="text-body text-[#A8A29E] leading-relaxed max-w-[460px]">
            {t("description")}
          </p>

          {project?.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-caption font-semibold uppercase bg-[#E8742A] text-[#080706] px-5 py-3 rounded-md hover:bg-[#D4622A] hover:shadow-glow transition-all duration-200 mt-2"
            >
              {t("visitProject")} →
            </a>
          )}

          <Link
            href="/"
            className="font-mono text-caption text-[#57534E] hover:text-white transition-colors duration-200 mt-4"
          >
            ← {t("backHome")}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
