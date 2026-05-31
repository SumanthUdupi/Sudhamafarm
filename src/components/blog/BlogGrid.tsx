'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ArticleMeta } from '@/lib/contentLoader'

const FALLBACK = 'https://images.unsplash.com/photo-1591807353982-bfa33e83b4c6?q=80&w=800'

const ALL_CATEGORIES = 'All'

export default function BlogGrid({ articles }: { articles: ArticleMeta[] }) {
  const categories = [ALL_CATEGORIES, ...Array.from(new Set(articles.map((a) => a.category)))]
  const [active, setActive] = useState(ALL_CATEGORIES)

  const filtered = active === ALL_CATEGORIES ? articles : articles.filter((a) => a.category === active)

  return (
    <div>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active === cat
                ? 'bg-terracotta text-white'
                : 'border border-stone-200 text-stone-500 hover:border-terracotta hover:text-terracotta'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {filtered.map((article, i) => (
          <motion.article
            key={article.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
          >
            <Link
              href={`/blog/${article.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={article.coverImage ?? FALLBACK}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-106"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-terracotta font-medium tracking-wide uppercase">{article.category}</span>
                  {article.location && (
                    <>
                      <span className="text-stone-200">·</span>
                      <span className="text-xs text-stone-400">📍 {article.location}</span>
                    </>
                  )}
                </div>
                <h2 className="font-display text-xl text-warm-stone leading-tight group-hover:text-terracotta transition-colors">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-stone-400 line-clamp-3 leading-relaxed">{article.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-stone-300">
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span className="text-terracotta opacity-0 group-hover:opacity-100 transition-opacity">Read →</span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-stone-400 py-20">No articles in this category yet.</p>
      )}
    </div>
  )
}
