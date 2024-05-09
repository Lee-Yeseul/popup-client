import { APIResponse, Id } from '@/app/type'
import { instance } from '..'
import { WalkHistoryResponse } from '@/app/type/walk-histories'

const basicPathName = '/walk-histories'
export const walkHistoryAPI = {
  postWalkHistory: (bodyData: any): APIResponse<Id> => {
    return instance.post(`${basicPathName}/create`, bodyData)
  },
  postWalkHistoryImage: (id: number, bodyData: any): APIResponse<Id> => {
    return instance.post(`${basicPathName}/${id}/image`, bodyData)
  },
  putWalkHistory: (id: number, bodyData: any): APIResponse<Id> => {
    return instance.put(`${basicPathName}/${id}`, bodyData)
  },
  putWalkHistoryImage: (id: number, bodyData: any): APIResponse<Id> => {
    return instance.put(`${basicPathName}/${id}/image`, bodyData)
  },

  getWalkHistories: (): APIResponse<WalkHistoryResponse[]> => {
    return instance.get(`${basicPathName}/list`)
  },

  getWalkHistory: (id: number): APIResponse<WalkHistoryResponse> => {
    return instance.get(`${basicPathName}/${id}`)
  },
  deleteWalkHistory: (id: number) => {
    return instance.delete(`${basicPathName}/${id}`)
  },
}
