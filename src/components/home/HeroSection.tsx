'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[600px] overflow-hidden">

      {/* Image — Next/Image fill with ken-burns animation */}
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/Farm.jpg"
          alt="SuDhama farm in Kanyana Village, Udupi — a 3-acre organic sanctuary of coconut palms, open pasture, and 30-year-old fruit trees."
          fill
          priority
          className="object-cover object-center animate-ken-burns"
          sizes="100vw"
        />
      </motion.div>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
          className="font-inter text-[0.6rem] uppercase text-white/55 mb-5 tracking-[0.35em]"
        >
          Hebri &middot; Udupi &middot; Karnataka
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="font-playfair leading-none mb-2"
        >
          <span className="hero-title-shadow block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold">
            SuDhama
          </span>
          <span className="font-kannada block text-2xl sm:text-3xl font-light text-white/65 mt-2">
            ಸುಧಾಮ
          </span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-14 h-px bg-white/35 my-6 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-inter max-w-md text-white/65 text-sm md:text-base leading-relaxed font-light"
        >
          A sanctuary in the heart of Udupi — organic land, heritage cows,
          and the slow life lived with intention.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-8 flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/#home-features"
            className="font-inter px-7 py-3 bg-white/10 backdrop-blur-sm border border-white/25 text-white text-xs tracking-widest uppercase hover:bg-white hover:text-stone-900 transition-all duration-400 rounded-sm"
          >
            Explore
          </Link>
          <Link
            href="/blog"
            className="font-inter px-7 py-3 text-white/60 text-xs tracking-widest uppercase hover:text-white transition-colors rounded-sm"
          >
            Sacred Journeys
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
