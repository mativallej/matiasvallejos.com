export interface Product {
  id: number
  title: string
  subtitle?: string
  logo?: string
  emoji?: string
  logoBg?: string
  slug: string
  description: string
  tags: string[]
  link: string
  github?: string
  video?: string
  videoFit?: "cover" | "contain"
  imagesFit?: "cover" | "contain"
  image?: string
  images?: string[]
  caseStudy?: string
  date: string
  metrics?: { value: string; label: string }[]
  instagram?: string
  tiktok?: string
  twitter?: string
  linkedin?: string
}

export const products: Product[] = [
  {
    id: 1,
    title: "Tegu",
    subtitle: "AI home services marketplace",
    logo: "/images/projects/tegu/logo-green.webp",
    logoBg: "#4F9A69",
    slug: "tegu",
    caseStudy: "/case-study/tegu",
    description: "Marketplace connecting homeowners with verified professionals for home services in Argentina. AI-powered matching, WhatsApp integration, with a pay-per-lead model for pros.",
    tags: ["Marketplace", "Homeservices", "Mobile", "Web", "AI", "WhatsApp"],
    link: "https://tegu.ar",
    images: [
      "/images/projects/tegu/mock-assistant.webp",
      "/images/projects/tegu/mock-client.webp",
      "/images/projects/tegu/mock-map.webp",
      "/images/projects/tegu/mock-pro.webp",
    ],
    imagesFit: "contain",
    date: "2026",
    instagram: "https://instagram.com/tegu_app",
    tiktok: "https://tiktok.com/@tegu_app",
    twitter: "https://x.com/tegu_app",
    linkedin: "https://linkedin.com/company/teguapp",
    metrics: [
      { value: "7", label: "pros committed" },
      { value: "+50", label: "waitlist" },
    ],
  },
  {
    id: 2,
    title: "Docta Valley",
    subtitle: "Tech community in Córdoba",
    logo: "/images/projects/docta-valley/logo.jpg",
    logoBg: "#F5E6B0",
    slug: "docta-valley",
    caseStudy: "/case-study/docta-valley",
    description: "Community connecting tech founders and builders in Córdoba. We create the space to spread ideas, make connections, and launch Córdoba-based startups.",
    tags: ["Community", "Startups", "Networking", "Córdoba"],
    link: "https://doctavalley.com.ar",
    github: "https://github.com/mativallej/docta-valley",
    images: ["/images/projects/docta-valley/event-001.jpeg", "/images/projects/docta-valley/event-002.jpeg"],
    date: "2025",
    metrics: [
      { value: "+200", label: "personas" },
      { value: "+4", label: "eventos" },
      { value: "+12", label: "startups" },
    ],
    twitter: "https://x.com/DoctaValley",
  },
  {
    id: 3,
    title: "AI Expense Tracker",
    subtitle: "Smart personal finance tracking",
    emoji: "💸",
    logoBg: "#1C1917",
    slug: "ai-expense-tracker",
    caseStudy: "/case-study/ai-expense-tracker",
    description: "Open-source automation that processes bank statements and receipts with GPT-4o, categorizes expenses, and populates Google Sheets dashboards. Upload via web or Google Drive.",
    tags: ["n8n", "OpenAI", "Next.js", "Google Sheets", "Docker"],
    link: "https://x.com/mativallejosdev/status/1979669047622209758",
    github: "https://github.com/mativallej/ai-expense-tracker-n8n",
    video: "/images/projects/ai-expense-tracker/demo.mp4",
    videoFit: "contain",
    date: "2025",
    metrics: [
      { value: "+50", label: "stars" },
      { value: "+8", label: "forks" },
      { value: "+118K", label: "views" },
    ],
  },
]

export interface MoreProject {
  title: string
  subtitle?: string
  link: string
}

/** Smaller ships shown as a compact, title-only stack under the featured cards. */
export const moreProjects: MoreProject[] = [
  {
    title: "shipstats",
    subtitle: "Weekly metrics → brand poster for X",
    link: "https://github.com/mativallej/shipstats",
  },
  {
    title: "building-in-public-template",
    subtitle: "Open-source template + Claude Code skills",
    link: "https://github.com/mativallej/building-in-public-template",
  },
  {
    title: "incident-ops",
    subtitle: "Open-source incident-ops toolkit",
    link: "https://github.com/mativallej/incident-ops",
  },
]
