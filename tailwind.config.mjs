/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.njk", "./src/**/*.md", "./eleventy.config.js"],
  theme: {
    extend: {
      colors: {
        highlight: "#134f5c",
      },
      keyframes: {
        "slide-in": {
          from: { opacity: "0", transform: "translateX(100px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
