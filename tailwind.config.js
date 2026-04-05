/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uzBlue: '#003366',
        uzYellow: '#FFD700',
      }
    },
  },
  plugins: [],
}