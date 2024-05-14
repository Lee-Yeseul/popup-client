import { APIResponse, Id } from '@/app/type'
import { instance } from '..'
import { FollowResponse } from '@/app/type/follow'

const basicPathName = '/follow'
export const followAPI = {
  postFollow: (id: string): APIResponse<Id> => {
    return instance.post(`${basicPathName}/${id}`)
  },
  confirmFollow: (id: string) => {
    return instance.patch(`${basicPathName}/${id}/confirm`)
  },
  deleteFollow: (id: string) => {
    return instance.delete(`${basicPathName}/${id}`)
  },
  getMutualFollows: (): APIResponse<FollowResponse[]> => {
    return instance.get(`${basicPathName}/mutual-followers`)
  },
  getFollowers: (): APIResponse<FollowResponse[]> => {
    return instance.get(`${basicPathName}/followers`)
  },
  getFollowees: (): APIResponse<FollowResponse[]> => {
    return instance.get(`${basicPathName}/followees`)
  },
}
