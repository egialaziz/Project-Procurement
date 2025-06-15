/** @type {import('tailwindcss').Config} */

// Trigger build
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "border",
    "border-orange-400",
    "bg-orange-200",
    "bg-orange-100",
    "hover:bg-orange-50",
    "rounded",
    "shadow",
    "overflow-x-auto"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
