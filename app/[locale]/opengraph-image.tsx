import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Matias Vallejos — Product Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string }
}) {
  const tagline =
    params.locale === "es"
      ? "Product Engineer · Co-Founder @ Tegu"
      : "Product Engineer · Co-Founder @ Tegu"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#080706",
          color: "#FAFAF9",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 24,
            color: "#A8A29E",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#FB923C" }}>●</span>
          <span>matiasvallejos.com</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Matias</span>
            <span style={{ color: "#FB923C" }}>Vallejos</span>
          </div>
          <div style={{ fontSize: 32, color: "#A8A29E", letterSpacing: "-0.01em" }}>
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#57534E",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <span>Córdoba · Argentina 🇦🇷</span>
          <span>@mativallej_</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
