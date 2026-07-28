/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#b3cdff',
          300: '#80acff',
          400: '#4d8bff',
          500: '#1a6aff',
          600: '#0050e6',
          700: '#003db3',
          800: '#002a80',
          900: '#001a4d'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
