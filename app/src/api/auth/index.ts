import { SignInSchema, SignUpSchema } from '@/app/src/schema/auth'
import { instance } from '..'
import { SignInResponse, renewAccessToken } from '@/app/src/type/auth'
import { APIResponse } from '@/app/src/type'

const basicPathName = '/auth'

export const authAPI = {
  signIn: (bodyData: SignInSchema): APIResponse<SignInResponse> => {
    return instance.post(`${basicPathName}/signin`, bodyData)
  },
  signUp: (bodyData: SignUpSchema): APIResponse<void> => {
    return instance.post(`${basicPathName}/signup`, bodyData)
  },
  renewAccessToken: (): APIResponse<renewAccessToken> => {
    return instance.post(`${basicPathName}/renew`)
  },
  isEmailUnique: (email: string): APIResponse<boolean> => {
    return instance.post(`${basicPathName}/is-email-unique`, { email })
  },
  isUsernameUnique: (username: string): APIResponse<boolean> => {
    return instance.post(`${basicPathName}/is-username-unique`, { username })
  },

  // postKakaoLoginCode: (code: string): APIResponse<SignInResponse> => {
  //   return instance.post(`${basicPathName}/kakao-code`, { code })
  // },
}
