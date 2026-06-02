import { readFileSync } from 'fs'
import { resolve } from 'path'

export async function GET() {
  try {
    const htmlPath = resolve(process.cwd(), 'public/invitation/index.html')
    const html = readFileSync(htmlPath, 'utf-8')

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Error serving invitation:', error)
    return new Response('Not Found', { status: 404 })
  }
}
