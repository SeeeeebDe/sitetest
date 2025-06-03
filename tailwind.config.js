/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zen': {
          'beige': '#F5F5F5',
          'taupe': '#4A4A4A',
          'gray': {
            'light': '#6B7280',
            'dark': '#4A4A4A'
          }
        }
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'zen': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }
    },
  },
  plugins: [],
}
