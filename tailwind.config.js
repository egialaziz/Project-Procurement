/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Tambahkan semua class di sini
    "max-w-[80px]", "max-h-[80px]", "object-contain", "w-auto", "h-auto", "mx-auto", "rounded",
    "flex", "flex-col", "lg:flex-row", "justify-center", "items-center", "items-start",
    "p-10", "py-12", "px-6", "lg:w-1/2", "w-full", "h-full", "min-h-screen",
    "text-orange-600", "text-gray-700", "text-white", "bg-black", "hover:bg-gray-800",
    "bg-[#fff5e6]", "uppercase", "tracking-wide",
    "rounded-full", "transition", "hover:bg-orange-600",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
