/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core colors
        'sunglow': '#ffd13e',
        'sunglow-light': '#f2c63a',
        'sunglow-dark': '#ebb937',
        'battle-gray': '#7c786b',
        'raisin-black': '#252121',
        
        // Light theme colors
        'light-primary': '#ffffff',
        'light-secondary': '#f5f5f5',
        'light-text-primary': '#252121',
        'light-text-secondary': '#3a3636',
        'light-text-tertiary': '#4d4747',
        'light-accent-primary': '#ffd13e',
        'light-accent-secondary': '#f2c63a',
        'light-accent-tertiary': '#ebb937',
        'light-muted': '#7c786b',

        // Dark theme colors
        'dark-primary': '#252121',
        'dark-secondary': '#333030',
        'dark-text-primary': '#ffffff',
        'dark-text-secondary': '#e0e0e0',
        'dark-text-tertiary': '#c0c0c0',
        'dark-accent-primary': '#ffd13e',
        'dark-accent-secondary': '#e6bc38',
        'dark-accent-tertiary': '#cca832',
        'dark-muted': '#a09b8c',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        modern: ['Roboto', 'sans-serif'],
      },
      backdropFilter: {
        'none': 'none',
        'xs': 'blur(2px)',
        'sm': 'blur(4px)',
        'md': 'blur(8px)',
        'lg': 'blur(12px)',
        'xl': 'blur(16px)',
        '2xl': 'blur(24px)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fadeScale': 'fadeScale 0.5s ease forwards',
        'loaderAnim': 'loaderAnim 1.5s ease infinite',
        'pulseText': 'pulseText 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeScale: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        loaderAnim: {
          '0%': {
            opacity: '0',
            transform: 'scale(0) rotate(0deg)'
          },
          '20%': {
            opacity: '1',
            transform: 'scale(1) rotate(0deg)'
          },
          '60%': {
            opacity: '1',
            transform: 'scale(1) rotate(180deg)'
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0) rotate(360deg)'
          }
        },
        pulseText: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' }
        }
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.glassmorphism': {
          'background': 'rgba(255, 255, 255, 0.15)',
          'backdrop-filter': 'blur(12px)',
          'border': '1px solid rgba(255, 255, 255, 0.18)',
          'box-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        },
        '.glassmorphism-dark': {
          'background': 'rgba(37, 33, 33, 0.75)',
          'backdrop-filter': 'blur(12px)',
          'border': '1px solid rgba(122, 120, 107, 0.18)',
          'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
        },
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-lg': {
          'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.25)',
        },
        '.text-gradient': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
        '.text-gradient-gold': {
          'background-image': 'linear-gradient(to right, #ffd13e, #f7a139)',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
      });
    },
  ],
}