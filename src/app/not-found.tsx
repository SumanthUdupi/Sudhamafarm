import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-8xl font-display text-stone-200 select-none">404</p>
      <h2 className="mt-4 text-2xl font-display text-warm-stone">Page not found</h2>
      <p className="mt-2 text-stone-500 max-w-sm">
        The path you followed leads to still water. Return to where the land is known.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 rounded-full border border-terracotta text-terracotta hover:bg-terracotta hover:text-white transition-colors text-sm"
      >
        Return home
      </Link>
    </div>
  )
}
