export interface Repo {
  name: string
  description: string
  url: string
  language: string
  stars: number
  forks: number
  archived?: boolean
  featured?: boolean
  emoji?: string
  tags?: string[]
}

export const githubUrl = "https://github.com/mativallej"

// Re-exported here for convenience. Live values come from /api/github-stats
// (cached 7 days). These are the fallback used until the client fetch resolves.
export { FALLBACK_GITHUB_STATS as githubStats } from "@/lib/github"

export const repos: Repo[] = [
  {
    name: "ai-expense-tracker-n8n",
    description:
      "AI-driven personal finance automation that extracts and categorizes PDF expenses into Google Sheets.",
    url: "https://github.com/mativallej/ai-expense-tracker-n8n",
    language: "TypeScript",
    stars: 59,
    forks: 10,
    featured: true,
    tags: ["n8n", "OpenAI", "Google Sheets", "Docker"],
  },
  {
    name: "learn-to-learn",
    description:
      "Complete system to learn how to learn: spaced repetition, flashcards, active reading, and Zettelkasten knowledge management.",
    url: "https://github.com/mativallej/learn-to-learn",
    language: "Markdown",
    stars: 11,
    forks: 0,
    featured: true,
    tags: ["Zettelkasten", "Learning", "Productivity"],
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
    tags: ["Prompt", "AI", "Marketing"],
  },
  {
    name: "z0-aspnetcore-boilerplate",
    description:
      "Production-ready Clean Architecture boilerplate for .NET 9.0 APIs with PostgreSQL, AWS Cognito, and Docker.",
    url: "https://github.com/mativallej/z0-aspnetcore-boilerplate",
    language: "C#",
    stars: 1,
    forks: 1,
    tags: [".NET 9", "PostgreSQL", "AWS Cognito", "Docker"],
  },
  {
    name: "unity-ecoxplorer-ar",
    description:
      "Educational AR game built with Fundación Manos Verdes to boost kids' eco-awareness through interactive challenges.",
    url: "https://github.com/mativallej/unity-ecoxplorer-ar",
    language: "C#",
    stars: 1,
    forks: 0,
    tags: ["Unity", "AR", "Education"],
  },
  {
    name: "casino-roulette-game",
    description: "American casino roulette game developed in Unity.",
    url: "https://github.com/mativallej/casino-roulette-game",
    language: "C#",
    stars: 90,
    forks: 38,
    archived: true,
    tags: ["Unity", "C#", "Game"],
  },
]
