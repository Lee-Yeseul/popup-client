import { AxiosResponse } from 'axios'
import { ReactNode } from 'react'

export type APIResponse<T> = Promise<AxiosResponse<T>>

export type CompoundItem = {
  children?: ReactNode
  className?: string
}

export type Id = {
  id: number
}
