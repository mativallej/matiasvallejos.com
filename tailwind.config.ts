import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Custom portfolio tokens
        surface: "#12100E",
        elevated: "#171412",
        "neutral-400": "#3D3935",
        "neutral-900": "#080706",
        "text-body": "#A8A29E",
        "text-secondary": "#78716C",
        "text-muted": "#57534E",
        "brand-orange": "#E8742A",
        "brand-hover": "#D4622A",
        "accent-text": "#FB923C",
        "accent-mate": "#A3B86C",
        "accent-pampa": "#D4A76A",
        "accent-sky": "#7CA5C4",
      },
      fontFamily: {
        sans: ["STIX Two Text", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-lg": [
          "48px",
          { lineHeight: "1.15", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        display: [
          "36px",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        heading: [
          "24px",
          { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        subheading: [
          "18px",
          { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        body: ["16px", { lineHeight: "1.7", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.6", fontWeight: "400" }],
        caption: [
          "12px",
          { lineHeight: "1.4", letterSpacing: "0.04em", fontWeight: "500" },
        ],
        micro: [
          "11px",
          { lineHeight: "1.4", letterSpacing: "0.04em", fontWeight: "500" },
        ],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        glow: "0 0 24px rgba(232,116,42,0.15)",
        "glow-strong": "0 0 48px rgba(232,116,42,0.25)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
