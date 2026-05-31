'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const PRODUCTS = [
  { name: 'Mangoes',       src: '/images/Mango.png',        note: 'May–Jun' },
  { name: 'Bananas',       src: '/images/Banana.jpg',       note: 'Year-round' },
  { name: 'Jackfruit',     src: '/images/Jackfruit.png',    note: 'Summer' },
  { name: 'Cocoa',         src: '/images/Cocoa.jpg',        note: 'Single-origin' },
  { name: 'Jamun',         src: '/images/Jamun.png',        note: 'Monsoon' },
  { name: 'Cashew',        src: '/images/Cashew.jpg',       note: 'Cold-pressed' },
  { name: 'Sita Phal',     src: '/images/Sitafal.jpg',      note: 'Sep–Nov' },
  { name: 'Lakshman Phal', src: '/images/LakshmanPhal.jpg', note: 'Rare tropical' },
]

export default function FarmProductsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="farm" ref={ref} className="py-20 md:py-28 bg-stone-900 text-stone-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="font-inter text-[0.6rem] tracking-[0.35em] uppercase text-amber-600 mb-3 block">
              What the Land Gives
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl text-stone-100 leading-tight">
              Our Plantations
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-inter text-stone-500 text-sm max-w-xs leading-relaxed"
          >
            No pesticides. No synthetic inputs.<br className="hidden md:block" />
            Everything grown by hand, in season.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden mb-1.5">
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="12vw"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
              </div>
              <p className="font-inter text-[0.65rem] font-medium text-stone-300 leading-tight text-center">{p.name}</p>
              <p className="font-inter text-[0.55rem] text-stone-600 text-center">{p.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Practices strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-800 border border-stone-800 rounded-xl overflow-hidden"
        >
          {[
            { icon: '🌱', title: 'Soil Health', body: 'Enriched only with our own cow manure and on-farm compost.' },
            { icon: '💧', title: 'Water', body: 'Drip irrigation and rainwater harvesting replenish the groundwater.' },
            { icon: '🚫', title: 'Zero Chemicals', body: 'Organic-certification ready — every harvest free of pesticides.' },
          ].map((p) => (
            <div key={p.title} className="bg-stone-800/50 px-6 py-5">
              <span className="text-lg mb-2 block">{p.icon}</span>
              <h4 className="font-playfair text-stone-200 text-sm font-semibold mb-1">{p.title}</h4>
              <p className="font-inter text-stone-500 text-xs leading-relaxed">{p.body}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
