import axios from 'axios'

import { authAPI } from './auth'
import { queryStringify } from '@/app/src/util'

const baseURL = `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_HOST_NAME}${process.env.NODE_ENV === 'development' ? `:${process.env.NEXT_PUBLIC_SERVER_PORT}` : ''}/api`

export const instance = axios.create({
  baseURL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) => queryStringify(params),
  },
})

let isRefreshing = false
instance.interceptors.response.use(
  (response) => {
    return response
  },
  async ({ response, config }) => {
    try {
      if (response.data.statusCode === 401) {
        if (isRefreshing) return Promise.reject(response)
        isRefreshing = true

        await authAPI.renewAccessToken()

        return await instance({ ...config })
      } else {
        return Promise.reject(response)
      }
    } catch (err) {
      return Promise.reject(response)
    }
  },
)
