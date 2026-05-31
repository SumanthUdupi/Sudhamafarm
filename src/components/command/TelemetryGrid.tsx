'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMetricsStore } from '@/store/metricsStore'
import type { ArticleMeta } from '@/lib/contentLoader'

function Sparkline({ data, color = '#10b981' }: { data: number[]; color?: string }) {
  if (data.length < 2) return <div className="h-10 w-full bg-zinc-800 rounded animate-pulse" />
  const max = Math.max(...data, 1)
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`)
    .join(' ')

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-10 w-full">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

const CARDS = [
  { key: 'views', label: 'Total Views', color: '#10b981', icon: '👁' },
  { key: 'shares', label: 'Multi-Platform Shares', color: '#f59e0b', icon: '↗' },
  { key: 'density', label: 'Interaction Density', color: '#8b5cf6', icon: '⚡' },
]

export default function TelemetryGrid({ articles }: { articles: ArticleMeta[] }) {
  const { totalViews, totalShares, interactionDensity, viewsHistory, sharesHistory, seedFromArticles } =
    useMetricsStore()

  useEffect(() => {
    seedFromArticles(articles)
  }, [articles, seedFromArticles])

  const values: Record<string, number> = {
    views: totalViews,
    shares: totalShares,
    density: Math.round(interactionDensity),
  }
  const historyMap: Record<string, number[]> = {
    views: viewsHistory.map((p) => p.value),
    shares: sharesHistory.map((p) => p.value),
    density: viewsHistory.map((_, i) => Math.round(((i + 1) / viewsHistory.length) * interactionDensity)),
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {CARDS.map((card, i) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-zinc-500">{card.label}</p>
            <span className="text-base">{card.icon}</span>
          </div>
          <p className="text-3xl font-mono font-semibold text-zinc-100 tabular-nums">
            {values[card.key].toLocaleString()}
            {card.key === 'density' && '%'}
          </p>
          <Sparkline data={historyMap[card.key] ?? [0, 1]} color={card.color} />
        </motion.div>
      ))}
    </div>
  )
}
