import { NextResponse } from "next/server"
import { getGitHubStats } from "@/lib/github"

// Route-level cache: 7 days. Combined with the per-fetch revalidate inside
// `getGitHubStats`, the upstream GitHub API is hit at most once per 7 days.
export const revalidate = 604800

export async function GET() {
  const stats = await getGitHubStats()
  return NextResponse.json(stats, {
    headers: {
      // Browser cache + CDN cache aligned with the server revalidation window.
      "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=86400",
    },
  })
}
