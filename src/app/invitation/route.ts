import { readFileSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public/invitation/index.html')
    let html = readFileSync(filePath, 'utf-8')

    // Fix relative paths to point to /invitation/ folder
    html = html.replace(/href="style\.css"/g, 'href="/invitation/style.css"')
    html = html.replace(/src="app\.js"/g, 'src="/invitation/app.js"')
    html = html.replace(/src="pageFlip\.js"/g, 'src="/invitation/pageFlip.js"')
    html = html.replace(/src="config\.js"/g, 'src="/invitation/config.js"')

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    return new NextResponse('Invitation page not found', { status: 404 })
  }
}
