'use client'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? new URL(item.href, 'https://sudhamafarms.com').href : undefined,
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="hidden md:block py-3 px-6 md:px-10">
      <ol className="flex items-center gap-2 text-[0.75rem] font-inter text-stone-500">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {item.href ? (
              <a href={item.href} className="hover:text-stone-700 transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-stone-700 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && <span className="text-stone-400">/</span>}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  )
}
