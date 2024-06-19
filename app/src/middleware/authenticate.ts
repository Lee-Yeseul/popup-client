import { NextRequest } from 'next/server'
import { decodeJWT } from '../util'

export default async function authenticateAction(request: NextRequest) {
  const access_token = request.cookies.get('access_token')?.value
  const refresh_token = request.cookies.get('refresh_token')?.value
  const baseURL = `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_HOST_NAME}${process.env.NODE_ENV === 'development' ? `:${process.env.NEXT_PUBLIC_SERVER_PORT}` : ''}/api`

  if (!access_token) return false

  const { exp } = decodeJWT(access_token)

  if (exp * 1000 > Date.now()) return true

  if (!refresh_token) return false
  const refreshTokenCheck = await fetch(`${baseURL}/auth/renew`, {
    method: 'POST',
    headers: {
      cookie: `refresh_token=${refresh_token}`,
    },
    credentials: 'include',
    cache: 'no-store',
  })

  if (refreshTokenCheck.status === 200) return true

  return false
}
