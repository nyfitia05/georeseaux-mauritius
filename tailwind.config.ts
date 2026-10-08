import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand blue — derived from the mandatory #244597, used for authority,
        // structure and most large surfaces.
        blue: {
          50: "#EEF1FA",
          100: "#DCE3F5",
          200: "#B9C8EB",
          300: "#8FA6DC",
          400: "#5D7BC7",
          500: "#2F5AAE",
          600: "#244597", // brand base
          700: "#1C3679",
          800: "#16295C",
          900: "#101D40",
        },
        // Brand yellow — derived from the mandatory #FFD409, reserved for
        // precision markers: CTAs, highlights, cartographic points.
        yellow: {
          50: "#FFFCE8",
          100: "#FFF6C2",
          200: "#FFEC85",
          300: "#FFE24D",
          400: "#FFDA26",
          500: "#FFD409", // brand base
          600: "#E0B900",
          700: "#B89800",
          800: "#8F7600",
          900: "#665500",
        },
        ink: {
          DEFAULT: "#12182B",
          soft: "#3A4258",
        },
        paper: {
          DEFAULT: "#FBFBFA",
          tint: "#F4F5F9",
        },
      },
      // Mêmes polices que les sites Water Leak (Group, Expert, Academy) :
      // Poppins pour les titres, Outfit pour le texte.
      fontFamily: {
        display: ["'Poppins'", "system-ui", "sans-serif"],
        sans: ["'Outfit'", "system-ui", "sans-serif"],
      },
      // Tailles de texte alignées sur waterleakexpert.com : texte courant en
      // 18–20 px avec un interligne aéré (1,65). Outfit est plus petite
      // qu'Inter à taille égale, d'où des valeurs un peu plus grandes que
      // celles de Tailwind par défaut. text-lg passe de 17 px (mobile) à
      // 20 px (ordinateur), comme le texte des sites Water Leak.
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.25rem" }],
        sm: ["0.9375rem", { lineHeight: "1.6" }],
        base: ["1.125rem", { lineHeight: "1.65" }],
        lg: ["var(--fs-lg)", { lineHeight: "1.65" }],
        xl: ["1.375rem", { lineHeight: "1.5" }],
      },
      maxWidth: {
        content: "1320px",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
