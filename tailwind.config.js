
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          500: '#667eea',
          600: '#5568d3',
          700: '#4555bb',
        },
        secondary: {
          50: '#faf5ff',
          500: '#764ba2',
          600: '#6b3f91',
          700: '#5f3380',
        },
        emergency: {
          500: '#fc4a1a',
          600: '#e63900',
        },
        success: {
          500: '#22c55e',
          600: '#16a34a',
        }
      }
    }
  },
  plugins: [],
}
