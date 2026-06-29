
/** @type {import('tailwindcss').Config} */
module.exports = {
  // This is the magic line that connects Tailwind to your React code
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}