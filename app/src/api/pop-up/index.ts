import { APIResponse, IndexSignature } from '@/app/src/type'
import { instance } from '..'
import {
  CreateBasicPopUpInfo,
  PopUp,
  PopUpDetail,
  PopUpLocationInfo,
  PopUpQuery,
} from '@/app/src/type/pop-up'
import { CreatePopUpSchema } from '../../schema/pop-up'

const basicPathName = '/pop-up'
export const popUpAPI = {
  getPopUpList: (query?: PopUpQuery): APIResponse<PopUp[]> => {
    return instance.get(`${basicPathName}/list`, { params: query })
  },
  getPopUpDetail: (id: string): APIResponse<PopUpDetail> => {
    return instance.get(`${basicPathName}/${id}`)
  },
  getPopUpCategoryList: (): APIResponse<IndexSignature> => {
    return instance.get(`${basicPathName}/category`)
  },
  getPopUpMapList: (): APIResponse<PopUpLocationInfo[]> => {
    return instance.get(`${basicPathName}/map/list`)
  },
  postPopUp: (data: CreateBasicPopUpInfo): APIResponse<IndexSignature> => {
    return instance.post(`${basicPathName}`, data)
  },
  putPopUpById: (
    id: string,
    data: Partial<CreateBasicPopUpInfo>,
  ): APIResponse<IndexSignature> => {
    return instance.put(`${basicPathName}/${id}`, data)
  },
  putPopUpIsAvailableById: (
    id: string,
    isAvailable: boolean,
  ): APIResponse<IndexSignature> => {
    return instance.put(`${basicPathName}/${id}`, { isAvailable })
  },
  deletePopUpById: (id: string) => {
    return instance.delete(`${basicPathName}/${id}`)
  },
}
