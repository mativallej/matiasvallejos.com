export interface Product {
  id: number
  title: string
  slug: string
  description: string
  tags: string[]
  link: string
  github: string
  video?: string
  image?: string
  date: string
  instagram?: string
  tiktok?: string
  twitter?: string
}

export const products: Product[] = [
  {
    id: 1,
    title: "Tegu",
    slug: "tegu",
    description: "Marketplace connecting homeowners with verified professionals for home services in Argentina. AI-powered matching, WhatsApp integration, with pay-per-lead and subscription models for pros.",
    tags: ["Marketplace", "Homeservices", "Mobile", "Web", "AI", "WhatsApp"],
    link: "https://tegu.ar",
    github: "https://github.com/mativallej",
    date: "2026",
    instagram: "https://instagram.com/tegu_app",
    tiktok: "https://tiktok.com/@tegu_app",
    twitter: "https://x.com/tegu_app",
  },
  {
    id: 2,
    title: "Cosmico",
    slug: "cosmico",
    description: "A design system born from Argentine aesthetics. Stone neutrals, purposeful ornamentation, and warm minimalism.",
    tags: ["Design System", "Tailwind", "Figma"],
    link: "https://github.com/matiasvallejosdev",
    github: "https://github.com/matiasvallejosdev",
    date: "2025",
  },
  {
    id: 3,
    title: "Asado",
    slug: "asado",
    description: "Exploring how real-time collaboration can make product iteration cycles faster and more intentional.",
    tags: ["Developer Tool", "React", "WebSockets"],
    link: "https://github.com/matiasvallejosdev",
    github: "https://github.com/matiasvallejosdev",
    date: "2026",
  },
]
