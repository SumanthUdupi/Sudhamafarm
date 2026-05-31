'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { ArticleMeta } from '@/lib/contentLoader'

interface Props {
  articles: ArticleMeta[]
}

interface ScheduleMutation {
  slug: string
  scheduledFor: string
}

async function scheduleArticle(payload: ScheduleMutation) {
  const res = await fetch('/api/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export default function PublishingCalendar({ articles }: Props) {
  const [cursor, setCursor] = useState(new Date())
  const [selected, setSelected] = useState<Date | null>(null)
  const [pendingSlug, setPendingSlug] = useState<string>('')
  const queryClient = useQueryClient()

  const days = eachDayOfInterval({ start: startOfMonth(cursor), end: endOfMonth(cursor) })

  const scheduledDates = articles
    .filter((a) => a.scheduledFor)
    .map((a) => ({ date: parseISO(a.scheduledFor!), slug: a.slug, title: a.title }))

  const { mutate, isPending } = useMutation({
    mutationFn: scheduleArticle,
    onMutate: async (vars) => {
      // Optimistic update — immediately show date in calendar
      await queryClient.cancelQueries({ queryKey: ['articles'] })
      return vars
    },
    onSuccess: () => {
      toast.success('Publishing date saved')
      setSelected(null)
      setPendingSlug('')
    },
    onError: (err) => {
      toast.error('Failed to schedule', {
        description: err instanceof Error ? err.message : 'Unknown error',
        action: {
          label: 'Retry',
          onClick: () => pendingSlug && selected && mutate({
            slug: pendingSlug,
            scheduledFor: new Date(selected.getTime() - selected.getTimezoneOffset() * 60000).toISOString(),
          }),
        },
      })
    },
  })

  const handleDayClick = useCallback((day: Date) => {
    setSelected((prev) => (prev && isSameDay(prev, day) ? null : day))
  }, [])

  const handleSchedule = () => {
    if (!selected || !pendingSlug) return
    // Emit UTC timestamp with IANA timezone annotation
    const utcTs = new Date(
      Date.UTC(selected.getFullYear(), selected.getMonth(), selected.getDate(), 12, 0, 0)
    ).toISOString()
    mutate({ slug: pendingSlug, scheduledFor: utcTs })
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
      {/* Month nav */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-100">{format(cursor, 'MMMM yyyy')}</h3>
        <div className="flex gap-2">
          {['‹', '›'].map((arrow, i) => (
            <button
              key={arrow}
              className="w-7 h-7 rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors text-sm"
              onClick={() => setCursor((d) => {
                const nd = new Date(d)
                nd.setMonth(nd.getMonth() + (i === 0 ? -1 : 1))
                return nd
              })}
            >
              {arrow}
            </button>
          ))}
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="text-xs text-zinc-600 py-1">{d}</span>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Offset for first day of month */}
        {Array.from({ length: days[0].getDay() }).map((_, i) => (
          <div key={`off-${i}`} />
        ))}
        {days.map((day) => {
          const hasScheduled = scheduledDates.some((s) => isSameDay(s.date, day))
          const isSelected = selected && isSameDay(selected, day)
          const isToday = isSameDay(day, new Date())

          return (
            <motion.button
              key={day.toISOString()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDayClick(day)}
              className={`relative h-8 w-full rounded-lg text-xs font-mono transition-colors ${
                isSelected
                  ? 'bg-amber-500 text-black font-bold'
                  : isToday
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {format(day, 'd')}
              {hasScheduled && (
                <span className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-emerald-400" />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Schedule panel */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-3 pt-4 border-t border-zinc-800"
        >
          <p className="text-xs text-zinc-400">
            Schedule for{' '}
            <strong className="text-amber-400">
              {format(selected, 'PPP')}
            </strong>
            {' '}— UTC noon, <code className="text-zinc-500 text-[10px]">America/New_York</code>
          </p>
          <select
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            value={pendingSlug}
            onChange={(e) => setPendingSlug(e.target.value)}
          >
            <option value="">Select article…</option>
            {articles.map((a) => (
              <option key={a.slug} value={a.slug}>{a.title}</option>
            ))}
          </select>
          <button
            onClick={handleSchedule}
            disabled={!pendingSlug || isPending}
            className="w-full py-2 rounded-lg bg-amber-500 text-black text-sm font-medium disabled:opacity-40 hover:bg-amber-400 transition-colors"
          >
            {isPending ? 'Saving…' : 'Confirm Schedule'}
          </button>
        </motion.div>
      )}
    </div>
  )
}
