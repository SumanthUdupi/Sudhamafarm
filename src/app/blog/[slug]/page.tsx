import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllSlugs } from '@/lib/contentLoader'
import { inferTheme } from '@/lib/themeInferenceEngine'
import CinematicContentShell from '@/components/ui/CinematicContentShell'
import ArticleBody from '@/components/blog/ArticleBody'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [{ url: article.coverImage }] : [],
    },
  }
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const theme = inferTheme(article.content, article.category)

  return (
    <CinematicContentShell theme={theme} article={article}>
      <ArticleBody article={article} theme={theme} />
    </CinematicContentShell>
  )
}
