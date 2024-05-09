import { instance } from '../api'
import { useUserStore } from '../store/userStore'
import { SignInResponse } from '../type/auth'
import { GetUserInfoResponse } from '../type/user'
import { decodeJWT } from '../util'

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

    instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  }

  const logout = () => {
    instance.defaults.headers.common.Authorization = ''
    deleteUser()
  }

  const saveUserInfo = (userInfo: GetUserInfoResponse) => {
    const defaultImage =
      'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG'

    updateUser({
      isLogin: true,
      email: userInfo.email,
      username: userInfo.username,
      profileImageURL: userInfo.profileImagePath ?? defaultImage,
    })
  }

  return { login, logout, saveUserInfo }
}
