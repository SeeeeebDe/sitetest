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
          'beige': '#F5EBE0',
          'cream': '#FAF7F2',
          'sage': '#9CAF88',
          'forest': '#6B8E5A',
          'taupe': '#8B7355',
          'earth': '#A0826D',
          'stone': '#7D6E5B',
          'gray': {
            'light': '#B8AFA0',
            'medium': '#8B7D6B',
            'dark': '#5D5347'
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
