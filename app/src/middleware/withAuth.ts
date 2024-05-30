import { NextRequest, NextResponse } from 'next/server'

export default async function withAuth(request: NextRequest) {
  const url = request.nextUrl
  url.pathname = '/auth/sign-in'
  const token = request.cookies.get('access_token')

  if (!token) {
    return NextResponse.redirect(url)
  }

  if (token) return NextResponse.next()
}
