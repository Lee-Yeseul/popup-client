'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Form from '@/app/src/component/common/form'
import { SignInSchema, signInSchema } from '@/app/src/schema/auth'
import useUserAction from '@/app/src/hook/useUserAction'
import { authAPI } from '@/app/src/api/auth'
import { userAPI } from '@/app/src/api/user'
import Link from 'next/link'

export default function SignInForm() {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter()
  const { login, saveUserInfo } = useUserAction()
  const onLoginBtnClick = async (loginData: SignInSchema) => {
    try {
      const { data } = await authAPI.signIn(loginData)
      login(data)
      const { data: userInfo } = await userAPI.getUserInfo()
      saveUserInfo(userInfo)

      setErrorMessage('')
      router.push('/')
    } catch (error: any) {
      if (error.status === 401) {
        setErrorMessage('이메일 또는 비밀번호가 일치하지 않습니다.')
      }
      if (error.status === 404) {
        setErrorMessage('존재하지 않는 이메일입니다.')
      }
    }
  }
  return (
    <main className="flex h-[80vh] w-full flex-col items-center justify-center">
      <div className="flex w-2/3 flex-col items-center gap-2">
        <h3 className="my-8 text-3xl font-bold text-primary-500">pop up NOW</h3>
        <Form<SignInSchema>
          schema={signInSchema}
          handleSubmit={(data) => onLoginBtnClick(data)}
          className="flex w-full flex-col gap-2"
        >
          <Form.TextInput
            name="email"
            placeholder="popupNOW@gmail.com"
            className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
          />
          <Form.TextInput
            name="password"
            placeholder="********"
            className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
            type="password"
          />
          {errorMessage && (
            <div className="mt-1 text-sm text-red-500">{errorMessage}</div>
          )}
          <Form.SubmitButton className="mt-4 h-12 w-full rounded-md bg-primary-500 font-bold text-white hover:bg-primary-400">
            로그인
          </Form.SubmitButton>
        </Form>
        <Link
          href={'/auth/sign-up'}
          className="flex h-12 w-full items-center justify-center rounded-md bg-primary-500 font-bold text-white hover:bg-primary-400"
        >
          <div>이메일 회원가입</div>
        </Link>
      </div>
    </main>
  )
}
