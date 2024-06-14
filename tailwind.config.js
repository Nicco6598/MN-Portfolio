/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'murrey': '#FF6F61',      // Un rosso corallo vivace
        'dark-cyan': '#00B4D8',   // Un azzurro vibrante
        'flax': '#FFDA77',        // Un giallo solare e acceso
        'alice-blue': '#cfe3e6',  // Un turchese chiaro e fresco
        'rich-black': '#212121',  // Un nero intenso con un tocco di modernità
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
