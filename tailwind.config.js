/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Layout & Flex
    "flex", "flex-col", "lg:flex-row", "justify-center", "items-center", "items-start",
    "grid", "grid-cols-1", "md:grid-cols-4",
    "w-full", "h-full", "min-h-screen", "lg:w-1/2", "min-w-full", "max-w-sm", "max-w-[80px]", "max-h-[80px]",
    "w-auto", "h-auto", "mx-auto",

    // Padding & Margin
    "p-4", "p-10", "px-4", "px-6", "py-2", "py-4", "py-6", "py-12", "mb-4", "mb-6", "ml-4", "gap-4", "space-y-4",

    // Typography
    "text-sm", "text-lg", "text-2xl", "text-3xl", "text-gray-700", "text-gray-600", "text-orange-600", "text-orange-700", "text-white", "text-black",
    "font-bold", "font-medium", "font-semibold", "font-extrabold",
    "uppercase", "tracking-wide", "text-center",

    // Backgrounds & Borders
    "bg-white", "bg-black", "bg-gray-300", "bg-gray-400", "bg-[#fff5e6]",
    "bg-blue-500", "hover:bg-blue-600", "bg-green-500", "hover:bg-green-600",
    "bg-orange-100", "bg-orange-200", "hover:bg-orange-100", "hover:bg-orange-600",
    "border", "border-orange-400", "border-collapse", "rounded", "rounded-full", "shadow", "shadow-lg", "drop-shadow-sm", "drop-shadow-lg",

    // Transitions & Hover
    "hover:bg-gray-800", "transition", "hover:scale-105",

    // Animations (tambahan animasi kustom kamu)
    "animate-fade-in", "animate-slide-down", "animate-zoom-in", "animate-bounce-slow",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
