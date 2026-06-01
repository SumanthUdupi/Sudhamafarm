import { getRequestContext } from '@opennextjs/cloudflare'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { env } = getRequestContext()
  const assetUrl = new URL('/invitation/book.html', request.url)
  return env.ASSETS.fetch(new Request(assetUrl.toString()))
}
