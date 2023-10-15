/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#6528F7",
        "secondary": "#ffffff",
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
