'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUIStore } from '@/store/uiStore'

export default function KeyboardShortcuts() {
  const router = useRouter()
  const { setCommandPaletteOpen } = useUIStore()

  useEffect(() => {
    let keySequence: string[] = []
    let sequenceTimer: ReturnType<typeof setTimeout>

    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey

      // CMD+K — open command palette
      if (cmdOrCtrl && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
        return
      }

      // G+B — go to blog
      keySequence.push(e.key.toLowerCase())
      clearTimeout(sequenceTimer)
      sequenceTimer = setTimeout(() => { keySequence = [] }, 800)

      if (keySequence.slice(-2).join('') === 'gb') {
        router.push('/blog')
        keySequence = []
      }
      if (keySequence.slice(-2).join('') === 'gh') {
        router.push('/')
        keySequence = []
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      clearTimeout(sequenceTimer)
    }
  }, [router, setCommandPaletteOpen])

  return null
}
