import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import authenticate from './app/src/middleware/authenticate'

export async function middleware(request: NextRequest) {
  const isAuthenticated = await authenticate(request)

  try {
    if (
      request.nextUrl.pathname === '/my-page' ||
      request.nextUrl.pathname === '/pop-up/create'
    ) {
      console.log(isAuthenticated)
      if (isAuthenticated) return NextResponse.next()
      return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }

    if (
      request.nextUrl.pathname === '/auth/sign-in' ||
      request.nextUrl.pathname === '/auth/sign-up'
    ) {
      console.log(isAuthenticated)
      if (isAuthenticated)
        return NextResponse.redirect(new URL('/', request.url))
      return NextResponse.next()
    }
  } catch (error) {
    console.error(error)
  }
}

export const config = {
  matcher: ['/my-page', '/pop-up/create', '/auth/sign-in', '/auth/sign-up'],
}
