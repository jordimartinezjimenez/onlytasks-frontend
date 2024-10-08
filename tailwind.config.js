/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#10a09e',
      },
      backgroundColor: {
        'primary': '#10a09e',
      },
      borderColor: {
        'primary': '#10a09e',
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

