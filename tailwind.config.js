/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'murrey': '#1F2937',      // Un grigio antracite
        'dark-cyan': '#3B82F6',   // Un blu vivace
        'flax': '#10B981',        // Un verde smeraldo
        'alice-blue': '#F3F4F6',  // Un grigio molto chiaro
        'rich-black': '#111827',  // Un nero intenso
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        modern: ['Roboto', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
