'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const FAQS = [
  { category: 'Visiting', q: 'Can I visit the farm?', a: 'Yes, by appointment. Ideal 2–3 hours. Groups up to 8. Please contact us at least 3 days ahead.' },
  { category: 'Visiting', q: 'What is the best time to visit?', a: 'Monsoon (June–Sept): lush green, water channels flowing. Harvest (Oct–Feb): active farming. Summer (Mar–May): hot but uncrowded.' },
  { category: 'Visiting', q: 'What should I bring?', a: 'Comfortable walking shoes, water bottle, sunscreen, and a hat. Dress for the weather.' },
  { category: 'Products & Practices', q: 'Is the milk from your cows for sale?', a: 'Not yet. We are working on a small-batch ethical dairy for 2027. Stay tuned.' },
  { category: 'Products & Practices', q: 'Are you certified organic?', a: '"Organic-certification ready" — we follow all organic practices but have not yet completed the formal process. Certification costs are high and our standards do not depend on it.' },
  { category: 'Products & Practices', q: 'What grows on the farm?', a: 'Mangoes, bananas, jackfruit, cocoa, jamun, cashew, sita phal, and lakshman phal — all grown without pesticides or synthetic inputs.' },
  { category: 'Products & Practices', q: 'How many cows do you have?', a: 'Two rescued desi cows: Gauri (2021) and Krishna (2022). Both roam freely and are treated as family.' },
  { category: 'Future', q: 'Is there accommodation for overnight stays?', a: 'Not yet. We are exploring a small guest house for future phases. For now, day visits only.' },
  { category: 'Future', q: 'Can I volunteer or help?', a: 'Occasionally, yes. We welcome help during harvest season. Write to us to discuss.' },
  { category: 'Future', q: 'How do I get in touch?', a: 'Write to us at contact@sudhamafarms.com — we read every message.' },
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
            {FAQS.map((faq, i) => {
              const isFirstOfCategory = i === 0 || FAQS[i - 1].category !== faq.category
              return (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  {isFirstOfCategory && (
                    <p className="font-inter label-eyebrow pt-5 pb-2">{faq.category}</p>
                  )}
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-5 text-left gap-6 group min-h-[44px]"
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                    aria-controls={`faq-answer-${i}`}
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
                        id={`faq-answer-${i}`}
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
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
