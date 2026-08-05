import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dorado: {
          50: "#FFFBEA",
          100: "#FFF3C4",
          200: "#FCE588",
          300: "#FADB5F",
          400: "#F7C948",
          500: "#F0B429",
          600: "#DE911D",
          700: "#CB6E17",
          800: "#B44D12",
          900: "#8D2B0B",
        },
        fuego: {
          400: "#FF8A65",
          500: "#FF5A36",
          600: "#E63946",
          700: "#C81E3A",
        },
        noche: {
          700: "#1E2F5C",
          800: "#16234A",
          900: "#0B1633",
        },
      },
      fontSize: {
        // Escala pensada para adultos mayores: nunca menor a 16px.
        base: ["1.0625rem", "1.6"],
        lg: ["1.25rem", "1.6"],
        xl: ["1.5rem", "1.5"],
        "2xl": ["1.875rem", "1.4"],
        "3xl": ["2.25rem", "1.3"],
      },
      minHeight: {
        touch: "3rem",
      },
    },
  },
  plugins: [],
};

export default config;
