export interface Article {
  id: number
  title: string
  date: string
  tags: string[]
  category: string
  excerpt: string
  readTime: string
  destacado: boolean
  url: string
}

export const articles: Article[] = [
  {
    id: 1,
    title: "No le pidas respuestas a la AI — pedile preguntas",
    date: "Jan 2026",
    tags: ["ai", "prompt-engineering"],
    category: "engineering",
    excerpt:
      "La diferencia entre usar la AI como un buscador y usarla como un copiloto de pensamiento es una sola cosa: el proceso. Flipped Interaction, Cognitive Verifier e Iterative Refinement.",
    readTime: "8 min",
    destacado: true,
    url: "https://x.com/mativallej_/status/2014743217204285781",
  },
]

export const articleCategories = [
  { key: "all", label: "All" },
  { key: "tech", label: "Tech" },
  { key: "engineering", label: "Engineering" },
  { key: "product", label: "Product" },
  { key: "life", label: "Life" },
]
