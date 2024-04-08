import { SignInSchema, SignUpSchema } from '@/app/schema/auth'
import { instance } from '..'
import { SignInResponse } from '@/app/type/auth'
import { APIResponse } from '@/app/type'

const basicPathName = '/auth'

export const authAPI = {
  signIn: (bodyData: SignInSchema): APIResponse<SignInResponse> => {
    return instance.post(`${basicPathName}/signin`, bodyData)
  },
  signUp: (bodyData: SignUpSchema): APIResponse<void> => {
    return instance.post(`${basicPathName}/signup`, bodyData)
  },
  renewAccessToken: () => {
    return instance.post('/auth/renew')
  },
  // postKakaoLoginCode: (code: string): APIResponse<SignInResponse> => {
  //   return instance.post(`${basicPathName}/kakao-code`, { code })
  // },
}
