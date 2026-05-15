import { routing, type Locale } from "@/i18n/routing"

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.matiasvallejos.com"

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: "en-US",
  es: "es-AR",
}

export const LOCALE_OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  es: "es_AR",
}

function stripLocalePrefix(pathname: string): string {
  for (const locale of routing.locales) {
    if (locale === routing.defaultLocale) continue
    if (pathname === `/${locale}`) return "/"
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(`/${locale}`.length)
  }
  return pathname
}

function joinPath(base: string, path: string): string {
  if (path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

/**
 * Build canonical + hreflang alternates for a route.
 *
 * Pass the locale-stripped pathname (e.g. "/", "/about", "/blog/foo").
 * Returns canonical for the current locale plus en-US, es-AR, x-default.
 */
export function buildAlternates(
  pathname: string,
  currentLocale: Locale,
): {
  canonical: string
  languages: Record<string, string>
} {
  const cleanPath = stripLocalePrefix(pathname)

  const enPath = cleanPath
  const esPath = cleanPath === "/" ? "/es" : `/es${cleanPath}`

  const canonicalPath = currentLocale === "es" ? esPath : enPath

  return {
    canonical: joinPath(SITE_URL, canonicalPath),
    languages: {
      "en-US": joinPath(SITE_URL, enPath),
      "es-AR": joinPath(SITE_URL, esPath),
      "x-default": joinPath(SITE_URL, enPath),
    },
  }
}

export function absoluteUrl(path: string): string {
  return joinPath(SITE_URL, path)
}

const BREADCRUMB_LABELS: Record<Locale, Record<string, string>> = {
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    books: "Books",
    blog: "Blog",
    press: "Press",
  },
  es: {
    home: "Inicio",
    about: "Sobre mí",
    projects: "Proyectos",
    books: "Libros",
    blog: "Blog",
    press: "Prensa",
  },
}

/**
 * Locale-aware breadcrumb labels + absolute URLs.
 * Pass the path *without* locale prefix (e.g. "/about", "/projects/tegu").
 * Locale prefix and `Home` root are added automatically.
 */
export function buildBreadcrumbs(
  locale: Locale,
  segments: { key: "about" | "projects" | "books" | "blog" | "press"; path: string; nameOverride?: string }[],
): { name: string; url: string }[] {
  const labels = BREADCRUMB_LABELS[locale]
  const localePrefix = locale === "es" ? "/es" : ""
  const trail: { name: string; url: string }[] = [
    { name: labels.home, url: absoluteUrl(localePrefix || "/") },
  ]
  for (const seg of segments) {
    trail.push({
      name: seg.nameOverride ?? labels[seg.key],
      url: absoluteUrl(`${localePrefix}${seg.path}`),
    })
  }
  return trail
}
