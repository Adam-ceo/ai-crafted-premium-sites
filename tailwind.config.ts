import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // shadcn HSL tokens (kept for shadcn ui components)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
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
        serif: ["var(--ff-serif)"],
        sans:  ["var(--ff-sans)"],
        mono:  ["var(--ff-mono)"],
      },
      fontSize: {
        xs:   "var(--text-xs)",
        sm:   "var(--text-sm)",
        base: "var(--text-base)",
        md:   "var(--text-md)",
        lg:   "var(--text-lg)",
        xl:   "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
      },
      fontWeight: {
        light:    "var(--fw-light)",
        normal:   "var(--fw-regular)",
        medium:   "var(--fw-medium)",
        semibold: "var(--fw-semi)",
        bold:     "var(--fw-bold)",
      },
      letterSpacing: {
        tight:   "var(--ls-tight)",
        snug:    "var(--ls-snug)",
        normal:  "var(--ls-normal)",
        "mono-sm": "var(--ls-mono-sm)",
        mono:    "var(--ls-mono)",
      },
      borderRadius: {
        none: "0px",
        sm:   "var(--r-sm)",
        DEFAULT: "var(--r-md)",
        md:   "var(--r-md)",
        lg:   "var(--r-lg)",
        xl:   "var(--r-xl)",
        "2xl":"var(--r-2xl)",
        full: "var(--r-full)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
