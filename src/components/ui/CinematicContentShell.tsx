'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ThemeTokens } from '@/lib/themeInferenceEngine'
import { Article } from '@/lib/contentLoader'
import Image from 'next/image'

interface Props {
  theme: ThemeTokens
  article: Article
  children: React.ReactNode
}

export default function CinematicContentShell({ theme, article, children }: Props) {
  const shellRef = useRef<HTMLDivElement>(null)

  // Bind theme tokens to CSS custom properties on this element
  useEffect(() => {
    const el = shellRef.current
    if (!el) return
    el.style.setProperty('--active-bg', theme.canvasBg)
    el.style.setProperty('--active-text', theme.textPrimary)
    el.style.setProperty('--active-text-secondary', theme.textSecondary)
    el.style.setProperty('--active-accent', theme.accent)
    el.style.setProperty('--active-accent-muted', theme.accentMuted)
    el.style.setProperty('--active-radius', theme.borderRadius)
    el.style.setProperty('--active-font-head', theme.fontFamilyHead)
    el.style.setProperty('--active-font-body', theme.fontFamilyBody)
  }, [theme])

  const coverFallback = 'https://images.unsplash.com/photo-1591807353982-bfa33e83b4c6?q=80&w=1600'

  return (
    <div
      ref={shellRef}
      className="min-h-screen transition-colors duration-700"
      style={{ backgroundColor: theme.canvasBg, color: theme.textPrimary, fontFamily: theme.fontFamilyBody }}
    >
      {/* Cinematic Hero */}
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <Image
          src={article.coverImage ?? coverFallback}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: theme.heroGradient }}
        />

        {/* Kinetic header — velocity-synced scroll parallax via CSS */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase mb-4 font-medium"
            style={{ color: theme.accent }}
          >
            {article.category}
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl leading-tight"
            style={{ fontFamily: theme.fontFamilyHead, color: '#FFFFFF' }}
          >
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-6 text-white/70 max-w-xl text-lg leading-relaxed">
              {article.excerpt}
            </p>
          )}
          <div className="mt-8 flex items-center gap-4 text-white/50 text-sm">
            {article.location && <span>📍 {article.location}</span>}
            <span>{new Date(article.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </motion.div>
      </div>

      {/* Content area */}
      <div className="relative">
        {/* Atmospheric backdrop canvas — subtle gradient that shifts color */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(ellipse at 20% 30%, ${theme.accentMuted} 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
          {children}
        </div>
      </div>
    </div>
  )
}
