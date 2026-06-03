'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const MAPS_URL = 'https://www.google.com/maps/place/%E0%B2%B8%E0%B3%81%E0%B2%A7%E0%B2%BE%E0%B2%AE/@13.4247466,74.9705411,172m/data=!3m1!1e3!4m6!3m5!1s0x3bbb5f0028f20293:0x1f97240b6ea82aa0!8m2!3d13.424356!4d74.9707893!16s%2Fg%2F11xdm06wx3?entry=ttu'
const SATELLITE_EMBED = 'https://maps.google.com/maps?q=13.424356,74.9707893&t=k&z=17&ie=UTF8&iwloc=&output=embed'

export default function LocationSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="location" ref={ref} aria-label="Contact and Directions" className="py-20 md:py-28 border-t border-stone-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <span className="font-inter label-eyebrow">Where We Are</span>
              <h2 className="font-playfair text-3xl md:text-4xl text-stone-900 leading-tight">
                Find Us
              </h2>
            </div>

            <address className="not-italic space-y-1">
              <p className="font-playfair text-stone-900 font-semibold">SuDhama</p>
              <p className="font-inter text-stone-600 text-sm leading-relaxed">
                8-118(1), Kanyana Village,<br />
                Near Peradi, Hebri Taluk,<br />
                Udupi District, Karnataka — 576112
              </p>
            </address>

            <div className="flex items-start gap-3">
              <span className="text-base mt-0.5">✉️</span>
              <div>
                <p className="font-inter text-[0.6rem] uppercase tracking-widest text-stone-400 font-medium">Email</p>
                <a href="mailto:contact@sudhamafarms.com"
                  className="font-inter text-stone-700 text-sm hover:text-terracotta transition-colors">
                  contact@sudhamafarms.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-base mt-0.5">📞</span>
              <div>
                <p className="font-inter text-[0.6rem] uppercase tracking-widest text-stone-400 font-medium">Phone</p>
                <a href="tel:+910000000000"
                  className="font-inter text-stone-700 text-sm hover:text-terracotta transition-colors">
                  +91-XXXXX-XXXXX
                </a>
              </div>
            </div>

            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
              className="font-inter inline-flex items-center gap-2 text-sm px-5 py-2.5 bg-forest text-white rounded-full hover:bg-forest/90 transition-colors">
              Open in Google Maps
            </a>
          </motion.div>

          {/* Satellite map — no pin SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-xl overflow-hidden border border-stone-200 shadow-sm"
            style={{ height: '320px' }}
          >
            <iframe
              title="SuDhama satellite map"
              src={SATELLITE_EMBED}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 block"
            />
            <p className="font-inter text-[0.65rem] text-stone-400 pt-2 text-center">
              ~30 min from Udupi · ~2 hrs from Mangalore
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
