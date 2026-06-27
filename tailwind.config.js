/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',     // deep charcoal
        accent: {
          DEFAULT: '#C9A227',   // gold accent
          dark: '#B28F1F',      // darker gold
        },
        'warm-gray': '#F5F5F5', // light gray
        'dark-bg': '#0E0E0E',   // dark mode background
        'dark-card': '#1A1A1A', // dark mode card background
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
