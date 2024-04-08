import { instance } from '../api'
import { useUserStore } from '../store/userStore'
import { SignInResponse } from '../type/auth'
import { decodeJWT } from '../util'

export default function useUserAction() {
  const updateUser = useUserStore((state) => state.update)
  const deleteUser = useUserStore((state) => state.delete)

  const login = (data: SignInResponse) => {
    const { accessToken } = data

    const decodedJWT = decodeJWT(accessToken)

    updateUser({
      email: decodedJWT.email,
      userName: decodedJWT.user,
    })

    instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    // router 동작
  }

  const logout = () => {
    instance.defaults.headers.common.Authorization = ''
    deleteUser()
  }

  return { login, logout }
}
