import { APIResponse } from '@/app/type'
import { instance } from '..'
import { GetUserInfoResponse } from '@/app/type/user'

const basicPathName = '/user'

export const userAPI = {
  getUserInfo: (): APIResponse<GetUserInfoResponse> => {
    return instance.get(`${basicPathName}/user-info`)
  },
  updateUserInfo: () => {},
}
