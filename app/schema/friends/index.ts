import { z } from 'zod'

export const createDogPostSchema = z.object({
  title: z.string(),
  images: z.any(),
  name: z.string(),
  species: z.string(),
  territory: z.string(),
  description: z.string(),
  tags: z.string().array().max(5),
})

export type CreateDogPostSchema = z.infer<typeof createDogPostSchema>
