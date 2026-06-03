'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUIStore } from '@/store/uiStore'

const SEARCH_INDEX = [
  { label: 'Home', href: '/', category: 'Navigation' },
  { label: 'The Farmhouse', href: '/#farmhouse', category: 'Sections' },
  { label: 'Our Farm', href: '/#farm', category: 'Sections' },
  { label: 'Our Cows', href: '/#cows', category: 'Sections' },
  { label: 'Our Story', href: '/#story', category: 'Sections' },
  { label: 'Location', href: '/#location', category: 'Sections' },
  { label: 'FAQ', href: '/#faq', category: 'Sections' },
  { label: 'Sacred Journeys', href: '/blog', category: 'Content' },
  { label: 'Products', href: '/#farm', category: 'Sections' },
  { label: 'Practices', href: '/#farm', category: 'Sections' },
  { label: 'Dairy Vision', href: '/#cows', category: 'Sections' },
  { label: 'Contact', href: '/#location', category: 'Sections' },
]

export default function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(SEARCH_INDEX)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('')
      setSelected(0)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [commandPaletteOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults(SEARCH_INDEX)
      return
    }
    const filtered = SEARCH_INDEX.filter(
      (item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered)
    setSelected(0)
  }, [query])

  const onSelect = (href: string) => {
    setCommandPaletteOpen(false)
    setQuery('')
  }

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm"
          onClick={() => setCommandPaletteOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-20 w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-lg border border-stone-200 bg-white shadow-xl overflow-hidden">
              <div className="border-b border-stone-100 p-4">
                <input
                  type="text"
                  placeholder="Search sections, products, content..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault()
                      setSelected((s) => Math.min(s + 1, results.length - 1))
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault()
                      setSelected((s) => Math.max(s - 1, 0))
                    } else if (e.key === 'Enter' && results[selected]) {
                      onSelect(results[selected].href)
                    } else if (e.key === 'Escape') {
                      setCommandPaletteOpen(false)
                    }
                  }}
                  className="w-full bg-transparent font-inter text-sm outline-none"
                  autoFocus
                />
              </div>

              <div className="max-h-96 overflow-y-auto">
                {results.length === 0 ? (
                  <div className="p-4 text-center font-inter text-sm text-stone-500">
                    No results found
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100">
                    {results.map((item, i) => (
                      <Link key={item.href} href={item.href} onClick={() => onSelect(item.href)}>
                        <div
                          className={`px-4 py-3 cursor-pointer transition-colors ${
                            i === selected ? 'bg-terracotta/10' : 'hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-inter text-sm font-medium text-stone-900">
                                {item.label}
                              </p>
                              <p className="font-inter text-[0.7rem] text-stone-500 mt-1">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
