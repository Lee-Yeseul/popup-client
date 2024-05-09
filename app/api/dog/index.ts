import { APIResponse } from '@/app/type'
import { instance } from '..'
import {
  DogBreedResponse,
  DogProfileResponse,
  DogResponse,
  PostDogResponse,
} from '@/app/type/dogs'
import { PostDogSchema } from '@/app/schema/dogs'

const basicPathName = '/dogs'

export const dogAPI = {
  postDog: (bodyData: PostDogSchema): APIResponse<PostDogResponse> => {
    return instance.post(`${basicPathName}/create`, bodyData)
  },
  putDog: (
    id: number,
    bodyData: PostDogSchema,
  ): APIResponse<PostDogResponse> => {
    return instance.put(`${basicPathName}/${id}`, bodyData)
  },
  getDogs: (): APIResponse<DogResponse[]> => {
    return instance.get(`${basicPathName}/list`)
  },
  getMyDogs: (): APIResponse<DogResponse[]> => {
    return instance.get(`${basicPathName}/me`)
  },
  getDog: (id: number): APIResponse<DogResponse> => {
    return instance.get(`${basicPathName}/${id}`)
  },
  getDogBreeds: (): APIResponse<DogBreedResponse> => {
    return instance.get(`${basicPathName}/breeds`)
  },

  postDogProfile: (
    id: number,
    bodyData: any,
  ): APIResponse<DogProfileResponse> => {
    return instance.post(`${basicPathName}/${id}/profile`, bodyData)
  },

  putDogProfile: (
    id: number,
    bodyData: any,
  ): APIResponse<DogProfileResponse> => {
    return instance.put(`${basicPathName}/${id}/profile`, bodyData)
  },

  deleteDog: (id: number): APIResponse<string> => {
    return instance.delete(`${basicPathName}/${id}`)
  },
}
