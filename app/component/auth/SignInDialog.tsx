import { SignInSchema, signInSchema } from '@/app/schema/auth'

import Dialog from '../common/Dialog'

import { authAPI } from '@/app/api/auth'

import useUserAction from '@/app/hook/useUserAction'
import { useRouter } from 'next/navigation'
import Form from '../common/form'

interface SignInDialogProps {
  setIsDialogOpen: (isDialogOpen: boolean) => void
}
export default function SignInDialog({ setIsDialogOpen }: SignInDialogProps) {
  const router = useRouter()
  const { login } = useUserAction()

  const onLoginBtnClick = async (loginData: SignInSchema) => {
    const { data } = await authAPI.signIn(loginData)
    login(data)
    setIsDialogOpen(false)
    router.push('/')
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
          />
          <Form.SubmitButton className="mt-2 h-12 w-full rounded-md border-1 border-solid border-gray-400 hover:bg-gray-50">
            로그인
          </Form.SubmitButton>
        </Form>
      </Dialog.Body>
    </Dialog>
  )
}
