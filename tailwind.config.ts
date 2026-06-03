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
        // Extended palette
        'burnt-orange': '#A0522D',
        'deep-gold': '#D4A574',
        'deep-sage': '#556B5D',
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
        'ken-burns': 'kenBurns 30s ease-in-out infinite alternate',
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
        kenBurns: {
          from: { backgroundPosition: '0% 0%', backgroundSize: '120% auto' },
          to: { backgroundPosition: '20% 20%', backgroundSize: '110% auto' },
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
