'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const FEATURES = [
  {
    img: '/images/Farmhouse V1.jpg',
    alt: 'SuDhama farmhouse',
    num: '01',
    title: 'The Farmhouse',
    desc: 'Laterite stone, clay tiles, natural cross-ventilation. Built from the land to belong to it.',
    href: '/#farmhouse',
  },
  {
    img: '/images/Farm.jpg',
    alt: 'The grove',
    num: '02',
    title: 'The Land',
    desc: 'Forty acres of organic polyculture — coconut, arecanut, and rare tropical fruit grown without chemicals.',
    href: '/#farm',
  },
  {
    img: '/images/Cow.jpg',
    alt: 'Desi cow',
    num: '03',
    title: 'The Cows',
    desc: 'Indigenous Gir cows, free-roaming and revered. Ahimsa dairy — A2 milk on their terms alone.',
    href: '/#cows',
  },
]

export default function HomeFeatureCards() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="home-features" ref={ref} className="bg-[#FDFBF7] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Label row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-14"
        >
          <div className="h-px flex-1 bg-stone-200" />
          <span className="font-inter text-[0.6rem] tracking-[0.35em] uppercase text-stone-400">
            What we are
          </span>
          <div className="h-px flex-1 bg-stone-200" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={f.href} className="group block">
                {/* Image */}
                <div className="relative h-56 overflow-hidden rounded-lg mb-5">
                  <Image
                    src={f.img}
                    alt={f.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="font-inter absolute top-3 right-3 text-[0.6rem] text-white/60 tracking-widest">
                    {f.num}
                  </span>
                </div>

                {/* Text */}
                <h3 className="font-playfair text-lg text-stone-800 mb-1.5 group-hover:text-terracotta transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="font-inter text-stone-500 text-[0.8rem] leading-relaxed mb-3">
                  {f.desc}
                </p>
                <span className="font-inter text-[0.65rem] text-amber-800 tracking-[0.2em] uppercase flex items-center gap-1.5">
                  Discover
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
