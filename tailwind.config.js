/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Scan all JavaScript/TypeScript files
    './components/**/*.{js,jsx,ts,tsx}' // Scan component files if you're using them
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

