import { SignInSchema, SignUpSchema } from '@/app/src/schema/auth'
import { fetchAPI } from '..'
import { RenewAccessToken, SignInResponse } from '@/app/src/type/auth'
import { GetUserInfoResponse } from '@/app/src/type/user'

const basicPathName = 'auth'

export const authAPI = {
  signIn: (bodyData: SignInSchema) => {
    return fetchAPI.post<SignInSchema, SignInResponse>(
      `${basicPathName}/signin`,
      bodyData,
    )
  },
  signUp: (bodyData: SignUpSchema) => {
    return fetchAPI.post<SignUpSchema, null>(
      `${basicPathName}/signup`,
      bodyData,
    )
  },
  renewAccessToken: () => {
    return fetchAPI.post<null, RenewAccessToken>(`${basicPathName}/renew`)
  },
  isEmailUnique: (email: Pick<GetUserInfoResponse, 'email'>) => {
    return fetchAPI.post<Pick<GetUserInfoResponse, 'email'>, boolean>(
      `${basicPathName}/is-email-unique`,
      email,
    )
  },
  isUsernameUnique: (username: Pick<GetUserInfoResponse, 'username'>) => {
    return fetchAPI.post<Pick<GetUserInfoResponse, 'username'>, boolean>(
      `${basicPathName}/is-username-unique`,
      username,
    )
  },
  logout: () => {
    return fetchAPI.post(`${basicPathName}/logout`)
  },
}
