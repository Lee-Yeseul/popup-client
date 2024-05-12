import { APIResponse, Id } from '@/app/type'
import { instance } from '..'
import { DogPostResponse } from '@/app/type/dog-posts'
import { CreateDogPostSchema } from '@/app/schema/dog-posts'

const basicPathName = '/dog-posts'

export const dogPostAPI = {
  postDogPost: (
    bodyData: CreateDogPostSchema & { dogId: number },
  ): APIResponse<Id> => {
    return instance.post(`${basicPathName}/create/`, bodyData)
  },
  putDogPost: (id: number, bodyData: CreateDogPostSchema): APIResponse<Id> => {
    return instance.put(`${basicPathName}/${id}`, bodyData)
  },
  getDogPosts: (): APIResponse<DogPostResponse[]> => {
    return instance.get(`${basicPathName}/list`)
  },
  getMyDogPosts: (): APIResponse<DogPostResponse[]> => {
    return instance.get(`${basicPathName}/me`)
  },
  getDogPost: (id: number): APIResponse<DogPostResponse> => {
    return instance.get(`${basicPathName}/${id}`)
  },
  deleteDogPost: (id: number) => {
    return instance.delete(`${basicPathName}/${id}`)
  },
}
