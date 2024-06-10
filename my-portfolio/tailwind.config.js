/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'murrey': '#82204a',
        'dark-cyan': '#558c8c',
        'flax': '#e8db7d',
        'alice-blue': '#eff7ff',
        'rich-black': '#07090f',
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
