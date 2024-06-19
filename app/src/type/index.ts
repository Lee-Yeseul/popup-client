import { ReactNode } from 'react'

export type CompoundItem = {
  children?: ReactNode
  className?: string
}

export type Id = {
  id: number
}

export type ImagePath = {
  imagePath: string
}

export type IndexSignature = { [key: string]: string }
