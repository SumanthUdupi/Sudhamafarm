import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ArticleMeta {
  slug: string
  title: string
  excerpt: string
  category: string
  location?: string
  coverImage?: string
  publishedAt: string
  status: 'published' | 'draft' | 'scheduled'
  scheduledFor?: string
  views: number
  shares: number
  tags: string[]
}

export interface Article extends ArticleMeta {
  content: string
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog')

export function getAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
      const { data, content } = matter(raw)

      return {
        slug,
        title: data.title ?? slug,
        excerpt: data.excerpt ?? '',
        category: data.category ?? 'Uncategorized',
        location: data.location,
        coverImage: data.coverImage,
        publishedAt: data.publishedAt ?? new Date().toISOString(),
        status: (data.status as ArticleMeta['status']) ?? 'published',
        scheduledFor: data.scheduledFor,
        views: data.views ?? 0,
        shares: data.shares ?? 0,
        tags: data.tags ?? [],
        content,
      } satisfies Article
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? '',
    category: data.category ?? 'Uncategorized',
    location: data.location,
    coverImage: data.coverImage,
    publishedAt: data.publishedAt ?? new Date().toISOString(),
    status: (data.status as ArticleMeta['status']) ?? 'published',
    scheduledFor: data.scheduledFor,
    views: data.views ?? 0,
    shares: data.shares ?? 0,
    tags: data.tags ?? [],
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
