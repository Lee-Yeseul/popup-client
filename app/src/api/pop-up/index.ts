import { APIResponse, IndexSignature } from '@/app/src/type'
import { instance } from '..'
import {
  PopUp,
  PopUpDetail,
  PopUpLocationInfo,
  PopUpQuery,
} from '@/app/src/type/pop-up'

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
}
