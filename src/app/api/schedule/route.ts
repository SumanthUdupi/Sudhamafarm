import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { slug, scheduledFor } = body as { slug: string; scheduledFor: string }

    if (!slug || !scheduledFor) {
      return NextResponse.json({ error: 'slug and scheduledFor are required' }, { status: 400 })
    }

    // Validate ISO 8601 UTC timestamp
    const ts = Date.parse(scheduledFor)
    if (isNaN(ts)) {
      return NextResponse.json({ error: 'scheduledFor must be a valid ISO 8601 UTC timestamp' }, { status: 400 })
    }

    // Sanitize slug — prevent directory traversal
    const safeSlug = path.basename(slug)
    const filePath = path.join(CONTENT_DIR, `${safeSlug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    // Optimistic locking: reject if client-provided `updatedAt` is stale
    if (body.expectedUpdatedAt && data.updatedAt && data.updatedAt !== body.expectedUpdatedAt) {
      return NextResponse.json(
        { error: 'conflict', message: 'The article was modified by another process. Please refresh.' },
        { status: 409 }
      )
    }

    const updated = matter.stringify(content, {
      ...data,
      scheduledFor,
      status: 'scheduled',
      updatedAt: new Date().toISOString(),
    })

    fs.writeFileSync(filePath, updated, 'utf-8')

    return NextResponse.json({
      ok: true,
      slug: safeSlug,
      scheduledFor,
      timezone: 'America/New_York',
    })
  } catch (err) {
    console.error('[schedule API]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
