import Link from 'next/link'
import Image from 'next/image'

const NAV = [
  { label: 'The Farmhouse', href: '/#farmhouse' },
  { label: 'Our Farm', href: '/#farm' },
  { label: 'Our Cows', href: '/#cows' },
  { label: 'Our Story', href: '/#story' },
  { label: 'Location', href: '/#location' },
  { label: 'Sacred Journeys', href: '/blog' },
]

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-14 mt-0 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-stone-800">

          {/* Brand */}
          <div className="space-y-3">
            <Image
              src="/images/Logo.png"
              alt="SuDhama"
              width={88}
              height={40}
              className="h-10 w-auto brightness-[2] opacity-80"
            />
            <p className="text-stone-500 text-xs leading-relaxed max-w-[220px]">
              A good home. A good life.<br />Kanyana Village, Udupi.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-stone-600 mb-4 font-medium">Navigate</p>
            <ul className="space-y-2">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-stone-600 mb-4 font-medium">Contact</p>
            <address className="not-italic text-sm text-stone-400 leading-relaxed space-y-1">
              <p>Kanyana Village, Hebri Taluk</p>
              <p>Udupi, Karnataka — 576112</p>
              <a
                href="mailto:contact@sudhamafarms.com"
                className="block mt-2 hover:text-white transition-colors"
              >
                contact@sudhamafarms.com
              </a>
            </address>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between text-[0.65rem] text-stone-600 tracking-wide">
          <p>© {new Date().getFullYear()} SuDhama. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Hebri · Udupi · Karnataka</p>
        </div>
      </div>
    </footer>
  )
}
