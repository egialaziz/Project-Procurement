/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Ukuran gambar dinamis
    "w-16", "h-16", "object-cover", "rounded", "mx-auto",
    
    // Utility layout
    "object-cover", "object-contain", "rounded", "rounded-lg", "rounded-xl",
    
    // Z-index dan layering
    "z-10", "-z-10", "z-20", "-z-20", "z-30", "-z-50", "z-50",
    
    // Background dan overlay
    "bg-black/30", "bg-black/40", "bg-black/50", "bg-white/90", "bg-white/95", "bg-white/80",
    
    // Blur dan transparansi
    "backdrop-blur-sm", "backdrop-blur-md", "opacity-60", "opacity-70", "opacity-80"
  ],
  theme: {
    extend: {
      zIndex: {
        '-50': '-50',
      },
      opacity: {
        '60': '0.6',
        '70': '0.7',
        '80': '0.8',
        '90': '0.9',
        '95': '0.95',
      },
    },
  },
  plugins: [],
};
