import type { Config } from "tailwindcss";

function generateShades(h, s, l, stepsize = 9) {
  const shades: Record<string, string> = {};
  shades["DEFAULT"] = `hsl(${h}, ${s}%, ${l}%)`;
  for (let i = 1; i <= 9; i++) {
    const adjustedLightness = l + (5 - i) * stepsize; // Adjust the lightness around the middle value (500)
    shades[i * 100] = `hsla(${h}, ${s}%, ${Math.min(
      Math.max(adjustedLightness, 0),
      100
    )}%)`;
  }
  return shades;
}

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        "polkadot-primary": generateShades(328, 100, 45),
        "polkadot-secondary": generateShades(257, 63, 46),
        "polkadot-tertiary": generateShades(198, 100, 50),
        "polkadot-quaternary": generateShades(146, 87, 65, 8),
        "polkadot-quinary": generateShades(73, 100, 60)
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" }
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" }
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "polkadot-colors": {
          "0%": { fill: "var(--polkadot-pink)", color: "var(--polkadot-pink)" },
          "50%": {
            fill: "var(--polkadot-purple)",
            color: "var(--polkadot-purple)"
          },
          "100%": {
            fill: "var(--polkadot-pink)",
            color: "var(--polkadot-pink)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "spin-slow": "spin-slow 30s linear infinite",
        "polkadot-colors": "polkadot-colors linear 50s infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
} satisfies Config;

export default config;
