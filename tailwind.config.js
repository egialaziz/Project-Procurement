/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
 safelist: [
  "max-w-[80px]", "max-h-[80px]", "object-contain", "w-auto", "h-auto", "mx-auto", "rounded",
],
  theme: {
    extend: {},
  },
  plugins: [],
}
