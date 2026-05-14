export interface Repo {
  name: string
  description: string
  url: string
  language: string
  stars: number
  forks: number
  archived?: boolean
  featured?: boolean
}

export const githubUrl = "https://github.com/mativallej"

export const repos: Repo[] = [
  {
    name: "ai-expense-tracker-n8n",
    description:
      "AI-driven personal finance automation using n8n and Google Drive to extract and categorize PDF expenses into Google Sheets.",
    url: "https://github.com/mativallej/ai-expense-tracker-n8n",
    language: "TypeScript",
    stars: 59,
    forks: 10,
    featured: true,
  },
  {
    name: "learn-to-learn",
    description:
      "Sistema completo para aprender a aprender: encoding, spaced repetition, flashcards, active reading, study habits y knowledge management con Zettelkasten.",
    url: "https://github.com/mativallej/learn-to-learn",
    language: "Markdown",
    stars: 11,
    forks: 0,
    featured: true,
  },
  {
    name: "shipstats",
    description:
      "A single prompt that turns your weekly metrics into a brand-aligned poster for X. JSON in, screenshot-ready HTML out.",
    url: "https://github.com/mativallej/shipstats",
    language: "Python",
    stars: 4,
    forks: 0,
    featured: true,
  },
  {
    name: "z0-aspnetcore-boilerplate",
    description:
      "Production-ready Clean Architecture boilerplate for .NET 9.0 APIs with PostgreSQL, AWS Cognito auth, testing, and one-command Docker setup.",
    url: "https://github.com/mativallej/z0-aspnetcore-boilerplate",
    language: "C#",
    stars: 1,
    forks: 1,
  },
  {
    name: "unity-ecoxplorer-ar",
    description:
      "Educational AR game built with Fundación Manos Verdes to boost kids' eco-awareness through interactive challenges.",
    url: "https://github.com/mativallej/unity-ecoxplorer-ar",
    language: "C#",
    stars: 1,
    forks: 0,
  },
  {
    name: "casino-roulette-game",
    description: "American casino roulette game developed in Unity.",
    url: "https://github.com/mativallej/casino-roulette-game",
    language: "C#",
    stars: 90,
    forks: 38,
    archived: true,
  },
]
