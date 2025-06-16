/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "w-[112px]",
    "h-[112px]",
    "w-28",
    "h-28",
    "w-16",
    "h-16",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
