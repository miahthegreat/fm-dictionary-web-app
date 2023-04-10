/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          300: "#3a3a3a",
          500: "#2d2d2d",
          700: "#1f1f1f",
          900: "#050505",
        },
        neutral: {
          100: "#ffffff",
          300: "#f4f4f4",
          500: "#e9e9e9",
          700: "#757575",
        },
        accent: {
          primary: "#a445ed",
          secondary: "#ff5252",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        inconsolata: ["Inconsolata", "monospace"],
        lora: ["Lora", "serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
  darkMode: "class",
};
