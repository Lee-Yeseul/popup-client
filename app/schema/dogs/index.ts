import { z } from 'zod'

export const postDogSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .max(10, '이름은 10글자 이하로 입력해주세요.'),
  breed: z.string().min(1, '견종을 입력해주세요.'),
  age: z.number().min(0, '나이를 입력해주세요.'),
})

export type PostDogSchema = z.infer<typeof postDogSchema>
