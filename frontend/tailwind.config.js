/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-accent': '#A37A53',
        'brand-accent-hover': '#8F6642',
        'brand-dark-900': '#171717',
        'brand-dark-800': '#1C1C1C',
        'brand-dark-700': '#2C2C2C',
        'brand-gray-500': '#737373',
        'brand-gray-400': '#878787',
        'brand-gray-300': '#B9B9B9',
        'brand-gray-200': '#D9D9D9',
        'brand-gray-100': '#E4E4E4',
        'brand-light-bg': '#F1F1F1',
        'brand-white': '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
