import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/contentLoader'
import BlogGrid from '@/components/blog/BlogGrid'

export const metadata: Metadata = {
  title: 'Sacred Journeys',
  description: 'Cinematic travel essays on Odisha\'s temples, pilgrimages, and living heritage.',
}

export default function BlogPage() {
  const articles = getAllArticles().filter((a) => a.status === 'published')
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <header className="mb-14 space-y-3">
          <p className="text-xs tracking-[0.25em] uppercase text-terracotta font-medium">Sacred Journeys</p>
          <h1 className="font-display text-5xl md:text-6xl text-warm-stone leading-tight">
            Odisha&apos;s Living Heritage
          </h1>
          <p className="text-stone-500 max-w-lg text-lg leading-relaxed">
            Pilgrimage essays, temple histories, and cinematic travel writing from
            the soul of eastern India.
          </p>
        </header>
        <BlogGrid articles={articles} />
      </div>
    </div>
  )
}
