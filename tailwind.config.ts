import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "var(--container-px)",
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        "surface-elevated": "hsl(var(--surface-elevated))",
        "surface-inverse": "hsl(var(--surface-inverse))",
        ink: {
          DEFAULT: "hsl(var(--ink))",
          mid: "hsl(var(--ink-mid))",
          low: "hsl(var(--ink-low))",
          faint: "hsl(var(--ink-faint))",
        },
        hairline: {
          DEFAULT: "hsl(var(--hairline))",
          strong: "hsl(var(--hairline-strong))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          soft: "hsl(var(--accent-soft))",
          strong: "hsl(var(--accent-strong))",
          foreground: "hsl(var(--background))",
        },
        inverse: {
          bg: "hsl(var(--inverse-bg))",
          fg: "hsl(var(--inverse-fg))",
          mid: "hsl(var(--inverse-mid))",
          hairline: "hsl(var(--inverse-hairline))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Times New Roman", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Editorial scale
        "display-xl": ["clamp(64px, 9vw, 152px)", { lineHeight: "0.94", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(48px, 6.5vw, 104px)", { lineHeight: "0.96", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(40px, 5vw, 72px)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(32px, 3.6vw, 52px)", { lineHeight: "1.08", letterSpacing: "-0.018em" }],
        "h1": ["clamp(36px, 4.4vw, 64px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "h2": ["clamp(28px, 3.2vw, 44px)", { lineHeight: "1.12", letterSpacing: "-0.018em" }],
        "h3": ["clamp(22px, 2.2vw, 30px)", { lineHeight: "1.2", letterSpacing: "-0.014em" }],
        "h4": ["18px", { lineHeight: "1.35", letterSpacing: "-0.008em" }],
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "-0.005em" }],
        "body": ["16px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.55" }],
        "caption": ["12px", { lineHeight: "1.45", letterSpacing: "0.01em" }],
        "mono-num": ["14px", { lineHeight: "1", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "section": "clamp(80px, 12vw, 160px)",
        "section-sm": "clamp(56px, 8vw, 96px)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 1px)",
        sm: "2px",
      },
      boxShadow: {
        elevated: "var(--shadow-elevated)",
        soft: "var(--shadow-soft)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.24s var(--ease-editorial)",
        "accordion-up": "accordion-up 0.24s var(--ease-editorial)",
        "fade-in": "fade-in 0.5s var(--ease-editorial)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
