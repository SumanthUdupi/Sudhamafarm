'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ThemeTokens, DEFAULT_THEME } from '@/lib/themeInferenceEngine'

interface Props {
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
  theme?: ThemeTokens
  aspectRatio?: string
}

export default function LensSlide({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  theme = DEFAULT_THEME,
  aspectRatio = '16/9',
}: Props) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none rounded-lg cursor-ew-resize"
      style={{ aspectRatio, borderRadius: theme.borderRadius }}
      onMouseMove={(e) => dragging && updatePosition(e.clientX)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
    >
      {/* After image (full width, clipped on left by slider) */}
      <div className="absolute inset-0">
        <Image src={afterSrc} alt={afterLabel} fill className="object-cover" />
      </div>

      {/* Before image (clipped on the right by slider position) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={beforeSrc} alt={beforeLabel} fill className="object-cover" />
      </div>

      {/* Labels */}
      <span
        className="absolute left-4 bottom-4 text-xs font-medium tracking-widest uppercase px-2 py-1 rounded"
        style={{ background: theme.accentMuted, color: theme.accent, borderRadius: theme.borderRadius }}
      >
        {beforeLabel}
      </span>
      <span
        className="absolute right-4 bottom-4 text-xs font-medium tracking-widest uppercase px-2 py-1 rounded"
        style={{ background: theme.accentMuted, color: theme.accent, borderRadius: theme.borderRadius }}
      >
        {afterLabel}
      </span>

      {/* Drag handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-0.5 z-10 flex items-center justify-center"
        style={{ left: `${position}%`, x: '-50%', background: theme.accent }}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
        whileHover={{ scaleX: 1.5 }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-white text-xs select-none"
          style={{ background: theme.accent }}
        >
          ⇔
        </div>
      </motion.div>
    </div>
  )
}
