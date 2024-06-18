import { AuthError, HTTPError } from '@/app/src/util/customError'
import { isTokenExpired } from '@/app/src/util'

const baseURL = `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_HOST_NAME}${process.env.NODE_ENV === 'development' ? `:${process.env.NEXT_PUBLIC_SERVER_PORT}` : ''}/api`
const commonFetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
} as const

const renewAccessTokenIfNeeded = async () => {
  if (!isTokenExpired('refresh_token') && isTokenExpired('access_token')) {
    await renewAccessToken()
  }
}

const renewAccessToken = async () => {
  try {
    await fetch(`${baseURL}/auth/renew`, {
      method: 'POST',
      ...commonFetchOptions,
    })
  } catch (error) {
    throw new AuthError()
  }
}

const fetchInterceptor = async <T>(
  fetchFunction: () => Promise<Response>,
): Promise<T> => {
  await renewAccessTokenIfNeeded()
  const response = await fetchFunction()

  if (!response.ok) {
    const serverMessage = await response.json()
    throw new HTTPError(response.status, serverMessage.message)
  }

  return (await response.json()) as T
}

const createFetchMethod = (method: string) => {
  return async <I, O>(endPoint: string, data?: I) =>
    fetchInterceptor<O>(() =>
      fetch(`${baseURL}/${endPoint}`, {
        method,
        body: method !== 'GET' ? JSON.stringify(data) : undefined,
        ...commonFetchOptions,
      }),
    ).then((responseData) => ({
      status: 200,
      message: 'OK',
      data: responseData,
    }))
}

export const fetchAPI = {
  post: createFetchMethod('POST'),
  put: createFetchMethod('PUT'),
  get: createFetchMethod('GET'),
  delete: createFetchMethod('DELETE'),
}
