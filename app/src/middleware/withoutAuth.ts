import { NextRequest, NextResponse } from 'next/server'

export default async function withoutAuth(request: NextRequest) {
  const token = request.cookies.get('access_token')
  if (!token) return NextResponse.next()
  if (token) return NextResponse.redirect(new URL('/', request.url))
}
