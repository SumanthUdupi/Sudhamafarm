'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function FarmhouseSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="farmhouse" ref={ref} className="py-20 md:py-28 border-t border-stone-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <span className="font-inter label-eyebrow">A Place to Stay</span>
            <h2 className="font-playfair text-3xl md:text-4xl text-stone-900 leading-tight">
              A Home Built<br />
              <span className="text-terracotta">from the Land</span>
            </h2>
            <p className="font-inter text-stone-600 leading-relaxed text-sm">
              Built with locally sourced Laterite stone, the farmhouse embodies
              zero-mile construction. Natural cross-ventilation and traditional
              clay tiles create a space that breathes with the land.
            </p>
            <p className="font-inter text-stone-400 leading-relaxed text-sm">
              The stone darkens with rain and lightens in sun. The roof tiles
              gather moss at their edges. Nothing here fights nature.
            </p>
            <div className="flex gap-8 pt-2 border-t border-stone-100">
              {[['Laterite Stone', 'Material'], ['Zero-mile', 'Build'], ['Passive cooling', 'Climate']].map(([v, l]) => (
                <div key={l}>
                  <p className="font-playfair text-stone-800 font-semibold text-sm">{v}</p>
                  <p className="font-inter text-[0.6rem] text-stone-400 tracking-widest uppercase mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="relative col-span-2 h-60 rounded-xl overflow-hidden">
              <Image src="/images/Farmhouse.jpg" alt="SuDhama farmhouse" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="relative h-36 rounded-xl overflow-hidden">
              <Image src="/images/Farmhouse V1.jpg" alt="Front view" fill className="object-cover" sizes="25vw" />
            </div>
            <div className="relative h-36 rounded-xl overflow-hidden">
              <Image src="/images/latHome.jpg" alt="Laterite stone detail" fill className="object-cover" sizes="25vw" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
