import axios from 'axios'
import { queryStringify } from '../util'

export const instance = axios.create({
  baseURL: `${process.env.PROTOCOL ?? process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.HOST_NAME ?? process.env.NEXT_PUBLIC_HOST_NAME}:${process.env.SERVER_PORT ?? process.env.NEXT_PUBLIC_SERVER_PORT}/`,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) => queryStringify(params),
  },
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  ({ response }) => {
    return Promise.reject(response)
  },
)
