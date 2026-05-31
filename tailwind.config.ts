import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Farm palette
        coconut: '#FBF9F6',
        terracotta: '#C27D38',
        forest: '#4A5745',
        'warm-stone': '#44403C',
        // Temple / spiritual palette
        saffron: '#FF9933',
        crimson: '#8B0000',
        'deep-ochre': '#CC7722',
        'temple-black': '#0A0A0A',
        'sacred-gold': '#D4AF37',
        // Neutral
        'ink': '#1A1A1A',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'slow-zoom': 'slowZoom 20s infinite alternate ease-in-out',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        slowZoom: {
          from: { backgroundSize: '100% auto' },
          to: { backgroundSize: '108% auto' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'grain': "url('https://www.transparenttextures.com/patterns/subtle-grain.png')",
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
