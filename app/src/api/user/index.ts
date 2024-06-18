import { fetchAPI } from '..'
import { GetUserInfoResponse } from '@/app/src/type/user'

const basicPathName = 'user'

export const userAPI = {
  getUserInfo: () => {
    return fetchAPI.get<null, GetUserInfoResponse>(`${basicPathName}/user-info`)
  },
}
