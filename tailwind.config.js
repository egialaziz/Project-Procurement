/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "w-16",
    "h-16",
    "object-cover",
    "rounded",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
