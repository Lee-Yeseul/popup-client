import { NextRequest, NextResponse } from 'next/server'

export default async function withAuth(request: NextRequest) {
  const url = request.nextUrl
  url.pathname = '/auth/sign-in'
  const token = request.cookies.get('access_token')?.value

  const response = await fetch('http://localhost:8080/api/user/user-info', {
    headers: {
      cookie: `access_token=${token}`,
    },
    credentials: 'include',
  })
  const data = await response.json()

  if (data.statusCode === 401) {
    return NextResponse.redirect(url)
  } else return NextResponse.next()
}
