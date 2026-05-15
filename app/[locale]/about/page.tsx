import { setRequestLocale, getTranslations } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Link } from "@/i18n/navigation"

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("AboutWIP")

  return (
    <main className="min-h-screen bg-[#080706] flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-4 lg:px-8 py-24 max-w-[720px] mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-6">
          <span className="font-mono text-caption text-[#FB923C] uppercase tracking-[0.08em]">
            {t("tag")}
          </span>
          <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[56px] leading-[1.05] tracking-tight text-white">
            {t("title")}
          </h1>
          <p className="text-body text-[#A8A29E] leading-relaxed max-w-[460px]">
            {t("description")}
          </p>
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
