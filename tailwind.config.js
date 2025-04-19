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
          50: '#e6f7ff',
          100: '#b3e0ff',
          200: '#80caff',
          300: '#4db5ff',
          400: '#1a9fff',
          500: '#0089e6',
          600: '#0073cc',
          700: '#005cb3',
          800: '#004699',
          900: '#003080',
        },
        secondary: {
          50: '#e6fff2',
          100: '#b3ffdc',
          200: '#80ffc5',
          300: '#4dffaf',
          400: '#1aff98',
          500: '#00e680',
          600: '#00cc70',
          700: '#00b360',
          800: '#009950',
          900: '#008040',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      }
    },
  },
  plugins: [],
}