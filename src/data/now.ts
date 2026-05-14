export interface NowItem {
  id: number
  text: string
  link?: string
  linkLabel?: string
}

export interface NowData {
  updatedAt: string
  items: NowItem[]
}

export const now: NowData = {
  updatedAt: "March 2026",
  items: [
    {
      id: 2,
      text: "Building Tegu — marketplace for home services in Argentina",
      link: "https://tegu.ar",
      linkLabel: "tegu.ar",
    },
    {
      id: 3,
      text: "Growing Docta Valley — tech community in Córdoba",
      link: "https://doctavalley.com.ar",
      linkLabel: "doctavalley.com.ar",
    },
    {
      id: 4,
      text: "Leveling up product skills — executing a 2026 product engineer roadmap",
      link: "https://productprepa.com",
      linkLabel: "productprepa.com",
    },
    {
      id: 5,
      text: "Reading about product, business, life — 1 book/month challenge",
      link: "/books",
      linkLabel: "bookshelf",
    },
    {
      id: 6,
      text: "Writing about AI, coding, life and building in public",
      link: "https://x.com/mativallej_",
      linkLabel: "follow along",
    },
  ],
}
