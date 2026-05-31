'use client'

import { useEffect } from 'react'
import { useMetricsStore } from '@/store/metricsStore'

export default function ArticleViewTracker({ slug }: { slug: string }) {
  const incrementViews = useMetricsStore((s) => s.incrementViews)
  useEffect(() => {
    incrementViews(slug)
  }, [slug, incrementViews])
  return null
}
