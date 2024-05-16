import { APIResponse, IndexSignature } from '@/app/type'
import { instance } from '..'
import { PopUp, PopUpDetail, PopUpQuery } from '@/app/type/pop-up'

export const popUpAPI = {
  getPopUpList: (query?: PopUpQuery): APIResponse<PopUp[]> => {
    return instance.get('/pop-up/list', { params: query })
  },
  getPopUpDetail: (id: string): APIResponse<PopUpDetail> => {
    return instance.get(`/pop-up/${id}`)
  },
  getPopUpCategoryList: (): APIResponse<IndexSignature> => {
    return instance.get('/pop-up/category')
  },
}
