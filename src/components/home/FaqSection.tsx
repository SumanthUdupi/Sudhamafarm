'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const FAQS = [
  { q: 'Is the milk from your cows for sale?', a: 'Not yet — but we are working on a small-batch, ethical dairy business. Stay tuned.' },
  { q: 'Are you certified organic?', a: '"Organic-certification ready" — we follow all organic practices but have not yet completed the formal process.' },
  { q: 'What grows on the farm?', a: 'Mangoes, bananas, jackfruit, cocoa, jamun, cashew, sita phal, and lakshman phal — all grown without pesticides or synthetic inputs.' },
  { q: 'How do I get in touch?', a: 'Write to us at contact@sudhamafarms.com — we read every message.' },
]

export default function FaqSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" ref={ref} className="py-16 md:py-24 bg-stone-50 border-t border-stone-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

          {/* Left label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="label-eyebrow">Questions</span>
            <h2 className="font-display text-3xl text-stone-900 leading-tight mb-4">
              Frequently Asked
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed">
              More questions?<br />
              <a href="mailto:contact@sudhamafarms.com" className="text-amber-800 hover:underline underline-offset-2">
                Write to us →
              </a>
            </p>
          </motion.div>

          {/* Right accordion */}
          <div className="md:col-span-2 divide-y divide-stone-100">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-5 text-left gap-6 group"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-stone-800 text-sm font-medium group-hover:text-terracotta transition-colors">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 text-stone-400 text-lg leading-none group-hover:text-terracotta transition-colors"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-stone-500 text-sm leading-relaxed pb-5 pr-8">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
