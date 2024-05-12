import { DogResponse } from '../dogs'

export type DogPostResponse = {
  id: number
  authorId: number
  title: string
  content: string
  tags: string[]
  primaryActivityZone: string
  dogId: number
  createdAt: Date
  dog: DogResponse
}
