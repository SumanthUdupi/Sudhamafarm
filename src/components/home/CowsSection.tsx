'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'

const HERD = [
  { name: 'Gauri',   src: '/images/Gauri.jpg',   desc: 'Rescued 2021 — gentle matriarch of the goshala.' },
  { name: 'Krishna', src: '/images/Krishna.jpg',  desc: 'Playful spirit. Loves morning porridge and open sky.' },
]

export default function CowsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [current, setCurrent] = useState(0)
  const [dairyOpen, setDairyOpen] = useState(false)

  return (
    <section id="cows" ref={ref} className="py-20 md:py-28 bg-[#FDFBF7] border-t border-stone-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-xl overflow-hidden bg-stone-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-72"
                >
                  <Image
                    src={HERD[current].src}
                    alt={HERD[current].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-playfair text-white text-xl">{HERD[current].name}</p>
                    <p className="font-inter text-white/65 text-xs mt-0.5">{HERD[current].desc}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <button type="button" aria-label="Previous cow"
                onClick={() => setCurrent((c) => (c - 1 + HERD.length) % HERD.length)}
                className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-sm flex items-center justify-center transition-colors">
                ‹
              </button>
              <button type="button" aria-label="Next cow"
                onClick={() => setCurrent((c) => (c + 1) % HERD.length)}
                className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-sm flex items-center justify-center transition-colors">
                ›
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {HERD.map((cow, i) => (
                <button key={cow.name} type="button" aria-label={`Go to ${cow.name}`}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${i === current ? 'w-5 h-1.5 bg-terracotta' : 'w-1.5 h-1.5 bg-stone-300'}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <span className="font-inter label-eyebrow">Living with Reverence</span>
            <h2 className="font-playfair text-3xl md:text-4xl text-stone-900 leading-tight">
              More Than a Goshala,<br />
              <span className="text-forest">It&apos;s a Family</span>
            </h2>
            <p className="font-inter text-stone-600 leading-relaxed text-sm">
              Our desi cows roam freely on open pasture, never separated from
              their calves. The A2 milk they give flows only when the calf has
              taken its fill.
            </p>
            <blockquote className="border-l-2 border-stone-200 pl-4">
              <p className="font-prose text-stone-500 text-sm italic leading-relaxed">
                &ldquo;They bring us peace and rhythm.&rdquo;
              </p>
              <footer className="font-inter text-stone-400 text-[0.6rem] tracking-widest uppercase mt-1.5">
                — Sudha &amp; Girish
              </footer>
            </blockquote>
            <div className="flex gap-6">
              {[['Desi / Gir', 'Breed'], ['A2 only', 'Milk'], ['Ahimsa', 'Practice']].map(([v, l]) => (
                <div key={l}>
                  <p className="font-playfair text-stone-800 font-semibold text-sm">{v}</p>
                  <p className="font-inter text-[0.6rem] text-stone-400 tracking-widest uppercase mt-0.5">{l}</p>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setDairyOpen(true)}
              className="font-inter text-xs text-amber-800 border border-amber-200 px-4 py-2 rounded-full hover:bg-amber-50 transition-colors">
              Future: The SuDhama Dairy →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Dairy modal */}
      <AnimatePresence>
        {dairyOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setDairyOpen(false)}>
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }} transition={{ duration: 0.25 }}
              className="bg-white border border-stone-100 rounded-2xl p-8 max-w-sm w-full relative shadow-xl"
              onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setDairyOpen(false)} aria-label="Close"
                className="absolute top-4 right-5 text-stone-400 hover:text-stone-700 text-xl transition-colors">×</button>
              <span className="font-inter label-eyebrow">Coming Soon</span>
              <h3 className="font-playfair text-2xl text-stone-900 mb-3">The SuDhama Dairy</h3>
              <p className="font-inter text-stone-500 text-sm leading-relaxed">
                A small, ethical dairy — pure A2 milk from happy cows living
                exactly as nature intended. Small batches. No shortcuts.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
