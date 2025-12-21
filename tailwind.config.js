
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        cream: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F5F2ED',
        },
        green: {
          950: '#0F2818',
          900: '#1A3D2B',
          800: '#254D3A',
          700: '#2F6049',
        },
        blush: {
          100: '#FFE5E5',
          200: '#FFD1D1',
          300: '#FFB8B8',
        },
        charcoal: {
          900: '#2D2D2D',
          800: '#3D3D3D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
