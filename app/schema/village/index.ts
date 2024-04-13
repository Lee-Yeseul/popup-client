import { z } from 'zod'

export const searchKeywordSchema = z.object({ keyword: z.string() })

export type SearchKeywordSchema = z.infer<typeof searchKeywordSchema>

export const createHistorySchema = z.object({
  date: z.string().datetime(),
  image: z.string(),
  description: z.string(),
})

export type CreateHistorySchema = z.infer<typeof createHistorySchema>
