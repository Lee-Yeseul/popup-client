import { NextRequest } from 'next/server'

export default async function authenticateAction(request: NextRequest) {
  const access_token = request.cookies.get('access_token')?.value
  const refresh_token = request.cookies.get('refresh_token')?.value
  const baseURL = `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_HOST_NAME}${process.env.NODE_ENV === 'development' ? `:${process.env.NEXT_PUBLIC_SERVER_PORT}` : ''}/api`

  const userInfo = await fetch(`${baseURL}/user/user-info`, {
    headers: {
      cookie: `access_token=${access_token}; refresh_token=${refresh_token}`,
    },
    credentials: 'include',
  })

  if (userInfo.status === 200) return true

  if (userInfo.status === 401) {
    const refreshTokenCheck = await fetch(`${baseURL}/auth/renew`, {
      method: 'POST',
      headers: {
        cookie: `refresh_token=${refresh_token}`,
      },
      credentials: 'include',
    })

    if (refreshTokenCheck.status === 200) return true
  }
  return false
}
