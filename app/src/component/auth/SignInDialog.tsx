import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignInSchema, signInSchema } from '@/app/src/schema/auth'
import Dialog from '../common/Dialog'
import Form from '../common/form'
import useUserAction from '../../hook/useUserAction'
import { authAPI } from '../../api/auth'
import { userAPI } from '../../api/user'

interface SignInDialogProps {
  setIsDialogOpen: (isDialogOpen: boolean) => void
}
export default function SignInDialog({ setIsDialogOpen }: SignInDialogProps) {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter()
  const { login, saveUserInfo } = useUserAction()

  const onLoginBtnClick = async (loginData: SignInSchema) => {
    try {
      const { data } = await authAPI.signIn(loginData)
      login(data)
      const { data: userInfo } = await userAPI.getUserInfo()
      saveUserInfo(userInfo)
      setIsDialogOpen(false)
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
    <Dialog className="w-[480px]" onClickOutside={() => setIsDialogOpen(false)}>
      <Dialog.Header className="flex h-16 items-center justify-center border-b-[1px] border-solid border-gray-300 px-6">
        <Dialog.CloseButton
          className="absolute right-6"
          onClose={() => setIsDialogOpen(false)}
        />
        <div className="text-lg font-bold">로그인</div>
      </Dialog.Header>
      <Dialog.Body className="flex w-full flex-col items-center justify-center p-6">
        <Form<SignInSchema>
          schema={signInSchema}
          handleSubmit={(data) => onLoginBtnClick(data)}
          className="flex w-full flex-col gap-1"
        >
          <Form.TextInput
            name="email"
            placeholder="test@test.com"
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
          <Form.SubmitButton className="mt-2 h-12 w-full rounded-md border-1 border-solid border-gray-400 hover:bg-gray-50">
            로그인
          </Form.SubmitButton>
        </Form>
      </Dialog.Body>
    </Dialog>
  )
}
