import { z } from 'zod'

export const createDogPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  primariActivityZone: z.string().optional(),
  tags: z.string().array().max(5).optional(),
})

export type CreateDogPostSchema = z.infer<typeof createDogPostSchema>
