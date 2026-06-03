'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useUIStore } from '@/store/uiStore'
import DarkModeToggle from '@/components/ui/DarkModeToggle'

const NAV = [
  { label: 'The Farmhouse', href: '/#farmhouse' },
  { label: 'Our Farm',      href: '/#farm' },
  { label: 'Our Cows',      href: '/#cows' },
  { label: 'Our Story',     href: '/#story' },
  { label: 'Location',      href: '/#location' },
  { label: 'Sacred Journeys', href: '/blog' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Read progress bar
  useEffect(() => {
    const bar = document.getElementById('read-progress')
    if (!bar) return
    const onScroll = () => {
      const el = document.documentElement
      bar.style.width = `${(el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navTextColor = !scrolled && isHome ? 'text-white/85' : 'text-stone-600'
  const navHover     = !scrolled && isHome ? 'hover:text-white' : 'hover:text-terracotta'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
            : isHome ? 'bg-transparent' : 'bg-white border-b border-stone-100'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
            <div className="relative w-8 h-8">
              <Image
                src="/images/Logo.png"
                alt="SuDhama"
                fill
                className="object-contain"
                sizes="32px"
                priority
              />
            </div>
            <span className={`font-playfair text-base font-semibold tracking-wide transition-colors duration-300 ${
              !scrolled && isHome ? 'text-white' : 'text-stone-800'
            }`}>
              SuDhama
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-inter text-[0.72rem] tracking-wide px-3.5 py-2 rounded-sm transition-colors duration-200 ${navTextColor} ${navHover}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Dark mode toggle + Mobile hamburger */}
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button
              type="button"
              className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen ? 'true' : 'false'}
            >
              <span className={`block h-px w-full transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
              } ${!scrolled && isHome ? 'bg-white' : 'bg-stone-700'}`} />
              <span className={`block h-px w-full transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              } ${!scrolled && isHome ? 'bg-white' : 'bg-stone-700'}`} />
              <span className={`block h-px w-full transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''
              } ${!scrolled && isHome ? 'bg-white' : 'bg-stone-700'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-stone-100">
                <span className="font-playfair text-stone-800 font-semibold">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 px-4 py-6 space-y-1">
                {NAV.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      href={l.href}
                      className="font-inter block px-3 py-3 text-stone-700 text-sm rounded-lg hover:bg-stone-50 hover:text-terracotta transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-5 border-t border-stone-100">
                <p className="font-inter text-[0.6rem] text-stone-400 tracking-widest uppercase">
                  Hebri · Udupi · Karnataka
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
