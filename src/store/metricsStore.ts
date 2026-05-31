'use client'

import { create } from 'zustand'

interface MetricPoint {
  ts: number
  value: number
}

interface MetricsState {
  totalViews: number
  totalShares: number
  interactionDensity: number
  viewsHistory: MetricPoint[]
  sharesHistory: MetricPoint[]

  incrementViews: (slug: string) => void
  incrementShares: (slug: string) => void
  seedFromArticles: (articles: { views: number; shares: number }[]) => void
}

export const useMetricsStore = create<MetricsState>((set, get) => ({
  totalViews: 0,
  totalShares: 0,
  interactionDensity: 0,
  viewsHistory: [],
  sharesHistory: [],

  incrementViews: () => {
    const now = Date.now()
    set((s) => ({
      totalViews: s.totalViews + 1,
      viewsHistory: [...s.viewsHistory.slice(-29), { ts: now, value: s.totalViews + 1 }],
      interactionDensity: Math.min(100, s.interactionDensity + 0.5),
    }))
  },

  incrementShares: () => {
    const now = Date.now()
    set((s) => ({
      totalShares: s.totalShares + 1,
      sharesHistory: [...s.sharesHistory.slice(-29), { ts: now, value: s.totalShares + 1 }],
      interactionDensity: Math.min(100, s.interactionDensity + 2),
    }))
  },

  seedFromArticles: (articles) => {
    const views = articles.reduce((a, b) => a + b.views, 0)
    const shares = articles.reduce((a, b) => a + b.shares, 0)
    const history = articles.map((a, i) => ({ ts: Date.now() - (articles.length - i) * 86400000, value: a.views }))
    set({
      totalViews: views,
      totalShares: shares,
      viewsHistory: history,
      interactionDensity: Math.min(100, Math.round((shares / Math.max(views, 1)) * 200)),
    })
  },
}))
