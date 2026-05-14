/**
 * GitHub stats fetcher.
 * Caches via Next.js fetch revalidation — 7 days.
 * Falls back to hardcoded values if the API fails or rate-limits.
 */

const GITHUB_USER = "mativallej"
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7 // 7 days

// Fallback values — kept in sync with the last manual verification.
// Updated automatically every 7 days by the API route, but used immediately
// on the client until the live fetch resolves (no flash of zeros).
export const FALLBACK_GITHUB_STATS = {
  totalStars: 195,
  totalForks: 55,
  totalRepos: 18,
  followers: 148,
}

export type GitHubStats = typeof FALLBACK_GITHUB_STATS

interface GitHubRepo {
  fork: boolean
  archived: boolean
  stargazers_count: number
  forks_count: number
}

interface GitHubUser {
  followers: number
}

export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: "application/vnd.github+json" },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner&sort=updated`,
        {
          next: { revalidate: REVALIDATE_SECONDS },
          headers: { Accept: "application/vnd.github+json" },
        }
      ),
    ])

    if (!userRes.ok || !reposRes.ok) {
      return FALLBACK_GITHUB_STATS
    }

    const user: GitHubUser = await userRes.json()
    const repos: GitHubRepo[] = await reposRes.json()
    const ownerRepos = repos.filter((r) => !r.fork)

    return {
      totalStars: ownerRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0),
      totalForks: ownerRepos.reduce((sum, r) => sum + (r.forks_count || 0), 0),
      totalRepos: ownerRepos.length,
      followers: user.followers ?? 0,
    }
  } catch {
    return FALLBACK_GITHUB_STATS
  }
}
