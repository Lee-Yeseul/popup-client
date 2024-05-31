import { useUserStore } from '@/app/src/store/userStore'
import { SignInResponse } from '@/app/src/type/auth'
import { GetUserInfoResponse } from '@/app/src/type/user'
import { decodeJWT } from '@/app/src/util'
import { authAPI } from '../api/auth'

export default function useUserAction() {
  const updateUser = useUserStore((state) => state.update)
  const deleteUser = useUserStore((state) => state.delete)

  const login = (data: SignInResponse) => {
    const { accessToken } = data

    const decodedJWT = decodeJWT(accessToken)

    updateUser({
      email: decodedJWT.email,
      username: decodedJWT.user,
    })
  }

  const logout = async () => {
    await authAPI.logout()
    deleteUser()
  }

  const saveUserInfo = (userInfo: GetUserInfoResponse) => {
    const defaultImage = ''

    updateUser({
      isLogin: true,
      email: userInfo.email,
      username: userInfo.username,
      profileImageURL: userInfo.profileImagePath ?? defaultImage,
    })
  }

  return { login, logout, saveUserInfo }
}
