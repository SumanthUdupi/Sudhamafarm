'use client'

import { useState, useRef, useCallback } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { motion, AnimatePresence } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import type { ArticleMeta } from '@/lib/contentLoader'
import { useUIStore } from '@/store/uiStore'

const STATUS_COLORS: Record<string, string> = {
  published: 'text-emerald-400 bg-emerald-950 border-emerald-800',
  draft: 'text-zinc-400 bg-zinc-800 border-zinc-700',
  scheduled: 'text-amber-400 bg-amber-950 border-amber-800',
}

type SortKey = 'title' | 'category' | 'publishedAt' | 'status' | 'views' | 'shares'

export default function ContentTable({ articles }: { articles: ArticleMeta[] }) {
  const parentRef = useRef<HTMLDivElement>(null)
  const { drawerArticleSlug, setDrawerArticleSlug } = useUIStore()
  const [sortKey, setSortKey] = useState<SortKey>('publishedAt')
  const [sortDir, setSortDir] = useState<1 | -1>(-1)

  const sorted = [...articles].sort((a, b) => {
    const av = a[sortKey] ?? ''
    const bv = b[sortKey] ?? ''
    return av < bv ? -sortDir : av > bv ? sortDir : 0
  })

  const toggleSort = useCallback((key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 1 ? -1 : 1))
    else { setSortKey(key); setSortDir(-1) }
  }, [sortKey])

  const rowVirtualizer = useVirtualizer({
    count: sorted.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
    overscan: 5,
  })

  const drawerArticle = drawerArticleSlug ? articles.find((a) => a.slug === drawerArticleSlug) : null

  const COL_HEADERS: { key: SortKey; label: string; width: string }[] = [
    { key: 'title', label: 'Title', width: '2fr' },
    { key: 'category', label: 'Category', width: '1fr' },
    { key: 'status', label: 'Status', width: '0.8fr' },
    { key: 'publishedAt', label: 'Published', width: '1fr' },
    { key: 'views', label: 'Views', width: '0.6fr' },
    { key: 'shares', label: 'Shares', width: '0.6fr' },
  ]

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      {/* Header row */}
      <div
        className="grid text-xs uppercase tracking-widest text-zinc-500 border-b border-zinc-800 px-4 py-3"
        style={{ gridTemplateColumns: COL_HEADERS.map((c) => c.width).join(' ') }}
      >
        {COL_HEADERS.map((col) => (
          <button
            key={col.key}
            className="text-left flex items-center gap-1 hover:text-zinc-300 transition-colors"
            onClick={() => toggleSort(col.key)}
          >
            {col.label}
            {sortKey === col.key && <span>{sortDir === 1 ? '↑' : '↓'}</span>}
          </button>
        ))}
      </div>

      {/* Virtualized rows */}
      <div ref={parentRef} className="overflow-auto" style={{ height: '420px' }}>
        <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
          {rowVirtualizer.getVirtualItems().map((vRow) => {
            const article = sorted[vRow.index]
            return (
              <div
                key={article.slug}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', transform: `translateY(${vRow.start}px)` }}
              >
                <button
                  className={`w-full grid text-sm px-4 py-3.5 hover:bg-zinc-800 transition-colors border-b border-zinc-800/60 text-left ${
                    drawerArticleSlug === article.slug ? 'bg-zinc-800' : ''
                  }`}
                  style={{ gridTemplateColumns: COL_HEADERS.map((c) => c.width).join(' ') }}
                  onClick={() => setDrawerArticleSlug(drawerArticleSlug === article.slug ? null : article.slug)}
                >
                  <span className="text-zinc-100 truncate pr-2 font-medium">{article.title}</span>
                  <span className="text-zinc-400 truncate">{article.category}</span>
                  <span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[article.status] ?? STATUS_COLORS.draft}`}>
                      {article.status}
                    </span>
                  </span>
                  <span className="text-zinc-500 font-mono text-xs tabular-nums">
                    {format(parseISO(article.publishedAt), 'dd MMM yy')}
                  </span>
                  <span className="text-zinc-400 font-mono tabular-nums">{article.views.toLocaleString()}</span>
                  <span className="text-zinc-400 font-mono tabular-nums">{article.shares.toLocaleString()}</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Side drawer */}
      <AnimatePresence>
        {drawerArticle && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed right-0 top-0 h-full w-80 bg-zinc-900 border-l border-zinc-700 shadow-2xl z-50 p-6 overflow-y-auto"
          >
            <button
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 text-xl"
              onClick={() => setDrawerArticleSlug(null)}
            >
              ×
            </button>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Article Analytics</p>
            <h3 className="font-display text-zinc-100 text-xl leading-tight mb-6">{drawerArticle.title}</h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Views', value: drawerArticle.views },
                { label: 'Shares', value: drawerArticle.shares },
              ].map((stat) => (
                <div key={stat.label} className="bg-zinc-800 rounded-lg p-4 text-center">
                  <p className="text-2xl font-mono font-semibold text-zinc-100">{stat.value.toLocaleString()}</p>
                  <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm">
              {[
                { label: 'Category', value: drawerArticle.category },
                { label: 'Status', value: drawerArticle.status },
                { label: 'Published', value: format(parseISO(drawerArticle.publishedAt), 'PPP') },
                ...(drawerArticle.scheduledFor
                  ? [{ label: 'Scheduled for', value: format(parseISO(drawerArticle.scheduledFor), 'PPP') }]
                  : []),
                ...(drawerArticle.location ? [{ label: 'Location', value: drawerArticle.location }] : []),
              ].map((row) => (
                <div key={row.label} className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">{row.label}</span>
                  <span className="text-zinc-200 font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            {drawerArticle.tags.length > 0 && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {drawerArticle.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
