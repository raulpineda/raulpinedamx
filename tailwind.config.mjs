/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.njk", "./src/**/*.md", "./eleventy.config.js"],
  theme: {
    extend: {
      colors: {
        highlight: {
          DEFAULT: "#134f5c",
          light: "#2cb5a0",
        },
        surface: "#2e3235",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
