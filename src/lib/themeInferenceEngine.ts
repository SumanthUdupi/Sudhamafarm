export type MotionProfile = 'earthy' | 'spiritual' | 'dramatic' | 'minimal'

export interface ThemeTokens {
  canvasBg: string
  textPrimary: string
  textSecondary: string
  accent: string
  accentMuted: string
  fontFamilyHead: string
  fontFamilyBody: string
  borderRadius: string
  motionProfile: MotionProfile
  overlayClass: string
  heroGradient: string
  badgeClass: string
}

const SPIRITUAL_KEYWORDS = [
  'temple', 'sacred', 'divine', 'pilgrimage', 'deity', 'jagannath',
  'shiva', 'vishnu', 'goddess', 'puja', 'dharma', 'moksha', 'mandap',
  'spire', 'vimana', 'shakti', 'mandir', 'odisha', 'konark', 'puri',
  'lingaraj', 'bhubanes', 'prasad', 'rath yatra', 'devotee', 'ritual',
]

const FARM_KEYWORDS = [
  'farm', 'harvest', 'organic', 'soil', 'crop', 'mango', 'banana',
  'cashew', 'coconut', 'jackfruit', 'cow', 'cattle', 'milk', 'produce',
  'agriculture', 'rural', 'plantation', 'grove', 'orchard', 'nature',
  'fresh', 'seasonal', 'farmhouse',
]

function score(content: string, keywords: string[]): number {
  const lower = content.toLowerCase()
  return keywords.reduce((acc, kw) => {
    const matches = (lower.match(new RegExp(kw, 'g')) ?? []).length
    return acc + matches
  }, 0)
}

export function inferTheme(content: string, category?: string): ThemeTokens {
  const spiritualScore = score(content, SPIRITUAL_KEYWORDS)
  const farmScore = score(content, FARM_KEYWORDS)

  const isSacred = spiritualScore > farmScore || category === 'pilgrimage' || category === 'temple'
  const isFarm = farmScore > spiritualScore || category === 'farm'

  if (isSacred) return SPIRITUAL_THEME
  if (isFarm) return FARM_THEME
  return DEFAULT_THEME
}

export const DEFAULT_THEME: ThemeTokens = {
  canvasBg: '#FBF9F6',
  textPrimary: '#44403C',
  textSecondary: '#78716C',
  accent: '#C27D38',
  accentMuted: '#F5EFE6',
  fontFamilyHead: '"Playfair Display", Georgia, serif',
  fontFamilyBody: '"Inter", system-ui, sans-serif',
  borderRadius: '0.75rem',
  motionProfile: 'earthy',
  overlayClass: 'from-stone-900/40 to-stone-900/70',
  heroGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
  badgeClass: 'bg-stone-100 text-stone-700 border-stone-200',
}

export const FARM_THEME: ThemeTokens = {
  canvasBg: '#F4F0E8',
  textPrimary: '#2D3A2A',
  textSecondary: '#4A5745',
  accent: '#C27D38',
  accentMuted: '#EAE5D8',
  fontFamilyHead: '"Playfair Display", Georgia, serif',
  fontFamilyBody: '"Inter", system-ui, sans-serif',
  borderRadius: '0.5rem',
  motionProfile: 'earthy',
  overlayClass: 'from-green-900/30 to-green-900/60',
  heroGradient: 'linear-gradient(to bottom, rgba(45,58,42,0.3), rgba(45,58,42,0.65))',
  badgeClass: 'bg-green-50 text-green-800 border-green-200',
}

export const SPIRITUAL_THEME: ThemeTokens = {
  canvasBg: '#0D0A07',
  textPrimary: '#F5E6C8',
  textSecondary: '#C4A265',
  accent: '#D4AF37',
  accentMuted: '#2A1F0D',
  fontFamilyHead: '"Cinzel", "Playfair Display", serif',
  fontFamilyBody: '"Inter", system-ui, sans-serif',
  borderRadius: '0.25rem',
  motionProfile: 'dramatic',
  overlayClass: 'from-orange-950/60 to-stone-950/90',
  heroGradient: 'linear-gradient(to bottom, rgba(139,0,0,0.35), rgba(10,10,10,0.85))',
  badgeClass: 'bg-amber-950 text-amber-300 border-amber-800',
}

export const MOTION_VARIANTS = {
  earthy: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
  spiritual: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.2, ease: [0.165, 0.84, 0.44, 1] },
  },
  dramatic: {
    initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
  },
  minimal: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}
