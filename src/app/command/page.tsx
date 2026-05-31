import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/contentLoader'
import TelemetryGrid from '@/components/command/TelemetryGrid'
import PublishingCalendar from '@/components/command/PublishingCalendar'
import ContentTable from '@/components/command/ContentTable'

export const metadata: Metadata = {
  title: 'Command Center',
  robots: { index: false, follow: false },
}

export default function CommandPage() {
  const articles = getAllArticles()

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pt-16">
      <div className="max-w-screen-2xl mx-auto px-6 py-10 space-y-10">

        {/* Header bar */}
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-1">Operations</p>
            <h1 className="text-2xl font-display text-zinc-100">Command Center</h1>
          </div>
          <span className="inline-flex items-center gap-2 text-xs text-emerald-400 border border-emerald-800 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </header>

        {/* Telemetry */}
        <TelemetryGrid articles={articles} />

        {/* Two-column: calendar + table */}
        <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8">
          <PublishingCalendar articles={articles} />
          <ContentTable articles={articles} />
        </div>

      </div>
    </div>
  )
}
