/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./jai_jagannath.html"],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#FF5722',
        'brand-blue': '#2196F3',
        'brand-green': '#4CAF50',
      },
      fontFamily: {
        'heading': ['Merriweather', 'serif'],
        'body': ['Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}