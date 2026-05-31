'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ArticleMeta } from '@/lib/contentLoader'

const FALLBACK = 'https://images.unsplash.com/photo-1591807353982-bfa33e83b4c6?q=80&w=800'

export default function BlogTeaser({ articles }: { articles: ArticleMeta[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  if (articles.length === 0) return null

  return (
    <section ref={ref} className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-2 font-medium">Travel Writing</p>
            <h2 className="font-display text-4xl text-warm-stone">Sacred Journeys</h2>
          </div>
          <Link href="/blog" className="text-sm text-terracotta border-b border-terracotta pb-0.5 hover:opacity-70 transition-opacity hidden sm:block">
            All articles →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Link href={`/blog/${article.slug}`} className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.coverImage ?? FALLBACK}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 left-3 text-xs bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-warm-stone leading-tight group-hover:text-terracotta transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-400 line-clamp-2">{article.excerpt}</p>
                  {article.location && (
                    <p className="mt-3 text-xs text-stone-400">📍 {article.location}</p>
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
