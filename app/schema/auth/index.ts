import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('이메일 형식을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 8글자 이상으로 입력해주세요'),
})

export type SignInSchema = z.infer<typeof signInSchema>

function validatePassword() {
  return z
    .string()
    .min(8, '비밀번호는 8글자 이상으로 입력해주세요')
    .max(15, '비밀번호는 15자리 이하로 입력해주세요.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
      '비밀번호는 문자, 숫자, 특수문자를 혼합해 작성해주세요.',
    )
}

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('이메일 형식을 입력해주세요'),
    password: validatePassword(),
    confirmPassword: validatePassword(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
  })

export type SignUpSchema = z.infer<typeof signUpSchema>
