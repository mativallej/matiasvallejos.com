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
}

export const products: Product[] = [
  {
    id: 1,
    title: "Tegu",
    slug: "tegu",
    description: "A focused workspace for indie makers to plan, ship, and iterate on their products without the bloat of enterprise tools.",
    tags: ["SaaS", "Next.js", "TypeScript"],
    link: "https://github.com/matiasvallejosdev",
    github: "https://github.com/matiasvallejosdev",
    date: "2026",
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
