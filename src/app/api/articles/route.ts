import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/contentLoader'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const articles = getAllArticles()
    return NextResponse.json(articles)
  } catch (err) {
    console.error('[articles API]', err)
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 })
  }
}
