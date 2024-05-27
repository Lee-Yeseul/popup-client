import { z } from 'zod'

export const createPopUpSchema = z.object({
  title: z.string(),
  subTitle: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()),
  address: z.string(),
  fullAddress: z.string(),
  addressDetail: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  imageList: z.array(z.any()).optional(),
})

export type CreatePopUpSchema = z.infer<typeof createPopUpSchema>
