import axios from 'axios'

import { authAPI } from './auth'
import { queryStringify } from '@/app/src/util'

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_PROTOCOL ?? process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_HOST_NAME}:${process.env.NEXT_PUBLIC_SERVER_PORT}/`,
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

        const { data } = await authAPI.renewAccessToken()
        instance.defaults.headers.common.Authorization = `Bearer ${data.newAccessToken}`
        return instance({ ...config })
      } else {
        return Promise.reject(response)
      }
    } catch (err) {
      return Promise.reject(response)
    }
  },
)
