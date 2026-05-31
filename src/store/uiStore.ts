'use client'

import { create } from 'zustand'
import { ThemeTokens, DEFAULT_THEME } from '@/lib/themeInferenceEngine'

interface UIState {
  activeTheme: ThemeTokens
  setActiveTheme: (theme: ThemeTokens) => void

  commandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void

  drawerArticleSlug: string | null
  setDrawerArticleSlug: (slug: string | null) => void

  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  activeTheme: DEFAULT_THEME,
  setActiveTheme: (theme) => set({ activeTheme: theme }),

  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

  drawerArticleSlug: null,
  setDrawerArticleSlug: (slug) => set({ drawerArticleSlug: slug }),

  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}))
