'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { useSeason } from '@/hooks/useSeason'

const PRODUCTS = [
  { name: 'Mangoes', src: '/images/Mango.png', note: 'May–Jun', description: 'Ripening on trees over 30 years old. Natural sweetness, zero pesticides.', use: 'Fresh eating · pickles · amchur', alt: 'Fresh organic mangoes from SuDhama — ripened on 30-year-old trees, naturally sweet and pesticide-free.' },
  { name: 'Bananas', src: '/images/Banana.jpg', note: 'Year-round', description: 'Creamy and naturally sweet. Harvested at perfect ripeness.', use: 'Snacking · cooking · chips', alt: 'Organic bananas harvested at perfect ripeness — creamy, naturally sweet, and grown without synthetic inputs.' },
  { name: 'Jackfruit', src: '/images/Jackfruit.png', note: 'Summer', description: 'Large, meaty fruit with subtle sweetness. Versatile in savory & sweet dishes.', use: 'Curries · roasting · desserts', alt: 'SuDhama jackfruit — a large, meaty tropical fruit versatile in savory curries and sweet desserts.' },
  { name: 'Cocoa', src: '/images/Cocoa.jpg', note: 'Single-origin', description: 'Fermented on-farm. Rich, earthy flavor. Single-origin from our plantation.', use: 'Chocolate · baking · beverages', alt: 'Single-origin cocoa pods from SuDhama — fermented on-farm with rich, earthy flavor for chocolate and beverages.' },
  { name: 'Jamun', src: '/images/Jamun.png', note: 'Monsoon', description: 'Purple, juicy berries with astringent taste. Peak season monsoon harvest.', use: 'Fresh eating · juices · preserves', alt: 'Purple jamun berries from monsoon harvest — juicy with distinctive astringent flavor, perfect for fresh eating and preserves.' },
  { name: 'Cashew', src: '/images/Cashew.jpg', note: 'Cold-pressed', description: 'Manually processed cashew apples. Cold-pressed for maximum nutrition.', use: 'Snacking · oils · cooking', alt: 'Cold-pressed cashew products from SuDhama — manually processed and nutrient-rich for cooking and snacking.' },
  { name: 'Sita Phal', src: '/images/Sitafal.jpg', note: 'Sep–Nov', description: 'Creamy custard-like fruit. Delicate flavor, premium variety.', use: 'Fresh eating · ice cream · desserts', alt: 'Sita Phal (custard apple) from SuDhama — creamy with delicate flavor, a premium variety for fresh eating and desserts.' },
  { name: 'Lakshman Phal', src: '/images/LakshmanPhal.jpg', note: 'Rare tropical', description: 'Rare heirloom variety. Limited harvest. Unique sweet-tart profile.', use: 'Fresh eating · special occasions', alt: 'Lakshman Phal — a rare heirloom tropical fruit from SuDhama with unique sweet-tart flavor for special occasions.' },
]

export default function FarmProductsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const season = useSeason()

  return (
    <section id="farm" ref={ref} data-season={season} className="py-20 md:py-28 bg-stone-900 text-stone-100">
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
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 25vw, (max-width: 1024px) 12vw, 10vw"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/75 transition-opacity duration-300 flex flex-col items-center justify-center p-2 text-center">
                  <p className="font-inter text-[0.6rem] text-white/90 leading-tight mb-1">{p.description}</p>
                  <p className="font-inter text-[0.5rem] text-amber-300">{p.use}</p>
                </div>
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
            { icon: '🌱', title: 'Soil Health', body: 'We apply 10+ tons of cow manure annually, composted on-site. Organic matter builds water retention and supports deeper root growth.' },
            { icon: '💧', title: 'Water', body: 'Drip irrigation reduces usage by ~40% vs flood methods. Two rainwater harvesting pits (50,000L capacity) recharge groundwater each monsoon.' },
            { icon: '🚫', title: 'Zero Chemicals', body: 'No synthetic fertilisers, pesticides, or herbicides. Neem oil, crop rotation, and beneficial insects manage pests naturally.' },
          ].map((p) => (
            <div key={p.title} className="bg-stone-800/50 px-6 py-5">
              <span className="text-lg mb-2 block">{p.icon}</span>
              <h4 className="font-playfair text-stone-200 text-sm font-semibold mb-1">{p.title}</h4>
              <p className="font-inter text-stone-500 text-xs leading-relaxed">{p.body}</p>
            </div>
          ))}
        </motion.div>

        {/* Seasonal Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { season: 'Monsoon', months: 'Jun–Sep', crops: 'Jamun, Banana, Cocoa', activity: 'Planting & composting' },
            { season: 'Harvest', months: 'Oct–Feb', crops: 'Mango, Cashew, Jackfruit', activity: 'Harvest & processing' },
            { season: 'Summer', months: 'Mar–May', crops: 'Sita Phal, Lakshman Phal', activity: 'Soil prep & tree care' },
          ].map((s) => (
            <div key={s.season} className="border border-stone-700 rounded-lg p-5 bg-stone-800/30 hover:bg-stone-700/50 transition-colors">
              <h4 className="font-playfair text-amber-200 text-lg font-semibold mb-1">{s.season}</h4>
              <p className="font-inter text-stone-400 text-xs mb-3">{s.months}</p>
              <div className="space-y-2">
                <div>
                  <p className="font-inter text-[0.6rem] uppercase tracking-widest text-stone-600 font-medium">Crops</p>
                  <p className="font-inter text-stone-300 text-xs">{s.crops}</p>
                </div>
                <div>
                  <p className="font-inter text-[0.6rem] uppercase tracking-widest text-stone-600 font-medium">Activity</p>
                  <p className="font-inter text-stone-300 text-xs">{s.activity}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
