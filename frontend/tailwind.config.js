/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        secondary: "var(--color-secondary)",
        "neutral-light": "#F5F7FA",
        "neutral-medium": "#6C757D",
        "neutral-dark": "#212529",
        "background-light": "#f6f8f6",
        "background-dark": "#102213",
        "text-main": "#4A4A4A",
        "text-subtle": "#618968",
        "border-light": "#dbe6dd",
        warning: "#FFC107",
        danger: "#E57373",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
