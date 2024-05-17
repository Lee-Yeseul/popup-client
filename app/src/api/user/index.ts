import { APIResponse } from '@/app/src/type'
import { instance } from '..'
import { GetUserInfoResponse } from '@/app/src/type/user'

const basicPathName = '/user'

export const userAPI = {
  getUserInfo: (): APIResponse<GetUserInfoResponse> => {
    return instance.get(`${basicPathName}/user-info`)
  },
  updateUserInfo: () => {},
}
