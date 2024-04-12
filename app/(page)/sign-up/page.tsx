'use client'

import { authAPI } from '@/app/api/auth'
import Form from '@/app/component/common/Form'

import { SignUpSchema, signUpSchema } from '@/app/schema/auth'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  const onSubmit = async (data: SignUpSchema) => {
    try {
      const { status } = await authAPI.signUp(data)
      if (status !== 201) throw new Error()

      alert('환영합니다! 회원가입이 완료되었습니다.')
      router.push('/')
    } catch (err) {
      if (err instanceof Error && 'status' in err) {
        if (err.status === 409) alert('해당 이메일의 유저가 이미 존재합니다.')
      } else {
        alert('회원가입 실패')
      }
    }
  }
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center">
      <div className="flex w-1/3 flex-col items-center gap-10 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
        <h3 className="text-xl font-bold">회원가입</h3>
        <Form<SignUpSchema>
          schema={signUpSchema}
          handleSubmit={(data) => onSubmit(data)}
          className="flex w-full flex-col gap-2"
        >
          <Form.TextInput
            label="이메일"
            name="email"
            placeholder="test@test.com"
            className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
          />

          <Form.TextInput
            label="비밀번호"
            name="password"
            placeholder="********"
            className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
          />

          <Form.TextInput
            label="비밀번호 확인"
            name="confirmPassword"
            placeholder="********"
            className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
          />
          <Form.SubmitButton className="mt-5 h-12 w-full rounded-md border-1 border-solid border-gray-400 hover:bg-gray-50">
            회원가입
          </Form.SubmitButton>
        </Form>
      </div>
    </div>
  )
}
