import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.redirect('/invitation/index.html', 307)
}
