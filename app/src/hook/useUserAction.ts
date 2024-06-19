import { useUserStore } from '@/app/src/store/userStore'
import { GetUserInfoResponse } from '@/app/src/type/user'
import { decodeJWT, deleteCookie } from '@/app/src/util'
import { authAPI } from '@/app/src/api/auth'

export default function useUserAction() {
  const updateUser = useUserStore((state) => state.update)
  const deleteUser = useUserStore((state) => state.delete)

  const login = (accessToken: string) => {
    const decodedJWT = decodeJWT(accessToken)

    updateUser({
      email: decodedJWT.email,
      username: decodedJWT.user,
    })
  }

  const logout = async () => {
    await authAPI.logout()
    deleteUser()
    deleteCookie('access_token')
    deleteCookie('refresh_token')
  }

  const saveUserInfo = (userInfo: GetUserInfoResponse) => {
    updateUser({
      isLogin: true,
      email: userInfo.email,
      username: userInfo.username,
    })
  }

  return { login, logout, saveUserInfo }
}
