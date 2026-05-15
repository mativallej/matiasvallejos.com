/**
 * Design System — JSX Preview
 *
 * Single-file, copy-paste reference for the matiasvallejos.com tokens and
 * primitives. Not wired into the build and not exposed as a public route.
 * The authoritative documentation lives next to this file in
 * design-system.md.
 *
 * Drop this file into a sandbox or Storybook to render the system in
 * isolation; nothing imports from the repo so it stays portable.
 */

export const designTokens = {
  colors: {
    primary: {
      50: "#FFF7ED",
      100: "#FFEDD5",
      200: "#FED7AA",
      300: "#FDBA74",
      400: "#FB923C", // accent (default)
      500: "#E8742A", // deep accent (hover, primary button bg)
      600: "#D4622A",
      700: "#B84D1E",
      800: "#93400D",
      900: "#7C2D12",
    },
    neutral: {
      0: "#FFFFFF",
      50: "#FAFAF9", // primary text on dark
      100: "#A8A29E", // secondary text
      200: "#78716C",
      300: "#57534E",
      400: "#3D3935", // default border
      500: "#1C1917",
      600: "#171412",
      700: "#12100E",
      800: "#0C0A09", // modal / panel
      900: "#080706", // page background
    },
    accent: {
      mate: "#A3B86C",
      pampa: "#D4A76A",
      sky: "#7CA5C4",
    },
    semantic: {
      success: "#4ADE80",
      warning: "#FBBF24",
      error: "#F87171",
      info: "#60A5FA",
    },
  },
  typography: {
    display: "'STIX Two Text', serif",
    body: "'STIX Two Text', serif",
    mono: "'JetBrains Mono', 'SF Mono', monospace",
  },
  spacing: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160],
  radii: { none: 0, sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.3)",
    md: "0 4px 12px rgba(0,0,0,0.4)",
    lg: "0 8px 32px rgba(0,0,0,0.5)",
    glow: "0 0 24px rgba(232,116,42,0.15)",
    glowStrong: "0 0 48px rgba(232,116,42,0.25)",
  },
}

export const typeScale = [
  { label: "display-lg", size: 48, weight: 700, tracking: "-0.03em" },
  { label: "display", size: 36, weight: 700, tracking: "-0.02em" },
  { label: "heading", size: 24, weight: 600, tracking: "-0.01em" },
  { label: "subheading", size: 18, weight: 600, tracking: "0" },
  { label: "body", size: 16, weight: 400, tracking: "0" },
  { label: "body-sm", size: 14, weight: 400, tracking: "0" },
  { label: "caption", size: 12, weight: 500, tracking: "0.04em", mono: true },
]

export const principles = [
  { n: "01", title: "Product Over Code", body: "Communicate outcomes, not implementations." },
  { n: "02", title: "Earned Ornamentation", body: "Decorative elements appear sparingly and purposefully." },
  { n: "03", title: "Warm Minimalism", body: "Dark doesn't mean cold. Stone neutrals, orange accents." },
  { n: "04", title: "Lean Communication", body: "Each section communicates a single idea clearly." },
  { n: "05", title: "Argentine Undertone", body: "Pampa aesthetic lives in palette and motifs — never overt." },
  { n: "06", title: "Future Oriented", body: "Typography and tone project forward, grounded in fundamentals." },
]

export const voice = {
  do: [
    '"I build products that solve real problems"',
    '"Lean, fast, purposeful"',
    '"Craft matters"',
    '"Córdoba → the world"',
  ],
  dont: [
    '"Full-stack developer with 5 years..."',
    '"Passionate about clean code"',
    '"10x engineer"',
    '"Tech enthusiast"',
  ],
}

// ---------------------------------------------------------------------------
// Preview component — renders the whole system in one scrollable page.
// Self-contained: pure inline styles, no Tailwind, no project imports.
// ---------------------------------------------------------------------------

const t = designTokens

const sx = {
  page: {
    background: t.colors.neutral[900],
    color: t.colors.neutral[50],
    fontFamily: t.typography.body,
    minHeight: "100vh",
    padding: "64px 24px",
  },
  container: { maxWidth: 960, margin: "0 auto" },
  sectionTitle: {
    fontSize: 13,
    fontFamily: t.typography.mono,
    color: t.colors.primary[500],
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    margin: "0 0 24px 0",
    fontWeight: 500,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: t.colors.neutral[200],
    margin: "-16px 0 24px",
    lineHeight: 1.6,
  },
  sectionWrap: { marginBottom: 64 },
  card: {
    background: t.colors.neutral[800],
    border: `1px solid ${t.colors.neutral[400]}`,
    borderRadius: t.radii.lg,
    padding: 20,
  },
  swatch: (bg) => ({
    width: 64,
    height: 64,
    borderRadius: t.radii.md,
    background: bg,
    border: `1px solid ${t.colors.neutral[400]}`,
  }),
  swatchLabel: {
    fontSize: 10,
    fontFamily: t.typography.mono,
    color: t.colors.neutral[300],
    marginTop: 6,
  },
}

function Section({ title, subtitle, children }) {
  return (
    <section style={sx.sectionWrap}>
      <h2 style={sx.sectionTitle}>{title}</h2>
      {subtitle && <p style={sx.sectionSubtitle}>{subtitle}</p>}
      {children}
    </section>
  )
}

function Swatches({ palette }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {Object.entries(palette).map(([k, v]) => (
        <div key={k}>
          <div style={sx.swatch(v)} />
          <div style={sx.swatchLabel}>
            {k} · {v}
          </div>
        </div>
      ))}
    </div>
  )
}

export function DesignSystemPreview() {
  return (
    <main style={sx.page}>
      <div style={sx.container}>
        <h1
          style={{
            fontFamily: t.typography.display,
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            margin: "0 0 12px",
          }}
        >
          Design System
        </h1>
        <p style={{ color: t.colors.neutral[100], maxWidth: 560, lineHeight: 1.6, marginBottom: 64 }}>
          Tokens, type scale, principles, and voice — the foundation of matiasvallejos.com.
          See <code>design-system.md</code> for the authoritative reference.
        </p>

        <Section title="Colors — Primary" subtitle="Orange. Core accent across every interaction.">
          <Swatches palette={t.colors.primary} />
        </Section>

        <Section title="Colors — Neutral" subtitle="Warm stone, not blue-grey. Argentine tierra.">
          <Swatches palette={t.colors.neutral} />
        </Section>

        <Section title="Colors — Accent" subtitle="Pampa palette: mate, gold, sky.">
          <Swatches palette={t.colors.accent} />
        </Section>

        <Section title="Type Scale" subtitle="STIX Two Text for prose, JetBrains Mono for metadata.">
          <div style={sx.card}>
            {typeScale.map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 16,
                  marginBottom: 12,
                  paddingBottom: 12,
                  borderBottom: `1px solid ${t.colors.neutral[400]}40`,
                }}
              >
                <span style={{ fontFamily: t.typography.mono, fontSize: 11, color: t.colors.neutral[300], width: 100 }}>
                  {row.label}
                </span>
                <span
                  style={{
                    fontSize: row.size,
                    fontFamily: row.mono ? t.typography.mono : t.typography.display,
                    fontWeight: row.weight,
                    letterSpacing: row.tracking,
                    lineHeight: 1.3,
                  }}
                >
                  Aa
                </span>
                <span style={{ fontFamily: t.typography.mono, fontSize: 11, color: t.colors.neutral[300] }}>
                  {row.size}px / {row.weight}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Radii">
          <div style={{ display: "flex", gap: 16 }}>
            {Object.entries(t.radii)
              .filter(([k]) => k !== "full")
              .map(([k, v]) => (
                <div key={k}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: t.colors.neutral[600],
                      border: `1px solid ${t.colors.neutral[400]}`,
                      borderRadius: v,
                    }}
                  />
                  <div style={sx.swatchLabel}>
                    {k} · {v}px
                  </div>
                </div>
              ))}
          </div>
        </Section>

        <Section title="Shadows">
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {Object.entries(t.shadows).map(([k, v]) => (
              <div key={k} style={{ width: 120 }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: t.radii.lg,
                    background: t.colors.neutral[800],
                    boxShadow: v,
                    margin: "0 auto 8px",
                  }}
                />
                <div style={sx.swatchLabel}>{k}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Principles">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {principles.map((p) => (
              <div key={p.n} style={sx.card}>
                <div style={{ fontFamily: t.typography.mono, fontSize: 11, color: t.colors.primary[400], marginBottom: 8 }}>
                  {p.n}
                </div>
                <h3 style={{ fontFamily: t.typography.display, fontSize: 18, margin: "0 0 6px", color: t.colors.neutral[0] }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 14, color: t.colors.neutral[100], lineHeight: 1.6, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Voice & Tone" subtitle="How the site speaks.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "DO", items: voice.do, color: t.colors.accent.mate },
              { label: "DON'T", items: voice.dont, color: t.colors.semantic.error },
            ].map((col) => (
              <div key={col.label} style={sx.card}>
                <div
                  style={{
                    fontFamily: t.typography.mono,
                    fontSize: 12,
                    color: col.color,
                    marginBottom: 12,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  {col.label}
                </div>
                {col.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      fontStyle: "italic",
                      fontSize: 14,
                      color: t.colors.neutral[100],
                      marginBottom: 8,
                      paddingLeft: 12,
                      borderLeft: `2px solid ${col.color}30`,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  )
}

export default DesignSystemPreview
