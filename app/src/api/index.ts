import { HTTPError } from '@/app/src/util/customError'

const baseURL = `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_HOST_NAME}${process.env.NODE_ENV === 'development' ? `:${process.env.NEXT_PUBLIC_SERVER_PORT}` : ''}/api`
const commonFetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
} as const

export const fetchAPI = {
  post: async <I, O>(endPoint: string, data?: I) => {
    const response = await fetch(`${baseURL}/${endPoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      ...commonFetchOptions,
    })
    if (!response.ok) {
      const serverMessage = await response.json()
      throw new HTTPError(response.status, serverMessage.message)
    }

    const responseData = (await response.json()) as O
    return {
      status: response.status,
      message: response.statusText,
      data: responseData,
    }
  },

  put: async <I, O>(endPoint: string, data?: I) => {
    const response = await fetch(`${baseURL}/${endPoint}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...commonFetchOptions,
    })
    if (!response.ok) {
      const serverMessage = await response.json()
      throw new HTTPError(response.status, serverMessage.message)
    }

    const responseData = (await response.json()) as O
    return {
      status: response.status,
      message: response.statusText,
      data: responseData,
    }
  },
  get: async <O>(endPoint: string) => {
    const response = await fetch(`${baseURL}/${endPoint}`, {
      method: 'GET',
      ...commonFetchOptions,
    })
    if (!response.ok) {
      const serverMessage = await response.json()
      throw new HTTPError(response.status, serverMessage.message)
    }

    const responseData = (await response.json()) as O
    return {
      status: response.status,
      message: response.statusText,
      data: responseData,
    }
  },
  delete: async (endPoint: string) => {
    const response = await fetch(`${baseURL}/${endPoint}`, {
      method: 'DELETE',
      ...commonFetchOptions,
    })
    if (!response.ok)
      return { status: response.status, message: response.statusText }

    return {
      status: response.status,
      message: response.statusText,
    }
  },
}
