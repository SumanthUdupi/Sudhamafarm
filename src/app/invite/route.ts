import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function GET(request: Request) {
  const { env } = await getCloudflareContext()
  const assetUrl = new URL('/invitation/book.html', request.url)
  return env.ASSETS.fetch(new Request(assetUrl.toString()))
}
