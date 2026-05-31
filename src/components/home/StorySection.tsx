'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function StorySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="story" ref={ref} className="py-20 md:py-28 bg-stone-50 border-t border-stone-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            <span className="font-inter label-eyebrow">How It Began</span>
            <h2 className="font-playfair text-3xl md:text-4xl text-stone-900 leading-tight">
              The Second Innings
            </h2>
            <p className="font-inter text-stone-600 leading-relaxed text-sm">
              After decades in the city, Sudha &amp; Girish felt a calling —
              to return to their roots, cultivate a life of purpose, and live
              in honest connection with the earth.
            </p>
            <div className="space-y-4 pt-2">
              {[
                { year: '2019', event: 'Left city life behind' },
                { year: '2021', event: 'First rescue cow, Gauri' },
                { year: '2023', event: 'First full organic harvest' },
              ].map((t, i) => (
                <motion.div key={t.year}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="font-inter font-bold text-terracotta w-12 text-sm flex-shrink-0">{t.year}</span>
                  <div className="h-px flex-1 bg-stone-200" />
                  <span className="font-inter text-stone-500 text-sm">{t.event}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — founder note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="bg-white border border-stone-100 rounded-2xl p-8 space-y-4 shadow-sm"
          >
            <p className="font-inter text-[0.6rem] tracking-[0.3em] uppercase text-stone-400">
              Founder&apos;s Note
            </p>
            <blockquote className="space-y-3">
              <p className="font-prose text-stone-600 leading-relaxed text-[0.925rem] italic">
                &ldquo;The decision to leave our urban life behind was not easy,
                but it was necessary. We felt a calling to return to our roots —
                to cultivate a life of purpose and intention.
              </p>
              <p className="font-prose text-stone-600 leading-relaxed text-[0.925rem] italic">
                SuDhama is our answer to that call. A testament to the power
                of nature to heal, inspire, and transform.&rdquo;
              </p>
            </blockquote>
            <footer className="flex items-center gap-3 pt-2">
              <div className="w-6 h-px bg-terracotta" />
              <span className="font-playfair text-stone-800 text-sm">Sudha &amp; Girish</span>
            </footer>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
