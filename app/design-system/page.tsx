"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"

const designTokens = {
  colors: {
    primary: {
      50: "#FFF7ED",
      100: "#FFEDD5",
      200: "#FED7AA",
      300: "#FDBA74",
      400: "#FB923C",
      500: "#E8742A",
      600: "#D4622A",
      700: "#B84D1E",
      800: "#93400D",
      900: "#7C2D12",
    },
    neutral: {
      0: "#FFFFFF",
      50: "#FAFAF9",
      100: "#A8A29E",
      200: "#78716C",
      300: "#57534E",
      400: "#3D3935",
      500: "#1C1917",
      600: "#171412",
      700: "#12100E",
      800: "#0C0A09",
      900: "#080706",
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

const Section = ({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  id?: string
}) => (
  <section style={{ marginBottom: 80 }}>
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: 3,
            height: 24,
            background: designTokens.colors.primary[500],
            borderRadius: 2,
          }}
        />
        <h2
          style={{
            fontSize: 13,
            fontFamily: designTokens.typography.mono,
            color: designTokens.colors.primary[500],
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: 0,
            fontWeight: 500,
          }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p
          style={{
            fontSize: 15,
            color: designTokens.colors.neutral[200],
            margin: 0,
            paddingLeft: 15,
            fontFamily: designTokens.typography.body,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
    {children}
  </section>
)

const ColorSwatch = ({
  name,
  hex,
  isAccent,
}: {
  name: string
  hex: string
  isAccent?: boolean
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <div
      style={{
        width: isAccent ? 64 : 52,
        height: isAccent ? 64 : 52,
        borderRadius: designTokens.radii.md,
        background: hex,
        border:
          hex === "#080706" || hex === "#0C0A09" || hex === "#12100E"
            ? "1px solid #292524"
            : "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
      }}
    />
    <div>
      <div
        style={{
          fontSize: 11,
          fontFamily: designTokens.typography.mono,
          color: designTokens.colors.neutral[100],
          fontWeight: 500,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: 10,
          fontFamily: designTokens.typography.mono,
          color: designTokens.colors.neutral[300],
        }}
      >
        {hex}
      </div>
    </div>
  </div>
)

const DesignPrincipleCard = ({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) => (
  <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: designTokens.radii.md,
        border: `1px solid ${designTokens.colors.primary[700]}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontFamily: designTokens.typography.mono,
        color: designTokens.colors.primary[500],
        flexShrink: 0,
      }}
    >
      {number}
    </div>
    <div>
      <div
        style={{
          fontSize: 15,
          fontFamily: designTokens.typography.display,
          color: designTokens.colors.neutral[0],
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 13,
          fontFamily: designTokens.typography.body,
          color: designTokens.colors.neutral[200],
          lineHeight: 1.6,
        }}
      >
        {description}
      </div>
    </div>
  </div>
)

const tabs = ["Foundations", "Principles"]

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState("Foundations")

  return (
    <main className="min-h-screen bg-[#080706]">
      <Navbar />
      <PageHeader
        label="Design System"
        title="Design System"
        titleAccent="v1.0"
        description="The visual language, components, and principles that shape every pixel of this site. Product-obsessed, minimal, and bold."
      />

      <div className="px-6 lg:px-10 max-w-[1080px] mx-auto">
        {/* Badge + Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-[#3D3935]">
          <div style={{ display: "flex", gap: 4 }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 16px",
                  borderRadius: designTokens.radii.md,
                  border: "none",
                  background:
                    activeTab === tab
                      ? designTokens.colors.neutral[600]
                      : "transparent",
                  color:
                    activeTab === tab
                      ? designTokens.colors.neutral[0]
                      : designTokens.colors.neutral[200],
                  fontSize: 13,
                  fontFamily: designTokens.typography.mono,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: designTokens.radii.md,
              background: `${designTokens.colors.primary[500]}15`,
              border: `1px solid ${designTokens.colors.primary[700]}`,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: designTokens.colors.primary[500],
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontFamily: designTokens.typography.mono,
                color: designTokens.colors.primary[400],
              }}
            >
              product-obsessed · minimal · bold
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="pb-20">
          {/* FOUNDATIONS TAB */}
          {activeTab === "Foundations" && (
            <div>
              <Section
                title="Color Palette — Primary"
                subtitle="Orange inspired by Claude's warmth. The core accent that runs through every interaction."
              >
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {Object.entries(designTokens.colors.primary).map(
                    ([key, hex]) => (
                      <ColorSwatch key={key} name={key} hex={hex} />
                    )
                  )}
                </div>
              </Section>

              <Section
                title="Color Palette — Neutral"
                subtitle="Deep, warm blacks. Not blue-tinted — these have a stone/earth warmth (Stone palette) reflecting Argentine tierra."
              >
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {Object.entries(designTokens.colors.neutral).map(
                    ([key, hex]) => (
                      <ColorSwatch key={key} name={key} hex={hex} />
                    )
                  )}
                </div>
              </Section>

              <Section
                title="Color Palette — Accent"
                subtitle="Secondary accents drawn from Cosmico's pampa aesthetics: mate green, pampa gold, and Córdoba sky."
              >
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  {Object.entries(designTokens.colors.accent).map(
                    ([key, hex]) => (
                      <ColorSwatch key={key} name={key} hex={hex} isAccent />
                    )
                  )}
                </div>
              </Section>

              <Section
                title="Typography"
                subtitle="STIX Two Text — a serif with intellectual gravity. Pairs academic precision with readability. Monospace for code and metadata."
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 24 }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontFamily: designTokens.typography.mono,
                        color: designTokens.colors.neutral[300],
                        marginBottom: 8,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Display / Headlines — STIX Two Text
                    </div>
                    <div
                      style={{
                        fontSize: 40,
                        fontFamily: designTokens.typography.display,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        color: designTokens.colors.neutral[0],
                        lineHeight: 1.2,
                      }}
                    >
                      Build products, not features.
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontFamily: designTokens.typography.mono,
                        color: designTokens.colors.neutral[300],
                        marginBottom: 8,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Body — STIX Two Text Regular
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontFamily: designTokens.typography.body,
                        color: designTokens.colors.neutral[100],
                        lineHeight: 1.7,
                        maxWidth: 560,
                      }}
                    >
                      Every line of code should serve a user. Every feature
                      should solve a real problem. I believe in lean principles,
                      obsessive craft, and the power of shipping something small
                      that works beautifully.
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontFamily: designTokens.typography.mono,
                        color: designTokens.colors.neutral[300],
                        marginBottom: 8,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Mono / Metadata — JetBrains Mono
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontFamily: designTokens.typography.mono,
                        color: designTokens.colors.neutral[100],
                      }}
                    >
                      const impact = code × empathy × iteration;
                    </div>
                  </div>
                  {/* Type Scale */}
                  <div
                    style={{
                      background: designTokens.colors.neutral[800],
                      borderRadius: designTokens.radii.lg,
                      padding: 24,
                      border: `1px solid ${designTokens.colors.neutral[400]}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontFamily: designTokens.typography.mono,
                        color: designTokens.colors.neutral[300],
                        marginBottom: 16,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Type Scale
                    </div>
                    {[
                      {
                        size: 48,
                        weight: 700,
                        label: "display-lg",
                        tracking: "-0.03em",
                      },
                      {
                        size: 36,
                        weight: 700,
                        label: "display",
                        tracking: "-0.02em",
                      },
                      {
                        size: 24,
                        weight: 600,
                        label: "heading",
                        tracking: "-0.01em",
                      },
                      {
                        size: 18,
                        weight: 600,
                        label: "subheading",
                        tracking: "0",
                      },
                      { size: 16, weight: 400, label: "body", tracking: "0" },
                      {
                        size: 14,
                        weight: 400,
                        label: "body-sm",
                        tracking: "0",
                      },
                      {
                        size: 12,
                        weight: 500,
                        label: "caption (mono)",
                        tracking: "0.04em",
                        mono: true,
                      },
                    ].map((t) => (
                      <div
                        key={t.label}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 16,
                          marginBottom: 12,
                          paddingBottom: 12,
                          borderBottom: `1px solid ${designTokens.colors.neutral[400]}20`,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontFamily: designTokens.typography.mono,
                            color: designTokens.colors.neutral[300],
                            width: 100,
                            flexShrink: 0,
                          }}
                        >
                          {t.label}
                        </span>
                        <span
                          style={{
                            fontSize: t.size,
                            fontFamily: t.mono
                              ? designTokens.typography.mono
                              : designTokens.typography.display,
                            fontWeight: t.weight,
                            color: designTokens.colors.neutral[0],
                            letterSpacing: t.tracking,
                            lineHeight: 1.3,
                          }}
                        >
                          Aa
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontFamily: designTokens.typography.mono,
                            color: designTokens.colors.neutral[300],
                          }}
                        >
                          {t.size}px / {t.weight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>

              <Section
                title="Spacing & Radii"
                subtitle="4px base grid. Generous whitespace following Vercel's ethos — let content breathe."
              >
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 32,
                  }}
                >
                  {[4, 8, 12, 16, 24, 32, 48, 64, 96].map((s) => (
                    <div
                      key={s}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          width: s,
                          height: s,
                          maxWidth: 64,
                          maxHeight: 64,
                          background: `${designTokens.colors.primary[500]}25`,
                          border: `1px solid ${designTokens.colors.primary[700]}`,
                          borderRadius: 2,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: designTokens.typography.mono,
                          color: designTokens.colors.neutral[300],
                        }}
                      >
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  {Object.entries(designTokens.radii)
                    .filter(([k]) => k !== "full")
                    .map(([key, val]) => (
                      <div
                        key={key}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            background: designTokens.colors.neutral[600],
                            border: `1px solid ${designTokens.colors.neutral[400]}`,
                            borderRadius: val,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 10,
                            fontFamily: designTokens.typography.mono,
                            color: designTokens.colors.neutral[300],
                          }}
                        >
                          {key} ({val}px)
                        </span>
                      </div>
                    ))}
                </div>
              </Section>

              <Section
                title="Shadows & Effects"
                subtitle="Subtle depth with warm undertones. The glow effect uses primary orange for hover states."
              >
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  {Object.entries(designTokens.shadows).map(([key, val]) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 80,
                          height: 80,
                          background: designTokens.colors.neutral[700],
                          borderRadius: designTokens.radii.lg,
                          boxShadow: val,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: designTokens.typography.mono,
                          color: designTokens.colors.neutral[300],
                        }}
                      >
                        {key}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {/* PRINCIPLES TAB */}
          {activeTab === "Principles" && (
            <div>
              <Section
                title="Design Philosophy"
                subtitle="The intersection of Argentine warmth, Vercel precision, and product-obsessed thinking."
              >
                <div
                  style={{
                    background: designTokens.colors.neutral[800],
                    borderRadius: designTokens.radii.lg,
                    border: `1px solid ${designTokens.colors.neutral[400]}`,
                    padding: 32,
                    marginBottom: 32,
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontFamily: designTokens.typography.display,
                      fontWeight: 700,
                      color: designTokens.colors.neutral[0],
                      lineHeight: 1.4,
                      marginBottom: 16,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    &quot;Minimal is not empty.{" "}
                    <span style={{ color: designTokens.colors.primary[500] }}>
                      Minimal is intentional.
                    </span>
                    &quot;
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      fontFamily: designTokens.typography.body,
                      color: designTokens.colors.neutral[200],
                      lineHeight: 1.7,
                      margin: 0,
                      maxWidth: 600,
                    }}
                  >
                    Every element earns its place. This system combines the craft
                    of Cosmico&apos;s Argentine identity with the ruthless
                    clarity of modern product design. The result: a personal
                    brand that feels both human and forward-looking.
                  </p>
                </div>
                <DesignPrincipleCard
                  number="01"
                  title="Product Over Code"
                  description="The site communicates outcomes, not implementations. Language focuses on impact, not technology stacks."
                />
                <DesignPrincipleCard
                  number="02"
                  title="Earned Ornamentation"
                  description="Decorative elements (guarda pampa motifs, subtle textures) appear sparingly and purposefully — never for decoration alone."
                />
                <DesignPrincipleCard
                  number="03"
                  title="Warm Minimalism"
                  description="Dark doesn't mean cold. Stone-toned neutrals and orange accents create a space that feels inviting, not sterile."
                />
                <DesignPrincipleCard
                  number="04"
                  title="Lean Communication"
                  description="Every section communicates a single idea clearly. No scroll-jacking, no parallax for its own sake. Content leads."
                />
                <DesignPrincipleCard
                  number="05"
                  title="Argentine Undertone"
                  description="Cosmico's pampa aesthetic lives in the color palette and occasional motifs — never overt, always felt. Like mate in the morning."
                />
                <DesignPrincipleCard
                  number="06"
                  title="Future Oriented"
                  description="Typography, layout, and tone project forward — someone building what's next, grounded in fundamentals."
                />
              </Section>

              <Section
                title="Voice & Tone"
                subtitle="How the site speaks."
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  {[
                    {
                      label: "DO",
                      items: [
                        '"I build products that solve real problems"',
                        '"Lean, fast, purposeful"',
                        '"Craft matters"',
                        '"Córdoba → the world"',
                      ],
                      color: designTokens.colors.accent.mate,
                    },
                    {
                      label: "DON'T",
                      items: [
                        '"Full-stack developer with 5 years..."',
                        '"Passionate about clean code"',
                        '"10x engineer"',
                        '"Tech enthusiast"',
                      ],
                      color: designTokens.colors.semantic.error,
                    },
                  ].map((col) => (
                    <div
                      key={col.label}
                      style={{
                        background: designTokens.colors.neutral[800],
                        borderRadius: designTokens.radii.lg,
                        border: `1px solid ${designTokens.colors.neutral[400]}`,
                        padding: 20,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          fontFamily: designTokens.typography.mono,
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
                            fontSize: 14,
                            fontFamily: designTokens.typography.body,
                            fontStyle: "italic",
                            color: designTokens.colors.neutral[100],
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
          )}

        </div>
      </div>

      <div className="pt-24" />
      <Footer />
    </main>
  )
}
