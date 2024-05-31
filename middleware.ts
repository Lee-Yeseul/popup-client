import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import withAuth from '@/app/src/middleware/withAuth'
import withoutAuth from '@/app/src/middleware/withoutAuth'

export async function middleware(request: NextRequest) {
  try {
    if (
      request.nextUrl.pathname === '/my-page' ||
      request.nextUrl.pathname === '/pop-up/create'
    ) {
      return await withAuth(request)
    }

    if (
      request.nextUrl.pathname === '/auth/sign-in' ||
      request.nextUrl.pathname === '/auth/sign-up'
    ) {
      return await withoutAuth(request)
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/my-page', '/pop-up/create', '/auth/sign-in', '/auth/sign-up'],
}
