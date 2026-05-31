// Edge Runtime — must use Web Crypto API, not Node's 'crypto' module
import { NextRequest, NextResponse } from 'next/server'

const enc = new TextEncoder()

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function validateCommandToken(token: string | null): Promise<boolean> {
  const secret = process.env.COMMAND_SECRET
  if (!secret || !token) return false

  try {
    const [tsStr, hmac] = token.split('.')
    if (!tsStr || !hmac) return false

    const ts = parseInt(tsStr, 10)
    if (isNaN(ts)) return false

    const now = Math.floor(Date.now() / 1000)
    if (Math.abs(now - ts) > 900) return false // 15-minute window

    const expected = await hmacHex(secret, tsStr)

    // Constant-time comparison via XOR over char codes
    if (expected.length !== hmac.length) return false
    let diff = 0
    for (let i = 0; i < expected.length; i++) {
      diff |= expected.charCodeAt(i) ^ hmac.charCodeAt(i)
    }
    return diff === 0
  } catch {
    return false
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/command')) {
    const token =
      req.nextUrl.searchParams.get('t') ?? req.cookies.get('cmd_token')?.value ?? null

    if (!(await validateCommandToken(token))) {
      return NextResponse.rewrite(new URL('/not-found', req.url))
    }

    const response = NextResponse.next()
    if (req.nextUrl.searchParams.has('t')) {
      response.cookies.set('cmd_token', token!, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 900,
        path: '/command',
        secure: process.env.NODE_ENV === 'production',
      })
    }
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/command/:path*'],
}
