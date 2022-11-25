/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#18181A",
        secondary: "#262628",
        tertiary: "#181819",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
