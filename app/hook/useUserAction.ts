import { instance } from '../api'
import { useUserStore } from '../store/userStore'
import { SignInResponse } from '../type/auth'
import { decodeJWT, deleteCookie } from '../util'

export default function useUserAction() {
  const updateUser = useUserStore((state) => state.update)
  const deleteUser = useUserStore((state) => state.delete)

  const login = (data: SignInResponse) => {
    const { accessToken } = data

    const decodedJWT = decodeJWT(accessToken)

    updateUser({
      accessToken,
      email: decodedJWT.email,
      userName: decodedJWT.user,
    })
    instance.request({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    // router 동작
  }

  const logout = () => {
    instance.request({
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
      },
    })
    deleteUser()
  }

  return { login, logout }
}
