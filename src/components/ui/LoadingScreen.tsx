'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 800)
    const t2 = setTimeout(() => setPhase('out'), 2800)
    const t3 = setTimeout(() => setGone(true), 3800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const dismiss = () => {
    setPhase('out')
    setTimeout(() => setGone(true), 1000)
  }

  if (gone) return null

  return (
    <AnimatePresence>
      {phase !== 'out' ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center cursor-pointer select-none"
          style={{ background: '#111a14' }}
          onClick={dismiss}
        >
          {/* Background texture overlay */}
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/subtle-grain.png')" }} />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-8"
          >
            <div className="relative w-20 h-20">
              <Image src="/images/Logo.png" alt="SuDhama" fill className="object-contain brightness-[10] opacity-90" />
            </div>
          </motion.div>

          {/* Welcome text */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-[0.6rem] tracking-[0.5em] uppercase text-white/40 mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Welcome to
          </motion.p>

          {/* Main name */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-5xl sm:text-6xl font-bold tracking-tight leading-none mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            SuDhama
          </motion.h1>

          {/* Kannada */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="text-white/50 text-2xl mb-6"
            style={{ fontFamily: "'Noto Sans Kannada', sans-serif" }}
          >
            ಸುಧಾಮ
          </motion.p>

          {/* Rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-px bg-white/20 mb-6 origin-center"
          />

          {/* Location */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="text-[0.6rem] tracking-[0.4em] uppercase text-white/30"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Hebri &middot; Udupi &middot; Karnataka
          </motion.p>

          {/* Tap hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.4, 0] }}
            transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
            className="absolute bottom-12 text-[0.55rem] tracking-[0.4em] uppercase text-white/30"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Tap to enter
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          key="loader-out"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999]"
          style={{ background: '#111a14' }}
        />
      )}
    </AnimatePresence>
  )
}
