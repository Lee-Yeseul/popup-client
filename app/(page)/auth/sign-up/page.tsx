'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Form from '@/app/src/component/common/form'
import { SignUpSchema, signUpSchema } from '@/app/src/schema/auth'
import useToast from '@/app/src/component/common/toast/useToast'
import { authAPI } from '@/app/src/api/auth'

type CheckUniqueState = boolean | 'notChecked'
export default function AuthPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [isEmailUnique, setIsEmailUnique] =
    useState<CheckUniqueState>('notChecked')
  const [isUsernameUnique, setIsUsernameUnique] =
    useState<CheckUniqueState>('notChecked')

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const { status } = await authAPI.signUp(data)
      if (status !== 201) throw new Error()
      alert('환영합니다! 회원가입이 완료되었습니다.')
      router.push('/')
    } catch (err: any) {
      if (err.status === 409) alert('해당 이메일의 유저가 이미 존재합니다.')
      alert('회원가입에 실패하였습니다. 다시 시도해주세요.')
    }
  }

  const onClickEmailDuplicateBtn = async (value: string) => {
    try {
      const { data } = await authAPI.isEmailUnique(value)
      setIsEmailUnique(data)
      if (!data) return toast('중복된 이메일입니다.', 'error')
      return toast('사용 가능한 이메일입니다.', 'success')
    } catch (error) {
      toast('유효하지 않은 이메일입니다.', 'error')
    }
  }

  const onClickUsernameDuplicateBtn = async (value: string) => {
    try {
      const { data } = await authAPI.isUsernameUnique(value)
      setIsUsernameUnique(data)
      if (!data) return toast('중복된 유저 이름입니다.', 'error')
      return toast('사용 가능한 유저 이름입니다.', 'success')
    } catch (errorr) {
      toast('유효하지 않은 유저 이름입니다.', 'error')
    }
  }

  return (
    <main className="flex h-[80vh] w-full flex-col items-center justify-center">
      <div className="flex w-2/3 flex-col items-center gap-10">
        <h3 className="text-2xl font-bold text-primary-500">회원가입</h3>
        <Form<SignUpSchema>
          schema={signUpSchema}
          handleSubmit={(data) => onSubmit(data)}
          className="flex w-full flex-col gap-2"
          mode="onChange"
        >
          <Form.TextInput
            label="이메일"
            name="email"
            placeholder="popupNOW@gmail.com"
            className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
            hasBtn
            handleClickBtn={onClickEmailDuplicateBtn}
          />
          {/* {!isEmailUnique && (
            <div className="text-sm text-red-500">{errorMessages.email}</div>
          )} */}
          <Form.TextInput
            label="유저 이름"
            name="username"
            placeholder="two"
            className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
            hasBtn
            handleClickBtn={onClickUsernameDuplicateBtn}
          />
          {/* {!isUsernameUnique && (
            <div className="text-sm text-red-500">{errorMessages.username}</div>
          )} */}
          <Form.TextInput
            label="비밀번호"
            name="password"
            placeholder="********"
            className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
            type="password"
          />
          <Form.TextInput
            label="비밀번호 확인"
            name="confirmPassword"
            placeholder="********"
            className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
            type="password"
          />
          <Form.SubmitButton
            className="mt-5 h-12 w-full rounded-md border-1 border-solid border-gray-400 bg-primary-500 font-bold text-white hover:bg-primary-400 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-500"
            buttonProps={{
              disabled: !(isEmailUnique === true && isUsernameUnique === true),
            }}
          >
            회원가입
          </Form.SubmitButton>
        </Form>
      </div>
    </main>
  )
}
