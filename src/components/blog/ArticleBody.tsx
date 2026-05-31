// Server Component — MDXRemote requires server context; client effects live in ArticleViewTracker
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Article } from '@/lib/contentLoader'
import type { ThemeTokens } from '@/lib/themeInferenceEngine'
import Link from 'next/link'
import ArticleViewTracker from './ArticleViewTracker'

interface Props {
  article: Article
  theme: ThemeTokens
}

export default function ArticleBody({ article, theme }: Props) {
  return (
    <div className="animate-fade-up">
      <ArticleViewTracker slug={article.slug} />

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border font-medium"
              style={{
                background: theme.accentMuted,
                color: theme.accent,
                borderColor: theme.accent + '40',
                borderRadius: theme.borderRadius,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* MDX prose */}
      <article
        className="prose prose-lg max-w-none prose-themed"
        style={{ color: theme.textPrimary, fontFamily: theme.fontFamilyBody }}
      >
        <MDXRemote source={article.content} />
      </article>

      {/* Back link */}
      <div className="mt-16 pt-8 border-t" style={{ borderColor: theme.accent + '30' }}>
        <Link
          href="/blog"
          className="text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: theme.accent }}
        >
          ← Back to Sacred Journeys
        </Link>
      </div>
    </div>
  )
}
